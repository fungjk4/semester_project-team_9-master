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
    $course_id = $_GET['course_id'];
    $ta_email = $_GET['ta_email'];
    $date = $_GET['date'];
    $times = $_GET['times'];
    $location_mode = $_GET['location_mode'];
    
    insertStudySession($connection, $course_id, $ta_email, $date, $times, $location_mode);
    break;
  case 'update':
  	$course_id = $_GET['course_id'];
    $ta_email = $_GET['ta_email'];
    $date = $_GET['date'];
    $times = $_GET['times'];
    $location_mode = $_GET['location_mode'];

    updateStudySession($connection, $course_id, $ta_email, $date, $times, $location_mode);
    break;
  case 'delete':
  	$course_id = $_GET['course_id'];
    $ta_email = $_GET['ta_email'];
    $date = $_GET['date'];
    $times = $_GET['times'];
    $location_mode = $_GET['location_mode'];

    deleteStudySession($connection, $course_id, $ta_email, $date, $times, $location_mode);
    break;
  default:
    echo "NOT VALID";
    break;
  }
?>


<?php
function insertStudySession($connection,$var1, $var2, $var3, $var4, $var5){

   $course_id = mysqli_real_escape_string($connection, $var1);
   $ta_email = mysqli_real_escape_string($connection, $var2);
   $date = mysqli_real_escape_string($connection, $var3);

   // coming in with multiple parts; must split at ('-', ' ')
   $times = mysqli_real_escape_string($connection, $var4);
   $location_mode = mysqli_real_escape_string($connection, $var5);


   // splits start time from end time
   $timesArray = extractOnHypen($times);
   $start_time = $timesArray[0];
   $end_time = $timesArray[1];


   // splits location from mode
   $locationModeArray = extractOnSpace($location_mode);
   $location = $locationModeArray[0];
   $mode = $locationModeArray[1];



   $insert1 = "INSERT INTO study_session VALUES ('$date', '$location', '$start_time' , '$end_time', '$course_id', '$mode');";
   $insert2 = "INSERT INTO hosts VALUES ('$ta_email', '$date', '$location', '$start_time');";

 
   if(!mysqli_query($connection, $insert1)) echo("<p>Error adding assignment data.</p>");
   if(!mysqli_query($connection, $insert2)) echo("<p>Error adding assignment data.</p>");
}



function updateStudySession($connection, $var1, $var2, $var3, $var4, $var5){

	 $course_id = mysqli_real_escape_string($connection, $var1);
   $ta_email = mysqli_real_escape_string($connection, $var2);
   $date = mysqli_real_escape_string($connection, $var3);

   // coming in with multiple parts; must split at ('-', ' ')
   $times = mysqli_real_escape_string($connection, $var4);
   $location_mode = mysqli_real_escape_string($connection, $var5);



   // splits start time from end time
   $timesArray = extractOnHypen($times);
   $start_time = $timesArray[0];
   $end_time = $timesArray[1];


   // splits location from mode
   $locationModeArray = extractOnSpace($location_mode);
   $location = $locationModeArray[0];


   $update = "UPDATE study_session set end_time = '$end_time' where date = '$date' and start_time = '$start_time' and location = '$location';";

//    update study_session
// set end_time = '1:00'
// where date = '2021-12-23' and start_time = '11:00' and location = 'EGRB-2214';

   if(!mysqli_query($connection, $update)) echo("<p>Error updating assignment data.</p>");
}


function deleteStudySession($connection, $var1, $var2, $var3, $var4, $var5){

	$course_id = mysqli_real_escape_string($connection, $var1);
   $ta_email = mysqli_real_escape_string($connection, $var2);
   $date = mysqli_real_escape_string($connection, $var3);

   // coming in with multiple parts; must split at ('-', ' ')
   $times = mysqli_real_escape_string($connection, $var4);
   $location_mode = mysqli_real_escape_string($connection, $var5);



   // splits start time from end time
   $timesArray = extractOnHypen($times);
   $start_time = $timesArray[0];
   $end_time = $timesArray[1];


   // splits location from mode
   $locationModeArray = extractOnSpace($location_mode);
   $location = $locationModeArray[0];


  $query = "DELETE from study_session where date = '$date' and start_time = '$start_time' and location = '$location';";

  if(!mysqli_query($connection, $query)) echo("<p>ERROR DELETING.</p>");
}


function extractOnSpace($var){

  $array = explode(' ', $var);

  return $array;
}


function extractOnHypen($date){

  $numbers = explode('-', $date);

  return $numbers;
}

?>