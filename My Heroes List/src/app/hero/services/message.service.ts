import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {
  getHeroes(): any {
    throw new Error('Método não implementado.');
  }
  addHero(arg0: any): any {
    throw new Error('Método não implementado.');
  }
  deleteHero(arg0: any): any {
    throw new Error('Método não implementado.');
  }
  // tslint:disable-next-line:member-ordering
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
