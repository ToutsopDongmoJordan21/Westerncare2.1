import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { ManagerDashboardComponent } from './Components/manager-dashboard/manager-dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Sub Links
import { ClientsComponent } from './Components/manager-details/clients/clients.component';
import { UsersMgComponent } from './Components/manager-details/users-mg/users-mg.component';
import { ProfileMgComponent } from './Components/manager-details/profile-mg/profile-mg.component';
import { LogOutMgComponent } from './Components/manager-details/log-out-mg/log-out-mg.component';
import { OperatorInterfaceComponent } from './Components/operator-interface/operator-interface.component';

// Mini-Sub Links for Clients
import { ListComponent } from './Components/manager-details/clients/Details/list/list.component';
import { AddNewComponent } from './Components/manager-details/clients/Details/add-new/add-new.component';
import { ClientDetailComponent } from './Components/manager-details/clients/Details/client-detail/client-detail.component';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';

// Angular Material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from     '@angular/material/form-field';
 import { MatCardModule } from '@angular/material/card';
 import { MatCommonModule } from '@angular/material/core';
 import { MatButtonModule } from '@angular/material/button';
 import { MatInputModule } from '@angular/material/input';
 import { MatToolbarModule } from '@angular/material/toolbar';
 import { MatIconModule } from '@angular/material/icon';
 import { MatSnackBarModule } from '@angular/material/snack-bar';
 
// FireBase
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";


import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { EditUserComponent } from './Components/manager-details/clients/edit-user/edit-user.component';
import { FirebaseService } from './Components/_services/firebase.service';
import { AddClientComponent } from './Components/operator-interface/add-client/add-client.component';
import { DetailsClientComponent } from './Components/manager-details/clients/Details/details-client/details-client.component';

// Routing
// import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,

    // Main Components
    LoginFormComponent,
    ManagerDashboardComponent,
    OperatorInterfaceComponent,

    // Sub Components
    ClientsComponent,
    UsersMgComponent,
    ProfileMgComponent,
    LogOutMgComponent,

    // 
    ListComponent,
    AddNewComponent,
    ClientDetailComponent,
    EditUserComponent,
    AddClientComponent,
    DetailsClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,

    // Font Awesome Dependency
    FontAwesomeModule,

    // Angular Material
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    AngularFireStorageModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatCommonModule,
     MatButtonModule,
     MatInputModule,
     MatToolbarModule,
     MatIconModule,
     MatSnackBarModule,
     MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,

     AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    
 
  ],
  entryComponents: [ ClientsComponent,
                     UsersMgComponent,
                     ProfileMgComponent
                  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }