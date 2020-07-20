import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PropostaPendenteComponent } from './propostapendente.component';
describe('PropostaPendenteComponent', () => {
    let component: PropostaPendenteComponent;
    let fixture: ComponentFixture<PropostaPendenteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PropostaPendenteComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PropostaPendenteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
