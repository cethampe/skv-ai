import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ChattMessage } from '../shared/chatt.message';
import { ChattSession } from '../shared/chatt.session';

/*
 * Denna service skall sköta kommunikationen mellan Mimer Gui och Mimer backend.
 */
@Injectable()
export class MimerService {
    url: string = 'http://localhost:3000/';
    mimer: string = 'mimer-ai';

    constructor(private http: Http) {

    }

    getOptions(): RequestOptions {
        // return new RequestOptions({ withCredentials: true });
        return new RequestOptions();
    }
    
    // -------------  chatt   -------------------

    sendChattMessage(msg: ChattMessage): Observable<ChattMessage> {
        return this.http.post(this.url + 'send', msg, this.getOptions())
            .map(function(res) { console.log(res); return new ChattMessage(); } );
    }

    getAllChattSession(user: string): Observable<ChattSession[]> {
        return null;
    }

    getAllChattMessages(sess: ChattSession): Observable<ChattMessage[]> {
        return null;
    }
}