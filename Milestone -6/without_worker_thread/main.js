const SIZE = 1000000000;
const array = Array.from({ length: SIZE }, (_, i) => i + 1);
const sum = array.reduce((acc, num) => acc + num, 0);
console.log('Total sum:', sum);
