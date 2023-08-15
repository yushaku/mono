import { TeamController } from './team.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TeamEntity, UserEntity } from '@/databases/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MikroOrmModule.forFeature([UserEntity, TeamEntity]),
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  controllers: [UsersController, TeamController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
