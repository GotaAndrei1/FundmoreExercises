import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { OrdersListComponent } from './app/orders-list/orders-list.component';
import { OrderAddComponent } from './app/order-add/order-add.component';
import { OrderUpdateComponent } from './app/order-update/order-update.component';
import { OrderDeleteComponent } from './app/order-delete/order-delete.component';

const routes: Routes = [
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: 'orders', component: OrdersListComponent },
  { path: 'add-order', component: OrderAddComponent },
  { path: 'update-order/:id', component: OrderUpdateComponent },
  { path: 'delete-order/:id', component: OrderDeleteComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
  ],
}).catch(err => console.error(err));
