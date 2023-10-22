import boto3
import json
import base64

def lambda_handler(event, context):
    secret_name = "Copy Secret ARN Here"
    # Create a Secrets Manager client
    secretClient = boto3.client(
        service_name = 'secretsmanager',
        region_name = 'us-east-1'
    )

    get_secret_value_response = secretClient.get_secret_value(
        SecretId=secret_name
    )

    secret = get_secret_value_response['SecretString']
    Table_name = 'Whizlabs_stud_table2'
    
    # Create a DynamoDB table
    print('DynamoDB Table creation started.')
    
    dynamodb = boto3.resource(
		'dynamodb',
		aws_access_key_id = json.loads(secret).get('Access Key'),
		aws_secret_access_key = json.loads(secret).get('Secret Access Key'),
		region_name = 'us-east-1'
    )
    
    # Connect to table & Scan the entire table
    table = dynamodb.Table(Table_name)
    response = table.scan()
    
    print('---------------------------------------')
    print('------------STUDENT DETAILS------------')
    print('---------------------------------------')
    for item in response['Items']:
    	print('Student Id : ', item['StudId'])
    	print('Student Name : ', item['FirstName'], ' ', item['LastName'])
    	print('Student Department : ', item['Dept'])
    	print('Student Age : ', item['Age'])
    	print('_______________________________')
    print('---------------------------------------')