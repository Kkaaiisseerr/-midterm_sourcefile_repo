'use strict';

console.log('CAMPUS IT SUPPORT REQUEST MANAGER');

// ================================================================
// PART A: STACK
// ================================================================

// Stack: LIFO (Last In, First Out). The last action pushed is the first one undone.
class Stack {
  // Internal storage: an array. The END of the array is the TOP of the stack.
  constructor() {
    this.items = [];
  }

  // Add an element to the top of the stack.
  push(element) {
    this.items.push(element);
  }

  // Remove and return the top element (returns null if the stack is empty).
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }

  // Return the top element WITHOUT removing it.
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  // Return true when there are no elements.
  isEmpty() {
    return this.items.length === 0;
  }

  // Return how many elements are in the stack.
  size() {
    return this.items.length;
  }

  // Return all elements (bottom to top) as one readable string.
  toString() {
    return this.items.join(', ');
  }
}

console.log('\nPART A: UNDO HISTORY');

const actionHistory = new Stack();

// Push the three actions in the required order.
actionHistory.push('Opened Ticket #101');
actionHistory.push('Assigned Ticket #101');
actionHistory.push('Closed Ticket #101');

// peek() only looks at the top, pop() removes it (this is the "undo").
console.log('Top Action: ' + actionHistory.peek());
console.log('Undo Action: ' + actionHistory.pop());
console.log('Remaining Actions: ' + actionHistory.toString());
console.log('Stack Size: ' + actionHistory.size());

// ================================================================
// PART B: QUEUE
// ================================================================

// Queue: FIFO (First In, First Out). Requests are processed in arrival order.
class Queue {
  // Internal storage: an array. Index 0 is the FRONT, the last index is the BACK.
  constructor() {
    this.items = [];
  }

  // Add an element at the back of the queue.
  enqueue(element) {
    this.items.push(element);
  }

  // Remove and return the front element (returns null if the queue is empty).
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  // Return the front element WITHOUT removing it.
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  // Return true when there are no elements.
  isEmpty() {
    return this.items.length === 0;
  }

  // Return how many elements are waiting in the queue.
  size() {
    return this.items.length;
  }

  // Return all elements (front to back) as one readable string.
  toString() {
    return this.items.join(', ');
  }
}

console.log('\nPART B: WAITING REQUESTS');

const waitingRequests = new Queue();

// Enqueue the four requests in their arrival order.
waitingRequests.enqueue('Ticket #201 - Password Reset');
waitingRequests.enqueue('Ticket #202 - No Internet');
waitingRequests.enqueue('Ticket #203 - Printer Problem');
waitingRequests.enqueue('Ticket #204 - Software Installation');

// Look at the front, then process two requests using dequeue().
console.log('Next Request: ' + waitingRequests.front());
console.log('Processed: ' + waitingRequests.dequeue());
console.log('Processed: ' + waitingRequests.dequeue());
console.log('Remaining Requests: ' + waitingRequests.toString());
console.log('Queue Size: ' + waitingRequests.size());

// ================================================================
// PART C: PRIORITY QUEUE
// ================================================================

// PriorityQueue: smaller priority number = more urgent (1 Critical, 2 High, 3 Normal).
// Note: the General Rules allow arrays only inside Stack and Queue, so this class
// stores its items as small connected nodes { item, next } instead of an array.
class PriorityQueue {
  // head points to the first (most urgent) node; count tracks the total items.
  constructor() {
    this.head = null;
    this.count = 0;
  }

  // Create an item { request, priority } and insert it at the correct position.
  enqueue(request, priority) {
    const newNode = {
      item: { request: request, priority: priority },
      next: null
    };

    // Case 1: empty queue, OR the new item is MORE urgent than the current head.
    // (strictly smaller number, so equal priorities do NOT jump ahead)
    if (this.head === null || priority < this.head.item.priority) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // Case 2: walk forward while the next node has an equal or higher priority
      // (<= keeps the arrival order for requests with the same priority).
      let current = this.head;
      while (current.next !== null && current.next.item.priority <= priority) {
        current = current.next;
      }
      newNode.next = current.next;
      current.next = newNode;
    }

    this.count++;
  }

  // Remove and return the first (most urgent) item; null if empty.
  dequeue() {
    if (this.head === null) {
      return null;
    }
    const removed = this.head.item;
    this.head = this.head.next;
    this.count--;
    return removed;
  }

  // Return how many items are in the priority queue.
  size() {
    return this.count;
  }

  // Display every request together with its priority.
  print() {
    let current = this.head;
    while (current !== null) {
      console.log(current.item.request + ', Priority ' + current.item.priority);
      current = current.next;
    }
  }
}

console.log('\nPART C: URGENT REQUESTS');

const urgentRequests = new PriorityQueue();

// Enqueue in ARRIVAL order; the class places each one in the right spot.
urgentRequests.enqueue('Ticket #301 - Install Browser', 3);
urgentRequests.enqueue('Ticket #302 - Server Offline', 1);
urgentRequests.enqueue('Ticket #303 - Faculty PC Failure', 2);
urgentRequests.enqueue('Ticket #304 - Internet Laboratory Down', 1);

console.log('Initial Priority Order:');
urgentRequests.print();

// Process the most urgent request, then show what is left.
const processed = urgentRequests.dequeue();
console.log('Processed Priority Request: ' + processed.request + ', Priority ' + processed.priority);
console.log('Remaining Priority Requests:');
urgentRequests.print();

// ================================================================
// PART D: LINKED LIST
// ================================================================

// Node: one link in the chain. It holds the data and a pointer to the next node.
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

// LinkedList: a chain of connected nodes (no array used).
class LinkedList {
  // head = first node, length = number of nodes.
  constructor() {
    this.length = 0;
    this.head = null;
  }

  // Add a new node at the END of the list.
  append(element) {
    const newNode = new Node(element);

    if (this.head === null) {
      // Empty list: the new node becomes the head.
      this.head = newNode;
    } else {
      // Walk to the last node, then link the new node after it.
      let current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.length++;
  }

  // Insert an element at a position (0 to length). Returns false if invalid.
  insert(position, element) {
    // Reject invalid positions.
    if (position < 0 || position > this.length) {
      return false;
    }

    const newNode = new Node(element);

    if (position === 0) {
      // Beginning: new node points to the old head, then becomes the head.
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // Middle or end: stop at the node BEFORE the target position, then relink.
      let previous = this.head;
      for (let i = 0; i < position - 1; i++) {
        previous = previous.next;
      }
      newNode.next = previous.next;
      previous.next = newNode;
    }
    this.length++;
    return true;
  }

  // Remove and return the element at a position. Returns null if invalid.
  removeAt(position) {
    // Reject invalid positions (also covers an empty list).
    if (position < 0 || position >= this.length) {
      return null;
    }

    let removed;

    if (position === 0) {
      // Removing the head: move head to the second node.
      removed = this.head;
      this.head = this.head.next;
    } else {
      // Stop at the node BEFORE the target, then skip over the target.
      let previous = this.head;
      for (let i = 0; i < position - 1; i++) {
        previous = previous.next;
      }
      removed = previous.next;
      previous.next = removed.next;
    }
    this.length--;
    return removed.element;
  }

  // Return the position of an element, or -1 when it is not in the list.
  indexOf(element) {
    let current = this.head;
    let index = 0;

    while (current !== null) {
      if (current.element === element) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  // Remove an element by value by reusing indexOf() and removeAt().
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index); // removeAt(-1) safely returns null
  }

  // Return true when no nodes exist.
  isEmpty() {
    return this.length === 0;
  }

  // Return how many nodes are in the list.
  size() {
    return this.length;
  }

  // Traverse the chain and return all elements as one readable string.
  toString() {
    const parts = [];
    let current = this.head;

    while (current !== null) {
      parts.push(current.element);
      current = current.next;
    }
    return parts.join(' -> ');
  }
}

console.log('\nPART D: COMPLETED REQUESTS');

const completedRequests = new LinkedList();

// append the three required requests.
completedRequests.append('Ticket #401 - Account Activated');
completedRequests.append('Ticket #402 - Printer Connected');
completedRequests.append('Ticket #403 - Antivirus Updated');

// insert at the beginning (position 0).
completedRequests.insert(0, 'Ticket #400 - Computer Diagnosed');

// insert at the end using insert() (position = current size).
completedRequests.insert(completedRequests.size(), 'Ticket #405 - Browser Updated');

// display the complete list.
console.log('Complete List: ' + completedRequests.toString());

// search for a ticket.
console.log('Index of Ticket #402: ' + completedRequests.indexOf('Ticket #402 - Printer Connected'));

// remove by position.
console.log('Removed at Position 1: ' + completedRequests.removeAt(1));

// remove by value.
console.log('Removed by Value: ' + completedRequests.remove('Ticket #403 - Antivirus Updated'));

// display the final list and size.
console.log('Final List: ' + completedRequests.toString());
console.log('Final Size: ' + completedRequests.size());