import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MimerService } from '../services/mimer.service';
import { ChattMessage } from "../shared/chatt.message";

@Component({
  selector: 'chatt',
  templateUrl: './chatt.component.html',
  styleUrls: ['./chatt.component.css']
})
export class ChattComponent implements OnInit {
    @Input() chattmsg: ChattMessage;
    @Output() newChattMessage: EventEmitter<ChattMessage> = new EventEmitter<ChattMessage>();

    chattreply: ChattMessage;

    constructor(private mimerservice: MimerService) {
    }

    ngOnInit() {
        this.clear();
    }

    clear(): void {
        this.chattmsg = new ChattMessage();
        this.chattreply = new ChattMessage();
    }

    store(): void {
        console.log('Chatt: ' + JSON.stringify(this.chattmsg));
        let self = this;

        this.chattmsg.type = 1;
        this.chattmsg.user = 'thomas.hamren@skatteverket.se';

        this.mimerservice.sendChattMessage(this.chattmsg)
            .subscribe(function(chattmsg) {
                console.log('ChattReply=' + JSON.stringify(chattmsg));
                self.chattreply.text = chattmsg.text;
            });
    }

}
