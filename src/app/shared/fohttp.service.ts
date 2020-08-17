import { Injectable } from '@angular/core';
import { Toast } from './emitter.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Subject, Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { foModelBase, iPayloadWrapper } from '.';
import { environment } from '../../environments/environment';
import { Constructable, FuncAny } from '.';
import { ServiceLocator, ServiceOptions } from './foServiceLocator';

export interface IResponse<T> extends   iPayloadWrapper {
    payload: Array<T>;
    metadata?: any;
    error: string;
}

@Injectable({
    providedIn: 'root'
})
export class foHttpService {
    constructor(private http: HttpClient) {}

    mapToModel<T extends foModelBase>(type: Constructable<T>, payload: Array<any>, func?: FuncAny): Array<T> {
        const list = !payload
            ? []
            : payload.map<T>(item => {
                  const data = func ? func(item) : item;
                  return new type(data);
              });
        return list;
    }

    mapSuccessResponse<T extends foModelBase>(type: Constructable<T>, res: IResponse<T>, mapFunc?: FuncAny): Observable<IResponse<T>> {
        res.payload = res.payload ? this.mapToModel<T>(type, res.payload, mapFunc) : [];
        return of<IResponse<T>>(res);
    }

    mapErrorResponse<T>(error: HttpErrorResponse): Observable<IResponse<T>> {
        const formattedError = {
            dateTime: Date.now(),
            hasError: true,
            length: 0,
            payloadType: '',
            payload: [],
            message: error.message,
            error: error.error
        } as unknown as IResponse<T>;

        return of<IResponse<T>>(formattedError);
    }

    public get API_URL(): string {
        return `${environment.baseURL}${environment.rootAPIPath}${environment.APIVersion}`;
    }

    public rootURL(endpoint: string) {
        return `${environment.baseURL}${endpoint}`;
    }

    public resolveURL(serviceOptions: ServiceOptions) {
        const url = ServiceLocator.getUrl(serviceOptions);
        return url;
    }

    public get$<T extends foModelBase>(type: Constructable<T>, serviceOptions: ServiceOptions, header?: HttpHeaders, func?: FuncAny): Subject<IResponse<T>> {
        const subject = new Subject<IResponse<T>>();
        const url = ServiceLocator.getUrl(serviceOptions);

        const headers = { headers: header };
        this.http
            .get(url, headers)
            .pipe(
                switchMap((response: any) => {
                    return this.mapSuccessResponse<T>(type, response, func);
                }),
                catchError(error => {
                    Toast.warning(`SERVER ERROR: ${error.message}`);
                    return this.mapErrorResponse<T>(error);
                })
            )
            .subscribe(subject);

        return subject;
    }

    public post$<T extends foModelBase>(type: Constructable<T>, serviceOptions: ServiceOptions, data: T, header?: HttpHeaders, func?: FuncAny): Subject<IResponse<T>> {
        const subject = new Subject<IResponse<T>>();
        const url = ServiceLocator.getUrl(serviceOptions);
        const headers = { headers: header };
        
        this.http
            .post(url, data, headers)
            .pipe(
                switchMap((response: any) => {
                    return this.mapSuccessResponse<T>(type, response, func);
                }),
                catchError(error => {
                    Toast.warning(`SERVER ERROR: ${error.message}`);
                    return this.mapErrorResponse<T>(error);
                })
            )
            .subscribe(subject);

        return subject;
    }
}
