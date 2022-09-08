<?php include "../inc/DBinfo508.inc"; ?>


<?php
  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

  if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();

  /* presents the database information into the hmtl formated table */
  $database = mysqli_select_db($connection, DB_DATABASE);
  

header('Access-Control-Allow-Origin: *');

$page_request = $_GET['page_request'];


switch($page_request){
  case 'insert':
    $course_sec = $_GET['course'];
    $aid_name_des = $_GET['assignment'];
    $date_time = $_GET['dueDate'];

    insertAssignment($connection, $course_sec, $aid_name_des, $date_time);
    break;
  case 'update':
  	$course_sec = $_GET['course'];
    $aid_name_des = $_GET['assignment'];
    $date_time = $_GET['dueDate'];

    updateAssignment($connection, $course_sec, $aid_name_des, $date_time);
    break;
  case 'delete':
  	$course_sec = $_GET['course'];
    $aid_name_des = $_GET['assignment'];
    $date_time = $_GET['dueDate'];

    deleteAssignment($connection, $course_sec, $aid_name_des, $date_time);
    break;
  default:
    echo "NOT VALID";
    break;
  }
 
?>


<?php
function insertAssignment($connection,$var1, $var2, $var3){

   $course_sec = mysqli_real_escape_string($connection, $var1);
   $aid_name_des = mysqli_real_escape_string($connection, $var2);
   $date_time = mysqli_real_escape_string($connection, $var3);


   // splits course and section
   $splitCourseSec = extractOnHypen($course_sec);
   $course_id = $splitCourseSec[0];
   $section_id = $splitCourseSec[1];


   // splits assignment id, assignment name, description
   $assignmentInfoArray = extractOnHypen($aid_name_des);
   $assignment_id = $assignmentInfoArray[0];
   $assignment_name = $assignmentInfoArray[1];
   $assignment_des = $assignmentInfoArray[2];


   // splits date and time
   $splitDateTime = splitDateTime($date_time);
  
   // takes in date
   $date = $splitDateTime[0];
   $semester = semesterCheck($splitDateTime[0]);
   $dateArray = extractOnHypen($splitDateTime[0]);
   $year = $dateArray[0];
   // Takes in time
   $time = $splitDateTime[1];



  $query1 = "INSERT INTO assignment VALUES ('$assignment_id', '$assignment_name', '$date', '$time', '$assignment_des');";

  $query2 = "INSERT INTO assigns VALUES ('$assignment_id', '$course_id', '$section_id', '$semester', '$year');";

   if(!mysqli_query($connection, $query1)) echo("<p>Error adding assignment data.</p>");
   if(!mysqli_query($connection, $query2)) echo("<p>Error adding assignment data.</p>");
}

function updateAssignment($connection, $var1, $var2, $var3){

	// $var 1 is not being used intentionally
   $aid_name_des = mysqli_real_escape_string($connection, $var2);
   $date_time = mysqli_real_escape_string($connection, $var3);


   // splits assignment id, assignment name, description
   $assignmentInfoArray = extractOnHypen($aid_name_des);
   $assignment_id = $assignmentInfoArray[0];
   $assignment_name = $assignmentInfoArray[1];
   $assignment_des = $assignmentInfoArray[2];


   // splits date and time
   $splitDateTime = splitDateTime($date_time);
  
   // takes in date
   $date = $splitDateTime[0];
   $semester = semesterCheck($splitDateTime[0]);
   $dateArray = extractOnHypen($splitDateTime[0]);
   $year = $dateArray[0];
   // Takes in time
   $time = $splitDateTime[1];

   $update = "UPDATE assignment set name = '$assignment_name', due_date = '$date', time = '$time', description = '$assignment_des' where assignment_id = '$assignment_id';";

   if(!mysqli_query($connection, $update)) echo("<p>Error updating assignment data.</p>");
}


function deleteAssignment($connection, $var1, $var2, $var3){

	// $var1 is not being used intentionally
   $aid_name_des = mysqli_real_escape_string($connection, $var2);
   // $var3 is not being used intentionally

   // splits assignment id, assignment name, description
   $assignmentInfoArray = extractOnHypen($aid_name_des);
   $assignment_id = $assignmentInfoArray[0];


  $query = "DELETE from assignment where assignment_id = '$assignment_id';";

  if(!mysqli_query($connection, $query)) echo("<p>ERROR DELETING.</p>");
}

function splitDateTime($dateTime){

  $dateTimeArray = explode(' ', $dateTime);

  return $dateTimeArray;
}


function extractOnHypen($date){

  $numbers = explode('-', $date);

  return $numbers;
}


function semesterCheck($date){

  // JULY - DEC = FALL
  if(preg_match('/^[0-9]{4}-0[1-6]-[0-9]{1,2}$/', $date) != 0) {
    return 'Spring';
  }
  else if(preg_match('/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/', $date) != 0) {
    return 'Fall';
  }
  else{
    echo 'INVALID DATE';
  }
}

?>