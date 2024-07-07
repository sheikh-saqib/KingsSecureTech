import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorsService {
  constructor(private router: Router) {}

  redirectToErrorPage(): void {
    this.router.navigateByUrl('/error');
  }
}
