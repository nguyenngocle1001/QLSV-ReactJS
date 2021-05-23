<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));

if (isset($data->admin) && isset($data->id) && isset($data->password)) {
    $admin = $data->admin;
    $id = $data->id;
    $password = $data->password;
    $query = 'select * from homeroomteacher';
    if ($admin) {
        $query = "select * from homeroomteacher where TeacherID=$id and Password = $password";
    } else  $query = "select * from student where StudentID=$id and Password = $password";
    $list = $con->query($query);
    if ($list->num_rows > 0) {
        $result = mysqli_fetch_all($list, MYSQLI_ASSOC);
        echo json_encode(["success" => 1, "data" => $result[0]]);
    } else  echo json_encode(["success" => 0, "data" => []]);
} else  echo json_encode(["success" => 0, "data" => []]);
