import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ChattUser } from '../shared/chatt.user';

/*
 * Denna service sköter authentiseringen.
 */
@Injectable()
export class AuthService {
    url: string = 'http://localhost:3000/mimer-ai';

    user: string = 'anonymous';

    constructor(private http: Http) {

    }

    // -------------  authentication  -------------------

    getPerson(user:string): Observable<ChattUser> {
        let p =  new ChattUser();
        p.firstname = 'Thomas';
        p.lastname = 'Hamren';
        p.username = 'thomas.hamren@skatteverket.se';

        return null;
    }
    
}