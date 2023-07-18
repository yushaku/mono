import { MetricController } from './metric.controller';
import { MetricService } from './metric.service';
import { HealthModule } from '@/health/health.module';
import { PrometheusModule } from '@/prometheus/prometheus.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrometheusModule, HealthModule],
  controllers: [MetricController],
  providers: [MetricService],
})
export class MetricModule {}
