import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerModule } from '@nestjs/throttler';
import * as Joi from 'joi';
import { CommonModule } from '../common/common.module';
import { FilesModule } from '../files/files.module';
import { HealthModule } from '../health/health.module';
import { MetricModule } from '../metric/metric.module';
import { PrometheusModule } from '../prometheus/prometheus.module';
import { UsersModule } from '../users/users.module';
import { AppController } from './app.controller';

const { NODE_ENV = 'development' } = process.env;
const isTest = NODE_ENV === 'test';
const isDev = NODE_ENV === 'development';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().default('postgresql'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_MAIN: Joi.string().required(),
        DB_TEST: Joi.string().required(),

        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRED_TIME: Joi.string().required(),
        APP_PORT: Joi.number().required(),

        MINIO_ENDPOINT: Joi.string().required().default('localhost'),
        MINIO_PORT: Joi.number().required().default(9000),
        MINIO_SSL: Joi.boolean().required().default(false),
        MINIO_ACCESS_KEY: Joi.string().required().default('minio'),
        MINIO_SECRET_KEY: Joi.string().required(),
        MINIO_BUCKET: Joi.string().required().default('doodle'),
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MulterModule.register({
      dest: './store',
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get('DB_TYPE'),
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        dbName: isTest ? config.get('DB_TEST') : config.get('DB_MAIN'),
        user: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        autoLoadEntities: true,
        discovery: { warnWhenNoEntities: false },
        debug: isDev ? true : false,
        pool: {
          min: 2,
          max: 10,
          idleTimeoutMillis: 1000,
        },
      }),
    }),
    CommonModule,
    FilesModule,
    MetricModule,
    HealthModule,
    PrometheusModule,
    UsersModule,
  ],
  providers: [ConfigService],
  controllers: [AppController],
})
export class AppModule {}
