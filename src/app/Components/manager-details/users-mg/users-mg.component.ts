import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, finalize } from 'rxjs';
import { FirebaseService } from '../../_services/firebase.service';
import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-users-mg',
  templateUrl: './users-mg.component.html',
  styleUrls: ['./users-mg.component.css']
})
export class UsersMgComponent implements OnInit {

  clientImg = "./assets/Images/px1.jpg"

  currentUser: any;

  signUpForm!: FormGroup;

  fb: any;

  downloadURL!: Observable<string>;
  
  url?: string;

  get usernameControl() {
     return this.signUpForm.get('username') as FormControl;
   }
 get passwordControl() {
     return this.signUpForm.get('password') as FormControl;
   }
   get postesControl() {
     return this.signUpForm.get('postes') as FormControl;
   }
 get emailControl() {
     return this.signUpForm.get('email') as FormControl;
   }
  get phoneControl() {
     return this.signUpForm.get('phone') as FormControl;
   }
  get dateControl() {
     return this.signUpForm.get('date') as FormControl;
   }

  constructor(private firebaseService: FirebaseService,
              private formBuilder: FormBuilder,
              private storage: AngularFireStorage,
              private token: TokenStorageService) { }

  ngOnInit() {
    this.initForm();
    this.currentUser = this.token.getUser();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
       email: ['', [Validators.required, Validators.email]],
       postes: ['', [Validators.required, Validators.minLength(3)]],
       phone: ['', [Validators.required, Validators.minLength(5)]],
       password: ['', [Validators.required, Validators.minLength(4)]],
       date: ['', [Validators.required, Validators.minLength]],
    });
  }

  onFileSelected(event: any) {
    let n = Date.now();
    const file = event.target.files[0];
    const filePath = `WesternCare_Client/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`WesternCare_Client/${n}`, file);
    task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log( url);
        }
      });
  }

  onSubmit() {
    const username = this.signUpForm.get('username')!.value;
    const postes = this.signUpForm.get('postes')!.value;
    const email = this.signUpForm.get('email')!.value;
    const phone = this.signUpForm.get('phone')!.value;
    const password = this.signUpForm.get('password')!.value;
    const createBy = this.currentUser.username;
    const date = this.signUpForm.get('date')!.value;

    console.log(this.fb);

    if(this.fb && this.fb !== '') {
      const imageUrl = this.fb;
      console.log('l\'url est' + imageUrl);

      this.firebaseService.signUp(username,postes,email,phone,password,createBy,date,imageUrl);
      alert('L\'utilisateur à été créer avec success');
      this.signUpForm.reset();
      } else {
      alert ('Erreur de fichier uploadé!! réessayer plus tard ou probléme de connexion!!')
    } 
  }

}

