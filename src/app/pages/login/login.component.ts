import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login/login.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  recovery = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loginService.setUserLogout();
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  login(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loginService.setValidarLogin(this.loginForm.value).subscribe(model => {
        this.router.navigateByUrl('home');
      }, error => {
        this.messageService.exibirErro(error);
      });
    }
  }

  esqueceuSenha(): void {    
    if (this.loginForm.value.email !== '') {
      this.loginService.getEnviarEmailLembrarSenha(this.loginForm.value.email).then(() => {
        this.messageService.exibirAlerta('Foi enviado um e-mail para redefinir a senha.');
      });
    }
  }
}
