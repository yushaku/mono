import { SubscriptionPlan } from '@/databases/entities';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { stripePrice } from 'utils/constants';

const YOUR_DOMAIN = 'http://localhost:3000';

@Injectable()
export default class StripeService {
  public stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2023-08-16',
    });
  }

  public async createCustomer(name: string) {
    return this.stripe.customers.create({ name }).then((user) => user.id);
  }

  public async getCustomer(teamId: string) {
    return this.stripe.customers.search({
      query: `name:"${teamId}"`,
    });
  }

  public async createPlan(amount: number, nickname: string) {
    return this.stripe.plans.create({
      currency: this.configService.get('STRIPE_CURRENCY') ?? 'USD',
      interval: 'month',
      nickname,
      amount,
    });
  }

  public async createSession(type: SubscriptionPlan, customerId: string) {
    const priceId = stripePrice[type];
    return this.stripe.checkout.sessions.create({
      mode: 'subscription',
      customer: customerId,
      currency: this.configService.get('STRIPE_CURRENCY') ?? 'USD',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${this.configService.get('APP_ENDPOINT')}/team/subcribe`,
    });
  }

  public async checkSubscription() {
    return this.stripe.subscriptions.search({
      query: `status:"active"`,
    });
  }

  public async subscribe(planId: string, customerId: string) {
    return this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ plan: planId }],
    });
  }

  public async charge(
    amount: number,
    paymentMethodId: string,
    customerId: string,
  ) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: this.configService.get('STRIPE_CURRENCY') ?? 'USD',
      confirm: true,
    });
  }
}
