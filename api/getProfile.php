<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));
$id = $data->id;
$admin = $data->admin;
if ($admin) {
    $query = 'SELECT H.TeacherID as id, H.FullName as name, H.PhoneNumber as tel, H.Address as address, H.Images as image, C.ClassName as class  from homeroomteacher H, class C WHERE H.Class = C.ClassID AND TeacherID="' . $id . '"';
} else {
    $query = 'SELECT S.StudentID as id, S.FullName as name, S.PhoneNumber as tel, S.Address as address, S.Images as image, C.ClassName as class FROM STUDENT S, CLASS C WHERE S.CLASS = C.CLASSID AND S.StudentID="' . $id . '"';
}

$result = $con->query($query);
$result = mysqli_fetch_assoc($result);
echo json_encode($result);
