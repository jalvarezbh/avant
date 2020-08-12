import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message/message.service';
import { LoginService } from 'src/app/core/services/login/login.service';
import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';
import { getPhoneMask } from 'src/app/shared/util/util';
import { UsuarioModel } from 'src/app/core/models';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {
    usuario: UsuarioModel;
    dadosForm: FormGroup;
    submitted = false;
    telefoneCode: string;
    telefonemask: any[];
    celularCode: string;
    celularmask: any[];
    inicialTelMask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    inicialCelMask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private messageService: MessageService,
        private usuarioService: UsuarioService) {

        this.dadosForm = this.formBuilder.group({
            id: ['', ''],
            nome: ['', Validators.required],
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            cpf: ['', Validators.required],
            telefone: ['', ''],
            celular: ['', Validators.required],
            senha: ['', Validators.required],
            confirmar: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.telefoneCode = '+55';
        this.telefonemask = this.inicialTelMask;
        this.celularCode = '+55';
        this.celularmask = this.inicialCelMask;
    }

    public clickGravar(): void {
        this.submitted = true;
        if (this.dadosForm.valid) {
            if (this.dadosForm.value.senha !== this.dadosForm.value.confirmar) {
                this.messageService.exibirErro('O Campo Senha tem que ser igual ao Confirmar Senha!');
                return;
            }

            this.dadosForm.controls.telefone.setValue(this.telefoneCode + this.dadosForm.value.telefone);
            this.dadosForm.controls.celular.setValue(this.celularCode + this.dadosForm.value.celular);
            this.usuarioService.setInserirUsuario(this.dadosForm.value).subscribe(reg => {
                this.messageService.exibirSucesso('Cadastro realizado com sucesso! Realize o login.');
                this.router.navigateByUrl('login');
            });
        }
    }

    onCountryChangePhone(e: any, id: string) {
        this.telefonemask = getPhoneMask(e, true, id);
        this.telefoneCode = e.dialCode;
    }

    onCountryChangeCel(e: any, id: string) {
        this.celularmask = getPhoneMask(e, false, id);
        this.celularCode = e.dialCode;
    }
}
