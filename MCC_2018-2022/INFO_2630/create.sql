/*
--------------------------------------------------------------------
Aaron Mahoney
Final Review Assignment
INFO 2630 WW
5/18/2022
--------------------------------------------------------------------
*/


IF DB_ID (N'school') IS NOT NULL
DROP DATABASE school;
GO
CREATE DATABASE school;
GO
USE school;
GO

--create students
DROP TABLE IF EXISTS students;
CREATE TABLE students (
	stu_id INT IDENTITY (1, 1) PRIMARY KEY,
	fname VARCHAR (45) NOT NULL,
	lname VARCHAR (45) NOT NULL,
	area_code CHAR (3) NOT NULL,
	phone VARCHAR (8) NOT NULL
);

--insert students
SET IDENTITY_INSERT students ON;  

INSERT INTO students(stu_id,fname, lname, area_code, phone) VALUES(1,'patty', 'melt', '402', '234-9876');
INSERT INTO students(stu_id,fname, lname, area_code, phone) VALUES(2,'bill', 'fold', '402', '531-6222');
INSERT INTO students(stu_id,fname, lname, area_code, phone) VALUES(3,'sam', 'winchester', '402', '234-2346');
INSERT INTO students(stu_id,fname, lname, area_code, phone) VALUES(4,'luke', 'skywalker', '402', '543-1234');
INSERT INTO students(stu_id,fname, lname, area_code, phone) VALUES(5,'charlie', 'kelly', '402', '234-6859');
INSERT INTO students(stu_id,fname, lname, area_code, phone) VALUES(6,'bilbo', 'baggins', '531', '646-3828');

SET IDENTITY_INSERT students OFF;

--create classes
DROP TABLE IF EXISTS classes;
CREATE TABLE classes (
	class_id INT IDENTITY (1, 1) PRIMARY KEY,
	name VARCHAR (45) NOT NULL,
	dept CHAR (4) NOT NULL,
	number CHAR (4) NOT NULL,
	section CHAR (2) NOT NULL,
	location VARCHAR (45) NOT NULL,
	meeting_time VARCHAR (45)
);

--insert classes
SET IDENTITY_INSERT classes ON;  

INSERT INTO classes(class_id,name, dept, number, section, location, meeting_time) VALUES(1,'intro. to databases', 'info', '1620', '1a', 'sarpy 214', 'm/w 1-2:45 pm');
INSERT INTO classes(class_id,name, dept, number, section, location, meeting_time) VALUES(2,'intro. to sql', 'info', '2630', 'ww', 'online', '');
INSERT INTO classes(class_id,name, dept, number, section, location, meeting_time) VALUES(3,'software engineering |', 'info', '1325', '4c', 'soc mahoney 205', 't/h 10-11:45 am');
INSERT INTO classes(class_id,name, dept, number, section, location, meeting_time) VALUES(4,'software engineering ||', 'info', '1335', 'ww', 'online', '');
INSERT INTO classes(class_id,name, dept, number, section, location, meeting_time) VALUES(5,'how to leave the shire & live forever', 'ring', '1001', '1r', 'soc mahoney 214', 'f 10-11:45 am');
INSERT INTO classes(class_id,name, dept, number, section, location, meeting_time) VALUES(6,'living with the demon inside', 'psyc', '1666', 'ww', 'online', '');
INSERT INTO classes(class_id,name, dept, number, section, location, meeting_time) VALUES(7,'internet scripting jedi mastery', 'info', '2430', '2b', 'soc mahoney 205', 'm/w 10-11:45 am');

SET IDENTITY_INSERT classes OFF;

--create enroll
DROP TABLE IF EXISTS enroll;
CREATE TABLE enroll (
	stu_id int,
	class_id int,
	grade CHAR (1),
	FOREIGN KEY (stu_id) REFERENCES students (stu_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (class_id) REFERENCES classes (class_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert enroll
INSERT INTO enroll(stu_id, class_id, grade) VALUES(1, 2, 'A');
INSERT INTO enroll(stu_id, class_id, grade) VALUES(2, 2, '');
INSERT INTO enroll(stu_id, class_id, grade) VALUES(5, 1, 'D');
INSERT INTO enroll(stu_id, class_id, grade) VALUES(5, 2, '');
INSERT INTO enroll(stu_id, class_id, grade) VALUES(6, 5, '');
INSERT INTO enroll(stu_id, class_id, grade) VALUES(3, 6, 'C');
