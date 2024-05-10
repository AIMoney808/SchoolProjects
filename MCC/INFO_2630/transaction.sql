use tal;
--to turn off auto-commit:
--tools > options > Query execution > SQL Server > ANSI > Set implicit transactions (checked)

select * from nongame;

begin transaction
delete from nongame
where category = 'PZL';

rollback;
--select
update nongame 
set category = NULL
where item_num = 'FD11';
save transaction secondtrans;

insert into nongame
values ('TL93','Rubber Ducky', 10, 'TOY', 59.95);
--select
rollback transaction secondtrans;
--select
commit


