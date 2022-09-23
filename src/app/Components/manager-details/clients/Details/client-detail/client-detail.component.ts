import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Components/_model/user';
import { FirebaseService } from 'src/app/Components/_services/firebase.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  users: User[] = [];
  
  constructor(private firebaseServie: FirebaseService) { }

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    this.firebaseServie.getData()
        .subscribe(data  => {
          this.users = data.map(e => {
            return {
              id: e.payload.doc.id,
              ...e.payload.doc.data() as {}
            } as User;

          });
        } );
  }

  deleteUser(user: User) {
    if(confirm("Are you sure to delete " + user.username) == true) {
      console.log(user.id);
      this.firebaseServie.deleteUser(user);
     console.log('user deleted succesfuly');
    } else {
      console.log('erreur!!!');
    }
  }

}
