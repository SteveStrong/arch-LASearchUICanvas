import { async, TestBed, getTestBed } from '@angular/core/testing';
import { AppHttpService } from '../fohttp.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

import { ModelBase } from '..';
import { environment } from '../../../environments/environment';
import { ServiceOptions } from '../service-locator';

describe('AppHttpService', () => {
    let injector: TestBed;
    let service: AppHttpService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule]
            //providers: [HttpTestingController],
        }).compileComponents();

        injector = getTestBed();
        service = TestBed.get(AppHttpService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    xit('should API_URL', () => {
        // environment.featureflags.useMockData = false;
        // const result = service.API_URL;
        // expect(result).toEqual('test-add-team-URL');
    });

    it('should mapToModel', () => {
        const result = service.mapToModel<ModelBase>(ModelBase, [{ hello: 'everyone' }]);
        expect(result[0].myType).toEqual('ModelBase');
        const obj = result[0] as any;
        expect(obj.hello).toEqual('everyone');
    });

    it('should mapErrorResponse', () => {
        const error = { message: 'the message', error: 'the error' } as HttpErrorResponse;
        const result = service.mapErrorResponse<ModelBase>(error);
        expect(result).toBeDefined();
    });

    it('should Post<>', () => {
        const serviceOptions: ServiceOptions = {
            serviceKey: '',
            localDataPath: '',
            servicePath: '',
            params: {}
        };

        const url = service.API_URL;
        const obj = new ModelBase();
        service.post$<ModelBase>(ModelBase, serviceOptions, obj).subscribe(res => {
            expect(res).toBeTruthy();
        });
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('POST');
        req.flush({});
    });

    it('should Get<>', () => {
        const serviceOptions: ServiceOptions = {
            serviceKey: '',
            localDataPath: '',
            servicePath: '',
            params: {}
        };

        const url = service.API_URL;
        service.get$<ModelBase>(ModelBase, serviceOptions).subscribe(res => {
            expect(res).toBeTruthy();
        });
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush({});
    });
});
