import { environment } from '../../../environments/environment';

export function convertTitle(title?: string) {
  const pageName = environment.pageName;
  return title ? `${title} - ${pageName}` : pageName;
}
