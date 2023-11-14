# This lab is to deploy a containerised app using CodeDeploy:
1. Create a security group for load balancer
2. Create the 2 target groups
3. Create a application load balancer with listener 80 to the first target group
4. Create a ECS cluster with below command:
   ```shell
   export REGION=<region code>
   aws ecs create-cluster --cluster-name tutorial-bluegreen-cluster --region ${REGION}
   ```
5. Create an execution role for an ECS task with following permission
   ```json
   {
	    "Version": "2012-10-17",
	    "Statement": [
	    	{
	    		"Action": [
	    			"ecs:DescribeServices",
	    			"ecs:CreateTaskSet",
	    			"ecs:UpdateServicePrimaryTaskSet",
	    			"ecs:DeleteTaskSet",
	    			"cloudwatch:DescribeAlarms"
	    		],
	    		"Resource": "*",
	    		"Effect": "Allow"
	    	},
	    	{
	    		"Action": [
	    			"sns:Publish"
	    		],
	    		"Resource": "arn:aws:sns:*:*:CodeDeployTopic_*",
	    		"Effect": "Allow"
	    	},
	    	{
	    		"Action": [
	    			"elasticloadbalancing:DescribeTargetGroups",
	    			"elasticloadbalancing:DescribeListeners",
	    			"elasticloadbalancing:ModifyListener",
	    			"elasticloadbalancing:DescribeRules",
	    			"elasticloadbalancing:ModifyRule"
	    		],
	    		"Resource": "*",
	    		"Effect": "Allow"
	    	},
	    	{
	    		"Action": [
	    			"lambda:InvokeFunction"
	    		],
	    		"Resource": "arn:aws:lambda:*:*:function:CodeDeployHook_*",
	    		"Effect": "Allow"
	    	},
	    	{
	    		"Action": [
	    			"s3:Get*"
	    		],
	    		"Resource": "*",
	    		"Condition": {
	    			"StringEquals": {
	    				"s3:ExistingObjectTag/UseWithCodeDeploy": "true"
	    			}
	    		},
	    		"Effect": "Allow"
	    	},
	    	{
	    		"Action": [
	    			"iam:PassRole"
	    		],
	    		"Effect": "Allow",
	    		"Resource": [
	    			"arn:aws:iam::*:role/ecsTaskExecutionRole",
	    			"arn:aws:iam::*:role/ECSTaskExecution*"
	    		],
	    		"Condition": {
	    			"StringLike": {
	    				"iam:PassedToService": [
	    					"ecs-tasks.amazonaws.com"
	    				]
	    			}
	    		}
	    	},
	    	{
	    		"Effect": "Allow",
	    		"Action": [
	    			"ecr:GetAuthorizationToken",
	    			"ecr:BatchCheckLayerAvailability",
	    			"ecr:GetDownloadUrlForLayer",
	    			"ecr:BatchGetImage",
	    			"logs:CreateLogStream",
	    			"logs:PutLogEvents"
	    		],
	    		"Resource": "*"
	    	}
	    ]
    }
    ```
6. Create an ECS task definition by replacing the ECS execution role arn within the `fargate-task.json` and running below command:
   ```shell
   aws ecs register-task-definition --cli-input-json file://fargate-task.json --region ${REGION}
   ```
7. Create an ECS service by inputing required fields within the `service-bluegreen.json` and running below command:
   ```shell
   aws ecs create-service --cli-input-json file://service-bluegreen.json --region ${REGION}
   ```
8. Create a new task revision with tag `Name: CodeDeploy`
9. Update the `appspec.yml` file with required field and upload to s3
10. Create a CodeDeploy with the appspec file uri from S3
11. Create a listener for the second target group with below command:
    ```shell
    aws elbv2 create-listener --load-balancer-arn <your load balancer arn> --protocol HTTP --port 8080 --default-actions Type=forward,TargetGroupArn=<your second target group arn> --region ${REGION}
    ```
12. Create a role for a Lambda function with below permission:
    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream",
                    "codedeploy:PutLifecycleEventHookExecutionStatus",
                    "logs:PutLogEvents"
                ],
                "Resource": "*"
            }
        ]
    }
    ```
13. Create a Lambda function to test after allowing traffic to the ECS app with below command:
    ```shell
    zip AfterAllowTestTraffic.zip AfterAllowTestTraffic.js

    aws lambda create-function --function-name AfterAllowTestTraffic \
           --zip-file fileb://AfterAllowTestTraffic.zip \
           --handler AfterAllowTestTraffic.handler \
           --runtime nodejs14.x \
           --role <your lambda role arn>
    ```
14. Uncomment the last lines in the appspec file to create a new deployment with it and a new listener
15. After the deployment finishes, check if the lambda function is invoked