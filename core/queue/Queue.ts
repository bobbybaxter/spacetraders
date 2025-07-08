export class Queue extends Array {
  // clears the queue
  clear() {
    this.length = 0;
  }

  // removes an element from the front of the queue
  dequeue() {
    return this.shift();
  }

  // adds an element to the end of the queue
  enqueue(element: any) {
    this.push(element);
  }

  // adds an element to the front of the queue
  enqueueFront(element: any) {
    this.unshift(element);
  }

  // returns true if the queue is empty
  isEmpty() {
    return this.length === 0;
  }

  // returns the element at the front of the queue
  peek() {
    return this[0];
  }

  // prints the queue
  print() {
    console.log(this.toString());
  }

  // returns the size of the queue
  size() {
    return this.length;
  }

  // returns a string representation of the queue
  toString() {
    return this.join(',');
  }
}
