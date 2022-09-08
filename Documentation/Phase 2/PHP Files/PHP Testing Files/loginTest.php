
<?php include "../inc/DBinfo508.inc"; ?>


<!-- ESTABLISHES CONNECTION -->
<?php
  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

  if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();

  /* presents the database information into the hmtl formated table */
  $database = mysqli_select_db($connection, DB_DATABASE);



  /////////// EMPLOYEE.PHP ///////////////////////////

  // LOG IN
  echo "<h1>Testing Login</h1>";
  $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/login.php?access=doej2@vcu.edu");

  // OUTPUT //////////////////////////////////////////
  echo $json;

  if(json_decode($json, TRUE)){
  	echo "<br><br>is JSON";
  }
  else{
  	echo "<br><br>not JSON";
  }
  
?>
<!-- CONNECTION ESTABLISHED -->




<!-- Clean up. -->
<?php
  mysqli_free_result($result);
  mysqli_close($connection);
?>