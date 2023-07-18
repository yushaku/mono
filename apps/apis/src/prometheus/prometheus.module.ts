import { PrometheusService } from './prometheus.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [PrometheusService],
  exports: [PrometheusService],
})
export class PrometheusModule {}
