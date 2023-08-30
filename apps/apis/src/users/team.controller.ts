import { InviteUserDto } from './dto/inviteUser.dto';
import { UsersService } from './users.service';
import { JwtUser } from '@/common/decorators';
import { JwtAuthGuard } from '@/common/guards';
import { SubscriptionPlan } from '@/databases/entities';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('team')
@UseGuards(JwtAuthGuard)
export class TeamController {
  constructor(private usersService: UsersService) {}

  @Get('members')
  getTeamMember(@JwtUser('team_id') team_id: string) {
    return this.usersService.getTeamMember(team_id);
  }

  @Post('invite')
  async inviteUser(
    @JwtUser('team_id') team_id: string,
    @Body() users: InviteUserDto,
  ) {
    return this.usersService.inviteUser({ team_id, users });
  }

  @Post('subcribe')
  async paymentSubcription(
    @JwtUser('team_id') team_id: string,
    @Body() { type }: { type: SubscriptionPlan },
  ) {
    const data = await this.usersService.subscribe(team_id, type);
    return { url: data?.url };
  }

  // listen event from stripe:
  // https://dashboard.stripe.com/webhooks
  @Post('payment/confirm')
  async paymentConfirm(@Req() req: Request) {
    const sig = req.headers['stripe-signature'];
    const body = req.body;
    this.usersService.paymentConfirm(sig, body);
  }

  @Get('subcribe')
  async subcribeRedirct(
    @JwtUser('team_id') team_id: string,
    @Res() res: Response,
  ) {
    await this.usersService.subcribeRedirct(team_id);
    res.redirect(`${process.env.CLIENT_ENDPOINT}/settings/billing`);
  }
}
