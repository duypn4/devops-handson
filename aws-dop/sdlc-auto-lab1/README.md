# This lab is to create a S3 bucket to store artifacts for CodeBuild:
1. Create a S3 source bucket
2. Zip `app` folder and upload to the source bucket
3. Create a S3 artifact bucket
4. Create a CodeBuild project:
   - Source provider: S3
   - Artifacts: S3
   - Image: amazonlinux:corretto
5. Start build
6. Check a new artifact appearing in the S3 bucket
7. Check CloudWatch logs