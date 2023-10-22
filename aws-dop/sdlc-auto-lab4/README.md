This lab is to deploy a WordPress app using CodeDeploy:
1. Launch an EC2 instance:
   - Image: amazon linux 2
   - Security group: open ssh, http
2. Run commands in the instance:
   - sudo su
   - yum -y update
   - yum install awscli git -y
   - yum install ruby wget -y
   - wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
   - chmod +x ./install
   - sudo ./install auto
   - service codedeploy-agent start
   - service codedeploy-agent status
3. Create a S3 bucket:
   - Upload `appspec.yaml`, `scripts` to the bucket
4. Clone WordPress app and config files to the instance
   - git clone https://github.com/WordPress/WordPress.git /home/ec2-user/WordPress
   - aws s3 cp s3://{Bucket-name}/ /home/ec2-user/WordPress --recursive
5. Create a CodeDeploy application from the instance:
   - aws deploy create-application --application-name WordPress_App --region us-east-1
6. Bundle application and push to the bucket from the instance:
   - cd /home/ec2-user/WordPress
   - aws deploy push --application-name WordPress_App --s3-location s3://{Bucket-name}/WordPressApp.zip --ignore-hidden-files --region us-east-1
7. Create a deployment group within the CodeDeploy application:
   - Deployment type: in-place deployment
   - Environment configuration: Amazon EC2 Instances
   - Tag group 1: use instance tag
8. Create a deployment:
   - Revision location: the S3 zip file's URI
   - Revision type: zip
9. Check the app using the instance ip