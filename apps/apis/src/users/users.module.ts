import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TeamEntity, UserEntity } from '@/databases/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity, TeamEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
