import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message/message.service';
import { LoginService } from 'src/app/core/services/login/login.service';
import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';

@Component({
    selector: 'app-alterarsenha',
    templateUrl: './alterarsenha.component.html'
})

export class AlterarSenhaComponent implements OnInit {
    dadosForm: FormGroup;
    submitted = false;
    hideatual = true;
    hidenova = true;
    hiderepetir = true;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private loginService: LoginService,
        private usuarioService: UsuarioService) {

        this.dadosForm = this.formBuilder.group({
            id: ['', ''],
            senhaatual: ['', Validators.required],
            senhanova: ['', Validators.required],
            senharepetir: ['', Validators.required]
        });
    }

    ngOnInit() {
        if (this.loginService.getUserLogon()) {
            this.getValues();
        } else {
            this.router.navigateByUrl('login');
        }
    }

    private getValues() {
        this.dadosForm = this.formBuilder.group({
            id: [this.loginService.getUserLogin().id, ''],
            senhaatual: ['', Validators.required],
            senhanova: ['', Validators.required],
            senharepetir: ['', Validators.required]
        });
    }

    public clickGravar(): void {
        this.submitted = true;
        if (this.dadosForm.valid) {
            this.usuarioService.setAlterarSenhaUsuario(this.dadosForm.value).subscribe(() => {
                this.messageService.exibirSucesso('Dados alterados com sucesso!');
                this.submitted = false;
                this.getValues();
            });
        }
    }
}
