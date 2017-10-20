import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
// import { Apollo, ApolloQueryObservable } from 'apollo-angular'
import { ChattUser } from '../shared/chatt.user';
import { MimerService } from '../services/mimer.service';

// import gql from 'graphql-tag';

@Component({
  selector: 'chatt-user',
  templateUrl: './chatt.user.component.html',
  styleUrls: ['./chatt.user.component.css']
})
export class ChattUserComponent implements OnInit {
    @Input() chattuser: ChattUser;
    @Output() newUser: EventEmitter<ChattUser> = new EventEmitter<ChattUser>();

    // users: ApolloQueryObservable<any>;

    constructor(private mimer: MimerService) {
    }

    ngOnInit() {
    }

    clear(): void {
        this.chattuser = new ChattUser();
    }

    store(): void {
    }

}
