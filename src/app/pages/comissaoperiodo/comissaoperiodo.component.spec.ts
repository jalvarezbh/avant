import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComissaoPeriodoComponent } from './comissaoperiodo.component';
describe('ComissaoPeriodoComponent', () => {
    let component: ComissaoPeriodoComponent;
    let fixture: ComponentFixture<ComissaoPeriodoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ComissaoPeriodoComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComissaoPeriodoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
