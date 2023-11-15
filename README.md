# Automated Discount Ecommerce

### Description

Ecommerce store where an admin can set a coupon to automatically distribute to a customer every x transactions. On login, a customer should see if they have any discounts available and their relevant codes. Customers can use the discount code to purchase items. The admin should be able to view the total count of purchases made in the store and the overall count of discounts given out.

### Out of Scope

* Authentication & Authorization
   * Seperate logins for admin and customer still needed but routes do not need to be locked
* Persisting Data

### Requirements

* Admin & Customer login
* Customer sign up
* Get catalog
* Get item
* Update item
* Create item
* Delete item
* View store overview
* Create coupon
* View own coupons
* View store coupons
* Update store punch card
* Buy items

### Frontend Stretch Goals

* Login / Signup View
* Dashboard View 
   * Admin - Store Overview
      * Update Punch Card
   * Customer - Product Catalog
      * Add to Cart / Buy Now
   * Admin - Product Catalog
      * Update Item Modal
      * Delete Item Modal 
* Cart 
   * Smaller Goal: Buy Now Button 
* Checkout View

## Local Setup

### Dependencies & Environment

* Install required dependencies

<p><i>Note: NVM is not required, but is recommended in order keep dependencies working as expected</i></p>

```
nvm use
npm install
```
* Use `.env.example` file to create your own `.env` file with relevant credentials

<p><i>Note: Keep salt rounds consistent to allow seeded admin and customer logins to function as expected</i></p>

```
Admin User--
username: admin_user
password: admin_password

John Doe--
username: customer1
password: customer_password1

Jane Doe--
username: customer2
password: customer_password2
```

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