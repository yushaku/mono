import { BaseHealthIndicator } from './base-health.indicator';
import { HealthIndicator } from '../type/health-indicator.interface';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { PrometheusService } from '@/prometheus/prometheus.service';
import { FilesService } from '@/files/files.service';

export class FileModuleHealthIndicator
  extends BaseHealthIndicator
  implements HealthIndicator
{
  public readonly name = 'FilesModules';
  protected readonly help = 'Status of ' + this.name;

  constructor(
    private service: FilesService,
    protected promClientService: PrometheusService,
  ) {
    super();
    this.registerMetrics();
    this.registerGauges();
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = this.service.isConnected;
    this.updatePrometheusData(isHealthy);
    return this.getStatus(this.name, isHealthy);
  }
}
