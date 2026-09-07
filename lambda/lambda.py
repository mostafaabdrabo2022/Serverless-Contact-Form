import json
import boto3
import uuid
from datetime import datetime

# Initialize AWS SDK Clients
ses = boto3.client('ses')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ContactMessages')

# CONFIGURATION: Verified SES email
SENDER_EMAIL = "mostafaabdrabo4900@gmail.com"
ADMIN_EMAIL = "mostafaabdrabo4900@gmail.com"

def lambda_handler(event, context):
    http_method = event.get('httpMethod')
    path = event.get('path', '')
    
    # Standard CORS Headers
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    }

    # Handle OPTIONS method for CORS preflight
    if http_method == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    try:
        # Route 1: POST /contact
        if http_method == 'POST' and '/contact' in path:
            body = json.loads(event.get('body', '{}'))
            name = body.get('name')
            email = body.get('email')
            message = body.get('message')

            if not name or not email or not message:
                return {
                    'statusCode': 400,
                    'headers': headers,
                    'body': json.dumps({'error': 'Missing required fields'})
                }

            msg_id = str(uuid.uuid4())
            timestamp = datetime.utcnow().isoformat()

            # 1. Save to DynamoDB
            table.put_item(
                Item={
                    'id': msg_id,
                    'name': name,
                    'email': email,
                    'message': message,
                    'timestamp': timestamp
                }
            )

            # 2. Send Email Notification via SES
            email_body = f"New message received:\n\nName: {name}\nEmail: {email}\n\nMessage:\n{message}"
            ses.send_email(
                Source=SENDER_EMAIL,
                Destination={'ToAddresses': [ADMIN_EMAIL]},
                Message={
                    'Subject': {'Data': f"Contact Form: {name}"},
                    'Body': {'Text': {'Data': email_body}}
                }
            )

            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({'message': 'Message sent successfully!'})
            }

        # Route 2: GET /stats
        elif http_method == 'GET' and '/stats' in path:
            response = table.scan()
            items = response.get('Items', [])

            return {
                'statusCode': 200,
                'headers': headers,
                'body': json.dumps({
                    'total_messages': len(items),
                    'messages': items
                })
            }

        return {
            'statusCode': 404,
            'headers': headers,
            'body': json.dumps({'error': 'Route not found'})
        }

    except Exception as e:
        print(f"Error processing request: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'error': 'Internal Server Error', 'details': str(e)})
        }