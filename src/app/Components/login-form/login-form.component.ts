import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../_services/firebase.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  bestWestern = '../assets/Images/index3.png'

  constructor(private firebaseService: FirebaseService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  loginForm!: FormGroup;


  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
             email: ['', [Validators.required, Validators.email]],
             password: ['', [Validators.required, Validators.minLength(2)]],

    });
  }

  login() {
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;
    this.firebaseService.login(email, password);
    this.loginForm.reset();
  }


}
