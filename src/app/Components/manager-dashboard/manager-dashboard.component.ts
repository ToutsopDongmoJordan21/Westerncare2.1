import { Component, OnInit } from '@angular/core';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { faUserGear } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

// Importing components to use for Switching among
import { ClientsComponent } from '../manager-details/clients/clients.component';
import { ProfileMgComponent } from '../manager-details/profile-mg/profile-mg.component';
import { UsersMgComponent } from '../manager-details/users-mg/users-mg.component';
import { FirebaseService } from '../_services/firebase.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  faHamburger = faAlignLeft

  newClient = faUsers
  newUser = faUserCheck
  updateProfile = faUserGear
  logOut = faArrowLeftLong

  currentUser: any;

  // variables
  Client = "Client"
  personnel = "Personnel"
  user_profile = "Profile"

  // Variable stores default component used for primary view.
  componentSwitcher: any = ClientsComponent;

  bestWestern = "../assets/Images/index3.png"
/* 
  user_name = "Kamga Jean Louis"
  user_profile_picture = "../assets/Images/px1.jpg" */
  
  constructor(private firebase: FirebaseService,
              private token: TokenStorageService) { }

  onCLick(component: any){
  	switch(component){
  		case 'Client' : this.componentSwitcher = ClientsComponent;
  			break;
		  case 'personnel' : this.componentSwitcher = UsersMgComponent;
			  break;
		  case 'user_profile' : this.componentSwitcher = ProfileMgComponent;
			  break;
		  default : this.componentSwitcher = ClientsComponent;
			  break;
  	}
  }

  ngOnInit(){
    this.currentUser = this.token.getUser();
  }

  logout() {
    this.firebase.logOut();

  }
}
