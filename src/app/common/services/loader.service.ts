import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs/Subscriber';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';

@Injectable()
export class LoaderService {
  public isLoading$: Observable<boolean>;

  private loaderSubscriber: Subscriber<boolean>;
  private promisesQueue: any[] = [];

  constructor() {
    this.isLoading$ = new Observable((subscriber: Subscriber<boolean>) => {
      this.loaderSubscriber = subscriber;
    });
  }

  addPromise(promise: Promise<any>) {
    this.loaderSubscriber.next(true);

    this.processPromise(promise);
  }

  private checkQueue() {
    if (_.isEmpty(this.promisesQueue)) {
      this.loaderSubscriber.next(false);
    }
  }

  private processPromise(promise) {
    const promiseForQueue = { promise, uuid: UUID.UUID() };

    const onPromiseComplete = () => {
      this.promisesQueue.splice(_.findIndex(this.promisesQueue, { uuid: promiseForQueue.uuid }), 1);

      setTimeout(() => {
        this.checkQueue();
      }, 100);
    };

    this.promisesQueue.push(promiseForQueue);

    return promiseForQueue.promise
      .then(onPromiseComplete)
      .catch(onPromiseComplete);
  }
}
