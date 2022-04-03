<?php
error_reporting(0);
session_start();

echo "<a href='log.php'>Logout</a>"
?>
<html>

<head>
    <title>TODO List</title>
    <style>
        <?php include 'style.css'; ?>
    </style>
</head>

<body>
    <div class="container">
        <h2>TODO LIST</h2>
        <h3>Add Item</h3>
        <p class="add">
            <input id="new-task" type="text" class='new-task' value=""><button id='addButton' name="addButton">Add</button>
            <button id='updateButton' name="updateButton">Update</button>
        </p>
        <h3>Todo</h3>

        <!-- Incompleted tasks list -->
        <ul id="incomplete-tasks">
        </ul>

        <!-- Completed tasks list -->
        <h3>Completed</h3>
        <ul id="completed-tasks">
        </ul>
        
    </div>

</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script rel="text/javascript" src="script.js"></script>

</html>