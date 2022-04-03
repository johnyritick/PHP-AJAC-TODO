<?php
error_reporting(0);
session_start();

$button = $_POST['name'];
$data = $_POST['data'];
$value = $_POST['value'];
$type = $_POST['type'];
//echo json_encode($value);
if ($_SESSION['todo'] == false) {
    $_SESSION['todo'] = array();
    $_SESSION['editTodo'] = array();
}
if ($_SESSION['checked'] == false) {
    $_SESSION['checked'] = array();
    $_SESSION['bothSessions'] = array();
}

switch ($button) {
    case "addButton":
        array_unshift($_SESSION['todo'], $value);
        echo json_encode($_SESSION['todo']);
        break;

    case "updateButton":
        unset($_SESSION['inpValue']);
        array_unshift($_SESSION['todo'], $value);
        $_SESSION['bothSessions'] = array();
        array_push($_SESSION['bothSessions'], $_SESSION['todo'], $_SESSION['checked']);
        echo json_encode($_SESSION['bothSessions']);
        break;

    case "editButton":
        if ($type == 1) {
            $_SESSION['inpValue'] = $data;
            unset($_SESSION['checked'][$value]);
            $_SESSION['checked'] = array_values($_SESSION['checked']);
            $_SESSION['bothSessions'] = array();
            array_push($_SESSION['bothSessions'], $_SESSION['todo'], $_SESSION['checked'], $data);
            echo json_encode($_SESSION['bothSessions']);
        }
        if (!isset($type)) {
            $_SESSION['inpValue'] = $data;
            unset($_SESSION['todo'][$value]);
            $_SESSION['todo'] = array_values($_SESSION['todo']);
            $_SESSION['bothSessions'] = array();
            array_push($_SESSION['bothSessions'], $_SESSION['todo'], $_SESSION['checked'], $data);
            echo json_encode($_SESSION['bothSessions']);
        }
        break;

    case "deleteButton":
        //echo json_encode($type);
        if ($type == 1) {
            unset($_SESSION['checked'][$value]);
            $_SESSION['checked'] = array_values($_SESSION['checked']);
            $_SESSION['bothSessions'] = array();
            array_push($_SESSION['bothSessions'], $_SESSION['todo'], $_SESSION['checked']);
            echo json_encode($_SESSION['bothSessions']);
        }
        if (!isset($type)) {
            unset($_SESSION['todo'][$value]);
            $_SESSION['todo'] = array_values($_SESSION['todo']);
            $_SESSION['bothSessions'] = array();
            array_push($_SESSION['bothSessions'], $_SESSION['todo'], $_SESSION['checked']);
            echo json_encode($_SESSION['bothSessions']);
        }
        break;

    case "checked":
        unset($_SESSION['todo'][$value]);
        $_SESSION['todo'] = array_values($_SESSION['todo']);
        array_unshift($_SESSION['checked'], $data);
        $_SESSION['bothSessions'] = array();
        array_push($_SESSION['bothSessions'], $_SESSION['todo'], $_SESSION['checked']);
        echo json_encode($_SESSION['bothSessions']);
        break;

    case "unchecked":
        unset($_SESSION['checked'][$value]);
        $_SESSION['checked'] = array_values($_SESSION['checked']);
        array_unshift($_SESSION['todo'], $data);
        $_SESSION['bothSessions'] = array();
        array_push($_SESSION['bothSessions'], $_SESSION['todo'], $_SESSION['checked']);
        echo json_encode($_SESSION['bothSessions']);
        break;
}
