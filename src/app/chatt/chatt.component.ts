import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { MimerService } from '../services/mimer.service';
import { ChattMessage } from "../shared/chatt.message";

@Component({
  selector: 'chatt',
  templateUrl: './chatt.component.html',
  styleUrls: ['./chatt.component.css']
})
export class ChattComponent implements OnInit {
    @Output() newPerson: EventEmitter<ChattMessage> = new EventEmitter<ChattMessage>();

    @Input() chattmsg: ChattMessage;

    constructor(private mimerservice: MimerService) {
    }

    ngOnInit() {
        this.clear();
    }

    clear(): void {
        this.chattmsg = new ChattMessage();
    }

    store(): void {
        console.log('Chatt: ' + JSON.stringify(this.chattmsg));
        let self = this;

        this.chattmsg.type = 1;
        this.chattmsg.user = 'hampe';

        this.mimerservice.sendChattMessage(this.chattmsg)
            .subscribe(function(chattmsg) {
                console.log(JSON.stringify(chattmsg));
            });
    }

}
