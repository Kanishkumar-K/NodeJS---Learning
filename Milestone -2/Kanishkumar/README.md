# NodeJS Milestone-2

## Exporting Modules:

## ECMAScript module system

Exporting a module is done by using the export keyword.

There are two types of exports:

- Named Exports
- Default Exports

`Named Exports:`

Named exports are useful to export several values. During the import, it is mandatory to use the same name of the corresponding object.

export const PI = 3.14;
export function add(a, b) {
  return a + b;
}
export class Person {
  constructor(name) {
    this.name = name;
  }
}

`Default Exports:`

Default exports are useful to export only a single value. During the import, it is not mandatory to use the same name of the corresponding object.

export default function greet(name) {
  return `Hello, ${name}!`;
}

## CommonJs module system

Exporting a module is done by using the module.exports object.

    // Single Export
    module.exports = function greet(name) { /* ... */ };

    // Multiple Exports
    module.exports = {
      pi: 3.14,
      add(a, b) { /* ... */ },
      Person
    };


## Exporting Literals:

`script.js`
        
        module.exports = "hello"

`index.js`
        
        const msg = require("./script"); 
        console.log(msg); 

## Exporting functions:

`script.js`
        
        function add(a,b){
            return a+b;
        }

        function sub(a,b){
            return a-b;
        }

        module.exports = {add, sub}

`index.js`
        
        const {add, sub} = require('./script')

        console.log(add(2,3))
        console.log(sub(4,2))


## Exporting Objects:
        
`script.js`

        module.exports = {
            name: "Kanish",
            age : 22
        }        

`index.js`
                
        const person = require('./script')
        console.log(person.name)
        console.log(person.age)

---

## Consuming Modules

## ECMAScript module system

Importing a module is done by using the import keyword.

There are two types of imports:

- Named Imports
- Default Imports

## Named Imports:

Named imports are useful to import several values. During the import, it is mandatory to use the same name of the corresponding object.

  import { name, age } from "demo.js";

## Default Imports:

Default imports are useful to import only a single value. During the import, it is not mandatory to use the same name of the corresponding object.

  import name from "demo.js";

---


- Exporting modules in Node.js is fundamental for organizing and structuring your code. 

- You can export functionality such as variables, functions, objects, or classes from one file so that they can be imported and used in another file.

---

## How modules are imported in NodeJS:

The CommonJs module system uses the require function to load the modules.

By default, the CommonJs module system is used in Node.js.


        const greet = require('./bookingServices');


`Call require():`

- When you call require('moduleName'), Node.js starts the process to load and execute the module.

`Check Cache`:

- Node.js first checks if the module is already in the cache (Module._cache). If it is, it returns the cached module.

`Create Module Instance`:

- If the module is not in the cache, Node.js creates a new Module instance for it.


`Load Module`:

Node.js then loads the module,

- For JSON Files: It reads the file, parses the JSON content, and assigns it to module.exports.

- For JavaScript Files: It reads the file, wraps the content in a function, and compiles it to JavaScript code. This allows the module to use exports, require, and module within its code.

`Compile and Execute`:

JavaScript files are wrapped in a function that takes exports, require, module, __filename, and __dirname as arguments. This function is then compiled and executed.

`Return Module Exports`:

After loading and executing the module, Node.js returns the module.exports property of the module.

---
- The ECMAScript module system uses the import keyword to load the modules.

>The require() call is synchronous and the import statement is asynchronous.

---


# Event Emitters:

EventEmitter provides a simple way to handle events. You can think of it as a publisher-subscriber pattern where:

- Emitters publish (emit) named events.
- Listeners subscribe to (handle) these events by attaching callback functions.

## Importing Event emitters:

        const EventEmitter = require('events');

## Creating EventEmitter class:

The EventEmitter class is used to create event emitters.

        const emitter = new EventEmitter();

## Register Event Emitters:

The on method is used to listen for specific events.

        emitter.on('eventName', (data) => {
        console.log('Event received with data:', data);
        });

## Emit an event: 

The emit method is used to emit an event.

        emitter.emit('eventName', 'Hello');

## Example:

        const EventEmitter = require('events');

        const taskEmitter = new EventEmitter();


        taskEmitter.on('taskCompleted', (taskName) => {
        console.log(`Notification: Task "${taskName}" has been completed.`);
        });

        function completeTask(taskName) {
        console.log(`Task "${taskName}" is being completed.`);
        taskEmitter.emit('taskCompleted', taskName);
        }

        completeTask('Write documentation');
        completeTask('Fix bugs');
        completeTask('Deploy application');

---

### once()  method:

It will listen to the event only once.

        const EventEmitter = require('events');

        const taskEmitter = new EventEmitter();

        taskEmitter.once('taskCompleted', (taskName) => {
        console.log(`One-time Notification: Task "${taskName}" has been completed.`);
        });

        function completeTask(taskName) {
        console.log(`Task "${taskName}" is being completed.`);
        taskEmitter.emit('taskCompleted', taskName);
        }

        completeTask('Write documentation'); // This will trigger the one-time listener
        completeTask('Fix bugs'); // This will not trigger the one-time listener
        completeTask('Deploy application'); // This will not trigger the one-time listener

---

## removeListener() event:

It is used to remove the listener for the event

        const EventEmitter = require('events');

        const myEmitter = new EventEmitter();

        function onGreeting(name) {
        console.log(`Hello, ${name}!`);
        }

        myEmitter.on('greeting', onGreeting);

        myEmitter.emit('greeting', 'Kanish'); // This will trigger the listener

        myEmitter.removeListener('greeting', onGreeting);

        myEmitter.emit('greeting', 'Kumar'); // This will not trigger the listener

---
### WebSockets:

- WebSockets provide a full-duplex communication channel over a single, long-lived connection, enabling real-time data exchange between a client and a server. 

- Unlike HTTP, which follows a request-response model, WebSockets allow for bi-directional communication where the server can send data to the client anytime.

## Use Cases for WebSockets

WebSockets are ideal for scenarios where low-latency, real-time communication is required:
- **Chat Applications**: Instant message delivery between users.
- **Live Data Feeds**: Financial data, sports scores, or stock market updates.
- **Online Gaming**: Real-time updates between players and servers.

`Example`:

        const WebSocket = require('ws');
        const server = new WebSocket.Server({ port: 8080 });

        server.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('message', (message) => {
        console.log(`Received: ${message}`);

        server.clients.forEach((client) => {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
        }
        });
        });

        socket.on('close', () => {
        console.log('Client disconnected');
        });
        });


Chat systems: 
        New client connected
        Received: hi
        Client disconnected
        New client connected
        Received: hoo
        Client disconnected


### Exception Handling:

Error event is used to handle errors

        const EventEmitter = require("events");

        const eventEmitter = new EventEmitter();

        eventEmitter.on("error", (err) => {
        console.log(`Error: ${err.message}`);
        });

        eventEmitter.emit("error", new Error("An error occurred"));

---

### Try and catch:

Try and catch used to handle exceptions

        try {
        throw new Error("An error occurred");
        } catch (err) {
        console.log(`Error: ${err.message}`);
        }

---

## Event Loop:

- The event loop allows Node to perform non-blocking I/O operations despite the fact that JavaScript is single-threaded. 
- It is done by assigning operations to the operating system whenever and wherever possible.


- Node.js is single-threaded and uses an event-driven, non-blocking architecture to handle multiple tasks efficiently. 

### How Node.js Works

When you run a Node.js program:

1. **Initialization**:
   - Node.js starts by setting up the *event loop*, which is responsible for managing the flow of tasks, especially asynchronous operations.

2. **Running the Script**:
   - Node.js executes your code from top to bottom. During this phase:
     - Synchronous operations (like `console.log`) are handled immediately.
     - Asynchronous tasks (like `setTimeout`, file reading) are scheduled to be processed later.

3. **Async Operations with `libuv`**:
   - Node.js uses a special library called `libuv` to manage many asynchronous tasks.
   - If the task is heavy (like file I/O), it’s sent to a *thread pool* managed by `libuv`. This pool contains four background threads that work on these tasks while the main thread stays free.

4. **Callbacks and the Event Queue**:
   - Once a background task is completed, a *callback function* (to handle the result or error) is added to the *event queue*.
   - For example, after reading a file, a callback may be triggered to process the file contents.

5. **Event Loop and Call Stack**:
   - The event loop constantly checks if the call stack is empty.
   - When there are no tasks in the stack, it starts picking tasks from the event queue and pushes their callbacks to the stack for execution.

6. **Handling Callbacks**:
   - Callbacks are executed one by one. If they involve more asynchronous work, those tasks are again sent to the thread pool or scheduled for later, continuing the cycle.

## Summary

- Node.js is single-threaded but uses the `libuv` library to offload heavy operations (like file I/O) to a background *thread pool*.
- The *event loop* coordinates between the main thread and background tasks, ensuring non-blocking execution.
- The result is that Node.js can efficiently handle many tasks at once without getting stuck.

---

### Phases of the Node.js Event Loop

The event loop consists of several phases that repeat in a loop. Each phase has a specific purpose and handles a specific type of callback. Here’s a breakdown of each phase:

1. **Timers Phase**:
   - Executes callbacks scheduled by `setTimeout()` and `setInterval()`.
   - If the specified time delay has passed, the callbacks are executed in this phase.

2. **Pending Callbacks Phase**:
   - Executes I/O callbacks that were deferred to the next loop iteration, such as certain types of errors.

3. **Idle, Prepare Phase**:
   - Used internally by Node.js. This phase is mostly for Node’s internal operations, and you don’t typically interact with it directly.

4. **Poll Phase**:
   - This is the most important phase where I/O operations are executed (e.g., reading from files, network requests).
   - The event loop waits for I/O tasks to be completed and executes callbacks when they’re ready.
   - If there are no I/O tasks to process, and no timers are scheduled, the loop may enter a waiting state.

5. **Check Phase**:
   - Executes callbacks from `setImmediate()`.
   - `setImmediate()` is similar to `setTimeout()`, but it’s designed to execute after the poll phase, making it useful for running tasks immediately after I/O.

6. **Close Callbacks Phase**:
   - Executes close events like `socket.on('close', ...)`. For example, if a connection is abruptly closed, the related callbacks are handled here.

---

### Queues in the Node.js Event Loop

In Node.js, the event loop processes various asynchronous tasks using multiple queues.

The event loop manages the following key queues:

### 1. **Microtask Queue**
   - **Purpose**: Handles high-priority tasks like resolved Promises and `process.nextTick()` callbacks.
   - **When It Runs**: The microtask queue is processed immediately after each phase of the event loop, before moving to the next phase. It takes priority over all other queues.
   - **Examples**: 
     - Resolved `Promise` callbacks: `Promise.resolve().then(...)`
     - `process.nextTick()` callbacks

### 2. **Timer Queue**
   - **Purpose**: Contains callbacks scheduled using `setTimeout()` and `setInterval()`.
   - **When It Runs**: The event loop checks this queue during the Timers phase. Callbacks are executed if the specified time has passed.
   - **Examples**:
     - `setTimeout(() => console.log('Timeout callback'), 1000)`
     - `setInterval(() => console.log('Interval callback'), 1000)`

### 3. **I/O Queue**
   - **Purpose**: Manages callbacks for I/O operations such as reading files, network requests, and more.
   - **When It Runs**: The I/O queue is processed in the Poll phase, which is where most of the actual I/O work happens. This queue is responsible for handling operations like disk access and network communication.
   - **Examples**:
     - File system operations: `fs.readFile()`
     - Network requests: HTTP responses, database queries

### 4. **Check Queue**
   - **Purpose**: Handles callbacks scheduled using `setImmediate()`.
   - **When It Runs**: The check queue is processed during the Check phase, which runs after the Poll phase.
   - **Examples**:
     - `setImmediate(() => console.log('Immediate callback'))`

### 5. **Close Queue**
   - **Purpose**: Contains callbacks related to closing resources, such as `socket.on('close')` events.
   - **When It Runs**: The close queue is processed in the Close phase, which handles clean-up tasks like closing connections.
   - **Examples**:
     - Handling socket closures: `socket.on('close', ...)`
     - Closing streams

### Interaction among these Queues:

1. The event loop starts by processing the **Timer Queue** if any timers have expired.
2. Next, it processes pending callbacks in the **I/O Queue** (for I/O tasks like reading files).
3. After I/O, the loop checks for **setImmediate()** callbacks in the **Check Queue**.
4. The **Close Queue** runs next to handle tasks like closing sockets or file streams.
5. After each phase, the **Microtask Queue** is always checked and processed before moving to the next phase.


Example:

        setTimeout(() => {
        console.log('setTimeout: 0ms');
        }, 0);
        
        setImmediate(() => {
        console.log('setImmediate');
        });
        
        process.nextTick(() => {
        console.log('process.nextTick');
        });
        
        console.log('Start');
        
        process.nextTick(() => {
        console.log('process.nextTick 2');
        });
        
        setImmediate(() => {
        console.log('setImmediate 2');
        });
  
`Output:`

        Start
        process.nextTick
        process.nextTick 2
        setTimeout: 0ms
        setImmediate
        setImmediate 2
---