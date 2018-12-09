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
        <h1 id="gameName">Circle Drawing Game</h1>
        <h3 id="groupName">Team Wildcats</h3>
        <h3>Instruction:</h3>
        <div id="gameDesc" class="jumbotron">
            <div>
                <p>
                    <b>How to Win</b>
                    <br>
                    <font size="2"></font>
                </p>
                <p>
                    <b>Turns</b>
                    <br>
                    <font size="2"></font>
                </p>
                <p>
                    <b>Rules</b>
                    <br>
                <ul>
                    <li>You can first select a point as the center of a circle</li>
                </ul>
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
	    getScore("Circle Drawing", 1);
	?>
	</div>
        <h3>Play It!</h3>
        <form id="gameSettings" class="well">
        </form>
    </article>
    <?php include $base."footer.php"; ?>
</div>
<script type="text/javascript">
    newWindowBtn(1000,1000,"games/CircleDrawing/iframe.html");
</script>
</body>
</html>
