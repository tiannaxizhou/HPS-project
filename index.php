<!DOCTYPE html>
<html>
<head>
    <?php $base = "../../" ?>
    <base href="../../">
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/facebox.js"></script>
    <script src="js/gameSettings.js"></script>
    <link rel="stylesheet" type="text/css" href="css/facebox.css"/>
    <link rel="stylesheet" type="text/css" href="css/main.css"/>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            $('a[rel*=facebox]').facebox()
        })
    </script>
</head>
<body>
<div class="container">
    <?php include $base."header.php"; ?>
    <nav>
        <ul>
        <li><a href="">Home</a></li>
        </ul>
        <?php include $base."leftMenuGame.php"; ?>
    </nav>
    <article>
        <h1 id="gameName">Smart Circles</h1>
        <h3 id="groupName">Team Wildcats</h3>
        <h3>Instruction:</h3>
        <div id="gameDesc" class="jumbotron">
            <div>
                <p>
                    <b>How to Win</b>
                    <br>Players take turns to place some number of circles of different radius on the canvas. When the game ends, the player holds more circle area wins.
                    <font size="2"></font>
                </p>
                <p>
                    <b>Turns</b>
                    <br>For each round, 4 circles are being drawn.
                    Player1 draws one circle with control of the center and radius of the circle.
                    After player1 properly chooses a center and a point supposedly on the circle, a new circle will be drawn on the canvas.
                    Then player2 starts to draw a new circle in the remain blank space with the opponent's circle just drawn. And player2
                    continues to draw a third circle of the current round, following by player1 draws the fourth circle.
                    <font size="2"></font>
                </p>
                <p>
                    <b>Rules</b>
                    <br>If the new drawn circle somehow steps on the area of other previous circles or is beyond the border of the canvas,
                    then the circle will be automatically narrowed down to proper radius to fit in a blank space of the canvas.
                </p>
            </div>
        </div>
        <div id="scoreArea", class="jumbotron">
	<?php
	    include $base."getScore.php";
	    /*
	    * arg1: gameName, should be the same as the dir name
	    * arg2: if your score is sortable, pass 1 if higher score is better, 0
	    *       if smaller score is better. Otherwise no need to pass variable
	    */
	    getScore("Smart Circles", 1);
	?>
	</div>
        <h3>Play It!</h3>
        <form id="gameSettings" class="well">
        </form>
    </article>
    <?php include $base."footer.php"; ?>
</div>
<script type="text/javascript">
    newWindowBtn(1000,1000,"games/SmartCircles/iframe.html");
</script>
</body>
</html>
