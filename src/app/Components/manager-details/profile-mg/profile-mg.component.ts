import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-profile-mg',
  templateUrl: './profile-mg.component.html',
  styleUrls: ['./profile-mg.component.css']
})
export class ProfileMgComponent implements OnInit {

  currentUser: any;

  constructor( private token: TokenStorageService) {
                              }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log(this.currentUser);
  }

}
