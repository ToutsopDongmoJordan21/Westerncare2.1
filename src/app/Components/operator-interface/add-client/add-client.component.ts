import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { FirebaseService } from '../../_services/firebase.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  sexe : any[] = [
    {id: 1, name: "Masculin"},
    {id: 2, name: "Feminin"}
  ];

  statut : any[] = [
    {id: 1, name: "Marié" },
    {id: 2, name: "Célibataire"},
    {id: 3, name: "Veuve"},
    {id: 4, name: "Divorcé"},
    {id: 5, name: "Autres"}
  ];

  type: any[] = [
    {id: 1, name: "Individuel"}, 
    {id: 2, name: "Groupe"},
    {id: 3, name: "OTA"},
    {id: 4, name: "Autres"}
  ];

  continent: any[] = [
    {id: 1, name: "Afrique"},
    {id: 2, name: "Amerique"},
    {id: 3, name: "Asie"},
    {id: 4, name: "Europe"},
    {id: 5, name: "Oceanie"}
  ];

  categories: any[] = [
    {id: 1, name: "Normal"},
    {id: 2, name: "Star"},
    {id: 3, name: "Elite"}
  ];

  service : any[] = [
    {id: 1, name: "Mariage"},
    {id: 2, name: "Reception"},
    {id: 3, name: "Autres"}
  ]

  typeService : any[] = [
    {id: 1, name: "Hebergement"},
    {id: 2, name: "B"},
    {id: 3, name: "C"},
    {id: 4, name: "D"}
  ]

  bestWestern = '../assets/Images/index3.png';

  registrationForm!: FormGroup;

  fileIsUploading = false;
  fileUploaded = false;

  selectedFile!: File;

  fb: any;

  downloadURL!: Observable<string>;
  
  url?: string;

  get nameControl() {
    return this.registrationForm.get('name') as FormControl;
  }
  get usernameControl() {
     return this.registrationForm.get('username') as FormControl;
   }
  get professionControl() {
    return this.registrationForm.get('profession') as FormControl;
  }
 get emailControl() {
     return this.registrationForm.get('email') as FormControl;
   }
  get phoneControl() {
     return this.registrationForm.get('phone') as FormControl;
   }
   get createControl() {
     return this.registrationForm.get('createBy') as FormControl;
   }
   get dateControl() {
     return this.registrationForm.get('dates') as FormControl;
   }
   get nationalityControl() {
    return this.registrationForm.get('nationality') as FormControl;
   }
   get langueControl() {
    return this.registrationForm.get('langue') as FormControl;
   }
  get villeControl() {
    return this.registrationForm.get('ville') as FormControl;
  }
  get paysControl() {
    return this.registrationForm.get('pays') as FormControl;
  }
  get addedDateControl() {
    return this.registrationForm.get('addedDate') as FormControl;
  }
  
  constructor( private firebaseService: FirebaseService,
              private formBuilder: FormBuilder,
              public router: Router,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      profession: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(4)]],
      createBy: ['', [Validators.required, Validators.minLength(4)]],
      dates: ['', [Validators.required, Validators.minLength]],
      nationality: ['', [Validators.required, Validators.minLength(3)]],
      sexe: ['', [Validators.required, Validators.minLength]],
      ville: ['', [Validators.required, Validators.minLength(3)]],
      pays: ['', [Validators.required, Validators.minLength(3)]],
      continent: ['', [Validators.required, Validators.minLength(3)]],
      categories: ['', [Validators.required, Validators.minLength]],
      service: ['', [Validators.required, Validators.minLength]],
      statut: ['', [Validators.required, Validators.minLength]],
      typeClient: ['', [Validators.required, Validators.minLength]],
      langue: ['', [Validators.required, Validators.minLength(3)]],
      typeService: ['', [Validators.required, Validators.minLength]],
   
    });
  }

  onFileSelected(event: any) {
    let n = Date.now();
    const file = event.target.files[0];
    const filePath = `WesternCare/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`WesternCare/${n}`, file);
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
    const name = this.registrationForm.get('name')!.value;
    const username = this.registrationForm.get('username')!.value;
    const profession = this.registrationForm.get('profession')!.value;
    const email = this.registrationForm.get('email')!.value;
    const phone = this.registrationForm.get('phone')!.value;
    const createBy = this.registrationForm.get('createBy')!.value;
    const dates = this.registrationForm.get('dates')!.value;
    const nationality = this.registrationForm.get('nationality')!.value;
    const sexe = this.registrationForm.get('sexe')!.value;
    const ville = this.registrationForm.get('ville')!.value;
    const pays = this.registrationForm.get('pays')!.value;
    const continent = this.registrationForm.get('continent')!.value;
    const categories = this.registrationForm.get('categories')!.value;
    const service = this.registrationForm.get('service')!.value;
    const statut = this.registrationForm.get('statut')!.value;
    const addedDate = new Date();
    const typeClient = this.registrationForm.get('typeClient')!.value;
    const langue = this.registrationForm.get('langue')!.value;
    const typeService = this.registrationForm.get('typeService')!.value;


    console.log(this.fb);

    if(this.fb && this.fb !== '') {
      const imageUrl = this.fb;
      console.log('l\'url est' + imageUrl);

      this.firebaseService.createClient(name,username,profession,email,
                                        phone,createBy,dates,nationality,imageUrl,
                                        sexe,ville,pays,continent,categories,
                                        service,statut,addedDate,typeClient,
                                        langue,typeService);

      console.log(this.firebaseService.createClient);
      alert('Le client a été créer avec success');
      this.registrationForm.reset();
    } else {
      alert ('Erreur de fichier uploadé!! réessayer plus tard ou probléme de connexion!!')
    } 
   
  }

  

}
