import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import moment from 'moment';

@Injectable()
export class MinioService {
  private readonly minioClient: Minio.Client;
  private readonly bucketName: string;
  private readonly maxUploadSize: number;

  constructor(private config: ConfigService) {
    this.bucketName = this.config.get('MINIO_BUCKET', 'doodle');
    this.maxUploadSize =
      parseInt(this.config.get('MINIO_MAX_UPLOAD_SIZE', '16')) * 1024 * 1024;
    this.minioClient = new Minio.Client({
      endPoint: config.get('MINIO_ENDPOINT') ?? '',
      port: parseInt(config.get('MINIO_PORT') ?? ''),
      useSSL: config.get('MINIO_SSL') == 'true',
      accessKey: config.get('MINIO_ACCESS_KEY') ?? '',
      secretKey: config.get('MINIO_SECRET_KEY') ?? '',
    });
    this.initBucket();
  }

  private async initBucket() {
    const exists = await this.minioClient.bucketExists(this.bucketName);
    if (!exists) {
      await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
      console.debug('create bucket successfully');
    }
  }

  async upload({ fileName, buffer }: { fileName: string; buffer: Buffer }) {
    const dateTime = moment().format('YYYY-MM-DD');
    const filePath = `${dateTime}/${fileName}`;

    this.minioClient.putObject(
      this.bucketName,
      filePath,
      buffer,
      async (err) => {
        if (err) console.error(err);
        console.log('upload file successfully');
      },
    );

    return this.minioClient.presignedGetObject(this.bucketName, filePath);
  }

  async getPresignedUrl(filename: string) {
    const date = moment().format('YYYY-MM-DD');
    const key = `${date}/${filename}`;

    const policy = new Minio.PostPolicy();
    policy.setBucket(this.bucketName);
    policy.setKey(key);
    policy.setContentLengthRange(0, this.maxUploadSize);

    const presignedUrl = await this.minioClient.presignedPostPolicy(policy);
    presignedUrl.postURL = this.config.get('MINIO_PUBLIC');

    return presignedUrl;
  }
}
