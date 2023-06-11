import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CommonService } from './common.service';
import { MinioService } from './minio.service';
import { GoogleStrategy, JwtStrategy } from './strategy';

@Global()
@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRED_TIME') },
      }),
    }),
  ],
  providers: [CommonService, MinioService, JwtStrategy, GoogleStrategy],
  exports: [JwtModule, CommonService, MinioService],
})
export class CommonModule {}
