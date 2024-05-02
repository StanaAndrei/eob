import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
    constructor(private formBuilder: FormBuilder) {}


    registerForm = this.formBuilder.group({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    register() {
        const val = this.registerForm.value;
        if (val.password !== val.confirmPassword) {
            return alert('passwords must match')
        }
    }
}
