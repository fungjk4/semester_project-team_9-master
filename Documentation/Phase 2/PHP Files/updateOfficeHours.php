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
  	$course = $_GET['course'];
    $info = $_GET['info'];

    updateOfficeHours($connection, $course, $info);
    break;
  default:
    echo "NOT VALID";
    break;
  }
?>


<?php
function updateOfficeHours($connection, $var1, $var2){


   $course = mysqli_real_escape_string($connection, $var1);
   $info = mysqli_real_escape_string($connection, $var2);


   // splits assignment id, assignment name, description
   $infoArray = extractOnSpace($info);
   $start_time = $infoArray[0];
   $end_time = $infoArray[1];
   $day = $infoArray[2];
   $location = $infoArray[3];

   $update = "UPDATE office_hours set end_time = '$end_time'
where day = '$day' and location = '$location' and start_time = '$start_time';";

   

   if(!mysqli_query($connection, $update)) echo("<p>Error updating assignment data.</p>");
}


function extractOnHypen($var){

  $array = explode('-', $var);

  return $array;
}

function extractOnSpace($var){

  $array = explode(' ', $var);

  return $array;
}

?>