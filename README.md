# Automated Discount Ecommerce

### Description

Ecommerce store where an admin can set a coupon to automatically distribute to a customer every x transactions. On login, a customer should see if they have any discounts available and their relevant codes. Customers can use the discount code to purchase items. The admin should be able to view the total count of purchases made in the store and the overall count of discounts given out.

### Out of Scope / Out of Time

* Authentication & Authorization
   * Use example token for checkout functionality
* Persisting Data
* Input Validation

### Assumptions

* Payment processing functionality not required 

## Local Setup

### Server Startup

```
npm run dev
```

<p>Open localhost link to launch Apollo Studio.</p>

### Dependencies & Environment

* Install required dependencies

<p><i>Note: NVM is not required, but is recommended in order keep dependencies working as expected</i></p>

```
nvm use
npm install
```
* Use `.env.example` file to create your own `.env` file with relevant credentials

### Database Initialization

<p>Prerequisites:</p>

* MySQL is installed
* MySQL server is running


<p>Instructions:</p>

* Run SQL query to initialize the punchcard database.
```
CREATE DATABASE IF NOT EXISTS punchcard;
```

* Run migrations to initialize and seed the punchcard database.
```
npm run migrate:run:dev
```

## Queries & Mutations

<p><i>Note: When you initialize the server, if you open the relevant port, it will open Apollo Studio. This will give you access to all available queries and mutations as well as the documentation. Example inputs have been provided below.</i></p>

<p>Example Token for Customer1:</p>

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoyLCJlbWFpbCI6ImN1c3RvbWVyMUBleGFtcGxlLmNvbSJ9.7fmPqv0naJ5zz4Tm6ezASDU1X6EBh1Axjj8sJBYZKzg
```

### checkout

<p><i>Note: Set Authorization handler with provided example token</i></p>

```
{
  "input": {
    "couponCodes": "ABCDE",
    "items": [
      {
        "id": "2",
        "quantity": 3
      }
    ]
  }
}
```

### adminChangeActiveCoupon


```
{
  "input": {
    "couponCode": "LOYAL10",
    "purchasesRequired": 5,
    "dollarAmount": 10
  }
}
```

### adminCreateProduct

```
{
  "input": {
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "name": "USB-C Charging Cable",
    "price": 5.99,
    "stockQuantity": 20
  }
}
```

### adminDeleteProduct


```
{
  "productId": "1"
}
```

### adminUpdateProduct

```
{
  "input": {
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    "id": "1",
    "stockQuantity": 22
  }
}
```