<?php
    $host = "localhost";
    $user = "root";
    $pass = "";
    $db = "seabattle";

    $conn = mysqli_connect($host, $user, $pass, "");
    if (!$conn) {
        die();
    }
    $sql = "CREATE DATABASE IF NOT EXISTS " . $db;
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Install</title>
    <link rel="stylesheet" href="css/my.css">
</head>
<body>
<?php
    if (mysqli_query($conn, $sql)) {
?>
        <div class="centr-msg">
            <p class="centr-word">Installed succesfully</p>
            <a href="index.php">Enter to GAME!</a>
        </div>
<?php
    }    
    else {
?>        
        <div class="centr-msg">
            <p class="centr-word">It's seems your site installed already!</p>
            <a href="index.php">Enter to GAME</a>
        </div>
<?php
    }
?>
</body>
</html>
<?php
    mysqli_close($conn);

    $conn = mysqli_connect($host, $user, $pass, $db);
    if (!$conn) {
        die();
    }

    $sql = "CREATE TABLE IF NOT EXISTS `users` (
    `id` INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    `login` VARCHAR(100) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `reg_date` TIMESTAMP
    )";
    if (!mysqli_query($conn, $sql))
        echo "Error creating table users: " . mysqli_error($conn);

    $sql = "CREATE TABLE IF NOT EXISTS `game` (
    `game_id` INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `pl_id` INT(11) NOT NULL,
    `score` INT(11) NOT NULL
    )";
    if (!mysqli_query($conn, $sql))
        echo "Error creating table game` " . mysqli_error($conn);

    $sql = "SELECT `id` FROM `users`";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) == 0)
    {
        $sql = "INSERT INTO `users` (login, password) VALUES ('enemy', '" . hash('whirlpool', 'september') . "')";
        if (!mysqli_query($conn, $sql))
            echo "Error creating user: " . mysqli_error($conn);
    }
    mysqli_close($conn);
?>