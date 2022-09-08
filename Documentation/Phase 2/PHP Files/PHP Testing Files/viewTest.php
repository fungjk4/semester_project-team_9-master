<?php include "../inc/DBinfo508.inc"; ?>


<!-- ESTABLISHES CONNECTION -->
<?php
  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

  if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();

  /* presents the database information into the hmtl formated table */
  $database = mysqli_select_db($connection, DB_DATABASE);



  // STUDENT PAGE TESTING ////////////////////////////////////////////////////
  // echo "<h1>Testing STUDENT PAGE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/student_view.php?access=smitha@vcu.edu&page_request=study");

  //  echo "<h1>Testing STUDENT PAGE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/student_view.php?access=smitha@vcu.edu&page_request=grades");


  // echo "<h1>Testing STUDENT PAGE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/student_view.php?access=smitha@vcu.edu&page_request=course_overview");


  // echo "<h1>Testing STUDENT PAGE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/student_view.php?access=smitha@vcu.edu&page_request=assignment");



  // TA PAGE TESTING /////////////////////////////////////////////////////////
  // echo "<h1>Testing TA PAGE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/ta_view.php?access=doej2@vcu.edu&page_request=study");

  // echo "<h1>Testing TA PAGE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/ta_view.php?access=doej2@vcu.edu&page_request=grades");

  // echo "<h1>Testing TA PAGE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/ta_view.php?access=doej2@vcu.edu&page_request=course_overview");

  // echo "<h1>Testing TA PAGE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/ta_view.php?access=doej2@vcu.edu&page_request=assignments");



  // PROFESSOR PAGE TESTING ///////////////////////////////////////////////////
  // echo "<h1>Testing PROFESSOR PAGE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/professor_view.php?access=smithj@vcu.edu&page_request=study");

  // echo "<h1>Testing PROFESSOR PAGE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/professor_view.php?access=smithj@vcu.edu&page_request=grades");

  // echo "<h1>Testing PROFESSOR PAGE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/professor_view.php?access=smithj@vcu.edu&page_request=course_overview");

  // echo "<h1>Testing PROFESSOR PAGE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/professor_view.php?access=smithj@vcu.edu&page_request=assignments");



  // CALENDAR PAGE TESTING ////////////////////////////////////////////////////
  // echo "<h1>Testing CALENDAR PAGE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/calendar_view.php?access=smithj@vcu.edu");

  // echo "<h1>Testing CALENDAR PAGE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/calendar_view.php?access=doej2@vcu.edu");

  echo "<h1>Testing CALENDAR PAGE</h1>";
  $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/calendar_view.php?access=smitha@vcu.edu");



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