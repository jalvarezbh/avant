import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/core/services/message/message.service';
import { LoginService } from 'src/app/core/services/login/login.service';
import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';
import { getPhoneMask } from 'src/app/shared/util/util';
import { UsuarioModel } from 'src/app/core/models';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html'
})

export class UsuarioComponent implements OnInit {
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
        private loginService: LoginService,
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
            celular: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.telefoneCode = '+55';
        this.telefonemask = this.inicialTelMask;
        this.celularCode = '+55';
        this.celularmask = this.inicialCelMask;

        if (this.loginService.getUserLogon()) {
            this.usuarioService.getBuscarUsuario()
                .then(res => {
                    this.usuario = new UsuarioModel(res);
                    this.getValues(true);
                    Promise.resolve();
                }, error => {
                    this.messageService.exibirErro(error);
                    this.getValues(false);
                    Promise.resolve();
                });
        }
        else {
            this.router.navigateByUrl('login');
        }
    }

    private getValues(dados: boolean) {
        if (dados) {
            const intlphone = (window as any).intlTelInputGlobals.getInstance(document.getElementById('telefone'));
            intlphone.setNumber('+' + this.usuario.telefone);
            const intlcel = (window as any).intlTelInputGlobals.getInstance(document.getElementById('celular'));
            intlcel.setNumber('+' + this.usuario.celular);
            const telefone = this.usuario.telefone.substring(intlphone.s.dialCode.length);
            const celular = this.usuario.celular.substring(intlcel.s.dialCode.length);

            this.dadosForm = this.formBuilder.group({
                id: [this.usuario.id, ''],
                nome: [this.usuario.nome, Validators.required],
                email: [this.usuario.email, Validators.compose([
                    Validators.required,
                    Validators.email
                ])],
                cpf: [this.usuario.cpf, Validators.required],
                telefone: [telefone, ''],
                celular: [celular, Validators.required]
            });
        }
    }

    public clickGravar(): void {
        this.submitted = true;
        if (this.dadosForm.valid) {
            this.dadosForm.controls.telefone.setValue(this.telefoneCode + this.dadosForm.value.telefone);
            this.dadosForm.controls.celular.setValue(this.celularCode + this.dadosForm.value.celular);
            this.usuarioService.setAlterarUsuario(this.dadosForm.value).subscribe(reg => {
                this.usuario = new UsuarioModel(reg);
                this.getValues(true);
                this.messageService.exibirSucesso('Dados alterados com sucesso!');
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
