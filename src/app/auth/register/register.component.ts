import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor( private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  createUser(){
    if(this.registerForm.invalid) return;
    Swal.fire({
      title: 'Creating user...',
      didOpen: () => {
        Swal.showLoading()
      }
    });
    const { name, email, password } = this.registerForm.value;
    this.auth.createUser(name, email, password)
      .then ( credentials => {
        console.log(credentials);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch(err => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      }));
  }

}
