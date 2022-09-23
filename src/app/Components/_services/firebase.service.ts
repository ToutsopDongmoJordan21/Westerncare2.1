import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firestore } from 'firebase-admin';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client } from '../_model/client';
import { User } from '../_model/user';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  usersRef!: AngularFirestoreCollection<User>

  constructor(private ngZone: NgZone, private afAuth: AngularFireAuth, 
            private firestore: AngularFirestore , 
            private router: Router,
            private storage: AngularFireStorage,
            private tokenStorage: TokenStorageService) { }

  public currentUser: any;
  public userStatus!: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);

    

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  signUp (username: string, postes: string, email: string, password: string, 
          phone: string, createBy: string, date: Date, imageUrl: string) {

    this.afAuth.createUserWithEmailAndPassword(email, password)
       .then((userResponse) => {
        // add the user to the "users" database
        let user = {
          id: userResponse.user!.uid,
          email: userResponse.user!.email,
          username,
          postes,
          password,
          phone,
          createBy,
          date,
          imageUrl,
          role: "user",
        }

        // add the user to the database
        this.firestore.collection("users").add(user)
        .then(user => {
          user.get().then(x => {
            //return the user data
            console.log(x.data());
            this.currentUser = x.data();
            this.setUserStatus(this.currentUser);
            this.router.navigate(["/manager"]);
          })
        }).catch (err => {
          alert('Erreur lors de la création d\'un utilisateur!! réessyer plus tard...');
          console.log(err);
        })

      }) .catch((err)=> {
        console.log("An error occured: ", err);
      }) 
  }

  login(email: string, password: string) {
      
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user)=>{
        this.firestore.collection("users").ref.where("email", "==", user.user!.email)
          .onSnapshot(snap =>{
            console.log(user);
            snap.forEach(userRef => {
              console.log("userRef", userRef.data());
              this.currentUser = userRef.data();
              this.tokenStorage.saveUser(userRef.data());
              //setUserStatus  


              //j'ai changé je dois venir vérifier plus tard
              this.setUserStatus(this.currentUser)
              console.log("gehehejejejejejej", this.currentUser.role);
              if(this.currentUser.role == "admin") {
                console.log("Admin connected");
                this.router.navigate(['manager']);
                alert( this.currentUser.username  + 'Admin connected');
              }else{
                console.log("User connected");
                this.router.navigate(['operator']);
                alert(this.currentUser.username   +  'is connected');
              }
            })
        })
      }).catch(err => err)
  }

  logOut(){
    this.afAuth.signOut()
    .then(()=>{
      console.log("user signed Out successfully");
      //set current user to null to be logged out
      this.currentUser = null;
      //set the listenener to be null, for the UI to react
      this.setUserStatus(null);
      this.ngZone.run(() => this.router.navigate(["/"]));

    }).catch((err) => {
      console.log(err);
    })
  }

  getAllUsers() {
    return this.firestore
      .collection("clients")
      .snapshotChanges();
  }


  getData() {
    return this.firestore
      .collection("users")
      .snapshotChanges();
  } 

  updateUser(user: User, id: string) {

    const  doc = this.firestore.collection('users').ref.where('id','==', id).get();

    return doc.then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.update({
          username: user.username,
          email: user.email,
          postes: user.postes,
          phone: user.phone,
          password: user.password,
        });
      });
    });
  }


  deleteUser(user: any) {
    const  doc = this.firestore.collection('users').ref.where('id','==', user.id).get();
    return doc.then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
  }

  deleteClient(client: any) {
    const  doc = this.firestore.collection('clients').ref.where('id','==', client.id).get();
    return doc.then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        doc.ref.delete();
      });
    });
  }

   deleteClients(id: string) {
    const itemDoc = this.firestore.doc<any>('clients/' +id);
    return itemDoc.delete();
  }

  getUserId(id: string) {
    return this.firestore
        .collection('users')
        .doc(id)
        .valueChanges();
  }

  getUserInfo(id: string) {
    return this.firestore.collection(`users/${id}`)
      .snapshotChanges();

  }

  getClientInfo(id: string) {
    return this.firestore
      .collection('clients')
      .doc(id)
      .snapshotChanges();
  }

  getClientInfos(id: string) {
    const itemDoc = this.firestore.doc<any>('clients/' +id);
    return itemDoc.valueChanges();
  }

  createUser(user: User) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('users')
        .add(user)
        .then(response => {
          console.log(response)
        }, error => reject(error));
    });
  }

  createClient(name: string, username: string, profession: string,phone: string,
               email: string, createBy: string,
              dates: Date, nationality: string, sexe: string,
              imageUrl: string, ville:string, pays: string, 
              continent: string, categories: string, service: string,
              statut: string, addedDate: Date, typeClient: string,
              langue: string, typeService: string
              ) {
      let client = {
        name, username, profession, phone, email, createBy, 
        dates, nationality, sexe, imageUrl, ville, pays, continent, 
        categories, service, statut, addedDate, typeClient, langue,
        typeService
      }
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('clients')
        .add(client)
        .then(response => {
          console.log(response)
          console.log(client);
        }, error => reject(error));
    });
  }

  getcurrentUserId() {
    return this.afAuth.authState;
  }




}



