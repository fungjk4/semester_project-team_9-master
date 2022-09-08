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
  case 'update':
  	$course_sec = $_GET['course'];
    $student_email = $_GET['email'];
    $grade = $_GET['grade'];

    updateGrades($connection, $course_sec, $student_email, $grade);
    break;
  default:
    echo "NOT VALID";
    break;
  }
?>


<?php
function updateGrades($connection, $var1, $var2, $var3){

   $course_sec = mysqli_real_escape_string($connection, $var1);
   $student_email = mysqli_real_escape_string($connection, $var2);
   $grade = mysqli_real_escape_string($connection, $var3);


   //splits course and section
   $splitCourseSec = extractOnHypen($course_sec);
   $course_id = $splitCourseSec[0];
   $section_id = $splitCourseSec[1];


   $update = "UPDATE takes set grade = '$grade' where course_id = '$course_id' and section_id = '$section_id' and email = '$student_email';";


   if(!mysqli_query($connection, $update)) echo("<p>Error updating assignment data.</p>");
}


function extractOnHypen($var){

  $numbers = explode('-', $var);

  return $numbers;
}



?>