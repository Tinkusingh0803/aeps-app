export interface AepsLaunchOptions {
  /** Partner Id provided by Paysprint in your credentials */
  pId: string;
  /** JWT API key provided by Paysprint */
  pApiKey: string;
  mCode: string;
  mobile: string;
  lat: string;
  lng: string;
  /** Which bank flow to use: 'bank1' | 'bank2' etc. */
  pipe: string;
  firm: string;
  email: string;
}

export interface AepsResult {
  status: boolean;
  response: number;
  message: string;
}

export interface AepsPlugin {
  launchOnboarding(options: AepsLaunchOptions): Promise<AepsResult>;
}
