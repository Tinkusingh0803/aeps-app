import { WebPlugin } from '@capacitor/core';
import type { AepsPlugin, AepsLaunchOptions, AepsResult } from './definitions';

/**
 * Web/browser implementation. The real Paysprint SDK is Android-only
 * (native .aar), so in the browser (and until the .aar is wired in)
 * we simulate a realistic response after a short delay. This lets you
 * test the full dashboard -> plugin -> result UI flow without the SDK.
 */
export class AepsWeb extends WebPlugin implements AepsPlugin {

  async launchOnboarding(options: AepsLaunchOptions): Promise<AepsResult> {
    console.log('[AEPS DEMO MODE] launchOnboarding called with', options);

    await new Promise(resolve => setTimeout(resolve, 1200));

    return {
      status: true,
      response: 1,
      message: 'DEMO MODE: simulated onboarding success (no real SDK wired in yet)',
    };
  }
}
