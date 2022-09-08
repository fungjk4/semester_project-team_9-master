-- #1 Are the TA’s study sessions benefiting students?
select 'doej2@vcu.edu' as ta_email, course_id, avg_study_session_grade, avg_no_study_session_grade
from(
select course_id, avg(grade) as 'avg_study_session_grade'
from takes
where course_id = 'CMSC257' and email in (select distinct attends.email
from attends natural join study_session join takes on course_id = course_name and takes.email = attends.email join hosts on attends.date = hosts.date and attends.location = hosts.location and attends.start_time = hosts.start_time
where course_name = 'CMSC257' and hosts.email = 'doej2@vcu.edu')) as study_session_grade natural join
(select course_id, avg(grade) as 'avg_no_study_session_grade'
from takes
where course_id = 'CMSC257' and email not in (select distinct attends.email
from attends natural join study_session join takes on course_id = course_name and takes.email = attends.email join hosts on attends.date = hosts.date and attends.location = hosts.location and attends.start_time = hosts.start_time
where course_name = 'CMSC257' and hosts.email = 'doej2@vcu.edu')) as no_study_session_grade;

-- #2 How many sections are there of course C?
select count(*) as 'num_sections'
from section natural join course
where course_id = 'CMSC508';

-- #3 Does course C, section S fit into Student A’s schedule?
select if (no_conflicts_classes = total_classes, 'yes', 'no') as 'result'
from (select takes.email, count(takes.course_id) as 'no_conflicts_classes' 
from takes natural join section join (select *
from section
where course_id = 'CMSC451' and section_id = '001' and semester = 'Fall' and year = 2021) as new_course
where email = 'smitha@vcu.edu' and takes.semester = 'Fall' and takes.year = 2021 
and (section.day != new_course.day or 
(section.day = new_course.day and section.start_time > new_course.start_time and section.end_time > new_course.end_time) 
or (section.day = new_course.day and section.start_time < new_course.start_time and section.end_time < new_course.end_time))
group by email) as add_new_classes 
natural join 
(select email, count(course_id) as 'total_classes'
from takes
where email = 'smitha@vcu.edu' and takes.semester = 'Fall' and takes.year = 2021 
group by email) as current_classes;

-- #4 How many hours has a TA worked this week?
select email, sec_to_time(sum(time_to_sec(timediff(end_time, start_time)))) as 'hours_worked'
from event natural join teacher_assistant 
where yearweek(date) = yearweek(current_date) and (task like 'Host Study Session%' or task like '%Grading%') and email = 'doej1@vcu.edu';

-- #5 What are all the assignments for course C that have a study session?
select assignment_id, description, concat(due_date, ' ', time) as 'assignment_due_date', date as 'study_session_date', location, start_time as 'study_session_start_time'
from review natural join assigns natural join assignment
where course_id = 'CMSC508';

-- #6 Find all the study sessions of a specific modality for Course C this week
select * 
from study_session 
where mode = 'online' and course_name = 'CMSC409' and (yearweek(date) = yearweek(current_date));

-- #7 Does Professor P need to curve course grades for courses they're teaching?
select teaches.course_id, avg(grade) as 'avg_grade'
from teaches join takes
on teaches.course_id = takes.course_id and teaches.section_id = takes.section_id and teaches.semester = takes.semester and teaches.year = takes.year
where teaches.email = 'doej3@vcu.edu'
group by teaches.course_id;

-- #8 Which students are suitable candidates to be a TA based on their course grade?
select email, grade
from takes
where course_id = 'CMSC257' and grade > 80.0;

-- #9 With an assignment due date approaching, should a professor P create more study sessions?
select review.assignment_id, description, assignment.due_date, count(review.assignment_id) as number_of_remaining_sessions 
from review join assignment on review.assignment_id = assignment.assignment_id 
where date > current_date
group by review.assignment_id;

-- #10 What times are students not available to work on assignment A together?
select date, start_time, end_time
from event
where email = 'doej1@vcu.edu' or email = 'doej2@vcu.edu' or email = 'mcdonaldh@vcu.edu'
group by date, start_time, end_time
order by date, start_time, end_time;

-- #11 Based on the current course grades and number of study sessions, should there be more study sessions pertaining to course C the upcoming semester?
select *
from (select course_id, count(*) as 'num_study_sessions' 
from study_session natural join review natural join assigns
where course_id = 'CMSC257' and section_id = '001' and semester = 'Fall' and year = 2021
group by course_id) as study_session_count natural join (select course_id, avg(grade) as 'avg_course_grade'
from takes
where course_id = 'CMSC257' and section_id = '001' and semester = 'Fall' and year = 2021
group by course_id) as course_grade;

-- #12 How can a student contact a TA for a course?
select takes.course_id, tas_for.email as 'ta_email'
from takes join tas_for on takes.course_id = tas_for.course_id and takes.section_id = tas_for.section_id and takes.semester = tas_for.semester and takes.year = tas_for.year
where takes.email = 'smitha@vcu.edu' and takes.course_id = 'CMSC409' and takes.section_id = '001' and takes.semester = 'Fall' and takes.year = 2021;

-- #13 When does a professor have office hours?
select day, start_time, end_time, mode, location
from has natural join office_hours
where course_id = 'CMSC409' and section_id = '001' and semester = 'Fall' and year = 2021;

-- #14 How many sessions has student S attended?
select count(*) as 'num_sessions_attended'
from attends
where email = 'smitha@vcu.edu';

-- #15 If a TA is hosting a study session for course C at time T, how many students would be able to attend?
select count(email) as 'available_students'
from takes
where (course_id = 'CMSC257' and section_id = '001' and semester = 'Fall' and year = 2021) and email not in (select email
from event natural join (select email
from takes
where course_id = 'CMSC257' and section_id = '001' and semester = 'Fall' and year = 2021) as students
where date = '2021-12-13' and ((start_time between '10:30:00' and '11:10:00') or (end_time between '10:30:00' and '11:10:00')));

-- #16 On average, what time of the day are more students attending study sessions?
select start_time as 'most_popular_start_time'
from (select start_time, sum(attendees) / count(start_time) as 'avg_attendance'
from
(select start_time, count(*) as attendees
from attends
group by date, start_time) as times
group by start_time) as avg_attendees
where avg_attendance = (select max(avg_attendance)
from
(select start_time, sum(attendees) / count(start_time) as 'avg_attendance'
from
(select start_time, count(*) as attendees
from attends
group by date, start_time) as times
group by start_time) as avg_attendees);

-- #17 When is a TA going to be grading assignment A?
select start_time, end_time, date
from person natural join event
where first_name = 'John' and last_name = 'Doe' and task like '%Grading Project 1%';

-- #18 What is the student to TA ratio per course?
select course_id, section_id, semester, year, num_students/num_tas as 'student to ta ratio'
from (select course_id, section_id, semester, year, count(*) as 'num_students'
from takes
group by course_id, section_id, semester, year) as students natural join (select course_id, section_id, semester, year, count(*) as 'num_tas'
from tas_for
group by course_id, section_id, semester, year) as tas;

-- #19 As a student, which study session can I attend?
select course_name, date, start_time, end_time, mode, location 
from student natural join takes join study_session on takes.course_id = study_session.course_name
where (email = 'smitha@vcu.edu') and (((start_time > current_time) and (date = current_date)) OR 
(date > current_date))
order by date, start_time;

-- #20 When is the next study session?
select date, start_time, end_time, course_name, location, mode
from study_session
where concat(date, ' ', start_time) = (select concat(date, ' ', start_time)
from study_session
where ((start_time > current_time) and (date = current_date)) OR 
(date > current_date)
order by date, start_time
limit 1);
