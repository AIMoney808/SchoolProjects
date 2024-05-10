use TAL;
go
-- pg 221
-- #1
-- pt. a
create view major_customer as
select CUSTOMER_NUM, CUSTOMER_NAME, 
	BALANCE, CREDIT_LIMIT, REP_NUM
from CUSTOMER
where CREDIT_LIMIT <= 10000;
-- pt. b
select CUSTOMER_NUM, CUSTOMER_NAME
from major_customer
where balance > CREDIT_LIMIT;

-- #2
-- pt. a
create view item_order as
select i.ITEM_NUM, i.DESCRIPTION, i.PRICE,
	ol.ORDER_NUM, o.ORDER_DATE, ol.NUM_ORDERED,
	ol.QUOTED_PRICE
from item i
join order_line ol on i.ITEM_NUM = ol.ITEM_NUM
join orders o on o.ORDER_NUM = ol.ORDER_NUM;
-- pt. b
select ITEM_NUM, DESCRIPTION, ORDER_NUM, QUOTED_PRICE
from item_order
where QUOTED_PRICE > 100;

--#4
--pt. a
grant select on item to ashton;
--pt. b
grant insert on orders to kelly, morgan;
grant insert on order_line to kelly, morgan;
--pt. c
grant update on items to james;
revoke * on items to james;

--#6
create index item_index1 on order_line(item_num);
-- pt. b
create index item_index2 on item(category);

--#9
alter table order_line
add foreign key(order_num) references orders(order_num);
alter table order_line
add foreign key(item_num) references item(item_num);

--#10
alter table customer
add check (credit_limit in (5000,7500, 10000, 15000));

dbcc checkconstraints with all_constraints;

select distinct credit_limit
from customer;