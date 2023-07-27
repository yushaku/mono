import { InviteUserDto } from './dto/inviteUser.dto';
import { UsersService } from './users.service';
import { JwtUser } from '@/common/decorators';
import { JwtAuthGuard } from '@/common/guards';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('team')
@UseGuards(JwtAuthGuard)
export class TeamController {
  constructor(
    private usersService: UsersService,
    private config: ConfigService,
  ) {}

  @Get('members')
  getTeamMember(@JwtUser('team_id') team_id: string) {
    return this.usersService.getTeamMember(team_id);
  }

  @Post('invite')
  async inviteUser(
    @JwtUser('team_id') team_id: string,
    @Body() users: InviteUserDto[],
  ) {
    return this.usersService.inviteUser({ team_id, users });
  }
}
