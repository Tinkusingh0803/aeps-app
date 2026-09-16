import { Injectable } from '@angular/core';
import { Aeps, AepsLaunchOptions, AepsResult } from 'aeps-plugin';

@Injectable({ providedIn: 'root' })
export class AepsService {

  async launchOnboarding(options: AepsLaunchOptions): Promise<AepsResult> {
    return Aeps.launchOnboarding(options);
  }
}
