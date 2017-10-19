import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


/*
 * Denna service skall sköta kommunikationen mellan Mimer Gui och Mimer backend.
 */
@Injectable()
export class MimerService {
    url: string = 'http://localhost:3000';

    constructor(private http: Http) {
        
    }
}