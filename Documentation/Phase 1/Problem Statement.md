##### (CMSC508 - Team 9)
# Problem Statement



We are creating a database which will allow students to network with other students to form their own study groups, allow students to find office hours and TA sessions, and allow professors and TAs to manage sessions. Students may not know individuals in their courses, or may be trying to form study groups, but have difficulty easily finding times which work for everyone, while professors may want a centralized place to manage their TAs and study sessions. This database would allow students, professors, and TAs to schedule study sessions, allow students to find office hours which work best for their schedule, and allow professors and TAs to oversee how successful different sessions are. 

The database is structured to store the schedules of TAs, professors, and students, details about the different courses, different assignments, office hours and study sessions, as well as a student’s performance in a course. These items are stored using the following entities: Person, Student, Professor, Teacher Assistant, Course, Section, Assignment, Office Hours, Event, Study Session. In this database, a person entity reflects anyone who enters their information into the database. The Professor and Student entities are the complete, disjoint specializations because individuals can either be students or professors. The Teacher Assistant entity is a partial specialization of the student entity because some students may be TAs, but not all of them are. The Office Hours and Study Sessions entities are separated into two different entities since office hours are offered for a course and study sessions are in addition to the regular office hours. This separation also reflects whether the session described by the entity is offered by professors or TAs. 

The database is designed for university computer science departments, specifically the Computer Science Department at VCU and can be used by professors, students, and TAs. Students from the department could use the database for numerous different actions. For example, freshmen taking CMSC255 are normally new to the university, and may struggle to find avenues to receive help. They could use the database to reach out to other students who may be able to mentor them, or they could find a help session their professor or TA is hosting for a particular programming assignment. In addition, professors and TA’s could use the database when scheduling their office hours. They could query the database to find a time that allows the majority of their students to join while still fitting their own schedule. As well as track student success in their course and determine a course of action based on assignment grades. Professors can also use the database to oversee their TAs by seeing how many sessions they are hosting or how many hours a TA is working through the time they log in the schedule. Professors can also use the database to determine students which may be good candidates for a TA position based on their grade in a course. To use the database, students, professors, and TAs would need to enter and store their schedules, while professors and TA’s would enter and store information about their office hours or study sessions and the assignments for a course. The potential uses for this database are illustrated by the twenty queries below:

1. Are the TA’s study sessions benefiting students?
1. How many sections are there of course C?
1. Does course C, section S fit into Student A’s schedule?
1. How many hours has a TA worked this week?
1. What are all the assignments for course C that have a study session? 
3. Find all the study sessions of a specific modality for Course C this week?
4. Does Professor P need to curve course grades for courses they're teaching?
5. Which students are suitable candidates to be a TA based on their course grade?
6. With an assignment due date approaching, should a professor P create more study sessions?
7. What times are students not available to work on assignment A together (Groups of 3)?
8. Based on the current course grades and number of study sessions, should there be more study sessions pertaining to course C the upcoming semester?
9. How can a student contact a TA for a course?
10. When does a professor have office hours?
11. How many sessions has student S attended?
12.  If a TA is hosting a study session for course C at time T, how many students would be able to attend?
14. On average, what time of the day are more students attending study sessions?
15. When is a TA going to be grading assignment A? 
16. What is the student to TA ratio per course?
17. As a student, which study session can I attend?
18. When is the next study session?
