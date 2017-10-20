import { ChattMessage } from './chatt.message';

export class ChattSession {
    id: number;
    title: string;
    personId: number;

    messages: ChattMessage[];

    constructor(sess?: Object) {
        if (sess) {
            this.id = sess['id'];
            this.title = sess['title'];
            this.personId = sess['personId'];
        }
    }
};
