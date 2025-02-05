# HNG 12 Backend Task 1

This is a task for HNG 12 internship. This project is an API that takes a number and 
returns interesting mathematical properties about it, along with a fun fact.


## Endpint: `curl https://hng-12-backend-task-1.vercel.app/api/classify-number?number=20`

## Return format of successful request (200 OK):
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,  // sum of its digits
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371" //gotten from the numbers API
}

## Return format of bad request (400 Bad Request):
{
    "number": "alphabet",
    "error": true
}

The project is built using Node/Express.js.

## API documentation
Endpoint URL: https://hng-12-backend-task-0.vercel.app/

