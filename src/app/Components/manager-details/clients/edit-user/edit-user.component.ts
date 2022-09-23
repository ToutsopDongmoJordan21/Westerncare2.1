import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Components/_model/user';
import { FirebaseService } from 'src/app/Components/_services/firebase.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public editForm!: FormGroup;
  userRef: any;
  user!: User;

  constructor(
    public fireservice: FirebaseService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group ({
      username: [''],
      email: [{ value: '', disabled:true}],
      postes: [''],
      phone: [''],
      password: [{value: '', disabled:true}],
    })
   }

  ngOnInit(): void {
    const id = this.act.snapshot.paramMap.get('id');
    console.log(id);
     console.log('userdezze', this.userRef);

    this.fireservice.getUserId(id!).subscribe(res => {
      this.userRef = res;
      this.editForm = this.formBuilder.group({
        username: [this.userRef.username],
        email: [this.userRef.email],
        postes:[this.userRef.postes],
        phone:[this.userRef.phone],
        password: [this.userRef.password],
      });
    });
  }

  onSubmit() {
    const id = this.act.snapshot.paramMap.get('id');

    this.fireservice.updateUser(this.editForm.value, id!)
    this.router.navigate(['manager']);
  }

}