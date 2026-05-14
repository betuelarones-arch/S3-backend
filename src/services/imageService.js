import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client from '../config/s3Client.js';

const BUCKET_NAME = process.env.S3_BUCKET;

export const generateUploadUrl = async (fileName, contentType) => {
  const key = `originales/${Date.now()}-${fileName}`;
  
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  
  return {
    uploadUrl: signedUrl,
    key,
    expiresIn: 300,
  };
};

export const generateViewUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  
  return {
    viewUrl: signedUrl,
    key,
    expiresIn: 3600,
  };
};

export const listImages = async () => {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    Prefix: 'originales/',
  });

  const response = await s3Client.send(command);
  
  const images = await Promise.all((response.Contents || []).map(async (item) => {
    const viewCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: item.Key,
    });
    const viewUrl = await getSignedUrl(s3Client, viewCommand, { expiresIn: 900 });
    
    return {
      key: item.Key,
      size: item.Size,
      lastModified: item.LastModified,
      url: viewUrl,
    };
  }));

  return images;
};

export const deleteImage = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  await s3Client.send(command);
  
  return { deleted: true, key };
};