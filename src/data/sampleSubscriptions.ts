import { SubscriptionPlan } from '../types';
import { INITIAL_PLATFORM_PRICING, getSubscriptionPlansList } from './pricingConfig';

/**
 * Standard Machinix Subscription Plans
 * Derived dynamically from the central Platform Pricing Engine.
 * Basic (10,000 IQD/mo) | Pro Owner (20,000 IQD/mo) | Business (35,000 IQD/mo) | Enterprise (50,000 IQD/mo)
 */
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = getSubscriptionPlansList(INITIAL_PLATFORM_PRICING);
