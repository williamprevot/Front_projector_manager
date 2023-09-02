import { CanActivateFn } from '@angular/router';

export const resolveGuard: CanActivateFn = (route, state) => {
  return true;
};
