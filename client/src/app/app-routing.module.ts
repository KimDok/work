import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { SalesDetailsComponent } from './sales-details/sales-details.component';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { EditSalesComponent } from './edit-sales/edit-sales.component';
import { PlotlyComponent } from './plotly/plotly.component';
import { Plotly2Component } from './plotly2/plotly2.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'sales',
    component: SalesComponent,
    data: { title: 'List of Sales' }
  },
  {
    path: 'sales-details/:id',
    component: SalesDetailsComponent,
    data: { title: 'Sales Details' }
  },
  {
    path: 'add-sales',
    component: AddSalesComponent,
    data: { title: 'Add Sales' }
  },
  {
    path: 'edit-sales/:id',
    component: EditSalesComponent,
    data: { title: 'Edit Sales' }
  },
  {
    path: 'plotly',
    component: PlotlyComponent,
    data: { title: 'Plotly' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home page' }
  },
  { path: '',
    redirectTo: '/sales',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
