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
  case 2:
    //-- #2 How many sections are there of course C?
    $course_id = $_GET['course_id'];
    q2($connection, $course_id);
    break;
  case 3:
    // -- #3 Does course C, section S fit into Student A’s schedule?

  	$course_id = $_GET['course_id'];
  	$section_id = $_GET['section_id'];
  	$semester = $_GET['semester'];
  	$year = $_GET['year'];
    $email = $_GET['email'];

    q3($connection, $course_id, $section_id, $semester, $year, $email);

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
   case 10:
    //-- #10 What times are students not available to work on assignment A together?

    $email1 = $_GET['emailOne'];
    $email2 = $_GET['emailTwo'];
    $email3 = $_GET['emailThree'];

    q10($connection, $email1, $email2, $email3);

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
  case 19:
    // -- #18 What is the student to TA ratio per course? Difference between this and 20 queries

  	$email = $_GET['email'];
    q19($connection, $email);

    break;
  case 20:
    // -- #20 When is the next study session?

    q20($connection);

    break;
  default:
   	print("NOT VALID");
   }
    ?>


<?php 	// <> indicates unique to student
		// QUESTIONS: 2, <3>, 5, 6, 10, 12, 13, <19>, 20
	function q2($connection, $var1){
  
  		$course_id = mysqli_real_escape_string($connection, $var1);

  		$result = mysqli_query($connection, "SELECT count(*) AS 'num_sections' FROM section NATURAL JOIN course WHERE course_id = '$course_id'");

    // 	//create an array
    	$emparray = array();
    	while($row =mysqli_fetch_assoc($result)){
        	$emparray[] = $row;
    	}

    	print(json_encode($emparray, JSON_PRETTY_PRINT));
	}

	function q3($connection, $var1, $var2, $var3, $var4, $var5){

		$course_id = mysqli_real_escape_string($connection, $var1);
    	$section_id = mysqli_real_escape_string($connection, $var2);
    	$semester = mysqli_real_escape_string($connection, $var3);
    	$year = mysqli_real_escape_string($connection, $var4);
		$email = mysqli_real_escape_string($connection, $var5);

  		$result = mysqli_query($connection, "SELECT if (no_conflicts_classes = total_classes, 'yes', 'no') as 'result'
from (select takes.email, count(takes.course_id) as 'no_conflicts_classes' 
from takes natural join section join (select *
from section
where course_id = '$course_id' and section_id = '$section_id' and semester = '$semester' and year = '$year') as new_course
where email = '$email' and takes.semester = '$semester' and takes.year = '$year' 
and (section.day != new_course.day or 
(section.day = new_course.day and section.start_time > new_course.start_time and section.end_time > new_course.end_time) 
or (section.day = new_course.day and section.start_time < new_course.start_time and section.end_time < new_course.end_time))
group by email) as add_new_classes 
natural join 
(select email, count(course_id) as 'total_classes'
from takes
where email = '$email' and takes.semester = '$semester' and takes.year = '$year' 
group by email) as current_classes;");

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

	function q6($connection, $var1, $var2){

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

	function q19($connection, $var1){
		$email = mysqli_real_escape_string($connection, $var1);

     	$result = mysqli_query($connection, "SELECT course_name, date, start_time, end_time, mode, location from student natural join takes join study_session on takes.course_id = study_session.course_name
			where (email = '$email') and (((start_time > current_time) and (date = current_date)) OR (date > current_date))
				order by date, start_time;");

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
