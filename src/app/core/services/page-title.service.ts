import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ResolveFn } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  pageTitle = new BehaviorSubject('Peter');
  pageTitle$ = this.pageTitle.asObservable();
}

export const titleResolver: ResolveFn<string> = async () => {
  const title = await firstValueFrom(inject(PageTitleService).pageTitle$);
  const pageName = environment.pageName;
  return title ? `${title} - ${pageName}` : pageName;
};
