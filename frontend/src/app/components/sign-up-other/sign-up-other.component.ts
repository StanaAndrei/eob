import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up-other',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './sign-up-other.component.html',
  styleUrl: './sign-up-other.component.css'
})
export class SignUpOtherComponent {
    constructor(private formBuilder: FormBuilder) {}

    registerOtherForm = this.formBuilder.group({
        name: '',
        email: '',
    })

    registerOther() {
        const val = this.registerOtherForm.value;
    }
}
