import { Injectable } from '@angular/core';
import { Toast } from './emitter.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Subject, Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { ModelBase } from '.';
import { environment } from '../../environments/environment';
import { Constructable, FuncAny } from '.';
import { ServiceLocator, ServiceOptions } from './service-locator';

export interface IResponse<T> {
    dateTime: string;
    hasError: boolean;
    length: number;
    message: string;
    payload: Array<T>;
    payloadType?: string;
    metadata?: any;
    error: string;
}

@Injectable({
    providedIn: 'root'
})
export class foHttpService {
    constructor(private http: HttpClient) {}

    mapToModel<T extends ModelBase>(type: Constructable<T>, payload: Array<any>, func?: FuncAny): Array<T> {
        const list = !payload
            ? []
            : payload.map<T>(item => {
                  const data = func ? func(item) : item;
                  return new type(data);
              });
        return list;
    }

    mapSuccessResponse<T extends ModelBase>(type: Constructable<T>, res: IResponse<T>, mapFunc?: FuncAny): Observable<IResponse<T>> {
        res.payload = res.payload ? this.mapToModel<T>(type, res.payload, mapFunc) : [];
        return of<IResponse<T>>(res);
    }

    mapErrorResponse<T>(error: HttpErrorResponse): Observable<IResponse<T>> {
        const formattedError = <IResponse<T>>{
            dateTime: '',
            hasError: true,
            length: 0,
            payload: [],
            message: error.message,
            error: error.error
        };
        // return formattedError;
        return of<IResponse<T>>(formattedError);
    }

    public get API_URL(): string {
        return `${environment.baseURL}${environment.rootAPIPath}${environment.APIVersion}`;
    }

    public rootURL(endpoint:string){
        return `${environment.baseURL}${endpoint}`;
    }

    public resolveURL(serviceOptions: ServiceOptions){
        const url = ServiceLocator.getUrl(serviceOptions);
        return url;
    }

    public get$<T extends ModelBase>(type: Constructable<T>, serviceOptions: ServiceOptions, header?: HttpHeaders, func?: FuncAny): Subject<IResponse<T>> {
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

    public post$<T extends ModelBase>(type: Constructable<T>, serviceOptions: ServiceOptions, data: T, func?: FuncAny): Subject<IResponse<T>> {
        const subject = new Subject<IResponse<T>>();
        const url = ServiceLocator.getUrl(serviceOptions);

        this.http
            .post(url, data)
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
