import { ChattMessage } from './chatt.message';

export class ChattSession {
    id: number;
    title: string;
    personId: number;

    messages: ChattMessage[];
};
