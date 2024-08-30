const { parentPort } = require('worker_threads');
parentPort.on('message', (chunk) => {
  const sum = chunk.reduce((acc, num) => acc + num, 0);
  parentPort.postMessage(sum);
});
