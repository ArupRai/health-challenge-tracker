// user-management.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-management',
  template: `
    <app-user-form></app-user-form>
    <app-user-list></app-user-list>
  `,
})
export class UserManagementComponent {}
