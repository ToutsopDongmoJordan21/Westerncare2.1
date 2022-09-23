import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { FirebaseService } from './Components/_services/firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private firebaseService: FirebaseService){}
  
    userStatus = this.firebaseService.userStatus;

     ngOnInit(){
    //this.firebaseService.userChanges();

    this.firebaseService.userStatusChanges.subscribe(x => this.userStatus = x);
    console.log(this.userStatus)
  }

}
