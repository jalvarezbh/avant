import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/core/services/message/message.service';
import { UsuarioService } from 'src/app/core/services/usuario/usuario.service';

@Component({
    selector: 'app-redefinirsenha',
    templateUrl: './redefinirsenha.component.html',
    styleUrls: ['./redefinirsenha.component.css']
})

export class RedefinirSenhaComponent implements OnInit {
    dadosForm: FormGroup;
    submitted = false;
    hideatual = true;
    hidenova = true;
    hiderepetir = true;
    key: any;
    token: any;
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activedRoute: ActivatedRoute,
        private messageService: MessageService,
        private usuarioService: UsuarioService) {

        this.dadosForm = this.formBuilder.group({
            id: ['', ''],
            senhaatual: ['', ''],
            senhanova: ['', Validators.required],
            senharepetir: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.key = this.activedRoute.snapshot.queryParams.key;
        this.token = this.activedRoute.snapshot.queryParams.token;
        if (this.token === null || this.token === undefined) {
            this.messageService.exibirErro(null, 'Token inválido!');
            this.router.navigateByUrl('login');
        }
    }


    public clickGravar(): void {
        this.submitted = true;
        if (this.dadosForm.valid) {
            this.dadosForm.controls.id.setValue(this.key);
            this.dadosForm.controls.senhaatual.setValue(this.token);
            this.usuarioService.setAlterarSenhaUsuarioToken(this.dadosForm.value).subscribe(() => {
                this.messageService.exibirSucesso('Dados alterados com sucesso!');
                this.router.navigateByUrl('login');
            });
        }
    }
}
