import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable()
export class PlatformService {

  constructor(@Inject(PLATFORM_ID) private platformId: string) { }

  public isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
