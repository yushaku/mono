import { Module } from '@nestjs/common';
import { MetricService } from './metric.service';
import { MetricController } from './metric.controller';
import { PrometheusModule } from '@/prometheus/prometheus.module';
import { HealthModule } from '@/health/health.module';

@Module({
  imports: [PrometheusModule, HealthModule],
  controllers: [MetricController],
  providers: [MetricService],
})
export class MetricModule {}
