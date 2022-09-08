<?php include "../inc/DBinfo508.inc"; ?>


<!-- ESTABLISHES CONNECTION -->
<?php
  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

  if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();

  /* presents the database information into the hmtl formated table */
  $database = mysqli_select_db($connection, DB_DATABASE);



  /////////// EMPLOYEE.PHP ///////////////////////////

  // QUESTION 1
  // echo "<h1>Testing Q1</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=1&course_id=CMSC257&email=doej2@vcu.edu");
  

  // QUESTION 2
  // echo "<h1>Testing Q2</h1>"
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=2&course_id=CMSC508");

  // QUESTION 4
  // echo "<h1>Testing Q4</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=4&email=doej1@vcu.edu");

  // QUESTION 5
  // echo "<h1>Testing Q5</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=5&course_id=CMSC508");

  // QUESTION 6
  // echo"<h1>Testing Q6</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=6&mode=online&course_name=CMSC409");

  // QUESTION 7
  // echo "<h1>Testing Q7</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=7&email=doej3@vcu.edu");

  // QUESTION 8
  // echo "<h1>Testing Q8</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=8&course_id=CMSC257");

  // QUESTION 9
  // echo "<h1>Testing Q9</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=9");

// QUESTION 10
  // echo "<h1>Testing Q10</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=10&emailOne=doej1@vcu.edu&emailTwo=doej2@vcu.edu&emailThree=mcdonaldh@vcu.edu");

    // QUESTION 11
  // echo "<h1>Testing Q11</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=11&course_id=CMSC257&section_id=001&semester=Fall&year=2021");

    // QUESTION 12
  // echo "<h1>Testing Q12</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=12&email=smitha@vcu.edu&course_id=CMSC409&section_id=001&semester=Fall&year=2021");

  // QUESTION 13
  // echo "<h1>Testing Q13</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=13&course_id=CMSC409&section_id=001&semester=Fall&year=2021");

  // QUESTION 14
  // echo "<h1>Testing Q14</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=14&email=smitha@vcu.edu");

  // QUESTION 15
  // echo "<h1>Testing Q15</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=15&course_id=CMSC257&section_id=001&semester=Fall&year=2021&date=2021-12-13&start_time=10:30:00&end_time=11:10:00");

  // QUESTION 16
  // echo "<h1>Testing Q16</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=16");

  // QUESTION 17
  // echo "<h1>Testing Q17</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=17&first_name=John&last_name=Doe&assignment=Grading+Project+1");


   // QUESTION 18
  // echo "<h1>Testing Q18</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=18");


  // QUESTION 20
  // echo "<h1>Testing Q20</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/employee.php?function=20");


  /////////// STUDENTS.PHP ///////////////////////////

  // QUESTION 2
  // echo "<h1>Testing Q2</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/student.php?function=2&course_id=CMSC508");

  // QUESTION 3
  // echo"<h1>Testing Q3</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/student.php?function=3&course_id=CMSC451&section_id=001&semester=Fall&year=2021&email=smitha@vcu.edu");


  // QUESTION 6
  // echo"<h1>Testing Q6</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/student.php?function=6&mode=online&course_name=CMSC409");

  // QUESTION 19
  // echo"<h1>Testing Q19</h1>";
  // $json = file_get_contents("http://ec2-3-93-50-104.compute-1.amazonaws.com/student.php?function=19&email=smitha@vcu.edu");


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
                    