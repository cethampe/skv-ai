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
            .map(function(body) {
                let msg = body.json();
                let ret = new ChattMessage(msg);

                return ret;
            } );
    }

    getAllChattSession(userid: number): Observable<ChattSession[]> {
        let query_url = this.url + 'session/list?userid=' + userid;

        return this.http.get(query_url)
            .map(function(body) {
                let ret = [];
                let sessions = body.json();
                for(let i = 0; i < sessions.length; i++) {
                    let cs = new ChattSession();
                    cs.id = sessions[i].id;
                    cs.title = sessions[i].title;
                    cs.personId = sessions[i].personId;

                    ret.push(cs);
                }

                return ret;
            });
    }

    getAllChattMessages(sessid: number): Observable<ChattMessage[]> {
        let query_url = this.url + 'messages/list?sessionid=' + sessid;

        return this.http.get(query_url)
            .map(function(body) {
                let ret = [];
                let messages = body.json();
                for(let i = 0; i < messages.length; i++) {
                    ret.push(new ChattMessage(messages[i]));
                }

                return ret;
            });
    }
}