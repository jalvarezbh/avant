import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComissaoDiariaComponent } from './comissaodiaria.component';
describe('ComissaoDiariaComponent', () => {
    let component: ComissaoDiariaComponent;
    let fixture: ComponentFixture<ComissaoDiariaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ComissaoDiariaComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComissaoDiariaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
