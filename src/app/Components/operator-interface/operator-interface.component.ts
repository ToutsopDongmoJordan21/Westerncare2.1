import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAlignLeft, faArrowLeftLong, faUserCheck, faUserGear, faUsers } from '@fortawesome/free-solid-svg-icons';

// Importing components to use for Switching among
import { ClientsComponent } from '../manager-details/clients/clients.component';
import { ProfileMgComponent } from '../manager-details/profile-mg/profile-mg.component';
import { Client } from '../_model/client';
import { User } from '../_model/user';
import { FirebaseService } from '../_services/firebase.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-operator-interface',
  templateUrl: './operator-interface.component.html',
  styleUrls: ['./operator-interface.component.css']
})
export class OperatorInterfaceComponent implements OnInit {

  users: User[] = [];
  clients: Client[] = [];

  currentUser: any;
  
  faHamburger = faAlignLeft

  newClient = faUsers
  addClient = faUsers
  newUser = faUserCheck
  updateProfile = faUserGear
  logOut = faArrowLeftLong

  // variables
  Client = "Client"
  Clients = "Add Client"
  user_profile = "Profile"

  // Variable stores default component used for primary view.
  componentSwitcher: any = ClientsComponent;

  bestWestern = "../assets/Images/index3.png"

  constructor(private firebaseService: FirebaseService,
              private router: Router,
              private token: TokenStorageService ) { }

  onCLick(component: any){
  	switch(component){
  		case 'Client' : this.componentSwitcher = ClientsComponent;
  			break;
		  case 'user_profile' : this.componentSwitcher = ProfileMgComponent;
			  break;
		  default : this.componentSwitcher = ClientsComponent;
			  break;
  	}
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
  }

  logout() {
    this.firebaseService.logOut();
  }


}
