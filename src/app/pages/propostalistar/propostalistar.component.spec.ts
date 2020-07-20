import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PropostaListarComponent } from './propostalistar.component';
describe('PropostaListarComponent', () => {
    let component: PropostaListarComponent;
    let fixture: ComponentFixture<PropostaListarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PropostaListarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PropostaListarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
