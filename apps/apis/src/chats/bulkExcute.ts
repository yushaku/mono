import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

export type BatchFunc = (items: any[]) => void;

@Injectable()
export class BulkExecService<TType> {
  private size: number; // bulk size
  private timeout: number; // time ms
  private batchFunc: BatchFunc;

  private batch: Array<TType> = [];
  private throttledFunc: _.DebouncedFunc<() => Promise<void>>;

  constructor(size: number, timeout: number, batchFunc: BatchFunc) {
    this.size = size;
    this.timeout = timeout;
    this.batchFunc = batchFunc;

    this.throttledFunc = _.throttle(this.processBatch, this.timeout, {
      leading: false,
      trailing: true,
    });
  }

  private processBatch = async () => {
    const tmp = _.cloneDeep(this.batch);
    this.batch = [];
    this.batchFunc(tmp);
  };

  async push(item: TType) {
    this.batch.push(item);
    if (this.batch.length >= this.size) {
      this.flush();
    } else {
      this.throttledFunc();
    }
  }

  async flush() {
    return this.throttledFunc.flush();
  }
}
