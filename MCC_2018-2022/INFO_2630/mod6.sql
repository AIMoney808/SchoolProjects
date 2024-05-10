/******************
Module 6: Updating Data
INFO 2630
Written by Lisa Thoendel
Last Updated Fall 2021
******************/

--<<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>><<>>--

use BikeStores;

-- Start by checking that implicit transactions are turned off: Tools > Options > Query Execution > SQL Server > ANSI > Set implicity_transactions should be unchecked

-- 1) Begin a transaction

-- 2) Create a new_products table with the same structure as the productts table.

-- 3) Record your changes to the database

-- 4) insert into new_products the values from the products table for those products newer than 2018.

-- 5) begin a new transaction. add the following item to the new products table:
--		product_id: 399, product_name: Pee-wee Schwinn Western Flyer, brand_id: 8, category_id: 3, model_year: 2021, list_price: 36600.00

-- 6) select everything from new products to see your inserted records

-- 7) roll back the changes made by our transaction

-- 8) select everything from noncat to see your inserted records

-- 9) Delete every item in new productsion with a price under $2000

-- 10) in new products, discount the price of product number 320 by 20%.

-- 11) add a column called dicontinued with a data type of char, length 1. set the value to 'N' for all rows.

-- 12) in new products, decrease the length of the name field to 50 characters

-- 13) drop the new products table
