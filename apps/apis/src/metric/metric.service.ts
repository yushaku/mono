import { HealthService } from '../health/health.service';
import { PrometheusService } from '../prometheus/prometheus.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MetricService {
  constructor(
    private promClientService: PrometheusService,
    private healthService: HealthService,
  ) {}

  public get metrics(): Promise<string> {
    this.healthService.check();
    return this.promClientService.metrics;
  }
}
