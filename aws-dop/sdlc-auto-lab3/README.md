This lab is to use System Manager to install Apache server:
1. Launch 2 instances with same tag
2. Create resource group in Resource Groups
   - Group type: tag based
   - Resource type: AWS::EC2::Instance
   - Tags: ec2 tag
4. Create command document in System Manager
   - copy content from `command-doc.yaml`
5. Run and check if Apache installed