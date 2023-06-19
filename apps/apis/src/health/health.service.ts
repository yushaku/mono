import { FileModuleHealthIndicator } from './models/FileModule.indicator';
import { NestjsHealthIndicator } from './models/nestjs-health.indicator';
import { HealthIndicator } from './type/health-indicator.interface';
import { FilesService } from '@/files/files.service';
import { PrometheusService } from '@/prometheus/prometheus.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  MikroOrmHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  private readonly listOfThingsToMonitor: HealthIndicator[];

  constructor(
    private cf: ConfigService,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: MikroOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private promClientService: PrometheusService,
    private filesService: FilesService,
  ) {
    const nestUrl = `${this.cf.get('APP_ENDPOINT')}:${this.cf.get(
      'APP_PORT',
    )}/api`;

    this.listOfThingsToMonitor = [
      new NestjsHealthIndicator(this.http, nestUrl, this.promClientService),
      new FileModuleHealthIndicator(this.filesService, this.promClientService),
    ];
  }

  @HealthCheck()
  public async check(): Promise<HealthCheckResult | undefined> {
    const servicesHealthCheck = this.listOfThingsToMonitor.map(
      (apiIndicator) => async () => {
        try {
          return await apiIndicator.isHealthy();
        } catch (e) {
          Logger.warn(e);
          return apiIndicator.reportUnhealthy();
        }
      },
    );

    return await this.health.check([
      ...servicesHealthCheck,
      async () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      async () => this.db.pingCheck('database'),
    ]);
  }
}
