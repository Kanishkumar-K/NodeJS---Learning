const { Worker } = require('worker_threads');
const path = require('path');

const SIZE = 1000000000; 
const WORKERS = 4; 

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
