
function isPrime(n) {
  let isPrime = true;
  if (n <= 1) {
    isPrime = false;
  } else {
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) {
        isPrime = false;
        break;
      }
    }
  }
  return isPrime;
}

console.log(isPrime(1));
console.log(isPrime(2));
console.log(isPrime(3));
console.log(isPrime(4));
console.log(isPrime(5));
console.log(isPrime(6));