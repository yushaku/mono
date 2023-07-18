import { HealthIndicator } from '../type/health-indicator.interface';
import { BaseHealthIndicator } from './base-health.indicator';
import { KnowledgeService } from '@/knowledge/knowledge.service';
import { PrometheusService } from '@/prometheus/prometheus.service';
import { HealthIndicatorResult } from '@nestjs/terminus';

export class FileModuleHealthIndicator
  extends BaseHealthIndicator
  implements HealthIndicator
{
  public readonly name = 'FilesModules';
  protected readonly help = 'Status of ' + this.name;

  constructor(
    private service: KnowledgeService,
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
