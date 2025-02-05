const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.port || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/api/classify-number");
});

app.get("/api/classify-number", async (req, res) => {
  try {
    let queryNumber = req.query.number;
    if (typeof parseInt(queryNumber) !== "number") {
      console.log("triggered");
      throw "not a number";
    }
    console.log(typeof queryNumber);

    let digitSum = getDigitSum(queryNumber);
    let isOdd = queryNumber % 2 === 1;
    let isArmstrong = isArmstrongNumber(queryNumber);

    let numberProperties = [];
    if (isArmstrong) {
      numberProperties.push("armstrong");
    }
    numberProperties.push(isOdd ? "odd" : "even");

    let funFact = await axios.get(`http://numbersapi.com/${queryNumber}/math`);

    let returnValue = {
      number: queryNumber,
      is_prime: isPrime(queryNumber),
      is_perfect: queryNumber === digitSum,
      properties: numberProperties,
      digit_sum: digitSum,
      fun_fact: funFact.data,
    };

    res.json(returnValue);
  } catch (error) {
    console.log(error);
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
  return isPrime;
}

function getDigitSum(n) {
  return n
    .toString()
    .split("")
    .reduce((sum, digit) => sum + parseInt(digit), 0);
}

function isArmstrongNumber(n) {
  if (n < 0) {
    return false;
  }
  let numStr = new String(n);
  const numDigits = numStr.length;

  let sum = 0;
  for (let char of numStr) {
    sum = sum + parseInt(char) ** numDigits;
  }
  return sum == n;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
