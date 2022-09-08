-- User Access view
create view user_access as
select person.email, student.v_number, teacher_assistant.ta_id, professor.professor_id
from person left join student
on person.email = student.email
left join teacher_assistant
on person.email = teacher_assistant.email
left join professor
on person.email = professor.email;

-- Global Event View
create view global_events as
select email, task as 'title', concat(date, 'T', start_time, '+09:00') as 'start', concat(date, 'T', end_time, '+09:00') as 'end'
from event
where year(date) = year(current_date) and month(date) = month(current_date);

-- Students Course Information Course Overview View
create view student_course_overview as
select takes.email as 'email', takes.course_id, takes.section_id, takes.semester, takes.year, teaches_person.email as 'professor_email', concat(teaches_person.first_name, ' ', teaches_person.last_name) as 'professor', office_hours.day as 'office_hour_day', has.location as 'office_hour_location', concat(office_hours.start_time, '-', office_hours.end_time) as 'office_hour_time', tas_for_person.email as 'ta_email', concat(tas_for_person.first_name, ' ', tas_for_person.last_name) as 'ta'
from takes natural join has
left join office_hours 
on has.day = office_hours.day and has.start_time = office_hours.start_time and has.location = office_hours.location
join (select *
from teaches natural join person) as teaches_person
on takes.course_id = teaches_person.course_id and takes.section_id = teaches_person.section_id and takes.semester = teaches_person.semester and takes.year = teaches_person.year 
left join (select *
from tas_for natural join person) as tas_for_person
on takes.course_id = tas_for_person.course_id and takes.section_id = tas_for_person.section_id and takes.semester = tas_for_person.semester and takes.year = tas_for_person.year
where takes.year = year(current_date) and takes.semester = if(month(current_date) >= 7 and month(current_date) <= 12, 'Fall', 'Spring');

-- Student Course Information Assignments View
create view student_assignments as
select email, takes.course_id, takes.section_id, description, concat(due_date, ' ', time) as 'due_date'
from takes left join (select *
from assigns natural join assignment) as course_assignments
on takes.course_id = course_assignments.course_id and takes.section_id = course_assignments.section_id and takes.semester = course_assignments.semester and takes.year = course_assignments.year
where takes.year = year(current_date) and takes.semester = if(month(current_date) >= 7 and month(current_date) <= 12, 'Fall', 'Spring');

-- Students Course Information Grades View
create view student_grades as
select email, course_id, section_id, grade
from takes
where year = year(current_date) and semester = if(month(current_date) >= 7 and month(current_date) <= 12, 'Fall', 'Spring');

-- Students Study Session View
create view student_study_session as
select takes.email as 'email', takes.course_id, takes.section_id, future_study_sessions.ta_name, future_study_sessions.date, future_study_sessions.time, future_study_sessions.location
from takes left join (
select course_id, section_id, semester, year, hosts.email as 'ta_email', concat(first_name, ' ', last_name) as 'ta_name', study_session.date, concat(study_session.start_time, '-', study_session.end_time) as 'time', study_session.location
from assigns 
natural join review 
natural join hosts
left join study_session on study_session.date = hosts.date and study_session.location = hosts.location and study_session.start_time = hosts.start_time
join person on hosts.email = person.email
where study_session.date > current_date or (study_session.date = current_date and end_time > current_time)) as future_study_sessions 
on takes.course_id = future_study_sessions.course_id and takes.section_id = future_study_sessions.section_id and takes.semester = future_study_sessions.semester and takes.year = future_study_sessions.year
where takes.year = year(current_date) and takes.semester = if(month(current_date) >= 7 and month(current_date) <= 12, 'Fall', 'Spring');

-- Professor Course Information Course Overview View
create view professor_course_overview as
select teaches_person.course_id, teaches_person.section_id, teaches_person.email as 'professor_email', concat(teaches_person.first_name, ' ', teaches_person.last_name) as 'professor', office_hours.day as 'office_hour_day', has.location as 'office_hour_location', concat(office_hours.start_time, '-', office_hours.end_time) as 'office_hour_time', tas_for_person.email as 'ta_email', concat(tas_for_person.first_name, ' ', tas_for_person.last_name) as 'ta'
from (select *
from teaches natural join person) as teaches_person left join has 
on teaches_person.course_id = has.course_id and teaches_person.section_id = has.section_id and teaches_person.semester = has.semester and teaches_person.year = has.year
left join office_hours 
on has.day = office_hours.day and has.start_time = office_hours.start_time and has.location = office_hours.location
left join (select *
from tas_for natural join person) as tas_for_person
on teaches_person.course_id = tas_for_person.course_id and teaches_person.section_id = tas_for_person.section_id and teaches_person.semester = tas_for_person.semester and teaches_person.year = tas_for_person.year
where teaches_person.year = year(current_date) and teaches_person.semester = if(month(current_date) >= 7 and month(current_date) <= 12, 'Fall', 'Spring');

-- Professor Course Information Assignments View
create view professor_assignments as
select email, teaches.course_id, teaches.section_id, description, concat(due_date, ' ', time) as 'due_date'
from teaches left join (select *
from assigns natural join assignment) as course_assignments
on teaches.course_id = course_assignments.course_id and teaches.section_id = course_assignments.section_id and teaches.semester = course_assignments.semester and teaches.year = course_assignments.year
where teaches.year = year(current_date) and teaches.semester = if(month(current_date) >= 7 and month(current_date) <= 12, 'Fall', 'Spring');

-- Professor Course Information Grades View
create view professor_grades as
select teaches.email, teaches.course_id, teaches.section_id, students.email as 'student_email', grade
from 
(select email, course_id, section_id, semester, year, grade, first_name, last_name
from takes natural join person) as students join teaches
on students.course_id = teaches.course_id and students.section_id = teaches.section_id and students.semester = teaches.semester and students.year = teaches.year
where teaches.year = year(current_date) and teaches.semester = if(month(current_date) >= 7 and month(current_date) <= 12, 'Fall', 'Spring');

-- Professor Study Session View
create view professor_study_session as
select teaches.email as 'email', teaches.course_id, teaches.section_id, future_study_sessions.ta_name, future_study_sessions.date, future_study_sessions.time, future_study_sessions.location
from teaches left join (
select course_id, section_id, semester, year, hosts.email as 'ta_email', concat(first_name, ' ', last_name) as 'ta_name', study_session.date, concat(study_session.start_time, '-', study_session.end_time) as 'time', study_session.location
from assigns 
natural join review 
natural join hosts
left join study_session on study_session.date = hosts.date and study_session.location = hosts.location and study_session.start_time = hosts.start_time
join person on hosts.email = person.email
where study_session.date > current_date or (study_session.date = current_date and end_time > current_time)) as future_study_sessions 
on teaches.course_id = future_study_sessions.course_id and teaches.section_id = future_study_sessions.section_id and teaches.semester = future_study_sessions.semester and teaches.year = future_study_sessions.year
where teaches.year = year(current_date) and teaches.semester = if(month(current_date) >= 7 and month(current_date) <= 12, 'Fall', 'Spring');

-- TA Course Information Course Overview View
create view ta_course_overview as
select tas_for_person.email as 'email', concat(tas_for_person.first_name, ' ', tas_for_person.last_name) as 'ta_name', tas_for_person.course_id, tas_for_person.section_id, course_info.professor_email, course_info.professor, course_info.office_hour_day, course_info.office_hour_location, course_info.office_hour_time
from (select *
from tas_for natural join person) as tas_for_person join 
(select teaches_person.course_id, teaches_person.section_id, teaches_person.semester, teaches_person.year, teaches_person.email as 'professor_email', concat(teaches_person.first_name, ' ', teaches_person.last_name) as 'professor', office_hours.day as 'office_hour_day', has.location as 'office_hour_location', concat(office_hours.start_time, '-', office_hours.end_time) as 'office_hour_time'
from (select *
from teaches natural join person) as teaches_person left join has 
on teaches_person.course_id = has.course_id and teaches_person.section_id = has.section_id and teaches_person.semester = has.semester and teaches_person.year = has.year
left join office_hours 
on has.day = office_hours.day and has.start_time = office_hours.start_time and has.location = office_hours.location) as course_info
on tas_for_person.course_id = course_info.course_id and tas_for_person.section_id = course_info.section_id and tas_for_person.semester = course_info.semester and tas_for_person.year = course_info.year
where tas_for_person.year = year(current_date) and tas_for_person.semester = if(month(current_date) >= 7 and month(current_date) <= 12, 'Fall', 'Spring');

-- TA Course Information Assignments View
create view ta_assignments as
select email, tas_for.course_id, tas_for.section_id, description, concat(due_date, ' ', time) as 'due_date'
from tas_for left join (select *
from assigns natural join assignment) as course_assignments 
on tas_for.course_id = course_assignments.course_id and tas_for.section_id = course_assignments.section_id and tas_for.semester = course_assignments.semester and tas_for.year = course_assignments.year
where tas_for.year = year(current_date) and tas_for.semester = if(month(current_date) >= 7 and month(current_date) <= 12, 'Fall', 'Spring');

-- TA Course Information Grades View
create view ta_grades as
select tas_for.email as 'email', tas_for.course_id, tas_for.section_id, takes_with_name.email as 'student_email', grade
from tas_for left join (select *
from takes natural join person) as takes_with_name
on tas_for.course_id = takes_with_name.course_id and tas_for.section_id = takes_with_name.section_id and tas_for.semester = takes_with_name.semester and tas_for.year = takes_with_name.year
where tas_for.year = year(current_date) and tas_for.semester = if(month(current_date) >= 7 and month(current_date) <= 12, 'Fall', 'Spring');

-- TA Study Session View
create view ta_study_session as
select tas_for.email as 'email', tas_for.course_id, tas_for.section_id, course_study_sessions.ta_name, course_study_sessions.date, course_study_sessions.time, course_study_sessions.location
from tas_for left join (select course_id, section_id, semester, year, hosts.email as 'ta_email', concat(first_name, ' ', last_name) as 'ta_name', study_session.date, concat(study_session.start_time, '-', study_session.end_time) as 'time', study_session.location
from assigns 
natural join review 
natural join hosts
left join study_session on study_session.date = hosts.date and study_session.location = hosts.location and study_session.start_time = hosts.start_time
join person on hosts.email = person.email
where study_session.date > current_date or (study_session.date = current_date and end_time > current_time)) as course_study_sessions
on tas_for.email = course_study_sessions.ta_email and tas_for.course_id = course_study_sessions.course_id and tas_for.section_id = course_study_sessions.section_id and tas_for.semester = course_study_sessions.semester and tas_for.year = course_study_sessions.year
where tas_for.year = year(current_date) and tas_for.semester = if(month(current_date) >= 7 and month(current_date) <= 12, 'Fall', 'Spring');
