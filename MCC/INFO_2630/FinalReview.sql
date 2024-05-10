/*
--------------------------------------------------------------------
Aaron Mahoney
Final Review Assignment
INFO 2630 WW
5/18/2022
--------------------------------------------------------------------
*/

use school;
go

--#1
select s.fname, s.lname, c.name, c.dept, c.number, c.section, e.grade
from enroll e
join classes c on  e.class_id = c.class_id
join students s on e.stu_id = s.stu_id
where s.lname = 'melt' or s.lname = 'baggins'
;

--#2
insert into enroll (stu_id, class_id, grade)
values ((select stu_id from students where lname = 'skywalker'),
(select class_id from classes where number = '2430'), '') 
;
 
--#3
insert into students
values ('rory', 'williams', '236', '887-4061')
;

--#4
select stu_id
from students
where lname = 'williams'
;

--#5
insert into enroll (stu_id, class_id, grade)
values ((select stu_id from students where lname = 'williams'),
(select class_id from classes where number = '1325'), ''),
((select stu_id from students where lname = 'williams'),
(select class_id from classes where number = '1001'), '')
;

--#6
delete from enroll
where stu_id = 5 and class_id = 2
;

--#7
update enroll
set grade = 'B'
where stu_id = 4 and class_id = 7
;

--#8
select c.name, c.dept, c.number, c.section
from classes c
where not exists(
	select *
	from enroll e
	where c.class_id = e.class_id
);

--#9
select stu_id, count(grade) as current_course_count
from enroll
where grade = ''
group by stu_id
;
