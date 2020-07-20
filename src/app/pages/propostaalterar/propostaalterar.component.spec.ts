import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PropostaAlterarComponent } from './propostaalterar.component';
describe('PropostaAlterarComponent', () => {
    let component: PropostaAlterarComponent;
    let fixture: ComponentFixture<PropostaAlterarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PropostaAlterarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PropostaAlterarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
