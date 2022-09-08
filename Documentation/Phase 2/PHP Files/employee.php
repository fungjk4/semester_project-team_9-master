<?php include "../inc/DBinfo508.inc"; ?>


<?php
  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

  if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();

  /* presents the database information into the hmtl formated table */
  $database = mysqli_select_db($connection, DB_DATABASE);
  


header('Access-Control-Allow-Origin: *');

$function = $_GET['function'];

switch ($function) {
  case 1:
    //-- #1 Are the TA’s study sessions benefiting students?
    $course_id = $_GET['course_id'];
    $email = $_GET['email'];

    q1($connection, $course_id, $email);

  break;
  case 2:
    //-- #2 How many sections are there of course C?

    $course_id = $_GET['course_id'];
    q2($connection, $course_id);

    break;
  case 4:
    // -- #4 How many hours has a TA worked this week?

    $email = $_GET['email'];
    q4($connection, $email);

    break;
  case 5:
    // -- #5 What are all the assignments for course C that have a study session?
    $course_id = $_GET['course_id'];
    q5($connection, $course_id);

    break;
  case 6:
    // -- #6 Find all the study sessions of a specific modality for Course C this week

    $mode = $_GET['mode'];
    $course_name = $_GET['course_name'];
    q6($connection, $mode, $course_name);

    break;
  case 7:
    // -- #7 Does Professor P need to curve course grades for courses they're teaching?

    $email = $_GET['email'];
    q7($connection, $email);

    break;
  case 8:
    // -- #8 Which students are suitable candidates to be a TA based on their course grade?

    $course_id = $_GET['course_id'];
    q8($connection, $course_id);

    break;
  case 9:
    // -- #9 With an assignment due date approaching, should professor P create more study sessions?

    q9($connection);

    break;
  case 10:
    //-- #10 What times are students not available to work on assignment A together?

    $email1 = $_GET['emailOne'];
    $email2 = $_GET['emailTwo'];
    $email3 = $_GET['emailThree'];

    q10($connection, $email1, $email2, $email3);

    break;
  case 11:
    // -- #11 Based on the current course grades and number of study sessions, should there be more study sessions pertaining to course C the upcoming semester?

    $course_id = $_GET['course_id'];
    $section_id = $_GET['section_id'];
    $semester = $_GET['semester'];
    $year = $_GET['year'];
    q11($connection, $course_id, $section_id, $semester, $year);

    break;
  case 12:
    // -- #12 How can a student contact a TA for a course?

    $email = $_GET['email'];
    $course_id = $_GET['course_id'];
    $section_id = $_GET['section_id'];
    $semester = $_GET['semester'];
    $year = $_GET['year'];
    q12($connection, $email, $course_id, $section_id, $semester, $year);

    break;
  case 13:
    // -- #13 When does a professor have office hours?

    $course_id = $_GET['course_id'];
    $section_id = $_GET['section_id'];
    $semester = $_GET['semester'];
    $year = $_GET['year'];
    q13($connection, $course_id, $section_id, $semester, $year);

    break;
  case 14:
    // -- #14 How many sessions has student S attended?

    $email = $_GET['email'];
    q14($connection, $email);

    break;
  case 15:
    // -- #15 If a TA is hosting a study session for course C at time T, how many students would be able

    $course_id = $_GET['course_id'];
    $section_id = $_GET['section_id'];
    $semester = $_GET['semester'];
    $year = $_GET['year'];
    $date = $_GET['date'];
    $start_time = $_GET['start_time'];
    $end_time = $_GET['end_time'];

    q15($connection, $course_id, $section_id, $semester, $year, $date, $start_time, $end_time);

    break;
  case 16:
    // -- #16 On average, what time of the day are more students attending study sessions?

    q16($connection);

    break;
  case 17:
    // -- #17 When is a TA going to be grading assignment A?
    $first_name = $_GET['first_name'];
    $last_name = $_GET['last_name'];
    $assignment = $_GET['assignment'];        // NEED TO FIX STORED PROCEDURE

    q17($connection, $first_name, $last_name, $assignment);

    break;
  case 18:
    // -- #18 What is the student to TA ratio per course? Difference between this and 20 queries

    q18($connection);

    break;
  case 20:
    // -- #20 When is the next study session?

    q20($connection);

    break;
  default:
    print("NOT VALID");
    break;
}
?>




<?php // <> indicates missing
      // QUESTIONS: 1, 2,<3>, 4, 5, 6, 7, 8, 9, <10>,
      // 11, 12, 13, 14, 15, 16, 17, 18, <19>, 20 
      // [17 total]
function q1($connection, $var1, $var2){ // DONE

  $course_id = mysqli_real_escape_string($connection, $var1);
  $e_mail = mysqli_real_escape_string($connection, $var2);

  $result = mysqli_query($connection, "SELECT '$e_mail' as ta_email, course_id, avg_study_session_grade, avg_no_study_session_grade
from(
select course_id, avg(grade) as 'avg_study_session_grade'
from takes
where course_id = '$course_id' and email in (select distinct attends.email
from attends natural join study_session join takes on course_id = course_name and takes.email = attends.email join hosts on attends.date = hosts.date and attends.location = hosts.location and attends.start_time = hosts.start_time
where course_name = '$course_id' and hosts.email = '$e_mail')) as study_session_grade natural join
(select course_id, avg(grade) as 'avg_no_study_session_grade'
from takes
where course_id = '$course_id' and email not in (select distinct attends.email
from attends natural join study_session join takes on course_id = course_name and takes.email = attends.email join hosts on attends.date = hosts.date and attends.location = hosts.location and attends.start_time = hosts.start_time
where course_name = '$course_id' and hosts.email = '$e_mail')) as no_study_session_grade;
");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function  q2($connection, $var1){ // DONE
  
  $course_id = mysqli_real_escape_string($connection, $var1);

  $result = mysqli_query($connection, "SELECT count(*) AS 'num_sections' FROM section NATURAL JOIN course WHERE course_id = '$course_id'");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function q4($connection, $var1){ //DONE
   
    $email = mysqli_real_escape_string($connection, $var1);

    $result = mysqli_query($connection, "SELECT email, sec_to_time(sum(time_to_sec(timediff(end_time, start_time)))) as 'hours_worked'
                                        from event natural join teacher_assistant 
                                        where yearweek(date) = yearweek(current_date) and (task like 'Study Session%' or task like '%Grading%') and email = '$email';");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function q5($connection, $var1){ // DONE
    $course_id = mysqli_real_escape_string($connection, $var1);

    $result = mysqli_query($connection, "SELECT assignment_id, description, concat(due_date, ' ', time) as 'assignment_due_date', date as 'study_session_date', location, start_time as 'study_session_start_time'
from review natural join assigns natural join assignment
where course_id = '$course_id';");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function q6($connection, $var1, $var2){ // DONE

   $mode = mysqli_real_escape_string($connection, $var1);
   $course_name = mysqli_real_escape_string($connection, $var2);

   $result = mysqli_query($connection, "SELECT * 
                                        from study_session 
                                        where mode = '$mode' and course_name = '$course_name' and (yearweek(date) = yearweek(current_date));");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function q7($connection, $var1){ // DONE

  $email = mysqli_real_escape_string($connection, $var1);

   $result = mysqli_query($connection, " SELECT teaches.course_id, avg(grade) as 'avg_grade'
                                        from teaches join takes
                                        on teaches.course_id = takes.course_id and teaches.section_id = takes.section_id and teaches.semester = takes.semester and teaches.year = takes.year
                                        where teaches.email = '$email'
                                        group by teaches.course_id;");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));


}

function q8($connection, $var1){ // DONE

   $course_id = mysqli_real_escape_string($connection, $var1);

   $result = mysqli_query($connection, "SELECT email, grade
                                        from takes
                                        where course_id = '$course_id' and grade > 80.0;");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
    
}

function q9($connection){ // DONE

    $result = mysqli_query($connection, "SELECT review.assignment_id, 
                      description, assignment.due_date, 
                      count(review.assignment_id) as number_of_remaining_sessions 
                    from review join assignment on review.assignment_id = assignment.assignment_id 
                    where date > current_date
                    GROUP BY review.assignment_id;");

      //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function q10 ($connection, $var1, $var2, $var3){ // DONE

     $email1 = mysqli_real_escape_string($connection, $var1);
     $email2 = mysqli_real_escape_string($connection, $var2);
     $email3 = mysqli_real_escape_string($connection, $var3);

     $result = mysqli_query($connection, "SELECT date, start_time, end_time
                                          from event
                                          where email = '$email1' or email = '$email2' or email = '$email3'
                                          group by date, start_time, end_time
                                          order by date, start_time, end_time;");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function q11($connection, $var1, $var2, $var3, $var4){ // DONE

     $course_id = mysqli_real_escape_string($connection, $var1);
     $section_id = mysqli_real_escape_string($connection, $var2);
     $semester = mysqli_real_escape_string($connection, $var3);
     $year = mysqli_real_escape_string($connection, $var4);

    $result = mysqli_query($connection, "SELECT *
                                        from (select course_id, count(*) as 'num_study_sessions' 
                                        from study_session natural join review natural join assigns
                                        where course_id = '$course_id' and section_id = '$section_id' and semester = '$semester' and year = '$year'
                                        group by course_id) as study_session_count natural join (select course_id, avg(grade) as 'avg_course_grade'
                                        from takes
                                        where course_id = '$course_id' and section_id = '$section_id' and semester = '$semester' and year = '$year'
                                        group by course_id) as course_grade;");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function q12($connection, $var1, $var2, $var3, $var4, $var5){ // DONE

    $email = mysqli_real_escape_string($connection, $var1);
    $course_id = mysqli_real_escape_string($connection, $var2);
    $section_id = mysqli_real_escape_string($connection, $var3);
    $semester = mysqli_real_escape_string($connection, $var4);
    $year = mysqli_real_escape_string($connection, $var5);


    $result = mysqli_query($connection, "SELECT takes.course_id, tas_for.email as 'ta_email'
                                          from takes join tas_for on takes.course_id = tas_for.course_id and takes.section_id = tas_for.section_id and takes.semester = tas_for.semester and takes.year = tas_for.year
                                          where takes.email = '$email' and takes.course_id = '$course_id' and takes.section_id = '$section_id' and takes.semester = '$semester' and takes.year = '$year';");


    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function q13($connection, $var1, $var2, $var3, $var4){ // DONE

     $course_id = mysqli_real_escape_string($connection, $var1);
     $section_id = mysqli_real_escape_string($connection, $var2);
     $semester = mysqli_real_escape_string($connection, $var3);
     $year = mysqli_real_escape_string($connection, $var4);

     $result = mysqli_query($connection, "SELECT day, start_time, end_time, mode, location
                                          from has natural join office_hours
                                          where course_id = '$course_id' and section_id = '$section_id' and semester = '$semester' and year = '$year';");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function q14($connection, $var1){ // DONE

   $email = mysqli_real_escape_string($connection, $var1);

   $result = mysqli_query($connection, "SELECT count(*) as 'num_sessions_attended'
                                        from attends
                                        where email = '$email';");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }
    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function q15($connection, $var1, $var2, $var3, $var4, $var5, $var6, $var7){ // DONE
    $course_id = mysqli_real_escape_string($connection, $var1);
    $section_id = mysqli_real_escape_string($connection, $var2);
    $semester = mysqli_real_escape_string($connection, $var3);
    $year = mysqli_real_escape_string($connection, $var4);
    $date = mysqli_real_escape_string($connection, $var5);
    $start_time = mysqli_real_escape_string($connection, $var6);
    $end_time = mysqli_real_escape_string($connection, $var7);

  
    $result = mysqli_query($connection, "SELECT count(email) as 'available_students'
                                        from takes where (course_id = '$course_id' and section_id = '$section_id' and semester = 'Fall' and year = '$year')
                                        and email not in (SELECT email
                                                          from event natural join (SELECT email from takes where course_id = '$course_id' and section_id = '$section_id'
                                                          and semester = 'Fall' and year = '$year') as students where date = '$date' and 
                                                          ((start_time between '$start_time' and '$end_time') or (end_time between '$start_time' and '$end_time')));");


    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function q16($connection){ // DONE

     $result = mysqli_query($connection, "SELECT start_time as 'most_popular_start_time'
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
                                                                                      group by start_time) as avg_attendees);");

      //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function q17($connection, $var1, $var2, $var3){ // DONE

    $first_name = mysqli_real_escape_string($connection, $var1);
    $last_name = mysqli_real_escape_string($connection, $var2);
    $assignment = mysqli_real_escape_string($connection, $var3);

    $result = mysqli_query($connection, "SELECT start_time, end_time, date
                                          from person natural join event
                                          where first_name = '$first_name' and last_name = '$last_name' and task like '%$assignment%';");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function q18($connection){ // DONE

    $result = mysqli_query($connection, " SELECT course_id, section_id, semester, year, num_students/num_tas as 'student_to_ta_ratio'
                                          from (select course_id, section_id, semester, year, count(*) as 'num_students'
                                          from takes
                                            group by course_id, section_id, semester, year) as students natural join (select course_id, section_id, semester, year, count(*) as 'num_tas'
                                                                                                                        from tas_for
                                                                                                                        group by course_id, section_id, semester, year) as tas;");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
   

}


function q20($connection){ // DONE

   $result = mysqli_query($connection, "SELECT date, start_time, end_time, course_name, location, mode
                                        from study_session
                                        where concat(date, ' ', start_time) = (select concat(date, ' ', start_time)
                                                                                from study_session
                                                                                where ((start_time > current_time) and (date = current_date)) OR 
                                                                                  (date > current_date)
                                                                                  order by date, start_time
                                                                                  limit 1);");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}
?>

