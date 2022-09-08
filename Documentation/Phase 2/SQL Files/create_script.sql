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
add constraint foreign key(course_id) references course(course_id) on update cascade on delete cascade;

alter table event
add constraint foreign key(email) references person(email) on update cascade on delete cascade;	

alter table professor
add constraint foreign key(email) references person(email) on update cascade on delete cascade;	

alter table student
add constraint foreign key(email) references person(email) on update cascade on delete cascade;	

alter table teacher_assistant
add constraint foreign key(email) references person(email) on update cascade on delete cascade;

alter table teacher_assistant
add constraint foreign key(v_number) references student(v_number) on update cascade on delete cascade;

alter table study_session
add constraint foreign key(course_name) references course(course_id) on update cascade on delete cascade;

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
