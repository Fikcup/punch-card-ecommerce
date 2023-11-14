# Automated Discount Ecommerce

### Description

Ecommerce store where an admin can set a coupon to automatically distribute to a customer every x transactions. On login, a customer should see if they have any discounts available and their relevant codes. Customers can use the discount code to purchase items. The admin should be able to view the total count of purchases made in the store and the overall count of discounts given out.

### Out of Scope

* Authentication & Authorization
   * Seperate logins for admin and customer still needed but routes do not need to be locked
* Persisting Data

### Requirements

* Admin login
* Customer sign up
* Customer login
* Get catalog
* Get item
* Update item
* Create item
* Delete item
* View store history
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

## Database

### User
Attributes: UserID (Primary Key), Type(admin, customer), Username, Password, Email, FirstName, LastName.

### Product
Attributes: ProductID (Primary Key), Name, Description, Price, StockQuantity.

### Order
Attributes: OrderID (Primary Key), UserID (Foreign Key), OrderDate, TotalAmount.

### OrderItem
Attributes: OrderItemID (Primary Key), OrderID (Foreign Key), ProductID (Foreign Key), Quantity, Subtotal.

### Invoice
Attributes: InvoiceID (Primary Key), OrderID (Foreign Key), PaymentDate, PaymentMethod, Amount.