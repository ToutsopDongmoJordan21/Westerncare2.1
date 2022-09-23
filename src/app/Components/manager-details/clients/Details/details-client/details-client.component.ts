import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { faAlignLeft, faUsers, faUserCheck, faUserGear, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { Client } from 'src/app/Components/_model/client';
import { FirebaseService } from 'src/app/Components/_services/firebase.service';
import { TokenStorageService } from 'src/app/Components/_services/token-storage.service';
import { ProfileMgComponent } from '../../../profile-mg/profile-mg.component';
import { UsersMgComponent } from '../../../users-mg/users-mg.component';
import { ClientsComponent } from '../../clients.component';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {

  faHamburger = faAlignLeft

  id!: string;

  clients!: Client;

  currentClient: any;


  comments!: Array<number>;

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
  
  constructor(private firebase: FirebaseService,
              private token: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute,
              ) { }


  async ngOnInit(): Promise<void>{

    const id = this.route.snapshot.paramMap.get('id');

    this.currentUser = this.token.getUser();

    this.clients = new Client();

      this.firebase.getClientInfos(id!)
        .subscribe(client => {
          this.token.saveClient(client);
          this.clients = client;
        });

    this.currentClient = this.token.getClient();


  }

  go() {
    if(this.currentUser.role == "admin") {
      this.router.navigate(['manager']);
    } else {
      this.router.navigate(['operator']);
    }
  }

  logout() {
    this.firebase.logOut();

  }
}
