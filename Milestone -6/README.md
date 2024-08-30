# Milestone -6


### Memory Management

Memory management refers to the process of allocating, utilizing, and releasing memory resources in a computer system. 

### Lifecycle of Memory:

The memory life cycle follows the following stages:

<p<b>
Allocates the memory &rarr; Use the allocated memory &rarr; Release the memory
</b></p>


`1. Allocates the memory`: 

JavaScript allocates memory to the object created.

`2. Use the allocated memory.`

`3. Release the memory when not in use: `

Once the allocated memory is released, it is used for other purposes. It is handled by a JavaScript engine.

<br>

# Memory Allocation

## Stack vs. Heap

- **Stack**:

  - Used for static memory allocation (e.g., function call frames, local variables).
  - Fast and follows a Last-In-First-Out (LIFO) order.

- **Heap**:
  - Used for dynamic memory allocation (e.g., objects and arrays).
  - More flexible but involves complex memory management.


        Why are functions stored in the heap while local variables and parameters are kept on the stack in JavaScript?

        - Functions are stored in the heap because they need to be accessible throughout the program, even after they are created. 

        - Local variables and parameters are kept on the stack because they are only needed while the function is running and can be discarded once the function finishes.
---
## Garbage collection:

- Garbage collection frees up memory in the Heap used by objects that are no longer referenced from the Stack, either directly or indirectly. 
- The goal is to create free space for creating new objects. Garbage collection is generational. Objects in the Heap are grouped by age and cleared at different stages.


`New Space:`

 Where new allocations happen. Garbage collection is quick. Has a size of between 1 and 8 MBs. Objects in the New Space are called the Young Generation.

`Old Space:`
 
 Where objects that survived the collector in the New Space are promoted to. Objects in the Old Space are called the Old Generation. Allocation is fast, however, garbage collection is expensive and infrequent.

## Role of Garbage Collector

- The garbage collector is responsible for reclaiming memory that is no longer in use. 
- It identifies objects that are no longer reachable and frees up their memory.


        let obj1 = { name: 'Kanish' };
        let obj2 = { name: 'Kumar' };

        obj1 = null;

<br>

> - In this code snippet, two objects, obj1 and obj2, are created on the heap. 
> - Initially, both objects are referenced. 
>
> However, when obj1 is set to null, it no longer references the object.
>
> At this point, the garbage collector identifies that there are no remaining references to > that object, making it eligible for garbage collection.
> - The garbage collector frees up the memory occupied by the object, making it available for future use.


## Reachability of Object

- JavaScript employs a reachability concept. 

>If an object is reachable from the root, it is considered reachable and is not >garbage collected.

- If an object is reachable through any existing reference, it will not be garbage collected.

        let user = {
        name: “Kanish”             // User has reference to object 
        };

        user = Null;               // No reference. Hence it is inaccessible


## Advantage of Garbage Collection


<br >

- One of the advantages of JavaScript’s garbage collection is automatic memory management. 

- Developers do not need to explicitly deallocate memory; the garbage collector handles it for us. 

- This reduces the chances of memory leaks and simplifies memory management.

- Improves performance.

---
<br >

Garbage Collection in JavaScript works by tracking references to objects in memory and removing objects that are no longer referenced by the application.

### 1. Reference Counting Algorithm
### 2. Mark Sweep Algorithm

---


## 1. Reference Counting Algorithm

- In this method, the program keeps track of the number of references to each object or variable. 
- When an object or variable is no longer being used, its reference count drops to zero, and enables the garbage collector to safely remove it from memory.


| Case | Description                                                       |
|------|-------------------------------------------------------------------|
| 1    | Create object; set reference count to 1.                          |
| 2    | Increment count when referenced by another object.                |
| 3    | Decrement count when dereferenced.                                |
| 4    | Collect object when count reaches 0.                              |


> ⚠️ If reference count is 0, garbage collector will remove the object or variable.

        let test1 = "Sample text";

        test1 = 2;

        // Reference count of "Sample text" is now 0, and it can be garbage collected. Since test1 is updated and "String text" is no longer referenced.

Another example:

        let Obj = { key : 10 , key1 : 20 };
        Obj.key = 30;

        // Here key: 10 is no longer referenced, but still the refernece value for Obj is not 0. Hence, it wont get removed by garbage collector.
<br>

But , 

        let Obj = { key : 10 , key1 : 20 };
        Obj = 30;

        // This case will remove the Object which is no longer referenced. 

<br >

>*Limitation:*
>
> - It cannot detect `cyclic references`, where two or more objects   reference each other in a loop. <br>
>
>        function demo(){
>        let Obj1 = {}
>        let Obj2 = {}
>
>        // circular reference
>
>        Obj1.key = Obj2;        
>        Obj2.key = Obj1;
>        return "Hello";
>       } 
>
>       demo();
>

## Advantages Of Reference Counting:

- It can reclaim memory as soon as it becomes unreachable, without waiting for a garbage collection cycle.

- Can be faster than mark-and-sweep for programs that create and destroy numerous small objects frequently. 

## Disadvantages Reference Counting:

- Reference Counting cannot handle cyclic references as it can’t determine whether an object is no longer used, when it is referenced in a loop. 

- Can result in memory leaks if the reference counts are not managed appropriately. 

---

Strong Reference:
        
- Strong reference prevent an object from being garbage-collected.

Weak Reference:

- weak reference doesn't prevent an object from being garbage-collected.


## 2. Mark and Sweep Algorithm:

-  The mark-and-sweep algorithm works by starting with a set of “roots” (typically the global object). 

- The algorithm then recursively traverses the object graph, marking all objects and variables that are still in use.

- Once all live objects and variables have been marked, the garbage collector then safely removes any objects and variables that have not been marked, as they are no longer required.

- The Reachable objects are marked, Rest are sweeped.

>        function demo(){
>        let Obj1 = {}
>        let Obj2 = {}
>
>        // circular reference
>
>        Obj1.key = Obj2;        
>        Obj2.key = Obj1;
>        return "Hello";
>       } 
>
>       demo();

Here, once the function gets executed, the function is not used again. Hence, they are no longer reachable objects. (Not reachable after function execution).

Now, the garbage collector will remove these from memory.


Consider the case,
Here both obj1 and obj2 are reachable even after function execution. Hence they will be marked and not sweeped.

        let globalRef; // Global reference

        function demo() {
        let obj1 = {};     // Object 1
        let obj2 = {};     // Object 2

        obj1.ref = obj2;   // Circular reference
        obj2.ref = obj1;   // Circular reference

        globalRef = obj1;  // Make obj1 reachable globally
        }

        demo();

        // obj1 and obj2 are reachable via globalRef
        console.log(globalRef);        
        console.log(globalRef.ref);   

Hence,

1. Marking: 

Starts from the root (global object), mark all the reachable object as alive.

2. Sweeping: 

The garbage collector traverses the heap and makes note of the memory address of any object that is not marked alive.


3. Compacting: 

After sweeping, if required, all the survived objects will be moved to be together.

---

### Best Practices:

 Best practices to optimize JavaScript garbage collection performance, such as 

- Avoiding circular references
- Minimizing the use of global variables 
- Using the delete keyword to remove properties from objects. 

`Object Pooling:`

- For frequently created and destroyed objects, consider implementing object pooling. 

- Object pooling reuses existing objects instead of creating new ones, reducing memory allocation and garbage collection overhead.



## Which algorithm is suitable?

In general, Mark-and-sweep is considered to be a more robust and flexible technique than reference counting.

- `Mark-Sweep Algorithm` is better suited for applications with large object graphs.

- It can handle circular references, but can cause noticeable pauses during garbage collection. 

- `Reference Counting` is faster and more efficient for smaller applications.
- It cannot handle circular references and this can lead to memory leaks.


- **Garbage Collection Triggers**:

  - **Automatic**: Periodically or when memory pressure is detected.

  - **Explicit Cleanup**: Developers can set unused references to `null` or `undefined`.

## Generational Garbage Collection:

- Generational garbage collection is a technique used by many modern JavaScript engines to manage memory more efficiently. 

- The core idea is to divide objects into different generations based on their lifespan and collect garbage more frequently from the younger generation.

`Young Generation:`

 - This includes objects that have been recently created. 

 - The garbage collector assumes that most objects in this generation are short-lived.



`Old Generation:` 

- This consists of objects that have survived several garbage collection cycles in the young generation. 

- These objects are assumed to be long-lived.

<br>

>`GC Run: `
>
>A cycle of the garbage collector identifying and reclaiming memory.

>`Nursery -> Intermediate -> Old Gen`:
>
> New Object are allocated memory in nursery gen. and objects that survive one >GC run are copied into the intermediate space of the young generation and >those surviving a second run are moved into the old generation.

---

# Memory Leaks

- A situation where memory is not released properly, causing a program to consume more memory over time and potentially leading to performance degradation or crashes.

## Common Causes of Memory Leaks

1. **Global Variables**

   - Storing data in global variables can lead to memory leaks if the variables are not cleaned up.

   - Assign global variables to `null` when no longer needed.

    ```javascript
    let globalVar = "20";

    globalVar = null;


2. **Remove Timers and Callbacks**

- Timers (setInterval, setTimeout) and callbacks that are not cleared can cause memory leaks, especially in Single Page Applications (SPAs).

        clearInterval(timerId); // clear them

3. **Remove Event Listeners**

-  Event listeners that are not removed can accumulate and cause memory leaks.

        element.removeEventListener('click', onClick);


4. **Multiple references**

- If you reference the same object from multiple objects, it can lead to a memory leak if one of the references is garbage collected while the other one is left dangling.


5. **Closures**

- Closures memorize their surrounding context. When a closure holds a reference to a large object in heap, it keeps the object in memory as long as the closure is in use.

## Best Practices:

1. Avoid Global vars
2. Remove Timers and Callbacks
3. Remove Event listeners, use event delegation
4. Use WeakRef to avoid multiple references
5. Proper usage of closures
6. Use stack and heap memory efficiently

---

### Node js memory leak detectors:

**1. Memwatch**

- memwatch is a Node.js library used for monitoring memory usage and detecting memory leaks in applications. 
- It provides tools for tracking memory allocation and identifying potential issues related to memory consumption.


- `Heap Snapshot Analysis` - Captures snapshots of the memory heap, allowing you to analyze the state of memory at specific points in time.
- `Leak Detection` - Monitors memory allocation and usage patterns to detect potential memory leaks by identifying objects that are not being properly garbage collected.
- `Event-Driven Notifications`- Provides events for various memory-related conditions, such as heap growth or garbage collection.
- `Tracking Allocation Rates` - Measures and reports on the rate of memory allocations, helping to identify abnormal or excessive memory usage.

---

**2. Heapdump**

- heapdump is a Node.js module used for generating and analyzing heap snapshots to monitor and debug memory usage in Node.js applications. 

`Heap Snapshot Creation` - Generates a snapshot of the memory heap, which includes information about objects, their sizes, and references.

`Snapshot Analysis` - Provides tools for analyzing heap snapshots to identify memory usage patterns and potential leaks.

`Programmatic Access` - Allows you to trigger heap snapshots from your code or via command-line arguments.

`Integration with Chrome DevTools` - Heap snapshots generated by heapdump can be analyzed using Chrome DevTools or other tools that support the V8 heap snapshot format.

---

**3. V8 Engine and Chrome dev tools**

The --inspect flag in Node.js allows you to enable the Node.js debugging protocol, which can be used to connect debugging tools like Chrome DevTools or Visual Studio Code to your Node.js application.

        node --inspect app.js

---

## Chrome dev-tools:

- Chrome DevTools is a set of web development tools built directly into the Google Chrome browser. 
- It provides a range of features for debugging, profiling, and optimizing web applications and websites. 


![alt text](image.png)


![alt text](image-1.png)


## Object Pooling:

- Object pooling is a design pattern used to manage and reuse objects efficiently in software development, particularly to optimize performance and reduce resource allocation overhead. 

`Object Pool:`

A collection of reusable objects that are kept in a pool. When an object is needed, it is retrieved from the pool rather than being created anew. After use, the object is returned to the pool for future reuse.

`Object Lifecycle:`

- `Creation:` Objects are created and added to the pool when the pool is initialized or when more objects are needed.

- `Checkout:` An object is retrieved from the pool for use.

- `Return:` After use, the object is returned to the pool, making it available for reuse.

- `Destruction:`  Objects that are no longer needed or are beyond their useful life are removed from the pool.

---

## Monitoring tools:

- Proper monitoring tools needed to give you historical data a time dimension where you can track and gain real insight into how your app is behaving.

- Sematext Monitoring
- PM2
- Clinic.js
- Express Status Monitor


---

## Threads:

- A thread in Node.js is a separate execution context in a single process. It is a lightweight, independent unit of processing that can run in parallel with other threads within the same process.

- Node.js uses two kinds of threads: a main thread handled by the event loop and several auxiliary threads in the worker pool. In the context of Node.js, auxiliary thread or thread is interchangeably used for worker threads. 

- In Node.js, the main thread is the initial execution thread that starts when Node.js starts. 

- It is responsible for the execution of JavaScript code and handling incoming requests. A worker thread is a separate execution thread that runs alongside the main thread.

## Worker Threads:

- For CPU-bound tasks or operations that can benefit from parallel execution, Node.js introduced the Worker Threads module. 

- This allows you to create multiple threads within a Node.js application to perform tasks in parallel.


## Why Use Threads?

The primary purpose of threads is to enable parallel processing within a single process. This is particularly beneficial for tasks involving waiting, such as:

`I/O operations:`

Reading from a file, sending data over a network, or waiting for user input are all examples of I/O operations. While one thread waits for an I/O operation to complete, other threads can continue executing, preventing the entire process from stalling.

`Long calculations:` 

If a process involves lengthy calculations, other threads can continue working on separate tasks instead of waiting for the calculation to finish.


---

## Benefits of Using Threads:

`Improved Performance:` By allowing multiple tasks to run concurrently, threads can significantly enhance the responsiveness and performance of an application.

`Efficient Resource Utilization:` Threads enable better utilization of multiple CPU cores in a system. With multiple threads, the workload gets distributed, leading to faster processing.

`Scalability:` Applications that leverage threads can scale more effectively to handle increasing workloads by taking advantage of additional CPU core

---

## Worker threads:

Worker threads are a type of thread in Node.js that can be used to perform CPU-bound tasks in parallel. They are created using the `worker_threads` module.


                const SIZE = 1000000000;
                const array = Array.from({ length: SIZE }, (_, i) => i + 1);
                const sum = array.reduce((acc, num) => acc + num, 0);
                console.log('Total sum:', sum);

In practice, handling such a large array in a single-threaded environment like Node.js without parallel processing or optimizations is likely to be impractical.

`CPU-Bound Tasks:` 

- The task of summing a very large array is CPU-bound, meaning it requires significant processing power. 
- By using multiple worker threads, you can divide this task into smaller chunks and process them in parallel, leveraging multiple CPU cores.

`Efficiency:` 

-  While the main thread is busy processing one part of the data, other threads can handle different parts concurrently, reducing the overall time required to complete the computation.


`Use Worker Threads to sum a large array by splitting it into chunks:`

        // worker.js

        const { parentPort } = require('worker_threads');
        parentPort.on('message', (chunk) => {
        const sum = chunk.reduce((acc, num) => acc + num, 0);
        parentPort.postMessage(sum);
        });


        // main thread

        const { Worker } = require('worker_threads');
        const path = require('path');

        // Constants
        const SIZE = 1000000000; 
        const WORKERS = 4; 

        // Function to create a worker
        function createWorker(chunk) {
        return new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve(__dirname, 'worker.js'));
        worker.postMessage(chunk);
        worker.on('message', resolve);
        worker.on('error', reject);
        });
        }

        function chunkArray(array, size) {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
        }
        return chunks;
        }

        async function main() {
        const array = Array.from({ length: SIZE }, (_, i) => i + 1);
        const chunks = chunkArray(array, SIZE / WORKERS);

        const sums = await Promise.all(chunks.map(createWorker));
        const totalSum = sums.reduce((acc, sum) => acc + sum, 0);
        console.log('Total sum:', totalSum);
        }

        main();


Using Worker Threads is beneficial for handling large data sets,

- Leverage multiple CPU cores for parallel processing.
- Keep the main thread responsive by offloading intensive computations.
- Manage memory more effectively by processing data in chunks.


---

## Clustering:

 - Clustering allows us to create multiple worker processes to handle incoming requests, resulting in improved performance and better utilization of system resources.

 - Clustering in Node.js involves creating multiple worker processes that share the incoming workload. 
 - Each worker process runs in its own event loop, utilizing the available CPU cores. The master process manages the worker processes, distributes incoming requests, and handles process failures.

 ## Without clustering:

        const express = require('express');

        const app = express();

        // Configure your Express app
        // ...

        const server = app.listen(3000, () => {
        console.log('Server is running on port 3000');
        });


In this simplified example, there is no clustering, and the application runs on a single process.

## With clustering:


        const cluster = require('cluster');
        const os = require('os');
        const express = require('express');

        const numCPUs = os.cpus().length;

        if (cluster.isMaster) {
        console.log(`Master process ${process.pid} is running`);

        for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker process ${worker.process.pid} died. Restarting...`);
        cluster.fork();
        });
        } else {
        const app = express();

        // Configure your Express app
        // ...

        const server = app.listen(3000, () => {
        console.log(`Worker process ${process.pid} is listening on port 3000`);
        });
        }


cluster: Module for creating child processes (workers) to take advantage of multi-core systems.

`Master Process:`

Forks worker processes equal to the number of CPU cores.
Monitors worker processes and restarts them if they crash.

`Worker Processes:`

Each worker process runs its own instance of the Express server.
Each server listens on the same port (3000), but because of the clustering, requests will be distributed among the worker processes.


---


| **Feature**                   | **Worker Threads**                                    | **Cluster**                                           |
|-------------------------------|--------------------------------------------------------|-------------------------------------------------------|
| **Purpose**                   | Offload CPU-intensive tasks from the main thread      | Scale applications across multiple CPU cores         |
| **Architecture**              | Multi-threaded within a single process                | Multi-process with separate memory spaces            |
| **Memory Model**              | Shared memory space with the main thread              | Separate memory space for each process               |
| **Communication**             | Message passing using `postMessage` and `on('message')` | Inter-process communication (IPC)                    |
| **Overhead**                  | Lower overhead; lightweight compared to processes     | Higher overhead due to process-based IPC             |


---

## Service web workers:

- Service Workers are a special type of Web Worker that run in the background of a web browser, separate from the web page, and provide powerful capabilities to enhance web applications.

`Caching and offline support`:

- Service Workers can intercept network requests and cache responses. 
-  This enables web applications to function offline or in low-network conditions by serving cached content when the network is unavailable.

`Background support`:

- They can handle background synchronization tasks, allowing web applications to sync data with a server even when the user is offline and reconnects later.

`Service Workers`:

- This can receive and handle push notifications from a server, allowing web applications to send updates or alerts to users even when the app is not actively open.

`Lifecycle Stages of Service web workers`:

`- Registration`

 A Service Worker is registered using JavaScript in the main thread, typically within a web page. The registration process involves specifying the script file for the Service Worker.

`- Installation`

Once registered, the browser will install the Service Worker. During the installation phase, you typically cache necessary assets for offline use.

`- Activation`

 After installation, the Service Worker is activated. This phase involves cleaning up old caches and preparing the Service Worker to handle fetch events.

`- Fetching`

After activation, the Service Worker listens to fetch events and can respond with cached assets or fetch from the network.

`- Termination`

Service Workers can be terminated by the browser when not in use and restarted as needed. 

---

## Streams:

- Streams are a powerful abstraction used to handle data that is read or written in chunks over time, rather than all at once.

- Makes it efficient for both memory and performance.

## Types of Streams in Node.js:

There are namely four types of streams in Node.js.

- `Writable:` We can write data to these streams.

- `Readable:` We can read data from these streams.

- `Duplex:` Streams that are both, Writable as well as Readable.

- `Transform:` Streams that can modify or transform the data as it is written and read.

---


## Readable streams:

From stream module, we can use readable to create a readable stream

        const { Readable } = require('stream');

        const readable = new Readable({
        read(size) {
        this.push('Hello, ');
        this.push('world!');
        this.push(null); 
        }
        });

        readable.on('data', chunk => {
        console.log(chunk.toString()); 
        });

`The readable.destroy()`

- This method is an inbuilt application programming interface of Stream module which is used to destroy the stream.

`pause():` Temporarily stops the flow of data from the readable stream. When the stream is paused, it will not emit any data events until it is resumed.

`resume():`

This resumes the execution flow

## Writable stream:

From stream module, we can use writable to create a writable stream

        const { Writable } = require('stream');

        const writable = new Writable({
        write(chunk, encoding, callback) {
        console.log(chunk.toString()); 
        callback();
        }
        });

        writable.write('Hello, ');
        writable.write('world!');
        writable.end();


`writable.destroy`:

- The writable.destroy() method is an inbuilt application programming interface of Stream module which is used to destroy the created stream and you cannot call the write() method to write data again after you have already destroyed the created stream.

`writable.end`:

- The writable.end() method is an inbuilt application programming interface of - Stream module so that no more data can be written to the Writable anymore. 

## Pipe:

- The pipe method in Node.js is used to connect a readable stream to a writable stream. 
- It automatically handles the flow of data from the readable stream to the writable stream.

        const { Readable, Writable } = require('stream');

        const readable = new Readable({
        read(size) {
        this.push('Hello, ');
        this.push('world!');
        this.push(null);
        }
        });

        const writable = new Writable({
        write(chunk, encoding, callback) {
        console.log(chunk.toString()); 
        callback();
        }
        });

        // Pipe the readable stream to the writable stream
        readable.pipe(writable);

## Duplex streams:

- This `combines both reading and writing into a single stream instance.` By creating a custom duplex stream, you handle both input and output within the same object, allowing for more complex interactions where you both produce and consume data.

        const { Duplex } = require("stream");

        const duplexStream = new Duplex({
        read() {
        this.push("Hello World!");
        this.push(null);
        },
        write(chunk, encoding, next) {
        console.log(chunk.toString());
        next();
        },
        });

        duplexStream.pipe(process.stdout);

        duplexStream.write("Hello");


## Transform stream:

- Transform stream is a type of duplex stream that can modify or transform data as it is read from a readable stream and then written to a writable stream.

        const { Transform } = require('stream');

        const transform = new Transform({
        transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
        }
        });

        process.stdin.pipe(transform).pipe(process.stdout);


---

