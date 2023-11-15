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