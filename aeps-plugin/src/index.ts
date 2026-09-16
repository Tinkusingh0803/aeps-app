import { registerPlugin } from '@capacitor/core';
import type { AepsPlugin } from './definitions';

const Aeps = registerPlugin<AepsPlugin>('Aeps', {
  web: () => import('./web').then(m => new m.AepsWeb()),
});

export * from './definitions';
export { Aeps };
