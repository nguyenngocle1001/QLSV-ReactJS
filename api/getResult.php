<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));
$query = ' SELECT sj.SubjectID, sj.SubjectName, r.scores1, r.scores2, r.scores3 FROM student sd, subject sj, result r WHERE sd.StudentID = r.StudentID and sj.SubjectID = r.SubjectID AND sd.StudentID = "' . $data . '"';
$result = $con->query($query);
$result = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($result);
