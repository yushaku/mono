import { AppControler } from './app.controller';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { CommonModule } from '@/common/common.module';
import { HealthModule } from '@/health/health.module';
import { MetricModule } from '@/metric/metric.module';
import { OpenaiModule } from '@/openai/openai.module';
import { UsersModule } from '@/users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import * as Joi from 'joi';

@Module({
  controllers: [AppControler],
  providers: [ConfigService],
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

        OPENAI_API_KEY: Joi.string().required(),

        MINIO_ENDPOINT: Joi.string().required().default('localhost'),
        MINIO_PORT: Joi.number().required().default(9000),
        MINIO_SSL: Joi.boolean().required().default(false),
        MINIO_ACCESS_KEY: Joi.string().required().default('minio'),
        MINIO_SECRET_KEY: Joi.string().required(),
        MINIO_BUCKET: Joi.string().required().default('doodle'),
      }),
    }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
    MulterModule.register({ dest: './store' }),
    MikroOrmModule.forRoot(),
    CommonModule,
    KnowledgeModule,
    MetricModule,
    HealthModule,
    PrometheusModule,
    UsersModule,
    OpenaiModule,
  ],
})
export class AppModule {}
