import { FileModuleHealthIndicator } from './models/FileModule.indicator';
import { OpenaiModuleHealthIndicator } from './models/OpenModule.indicator';
import { NestjsHealthIndicator } from './models/nestjs-health.indicator';
import { HealthIndicator } from './type/health-indicator.interface';
import { KnowledgeService } from '@/knowledge/knowledge.service';
import { OpenaiService } from '@/openai/openai.service';
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
    private knowledgeService: KnowledgeService,
    private openaiService: OpenaiService,
  ) {
    const nestUrl = `${this.cf.get('APP_ENDPOINT')}:8005/api`;

    this.listOfThingsToMonitor = [
      new NestjsHealthIndicator(this.http, nestUrl, this.promClientService),
      new FileModuleHealthIndicator(
        this.knowledgeService,
        this.promClientService,
      ),
      new OpenaiModuleHealthIndicator(
        this.openaiService,
        this.promClientService,
      ),
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
