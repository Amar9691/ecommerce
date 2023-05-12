import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loader: boolean = false;
  constructor() {}

  setLoader(loader: boolean): void {
    this.loader = loader;
  }

  getLoader(): boolean {
    return this.loader;
  }
}
