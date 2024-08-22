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
  