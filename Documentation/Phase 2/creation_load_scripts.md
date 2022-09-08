create database scheduler;

use scheduler;

create table person(
	email varchar(30) NOT NULL,
	first_name varchar(30),
	last_name varchar(30),
	PRIMARY KEY (email),
	CONSTRAINT email_unique UNIQUE (email)
	);

create table student(
	email varchar(30) primary key,
	v_number varchar(9) NOT NULL,
    CONSTRAINT vnumber_unique UNIQUE (v_number)
	);

create table teacher_assistant(
	email varchar(30) primary key,
	v_number varchar(9),
	ta_id varchar(6),
    CONSTRAINT ta_id_unique UNIQUE (ta_id)
);	

create table professor(
	email varchar(30) primary key,
	professor_id varchar(6),
    CONSTRAINT professor_id_unique UNIQUE (professor_id)
);

create table course(
	course_id varchar(8) NOT NULL,
	title varchar(50),
	PRIMARY KEY (course_id)
);

create table section(
	section_id varchar(3) NOT NULL,
	semester varchar(6),
	year int,
	start_time time,
	end_time time,
	day varchar(7), 
	course_id varchar(8),
	PRIMARY KEY (course_id, section_id, semester, year),
	CHECK (end_time > start_time)
	);

create table tas_for(
	course_id varchar(8) NOT NULL,
	section_id varchar(3) NOT NULL,
	semester varchar(6),
	year int,
	email varchar(30),
	primary key (course_id, section_id, semester, year, email)
);


create table teaches(
	course_id varchar(8) NOT NULL,
	section_id varchar(3) NOT NULL,
	semester varchar(6),
	year int,
	email varchar(30),
	primary key(course_id, section_id, semester, year)
);

create table takes(
	course_id varchar(8) NOT NULL,
    section_id varchar(3) NOT NULL,
	semester varchar(6),
	year int,
	email varchar(30), 
	grade float,
	primary key (course_id, email)
);

create table assignment(
	assignment_id varchar(7) primary key, 
	name varchar(45),
	due_date date,
	time time,
	description varchar(200)
);

create table assigns(
	assignment_id varchar(7), 
	course_id varchar(8) NOT NULL,
	section_id varchar(3) NOT NULL,
	semester varchar(6),
	year int,
	primary key(assignment_id)
);

create table study_session(
	date date, 
	location varchar(200),
	start_time time,
	end_time time,
	course_name varchar(50),
	mode varchar(8),
    PRIMARY KEY (date, location, start_time),
	CHECK (end_time > start_time)
	);

create table review(
	assignment_id varchar(7),
	date date,
	location varchar(200),
	start_time time,
	primary key(assignment_id, date, location, start_time)
);

create table works_on(
	email varchar(30),
	assignment_id varchar(7),
	primary key (email, assignment_id)
);

create table hosts(
	email varchar(30) NOT NULL,
	date date,
	location varchar(200),
	start_time time,
    primary key (email, date, location, start_time)
);

create table office_hours(
	day varchar(7),
	location varchar(200),
	start_time time,
	end_time time,
	mode varchar(8),
    primary key (day, location, start_time),
	CHECK (end_time > start_time)
);

create table has(
	day varchar(7),
	start_time time,
	location varchar(200),
	course_id varchar(8) NOT NULL,
	section_id varchar(3) NOT NULL,
	semester varchar(6),
	year int,
	primary key (day, start_time, location)
);

create table attends(
	email varchar(30) NOT NULL,
	date date,
	location varchar(200),
	start_time time,
    primary key (email, date, location, start_time)
);

create table visits(
	email varchar(30),
	day varchar(7),
	start_time time,
	location varchar(200),
	primary key(email, day, start_time, location)
);

create table event(
	email varchar(30),
	start_time time,
	end_time time,
	date date,
	task varchar(100),
    PRIMARY KEY (email, start_time, end_time, date),
	CHECK (end_time > start_time)
);

alter table section
add constraint 
foreign key(course_id) references course(course_id) on update cascade on delete cascade;

alter table event
add constraint 
foreign key(email) references person(email) on update cascade on delete cascade;	

alter table professor
add constraint 
foreign key(email) references person(email) on update cascade on delete cascade;	

alter table student
add constraint 
foreign key(email) references person(email) on update cascade on delete cascade;	

alter table teacher_assistant
add constraint 
foreign key(email) references person(email) on update cascade on delete cascade;

alter table teacher_assistant
add constraint 
foreign key(v_number) references student(v_number) on update cascade on delete cascade;

alter table study_session
add constraint
foreign key(course_name) references course(course_id) on update cascade on delete cascade;

create index location_study_session_idx on study_session(location);

create index email_idx on person(email);

create index date_study_session_idx on study_session(date);

create index start_time_study_session_idx on study_session(start_time);

create index course_id_idx on course(course_id);

create index assignment_id_idx on assignment(assignment_id);

create index section_id_idx on section(section_id);

create index semester_section_idx on section(semester);

create index year_section_idx on section(year);

create index location_office_hours_idx on office_hours(location);

create index start_time_office_hours_idx on office_hours(start_time);

create index day_office_hours_idx on office_hours(day);

alter table tas_for
add constraint foreign key(email) references person(email) on update cascade on delete cascade,
add constraint foreign key(course_id) references course(course_id) on update cascade on delete cascade,
add constraint foreign key(section_id) references section(section_id) on update cascade on delete cascade,
add constraint foreign key(semester) references section(semester) on update cascade on delete cascade,
add constraint foreign key(year) references section(year) on update cascade on delete cascade;

alter table teaches
add constraint foreign key(email) references person(email) on update cascade on delete cascade,
add constraint foreign key(course_id) references course(course_id) on update cascade on delete cascade,
add constraint foreign key(section_id) references section(section_id) on update cascade on delete cascade,
add constraint foreign key(semester) references section(semester) on update cascade on delete cascade,
add constraint foreign key(year) references section(year) on update cascade on delete cascade;

alter table takes
add constraint foreign key(email) references person(email) on update cascade on delete cascade,
add constraint foreign key(course_id) references course(course_id) on update cascade on delete cascade,
add constraint foreign key(section_id) references section(section_id) on update cascade on delete cascade,
add constraint foreign key(semester) references section(semester) on update cascade on delete cascade,
add constraint foreign key(year) references section(year) on update cascade on delete cascade;

alter table works_on
add constraint foreign key(email) references person(email) on update cascade on delete cascade,
add constraint foreign key(assignment_id) references assignment(assignment_id) on update cascade on delete cascade;

alter table review
add constraint foreign key(assignment_id) references assignment(assignment_id) on update cascade on delete cascade,
add constraint foreign key(date) references study_session(date) on update cascade on delete cascade,
add constraint foreign key(location) references study_session(location) on update cascade on delete cascade,
add constraint foreign key(start_time) references study_session(start_time) on update cascade on delete cascade;

alter table assigns
add constraint foreign key(assignment_id) references assignment(assignment_id) on update cascade on delete cascade,
add constraint foreign key(course_id) references course(course_id) on update cascade on delete cascade,
add constraint foreign key(section_id) references section(section_id) on update cascade on delete cascade,
add constraint foreign key(semester) references section(semester) on update cascade on delete cascade,
add constraint foreign key(year) references section(year) on update cascade on delete cascade;

alter table hosts
add constraint foreign key(email) references person(email) on update cascade on delete cascade,
add constraint foreign key(date) references study_session(date) on update cascade on delete cascade,
add constraint foreign key(location) references study_session(location) on update cascade on delete cascade,
add constraint foreign key(start_time) references study_session(start_time) on update cascade on delete cascade;

alter table has
add constraint foreign key(location) references office_hours(location) on update cascade on delete cascade,
add constraint foreign key(start_time) references office_hours(start_time) on update cascade on delete cascade,
add constraint foreign key(day) references office_hours(day) on update cascade on delete cascade,
add constraint foreign key(course_id) references course(course_id) on update cascade on delete cascade,
add constraint foreign key(section_id) references section(section_id) on update cascade on delete cascade,
add constraint foreign key(semester) references section(semester) on update cascade on delete cascade,
add constraint foreign key(year) references section(year) on update cascade on delete cascade;

alter table attends
add constraint foreign key(email) references person(email) on update cascade on delete cascade,
add constraint foreign key(date) references study_session(date) on update cascade on delete cascade,
add constraint foreign key(location) references study_session(location) on update cascade on delete cascade,
add constraint foreign key(start_time) references study_session(start_time) on update cascade on delete cascade;

alter table visits
add constraint foreign key(email) references person(email) on update cascade on delete cascade,
add constraint foreign key(location) references office_hours(location) on update cascade on delete cascade,
add constraint foreign key(start_time) references office_hours(start_time) on update cascade on delete cascade,
add constraint foreign key(day) references office_hours(day) on update cascade on delete cascade;





















-- SQL Load Scripts

-- *************************** Insert data into the person table

INSERT INTO person VALUES ('doej1@vcu.edu', 'John', 'Doe');

INSERT INTO person VALUES ('mcdonaldh@vcu.edu', 'Howard', 'McDonald');

INSERT INTO person VALUES ('doej2@vcu.edu', 'Jane', 'Doe');

INSERT INTO person VALUES ('smithj@vcu.edu', 'John', 'Smith');

INSERT INTO person VALUES ('smitha@vcu.edu', 'Alice', 'Smith');

INSERT INTO person VALUES ('doej3@vcu.edu', 'John', 'Doe');

INSERT INTO person VALUES ('johnsonj@vcu.edu', 'Julia', 'Johnson');

-- *************************** Insert data into the student table

INSERT INTO student VALUES ('doej1@vcu.edu', 'V00123456');

INSERT INTO student VALUES ('mcdonaldh@vcu.edu', 'V00345678');

INSERT INTO student VALUES ('doej2@vcu.edu', 'V00861711');

INSERT INTO student VALUES ('smitha@vcu.edu', 'V00987345');

INSERT INTO student VALUES ('johnsonj@vcu.edu', 'V00456123');

-- *************************** Insert data into the teachers_assistant table 

INSERT INTO teacher_assistant VALUES ('doej1@vcu.edu', 'V00123456', '123456');

INSERT INTO teacher_assistant VALUES ('doej2@vcu.edu', 'V00861711', '987654');

-- *************************** Insert data into the professor table

INSERT INTO professor VALUES ('smithj@vcu.edu', '423513'); 

INSERT INTO professor VALUES ('doej3@vcu.edu', '423512');

-- *************************** Insert data into the course table

INSERT INTO course VALUES ('CMSC508', 'Database Theory');

INSERT INTO course VALUES ('CMSC409', 'Artificial Intelligence');

INSERT INTO course VALUES ('CMSC257', 'Data Structures and Object Oriented Programming');

INSERT INTO course VALUES ('CMSC451', 'Senior Project I');

--  ***************************Insert data into the section table 

INSERT INTO section VALUES ('001', 'Fall', '2021', '15:30', '16:45', 'TR', 'CMSC508');

INSERT INTO section VALUES ('002', 'Fall', '2021', '15:30', '16:45', 'TR', 'CMSC508');

INSERT INTO section VALUES ('001', 'Spring', '2021', '15:30', '16:45', 'TR', 'CMSC508');

INSERT INTO section VALUES ('003', 'Fall', '2021', '15:30', '16:45', 'MW', 'CMSC508');

INSERT INTO section VALUES ('001', 'Fall', '2021', '9:30', '10:45', 'TR', 'CMSC409');

INSERT INTO section VALUES ('001', 'Fall', '2020', '15:30', '16:45', 'TR', 'CMSC508');

INSERT INTO section VALUES ('001', 'Fall', '2021', '17:30', '18:45', 'TR', 'CMSC451');

INSERT INTO section VALUES ('001', 'Fall', '2021', '11:00', '11:50', 'MWF', 'CMSC257');

--  *************************** Insert data into the takes table

INSERT INTO takes VALUES ('CMSC451', '001', 'Fall', 2021, 'doej1@vcu.edu', 96.8);

INSERT INTO takes VALUES ('CMSC409', '001', 'Fall', 2021, 'smitha@vcu.edu', 91.0);

INSERT INTO takes VALUES ('CMSC257', '001', 'Fall', 2021, 'mcdonaldh@vcu.edu', 94.5);

INSERT INTO takes VALUES ('CMSC508', '001', 'Fall', 2021, 'smitha@vcu.edu', 86.2);

INSERT INTO takes VALUES ('CMSC451', '001', 'Fall', 2021, 'doej2@vcu.edu', 83.4);

INSERT INTO takes VALUES ('CMSC257', '001', 'Fall', 2021, 'smitha@vcu.edu', 91.5);

INSERT INTO takes VALUES ('CMSC257', '001', 'Fall', 2021, 'johnsonj@vcu.edu', 93.5);

-- *************************** Insert data into the teaches table

INSERT INTO teaches VALUES ('CMSC508', '001', 'Fall', 2021, 'smithj@vcu.edu');

INSERT INTO teaches VALUES ('CMSC508', '002', 'Fall', 2021, 'doej3@vcu.edu');

INSERT INTO teaches VALUES ('CMSC508', '001', 'Spring', 2021, 'smithj@vcu.edu');

INSERT INTO teaches VALUES ('CMSC508', '001', 'Fall', 2020, 'smithj@vcu.edu');

INSERT INTO teaches VALUES ('CMSC409', '001', 'Fall', 2021, 'doej3@vcu.edu');

INSERT INTO teaches VALUES ('CMSC257', '001', 'Fall', 2021, 'smithj@vcu.edu');

INSERT INTO teaches VALUES ('CMSC451', '001', 'Fall', 2021, 'doej3@vcu.edu');

-- ***************************  Insert data into the tas_for table 

INSERT INTO tas_for VALUES ('CMSC508', '001', 'Fall', 2020, 'doej1@vcu.edu');

INSERT INTO tas_for VALUES ('CMSC508', '001', 'Spring', 2021, 'doej1@vcu.edu');

INSERT INTO tas_for VALUES ('CMSC508', '001', 'Fall', 2021, 'doej1@vcu.edu');

INSERT INTO tas_for VALUES ('CMSC409', '001', 'Fall', 2021, 'doej1@vcu.edu');

INSERT INTO tas_for VALUES ('CMSC508', '002', 'Fall', 2021, 'doej2@vcu.edu');

INSERT INTO tas_for VALUES ('CMSC409', '001', 'Fall', 2021, 'doej2@vcu.edu');

-- *************************** Insert data into the assignment table

INSERT INTO assignment VALUES ('000001', 'Project 1', '2021-12-20', '12:00', 'Introduction to Training Neurons');

INSERT INTO assignment VALUES ('000002', 'Project 1', '2021-02-22', '12:00', 'Introduction to Training Neurons');

INSERT INTO assignment VALUES ('000014', 'Project 1', '2021-12-20', '12:00', 'Phase 1');

INSERT INTO assignment VALUES ('000012', 'Project 1', '2020-12-20', '12:00', 'Phase 1');

INSERT INTO assignment VALUES ('014623', 'Quiz 1', '2021-12-21', '12:00', 'Quiz Ch. 1-2');

INSERT INTO assignment VALUES ('835932', 'Homework 4', '2021-12-17', '15:30', 'Chapter 4: Recurisve Programming');

INSERT INTO assignment VALUES ('000013', 'Homework 3', '2021-11-16', '15:30', 'Chapter 4: Object Oriented Programming');

-- *************************** Insert data into the assigns table

INSERT INTO assigns VALUES ('000001', 'CMSC409', '001', 'Fall', 2021);

INSERT INTO assigns VALUES ('000002', 'CMSC409', '001', 'Spring', 2021);

INSERT INTO assigns VALUES ('000014', 'CMSC508', '001', 'Fall', 2021);

INSERT INTO assigns VALUES ('000012', 'CMSC508', '001', 'Fall', 2020);

INSERT INTO assigns VALUES ('014623', 'CMSC508', '002', 'Fall', 2021);

INSERT INTO assigns VALUES ('835932', 'CMSC257', '001', 'Fall', 2021);

INSERT INTO assigns VALUES ('000013', 'CMSC257', '001', 'Fall', 2021);

-- ***************************  Insert data into the works_on table

INSERT INTO works_on VALUES ('mcdonaldh@vcu.edu', '835932');

INSERT INTO works_on VALUES ('mcdonaldh@vcu.edu', '000013');

INSERT INTO works_on VALUES ('smitha@vcu.edu', '000001');

INSERT INTO works_on VALUES ('smitha@vcu.edu', '000014');

-- *************************** Insert data into the study session table

INSERT INTO study_session VALUES ('2021-12-01', 'www.vcu.zoom.us/j/012345', '9:30' , '10:45', 'CMSC409', 'Online');

INSERT INTO study_session VALUES ('2021-12-01', 'www.vcu.zoom.us/j/012345', '13:30' , '14:45', 'CMSC409', 'Online');

INSERT INTO study_session VALUES ('2021-12-14', 'EGRB-E2241', '15:30', '16:45', 'CMSC409', 'InPerson');

INSERT INTO study_session VALUES ('2021-12-19', 'EGRB-E2241', '9:30', '10:45', 'CMSC508', 'InPerson');

INSERT INTO study_session VALUES ('2021-12-03', 'www.vcu.zoom.us/j/0adf346fgsq3', '9:30', '10:45', 'CMSC508', 'Online');

INSERT INTO study_session VALUES ('2021-12-17', 'www.vcu.zoom.us/j/012345', '9:30', '10:45', 'CMSC409', 'Online');

INSERT INTO study_session VALUES ('2021-12-13', 'www.vcu.zoom.us/j/012345', '9:30', '10:45', 'CMSC257', 'Online');

-- ***************************  Insert data into the review table

INSERT INTO review VALUES ('000001', '2021-12-01', 'www.vcu.zoom.us/j/012345', '9:30');

INSERT INTO review VALUES ('000001', '2021-12-01', 'www.vcu.zoom.us/j/012345', '13:30');

INSERT INTO review VALUES ('000001', '2021-12-14', 'EGRB-E2241', '15:30');

INSERT INTO review VALUES ('000014', '2021-12-19', 'EGRB-E2241', '9:30');

INSERT INTO review VALUES ('000014', '2021-12-03', 'www.vcu.zoom.us/j/0adf346fgsq3', '9:30');

INSERT INTO review VALUES ('014623', '2021-12-17', 'www.vcu.zoom.us/j/012345', '9:30');

INSERT INTO review VALUES ('835932', '2021-12-13', 'www.vcu.zoom.us/j/012345', '9:30');

-- ***************************  Insert data into the hosts table

INSERT INTO hosts VALUES ('doej1@vcu.edu', '2021-12-01', 'www.vcu.zoom.us/j/012345', '9:30');

INSERT INTO hosts VALUES ('doej1@vcu.edu', '2021-12-01', 'www.vcu.zoom.us/j/012345', '13:30');

INSERT INTO hosts VALUES ('doej2@vcu.edu', '2021-12-14', 'EGRB-E2241', '15:30');

INSERT INTO hosts VALUES ('doej1@vcu.edu', '2021-12-19', 'EGRB-E2241', '9:30');

INSERT INTO hosts VALUES ('doej1@vcu.edu', '2021-12-03', 'www.vcu.zoom.us/j/0adf346fgsq3', '9:30');

INSERT INTO hosts VALUES ('doej2@vcu.edu', '2021-12-17', 'www.vcu.zoom.us/j/012345', '9:30');

INSERT INTO hosts VALUES ('doej2@vcu.edu', '2021-12-13', 'www.vcu.zoom.us/j/012345', '9:30');

-- *************************** Insert data into the office hours table

INSERT INTO office_hours VALUES ('MW', 'EGRB-E221', '9:30' , '11:15', 'InPerson');

INSERT INTO office_hours VALUES ('MW', 'www.vcu.zoom.us/j/zg47ywqgh3', '9:30' , '10:30', 'Online');

INSERT INTO office_hours VALUES ('MW', 'EGRB-E221', '14:30' , '16:30', 'InPerson');

INSERT INTO office_hours VALUES ('F', 'EGRB-E221', '9:30' , '10:15', 'InPerson');

INSERT INTO office_hours VALUES ('T', 'www.vcu.zoom.us/j/agavdgwefsf3', '12:00' , '13:00', 'Online');

-- *************************** Insert data into the has table

INSERT INTO has VALUES ('MW', '9:30', 'EGRB-E221', 'CMSC409', '001', 'Fall', 2021);

INSERT INTO has VALUES ('MW', '9:30', 'www.vcu.zoom.us/j/zg47ywqgh3', 'CMSC508', '001', 'Fall', 2021);

INSERT INTO has VALUES ('MW', '14:30', 'EGRB-E221', 'CMSC508', '001', 'Fall', 2021);

INSERT INTO has VALUES ('F', '9:30', 'EGRB-E221', 'CMSC257', '001', 'Fall', 2021);

INSERT INTO has VALUES ('T', '12:00', 'www.vcu.zoom.us/j/agavdgwefsf3', 'CMSC451', '001', 'Fall', 2021);

-- ***************************  Insert data into the attends table

INSERT INTO attends VALUES ('smitha@vcu.edu', '2021-12-01', 'www.vcu.zoom.us/j/012345', '9:30');

INSERT INTO attends VALUES ('smitha@vcu.edu', '2021-12-01', 'www.vcu.zoom.us/j/012345', '13:30');

INSERT INTO attends VALUES ('smitha@vcu.edu', '2021-12-03', 'www.vcu.zoom.us/j/0adf346fgsq3', '9:30');

INSERT INTO attends VALUES ('smitha@vcu.edu', '2021-12-19', 'EGRB-E2241', '9:30');

INSERT INTO attends VALUES ('mcdonaldh@vcu.edu', '2021-12-13', 'www.vcu.zoom.us/j/012345', '9:30');

INSERT INTO attends VALUES ('smitha@vcu.edu', '2021-12-13', 'www.vcu.zoom.us/j/012345', '9:30');

-- ***************************  Insert data into the visits table

INSERT INTO visits VALUES ('doej1@vcu.edu', 'T', '12:00', 'www.vcu.zoom.us/j/agavdgwefsf3');

INSERT INTO visits VALUES ('mcdonaldh@vcu.edu', 'F', '9:30', 'EGRB-E221');

INSERT INTO visits VALUES ('doej2@vcu.edu', 'T', '12:00', 'www.vcu.zoom.us/j/agavdgwefsf3');

INSERT INTO visits VALUES ('smitha@vcu.edu', 'MW', '14:30', 'EGRB-E221');

-- *************************** Insert data into the event table

INSERT INTO event VALUES ('doej1@vcu.edu', '18:00', '19:30', '2021-12-02', 'Grading Project 1');

INSERT INTO event VALUES ('doej2@vcu.edu', '18:00', '19:30', '2021-12-02', 'Grading Project 1');

INSERT INTO event VALUES ('smithj@vcu.edu', '15:30', '16:45', '2021-12-06', 'CMSC508');

INSERT INTO event VALUES ('smithj@vcu.edu', '15:30', '16:45', '2021-12-08', 'CMSC508');

INSERT INTO event VALUES ('smithj@vcu.edu', '14:30', '16:30', '2021-12-06', 'CMSC508 Office Hours');

INSERT INTO event VALUES ('smithj@vcu.edu', '14:30', '16:30', '2021-12-08', 'CMSC508 Office Hours');

INSERT INTO event VALUES ('doej1@vcu.edu', '12:00', '15:00', '2021-12-10', 'Work');

INSERT INTO event VALUES ('doej1@vcu.edu', '12:00', '13:00', '2021-12-07', 'Office Hours');

INSERT INTO event VALUES ('mcdonaldh@vcu.edu', '9:30', '10:15', '2021-12-03', 'Office Hours');

INSERT INTO event VALUES ('doej2@vcu.edu', '12:00', '13:00', '2021-12-09', 'Office Hours');

INSERT INTO event VALUES ('smitha@vcu.edu', '14:30', '16:30', '2021-12-06', 'Office Hours');

INSERT INTO event VALUES ('mcdonaldh@vcu.edu', '17:30', '19:30', '2021-12-16', 'Homework Assignment 4');

INSERT INTO event VALUES ('smitha@vcu.edu', '17:30', '19:30', '2021-12-05', 'Phase 1');
