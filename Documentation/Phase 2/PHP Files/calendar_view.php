<?php include "../inc/DBinfo508.inc"; ?>


<?php
  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

  if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();

  /* presents the database information into the hmtl formated table */
  $database = mysqli_select_db($connection, DB_DATABASE);
  

header('Access-Control-Allow-Origin: *');

$user_email = $_GET['access'];

calendarView($connection, $user_email);
?>



<?php

function calendarView($connection, $var1){

  $email = mysqli_real_escape_string($connection, $var1);

  $result = mysqli_query($connection, "SELECT * FROM global_events where email='$email';");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}

?>