import { Component } from '@angular/core';
import { Action, Store } from 'src/services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  date;
  constructor(public store: Store) {
    this.date = this.store.select('spanish.hola');
  }

  set(): void {
    this.store.dispatch(new Action('SET', { date: new Date('1/1/2000') }));
  }

  update(): void {
    this.store.dispatch(new Action('UPDATE', { date: new Date() }));
  }

  delete(): void {
    this.store.dispatch(new Action('DELETE', 'date'));
  }
}
