<?php include "../inc/DBinfo508.inc"; ?>


<?php
  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

  if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();

  /* presents the database information into the hmtl formated table */
  $database = mysqli_select_db($connection, DB_DATABASE);
  

header('Access-Control-Allow-Origin: *');

$user_email = $_GET['access'];
$page_request = $_GET['page_request'];


switch($page_request){
	case 'study':
		studySessionView($connection, $user_email);
		break;
	case 'grades':
		gradesView($connection, $user_email);
		break;
	case 'course_overview':
		courseOverviewView($connection, $user_email);
		break;
	case 'assignment':
		assignmentsView($connection, $user_email);
		break;
	default:
		echo "NOT VALID";
		break;
	}


?>


<?php
function assignmentsView($connection, $var1){
  
  $email = mysqli_real_escape_string($connection, $var1);

  $result = mysqli_query($connection, "SELECT * from student_assignments where email = '$email';");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function courseOverviewView($connection, $var1){
  
  $email = mysqli_real_escape_string($connection, $var1);

  $result = mysqli_query($connection, "SELECT * from student_course_overview where email = '$email';");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function gradesView($connection, $var1){
  
  $email = mysqli_real_escape_string($connection, $var1);

  $result = mysqli_query($connection, "SELECT * from student_grades where email = '$email';");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

function studySessionView($connection, $var1){
  
  $email = mysqli_real_escape_string($connection, $var1);

  $result = mysqli_query($connection, "SELECT * from student_study_session where email = '$email';");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

?>