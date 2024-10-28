import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  let router: Router = new Router();
  const loggedUser = localStorage.getItem('user');
  if (loggedUser) {
    const user = JSON.parse(loggedUser);
    if (user.role === 'Vendor') {
      return true;
    }
  }
  router.navigate(['/search']);
  return false;
};
