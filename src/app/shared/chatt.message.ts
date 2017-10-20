export class ChattMessage {
    id: number;
    type: number;
    user: string;
    text: string;

    constructor(msg?: Object) {
        if (msg) {
            this.id = msg['id'];
            this.type = msg['type'];
            this.user = msg['user'];
            this.text = msg['content'];
        }
    }
};
