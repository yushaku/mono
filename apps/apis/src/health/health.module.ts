import { PrometheusModule } from '../prometheus/prometheus.module';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { KnowledgeModule } from '@/knowledge/knowledge.module';
import { OpenaiModule } from '@/openai/openai.module';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule, PrometheusModule, KnowledgeModule, OpenaiModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
