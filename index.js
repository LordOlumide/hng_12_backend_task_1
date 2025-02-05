const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.port || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/classify-number", async (req, res) => {
  try {
    let queryNumber = req.query.number;
    if (typeof number !== 'number') {
      throw "not a number";
    }

    let digitSum = getDigitSum(queryNumber);
    let isOdd = queryNumber % 2 === 1;
    let isArmstrong = isArmstrongNumber(queryNumber);

    let numberProperties = [];
    if (isArmstrong) {
      numberProperties.push("armstrong");
    }
    numberProperties.push(isOdd ? "odd" : "even");
    
    let returnValue = {
      number: queryNumber,
      is_prime: isPrime(queryNumber),
      is_perfect: queryNumber === digitSum,
      properties: numberProperties,
      digit_sum: digitSum,
      fun_fact: await axios.get(`http://numbersapi.com/${queryNumber}/math`),
    };

    res.json(returnValue);
  } catch (error) {
    let errorReturnValue = {
      number: "alphabet",
      error: true,
    };
    res.status(400).json(errorReturnValue);
  }
});

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
}

function getDigitSum(n) {
  Math.abs(n)
    .toString()
    .split("")
    .reduce((sum, char) => sum + parseInt(char, 10), 0);
}

function isArmstrongNumber(n) {
  if (n < 0) {
    return false;
  }
  const numStr = n.toString();
  const numDigits = numStr.length;

  let sum = 0;
  for (let char of numStr) {
    const digit = parseInt(char, 10);
    sum += Math.pow(digit, numDigits);
  }
  return sum === n;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
