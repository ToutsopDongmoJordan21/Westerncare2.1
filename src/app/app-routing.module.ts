import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { ManagerDashboardComponent } from './Components/manager-dashboard/manager-dashboard.component';
import { OperatorInterfaceComponent } from './Components/operator-interface/operator-interface.component';

// Child Routes
import { ClientsComponent } from './Components/manager-details/clients/clients.component';
import { ProfileMgComponent } from './Components/manager-details/profile-mg/profile-mg.component';
import { UsersMgComponent } from './Components/manager-details/users-mg/users-mg.component';
import { EditUserComponent } from './Components/manager-details/clients/edit-user/edit-user.component';
import { AddClientComponent } from './Components/operator-interface/add-client/add-client.component';
import { ListComponent } from './Components/manager-details/clients/Details/list/list.component';
import { DetailsClientComponent } from './Components/manager-details/clients/Details/details-client/details-client.component';

const routes: Routes = [
  {
    path : 'home',
    title: 'Login Page', // Setting up the title for browser history
    component : LoginFormComponent
  },
  {
    path : 'manager',
    title: 'Manager', // Setting up the title for browser history
    component : ManagerDashboardComponent
  },
  {
    path : 'manager/client',
    title: 'clients by manager', 
    component : ClientsComponent
  },
  {
    path : 'manager/profile',
    title: 'manager profile', 
    component : ProfileMgComponent
  },
  {
    path : 'manager/user',
    title: 'user profile', 
    component : UsersMgComponent
  },
    
  {
    path : 'operator',
    title: 'Operator', // Setting up the title for browser history
    component : OperatorInterfaceComponent
  },
    
  {
    path : 'operator/client',
    title: 'client', 
    component : ClientsComponent
  },
  {
    path : 'operator/profile',
    title: 'user profile', 
    component : ProfileMgComponent
  },
    
  {
    path: '',
    redirectTo : '/home',
    pathMatch: 'full'
  },
  /* {
    path : '**',
    redirectTo : '/home',
    pathMatch : 'full'
  }, */
  {
    path: 'update-user/:id', 
    title: 'edit user',
    component: EditUserComponent
  },
   {
    path: 'operator/add-client', 
    title: 'edit client',
    component: AddClientComponent
  },
   {
    path: 'detailsClient/:id', 
    title: 'user details',
    component: DetailsClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [ClientsComponent,
                                ProfileMgComponent,
                                UsersMgComponent]
