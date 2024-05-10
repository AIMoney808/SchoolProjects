use tal;
--Exercises from A Guide to SQL (Pratt/Last 9th ed.)
--page 262


-- list customer number, full concat of address and name for all customers in Grove
-- the query should ignore case (i.e. grove == GrOvE == Grove)
-- pg. 229

-- List the customer number, name and balance rounded to nearest dollar 

-- List the order number, customer number, name, promotion date (20 days after order), & # days between order & today
-- pg. 232

-- Write the procedure to obtain the name and credit limit of the customer whose number is stored in custnum.
-- run the procedure for customer 126
-- pg. 249

--to run for cust 126:

-- write the procedure to retrieve & output the item number, description, storehouse number, and unit price of every item in the category stored in category
-- cursors explained on pg. 242
-- sql server example on pg. 250
--to execute sp for TOY category
--exec usp_DISP_ITEM_CATEGORY 'TOY';

-- write a stored procedure that will change the price of an item with a given item number.


--AH74 is 22.99
--set to 99.99 and back

--select * from item where ITEM_NUM = 'AH74';

-- write the code for the following trigger:
-- when updating a customer, add the difference between teh new balance and the old balance multiplied by the sales rep's commission rate to the commission for the corresponding sales rep
-- reference pg. 259

select * from customer c join rep r on c.REP_NUM = r. REP_NUM; 
-- commission is 23457.50 for rep_num 15
-- customer 126 balance is 1210.25
