
<?php include "../inc/DBinfo508.inc"; ?>


<?php
  /* Connect to MySQL and select the database. */
  $connection = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);

  if (mysqli_connect_errno()) echo "Failed to connect to MySQL: " . mysqli_connect_error();

  /* presents the database information into the hmtl formated table */
  $database = mysqli_select_db($connection, DB_DATABASE);
  

header('Access-Control-Allow-Origin: *');

$access = $_GET['access'];

userAccess($connection, $access);

?>


<?php
function userAccess($connection, $var1){
  
  $email = mysqli_real_escape_string($connection, $var1);

  $result = mysqli_query($connection, "SELECT * from user_access where email = '$email';");

    //create an array
    $emparray = array();
    while($row =mysqli_fetch_assoc($result)){
        $emparray[] = $row;
    }

    print(json_encode($emparray, JSON_PRETTY_PRINT));
}
?>