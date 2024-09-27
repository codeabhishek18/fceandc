import AWS from 'aws-sdk'
import { NextResponse } from 'next/server'

export async function POST(req)
{
    try
    {
        const { objectKey } = await req.json();

        const s3 = new AWS.S3({
            region: process.env.AWS_REGION
        })
        
        const generatePresignedUrl = (bucketName, objectKey, expiresIn) => 
        {
            const params = 
            {
                Bucket: bucketName,       // S3 bucket name
                Key: objectKey,           // The key of the S3 object (video file)
                Expires: expiresIn // Expiry time in seconds (default 60 seconds)
            };
        
            // Generate the pre-signed URL
            return s3.getSignedUrl('getObject', params);
        };
        
        // Example usage
        const presignedUrl = generatePresignedUrl(process.env.BUCKET_NAME, objectKey, 7200); // Expires in 5 minutes
        console.log('Pre-signed URL:', presignedUrl);
        return NextResponse.json({url: presignedUrl});
    }
    catch(error)
    {
        return NextResponse.json({error: error.message});
    }
}