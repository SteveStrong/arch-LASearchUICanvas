import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BddTestingComponent } from '../bdd-testing.component';
import { HttpClientModule } from '@angular/common/http';
import { AppHttpService } from '../../shared/foHttp.service';

import { Matcher, BDDTestResultGroup } from '../matchers';
import { environment } from '../../../environments/environment';

describe('BddTestingComponent', () => {
    let component: BddTestingComponent;
    let fixture: ComponentFixture<BddTestingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BddTestingComponent],
            providers: [AppHttpService],
            imports: [HttpClientModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        environment.featureflags.useMockData = true;
        fixture = TestBed.createComponent(BddTestingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should doRunScenario', done => {
        component.doRunScenario(() => {
            expect(component).toBeTruthy();
            done();
        });
    });
});
