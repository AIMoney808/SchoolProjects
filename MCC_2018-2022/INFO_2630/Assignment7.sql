use BikeStores;
go

--#1
create view CUSTOMER_OPEN_ORDERS as
select c.customer_id, c.last_name, 
	c.first_name, c.zip_code, o.order_id
from orders as o
inner join customers as c  on c.customer_id=o.customer_id
where order_status = 1 or order_status = 2
;
go
--#2
select last_name, zip_code
from CUSTOMER_OPEN_ORDERS
where left("zip_code", 3) between 99 and 149
;
go
--#3
create view PRODUCT_SUMMARY as
select p.product_id, p.product_name,
	ca.category_name, b.brand_name
from products p
join categories ca on p.category_id = ca.category_id
join brands b on p.brand_id = b.brand_id
;
go
--#4
select *
from PRODUCT_SUMMARY
where product_id = 40
;

--#5
grant select on products to John;

--#6
grant insert on categories to Sally, Mary;

--#7
grant update on orders(order_status) to John, Sally, Mary;

--#8
create index orders_index1 on orders(order_date);