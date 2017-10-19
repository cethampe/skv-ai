import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

/*
 * Denna service sköter authentiseringen.
 */
@Injectable()
export class AuthService {
    url: string = 'http://localhost:3000';

    user: string = 'anonymous';

    constructor(private http: Http) {

    }

    // -------------  authentication  -------------------

    
}