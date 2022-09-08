
-- #1 Are the TA’s study sessions benefiting students?
DELIMITER //

CREATE PROCEDURE benefitSessions(IN emailVar VARCHAR(25), IN courseIDVar VARCHAR(25))

BEGIN
select emailVar as ta_email, course_id, avg_study_session_grade, avg_no_study_session_grade
from(
select course_id, avg(grade) as 'avg_study_session_grade'
from takes
where course_id = courseIDvar and email in (select distinct attends.email
from attends natural join study_session join takes on course_id = course_name and takes.email = attends.email join hosts on attends.date = hosts.date and attends.location = hosts.location and attends.start_time = hosts.start_time
where course_name = courseIDVar and hosts.email = emailVar)) as study_session_grade natural join
(select course_id, avg(grade) as 'avg_no_study_session_grade'
from takes
where course_id = courseIDVar and email not in (select distinct attends.email
from attends natural join study_session join takes on course_id = course_name and takes.email = attends.email join hosts on attends.date = hosts.date and attends.location = hosts.location and attends.start_time = hosts.start_time
where course_name = courseIDVar and hosts.email = emailVar)) as no_study_session_grade;

END //
DELIMITER ;


-- #2 How many sections are there of course C?
DELIMITER //
CREATE PROCEDURE numSections(in courseIDVar varchar(30))
BEGIN
	SELECT count(*) as 'num_sections' FROM SECTION NATURAL JOIN COURSE
	WHERE course_id = courseIDVar ;
END //
DELIMITER ;

-- #3  Does course C, section S fit into Student A’s schedule?
DELIMITER //

CREATE PROCEDURE courstFit (IN courseIDVar varchar(10), IN sectionIDVar varchar(10), IN semesterVar varchar(10), IN yearVar varchar(10), IN emailVar varchar(25))

BEGIN
 
select if (no_conflicts_classes = total_classes, "yes", "no") as 'result'
from (select takes.email, count(takes.course_id) as 'no_conflicts_classes' 
from takes natural join section join (select *
from section
where course_id = courseIDVar and section_id = sectionIDVar and semester = semesterVar and year = yearVar) as new_course
where email = emailVar and takes.semester = semesterVar and takes.year = yearVar
and (section.day != new_course.day or 
(section.day = new_course.day and section.start_time > new_course.start_time and section.end_time > new_course.end_time) 
or (section.day = new_course.day and section.start_time < new_course.start_time and section.end_time < new_course.end_time))
group by email) as add_new_classes 
natural join (select email, count(course_id) as 'total_classes'
from takes
where email = emailVar and takes.semester = semesterVar and takes.year = yearVar
group by email) as current_classes;

END //

DELIMITER ;


-- #4 How many hours has a TA worked this week?
DELIMITER //
CREATE PROCEDURE hoursWorked (in emailVar varchar(30))
BEGIN
select email, sec_to_time(sum(time_to_sec(timediff(end_time, start_time)))) as 'hours_worked'
from event natural join teacher_assistant
where yearweek(date) = yearweek(current_date) and (task like 'Host Study Session%' or task like '%Grading%') and email = emailVar;

END //
DELIMITER ;


-- #5 What are all the assignments for course C that have a study session?
DELIMITER //

CREATE PROCEDURE studySession(IN courseIDVar VARCHAR(25))

BEGIN
select assignment_id, description, concat(due_date, ' ', time) as 'assignment_due_date', date as 'study_session_date', location, start_time as 'study_session_start_time'
from review natural join assigns natural join assignment
where course_id = courseIDVar ;

END//

DELIMITER ;


-- #6 Find all the study sessions of a specific modality for Course C this week
DELIMITER //

CREATE PROCEDURE studyModality(IN modalityVar VARCHAR(25), IN courseNameVar VARCHAR (15))

BEGIN
select * 
from study_session 
where mode = modalityVar and course_name = courseNameVar and (yearweek(date) = yearweek(current_date));

END //

DELIMITER ; 




-- #7 Does Professor P need to curve course grades for courses they're teaching?
DELIMITER //

CREATE PROCEDURE curve(IN emailVar VARCHAR(25))

BEGIN
select teaches.course_id, avg(grade) as 'avg_grade'
from teaches join takes
on teaches.course_id = takes.course_id and teaches.section_id = takes.section_id and teaches.semester = takes.semester and teaches.year = takes.year
where teaches.email = emailVar
group by teaches.course_id;

END //
DELIMITER ;



-- #8 Which students are suitable candidates to be a TA based on their course grade?
DELIMITER //

CREATE PROCEDURE TACandidates (IN courseIDVar varchar(10))
 BEGIN
 
select email, grade
from takes
where course_id = courseIDVar and grade > 80.0;


END //

DELIMITER ;



-- #9 With an assignment due date approaching, should professor P create more study sessions?
select review.assignment_id, description, assignment.due_date, count(review.assignment_id) as number_of_remaining_sessions 
from review join assignment on review.assignment_id = assignment.assignment_id 
where date > current_date
group by review.assignment_id;

-- #10 What times are students not available to work on assignment A together (groups of 3)?
DELIMITER //

CREATE PROCEDURE notAvailable(IN emailVar1 varchar(25), IN emailVar1 varchar(25), IN emailVar1 varchar(25))
select date, start_time, end_time
from event
where email = emailVar1 or email = emailVar2 or email = emailVar3
group by date, start_time, end_time
order by date, start_time, end_time;

-- #11 Based on the current course grades and number of study sessions, should there be more study sessions pertaining to course C the upcoming semester?
DELIMITER //

CREATE PROCEDURE moreStudySessions(IN courseIDVAR VARCHAR(15), IN sectionIDVAR VARCHAR(15), IN semesterVar VARCHAR(10), IN yearVar VARCHAR(10))

BEGIN 
select *
from (select course_id, count(*) as 'num_study_sessions' 
from study_session natural join review natural join assigns
where course_id = courseIDVAR and section_id = sectionIDVar and semester = semesterVar and year = yearVar
group by course_id) as study_session_count natural join (select course_id, avg(grade) as 'avg_course_grade'
from takes
where course_id = courseIDVAR and section_id = sectionIDVar and semester = semesterVar and year = yearVar
group by course_id) as course_grade;

END //

DELIMITER ;


-- #12 How can a student contact a TA for a course?
DELIMITER //

CREATE PROCEDURE contactTA (IN emailVAR varchar(25), in courseIDVar varchar(10), IN sectionIDVar varchar(10), IN yearVar varchar(10))

BEGIN

select takes.course_id, tas_for.email as 'ta_email'
from takes join tas_for on takes.course_id = tas_for.course_id and takes.section_id = tas_for.section_id and takes.semester = tas_for.semester and takes.year = tas_for.year
where takes.email = emailVar and takes.course_id = courseIDVar and takes.section_id = sectionIDVar and takes.semester = semesterVar and takes.year = yearVar;


END //

DELIMITER ;


-- #13 When does a professor have office hours?
DELIMITER //

CREATE PROCEDURE officeHours(IN courseIDVar varchar(10), IN sectionIDVar varchar(10), IN semesterVar varchar(10), IN yearVar varchar(10))
BEGIN 
select day, start_time, end_time, mode, location
from has natural join office_hours
where course_id =courseIDVar and section_id = sectionIDVar and semester = semesterVar and year = yearVar;


END //

DELIMITER ;


-- #14 How many sessions has student S attended?
DELIMITER //

CREATE PROCEDURE attendedSessions(IN emailVar varchar(25))

BEGIN 
select count(*) as 'num_sessions_attended'
from attends
where email = emailVar;

END //

DELIMITER ;



-- #15 If a TA is hosting a study session for course C at time T, how many students would be able DELIMITER //
DELIMITER //
CREATE PROCEDURE numStudentsAttend(IN courseIDVar varchar(10), IN sectionIDVar varchar(10), IN semesterVar varchar(10), IN yearVar varchar(10), IN dateVar varchar(25), IN startTimeVar varchar(25), IN endTimeVar varchar(25))

BEGIN
select count(email) as 'available_students'
from takes
where (course_id = courseIDVar and section_id = sectionIDVar and semester = semesterVar and year = yearVar) and email not in (select email
from event natural join (select email
from takes
where course_id = courseIDVar and section_id = sectionIDVar and semester = semesterVar and year = yearVar) as students
where date = dateVar and ((start_time between startTimeVar and endTimeVar) or (end_time between starTimeVar and endTimeVar)));


END //

DELIMITER ;





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
DELIMITER //
CREATE PROCEDURE gradeAssignment(IN firstNameVar varchar(25), IN lastNameVar varchar(25), IN assignmentNameVar varchar(25)) 

BEGIN

select start_time, end_time, date
from person natural join event
where first_name = firstNameVar and last_name = LastNameVar and task like '%assignmentNameVar%';


END //

DELIMITER ;


-- #18 What is the student to TA ratio per course? 
select course_id, section_id, semester, year, num_students/num_tas as 'student to ta ratio'
from (select course_id, section_id, semester, year, count(*) as 'num_students'
from takes
group by course_id, section_id, semester, year) as students natural join (select course_id, section_id, semester, year, count(*) as 'num_tas'
from tas_for
group by course_id, section_id, semester, year) as tas;

-- #19 As a student, which study session can I attend?
DELIMITER //

CREATE PROCEDURE attendSession (IN emailVar varchar(25))

BEGIN

select course_name, date, start_time, end_time, mode, location 
from student natural join takes join study_session on takes.course_id = study_session.course_name
where (email = emailVar) and (((start_time > current_time) and (date = current_date)) OR 
(date > current_date))
order by date, start_time;


END //

DELIMITER ;

-- #20 When is the next study session?
select date, start_time, end_time, course_name, location, mode
from study_session
where concat(date, ' ', start_time) = (select concat(date, ' ', start_time)
from study_session
where ((start_time > current_time) and (date = current_date)) OR 
(date > current_date)
order by date, start_time
limit 1);






