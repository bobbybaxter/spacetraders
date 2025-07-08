import delay from 'delay';
import { Queue } from './Queue.js';

export default (queue: Queue) => {
  while (!queue.isEmpty()) {
    console.log('queue.peek() :>> ', queue.peek());
    queue.dequeue();
    delay(5000);
  }
};
