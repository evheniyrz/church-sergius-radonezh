import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  public registerForm: FormGroup;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.registerForm = this.fb.group(
      {
        email: this.fb.control('', { validators: Validators.required }),
        password: this.fb.control('', { validators: Validators.required }),
        role: this.fb.control('admin')
      }
    );
  }

  ngOnInit(): void {
  }

  public checkUser(): void {
    if (null != this.registerForm && this.registerForm.valid) {
      this.httpClient.post('users', this.registerForm.value).subscribe();
    }
  }

}
