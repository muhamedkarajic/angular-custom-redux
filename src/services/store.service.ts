/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Observable, pipe, Subject } from 'rxjs';
import { distinctUntilChanged, map, scan, shareReplay } from 'rxjs/operators';
import { get, isEqual, omit } from 'lodash';

export class Action {
  constructor(public type: string, public payload?: unknown) {}
}

@Injectable({
  providedIn: 'root'
})
export class Store {
  state: Observable<unknown>;
  actions: Subject<Action> = new Subject();

  constructor() {
    this.state = this.actions.pipe(reducer(), shareReplay(1));
  }

  dispatch(action: Action): void {
    this.actions.next(action);
  }

  select(path: string): any {
    return this.state.pipe(select(path));
  }
}

export const reducer = (): any =>
  scan<any>((state: any, action: Action) => {
    let next: unknown;
    switch (action.type) {
      case 'SET':
        next = action.payload;
        break;
      case 'UPDATE':
        next = { ...state, ...(action.payload as Record<string, unknown>) };
        break;
      case 'DELETE':
        next = omit(state, action.payload as string);
        break;
    }
    return next;
  }, {});

export const select = (path: string): any =>
  pipe(
    map((state) => get(state, path, null)),
    distinctUntilChanged(isEqual)
  );
