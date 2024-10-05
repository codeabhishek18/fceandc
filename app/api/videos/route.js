import { NextResponse } from 'next/server'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function POST(req)
{
    try
    {
        const { objectKey } = await req.json();

        const s3Client = new S3Client({
            region: process.env.AWS_REGION,
            endpoint: 'https://s3.eu-north-1.amazonaws.com',
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY,
              secretAccessKey: process.env.AWS_SECRET_KEY,
            },
        });
        
        const generatePresignedUrl = async (bucket, key) => 
        {
            const command = new GetObjectCommand({
              Bucket: bucket,
              Key: key,
            });
          
            // Generate a pre-signed URL valid for 1 hour
            const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
            
            return signedUrl;
          };
          
          // Example usage
          const videoUrl = await generatePresignedUrl(process.env.BUCKET_NAME, objectKey);
          
        return NextResponse.json(videoUrl);
    }
    catch(error)
    {
        return NextResponse.json({error: error.message});
    }
}
