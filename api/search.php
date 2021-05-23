<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));

$query = '';
$where = '';
if (isset($data->id) && !empty($data->id)) {
    $id = $data->id;
    $where .= ' AND STUDENTID = ' . $id;
}
if (isset($data->fullname) && !empty($data->fullname)) {
    $fullname = $data->fullname;
    $where .= ' AND fullname like "' . $fullname . '"';
}

if (isset($data->class) && !empty($data->class)) {
    $class = $data->class;
    $where .= ' AND ClassName = "' . $class . '"';
}
$query = 'SELECT S.StudentID as "key", S.StudentID, S.FullName, S.PhoneNumber, S.Address, S.Images, C.ClassName FROM STUDENT S, CLASS C WHERE S.CLASS = C.CLASSID ' . $where;
$result = $con->query($query);
$result = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($result);
