<?php include "../inc/DBinfo508.inc"; ?>


<!-- ESTABLISHES CONNECTION -->
<?php
  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

  if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();

  /* presents the database information into the hmtl formated table */
  $database = mysqli_select_db($connection, DB_DATABASE);



  // UPDATE ASSIGNMENTS /////////////////////////////////////////////
  // echo "<h1>Testing INSERT</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/updateAssignments.php?page_request=insert&course=CMSC409-001&assignment=10000-Test+Assignment-Test+Description&dueDate=2021-12-04+12:00");


  // echo "<h1>Testing UPDATE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/updateAssignments.php?page_request=update&course=CMSC409-001&assignment=10000-Test+Assignment-Test+UPDATE&dueDate=2021-12-04+12:00");

// echo "<h1>Testing DELETE</h1>";
//   $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/updateAssignments.php?page_request=delete&course=CMSC409-001&assignment=10000-Test+Assignment-Test+UPDATE&dueDate=2021-12-04+12:00");

  // echo "<h1>Testing DELETE</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/updateAssignments.php?page_request=delete&assignment=120758-name-des");


  // echo "<h1>Testing REGEX</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/updateAssignments.php?access=doej2@vcu.edu&page_request=test");
//////////////////////////////////////////////////////////////////////






  // UPDATE GRADES /////////////////////////////////////////////

  // echo "<h1>Testing UPDATE GRADES</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/updateGrade.php?page_request=update&course=CMSC451-001&email=doej1@vcu.edu&grade=99");

/////////////////////////////////////////////////////////////////////




// UPDATE OFFICE HOURS //////////////////////////////////////

echo "<h1>Testing INSERT STUDY SESSION</h1>";
  $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/updateOfficeHours.php?page_request=update&course=CMSC409&info=09:30:00+12:45:00+S+EGRB-E221");

///////////////////////////////////////////////////////////////////



  // UPDATE STUDY SESSION //////////////////////////////////////

// echo "<h1>Testing INSERT STUDY SESSION</h1>";
//   $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/updateStudySession.php?page_request=insert&course_id=CMSC409&ta_email=doej1@vcu.edu&date=2021-12-23&times=11:00-12:00&location_mode=EGRB-2214+Online");


  // echo "<h1>Testing UPDATE STUDY SESSION</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/updateStudySession.php?page_request=update&course_id=CMSC409&ta_email=doej1@vcu.edu&date=2021-12-23&times=11:00-13:00&location_mode=EGRB-2214+Online");

  // echo "<h1>Testing DELETE STUDY SESSION</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/updateStudySession.php?page_request=delete&course_id=CMSC409&ta_email=doej1@vcu.edu&date=2021-12-23&times=11:00-13:00&location_mode=EGRB-2214+Online");

  ////////////////////////////////////////////////////////////////





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