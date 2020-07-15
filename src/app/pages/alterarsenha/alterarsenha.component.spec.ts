import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlterarSenhaComponent } from './alterarsenha.component';
describe('AlterarSenhaComponent', () => {
    let component: AlterarSenhaComponent;
    let fixture: ComponentFixture<AlterarSenhaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AlterarSenhaComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlterarSenhaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
