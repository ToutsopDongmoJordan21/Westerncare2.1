import { Component, OnInit } from '@angular/core';
import { faAlignLeft, faUsers, faUserCheck,  faUserGear, faArrowLeftLong} from '@fortawesome/free-solid-svg-icons';

// Importing components to use for Switching among
import { AddNewComponent } from './Details/add-new/add-new.component';
import { ClientDetailComponent } from './Details/client-detail/client-detail.component';
import { ListComponent } from './Details/list/list.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {

  faHamburger = faAlignLeft

  newClient = faUsers
  newUser = faUserCheck
  updateProfile = faUserGear
  logOut = faArrowLeftLong

  // variables
  list = "list"
  add_new = "add new"
  custommer_details = "custommer details"

  // Variable stores default component used for primary view.
  componentSwitcher: any = AddNewComponent;

  bestWestern = "../assets/Images/index3.png"

  user_name = "Kamga Jean Louis"
  user_profile_picture = "../assets/Images/px1.jpg"
  
  constructor() { }

  onCLick(component: any){
  	switch(component){
  		case 'list' : this.componentSwitcher = ListComponent;
  			break;
		  case 'add_new' : this.componentSwitcher = AddNewComponent;
			  break;
		  case 'custommer_details' : this.componentSwitcher = ClientDetailComponent;
			  break;
		  default : this.componentSwitcher = ClientsComponent;
			  break;
  	}
  }

  ngOnInit(): void {
  }
}
