$(document).ready(function () {
    //hiding update button on page load
    $("#updateButton").hide();
    
    //addButton Query
    $(".container").on("click", "#addButton", function (e) {
        e.preventDefault();
        console.log("addButton jquery");
        $.ajax({
            method: "POST",
            url: "operations.php",
            data: { name: "addButton", value: $("#new-task").val() },
            dataType: "JSON",
        }).done(function (data) {
            console.log(data);
            displayIncomplete(data);
        });
    });

    //editButton query
    $(".container").on("click", "#editButton", function (e) {
        e.preventDefault();
        $("#addButton").hide();
        $("#updateButton").show();
        console.log("addButton jquery");
        $.ajax({
            method: "POST",
            url: "operations.php",
            data: {
                name: "editButton",
                data: $(this).data("data"),
                value: $(this).val(),
                type: $(this).data("checked"),
            },
            dataType: "JSON",
        }).done(function (data) {
            console.log(data);
            $("#new-task").val(data[2]);
            displayIncomplete(data[0]);
            completedTasks(data[1]);
        });
    });

    //updateButton query
    $(".container").on("click", "#updateButton", function (e) {
        e.preventDefault();
        $("#addButton").show();
        $("#updateButton").hide();
        console.log("updateButton jquery");
        $.ajax({
            method: "POST",
            url: "operations.php",
            data: { name: "updateButton", value: $(".new-task").val() },
            dataType: "JSON",
        }).done(function (data) {
            console.log(data);
            displayIncomplete(data[0]);
            completedTasks(data[1]);
        });
    });

    //deleteButton query
    $(".container").on("click", "#deleteButton", function (e) {
        e.preventDefault();
        console.log("compl deleet", $(this).data("checked"));
        $.ajax({
            method: "POST",
            url: "operations.php",
            data: {
                name: "deleteButton",
                value: $(this).val(),
                type: $(this).data("checked"),
            },
            dataType: "JSON",
        }).done(function (data) {
            console.log("data", data);
            console.log("data[0]", data[0]);
            console.log("data[1]", data[1]);
            displayIncomplete(data[0]);
            completedTasks(data[1]);
        });
    });

    //on checked incompleted tasks moves to completed tasks
    $("#incomplete-tasks").on("click", ".check", function () {
        console.log("checked");
        id = $(this).data("value");
        console.log("data", $(this).data("data"));
        console.log("value", $(this).val());
        $.ajax({
            method: "POST",
            url: "operations.php",
            data: {
                name: "checked",
                data: $(this).data("data"),
                value: $(this).val(),
            },
            dataType: "JSON",
        }).done(function (data) {
            console.log("php", data);
            console.log("Hello");
            console.log("SestCEHEK", data[0]);
            console.log("Seschecked", data[1]);
            displayIncomplete(data[0]);
            completedTasks(data[1]);
        });
    });

    //on unchecked completed tasks moves to incompleted tasks
    $("#completed-tasks").on("click", ".check", function () {
        console.log("unchecked");
        id = $(this).data("value");
        console.log("data", $(this).data("data"));
        console.log("value", $(this).val());
        $.ajax({
            method: "POST",
            url: "operations.php",
            data: {
                name: "unchecked",
                data: $(this).data("data"),
                value: $(this).val(),
            },
            dataType: "JSON",
        }).done(function (data) {
            console.log("unchecked", data);
            console.log("Sestodo", data[0]);
            console.log("Seschecked", data[1]);
            displayIncomplete(data[0]);
            completedTasks(data[1]);
        });
    });
});

//displaying incompleted tasks
function displayIncomplete(data) {
    var html = "<li>";
    for (var i in data) {
        html +=
            "<li id=" +
            data[i] +
            ">\
        <input type='checkbox' class='check' data-data=" +
            data[i] +
            "   value=" +
            i +
            ">\
        <label>" +
            data[i] +
            "</label>\
        <input type='text'>\
        <button class='edit' data-data=" +
            data[i] +
            " id='editButton' name='editButton' value=" +
            i +
            ">Edit</button>\
        <button class='delete' id='deleteButton' name='deleteButton' value=" +
            i +
            ">Delete</button>\
        </li>";
    }
    html += "</li>";
    $("#incomplete-tasks").html(html);
}

//displaying completed tasks
function completedTasks(data) {
    var html = "<li>";
    for (var i in data) {
        html +=
            "<li id=" +
            data[i] +
            ">\
        <input type='checkbox' class='check' data-data=" +
            data[i] +
            " data-checked='1'  value=" +
            i +
            " checked>\
        <label>" +
            data[i] +
            "</label>\
        <input type='text'>\
        <button class='edit' id='editButton' data-data=" +
            data[i] +
            " data-checked='1' name='editButton' value=" +
            i +
            ">Edit</button>\
        <button class='delete' id='deleteButton' data-checked='1' name='deleteButton' value=" +
            i +
            ">Delete</button>\
        </li>";
    }
    html += "</li>";
    $("#completed-tasks").html(html);
}
