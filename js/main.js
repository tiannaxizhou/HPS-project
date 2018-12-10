
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var boardX = 500;
var boardY = 500;
var circles_per_player = 4;

var PreCircle_arr = [];
var Player1_arr = [];    //record the circle info of the circles drawn by player1, structure as [[X, Y, R], ...]
var Player2_arr = [];    //record the circle info of the circles drawn by player2
var player1_area = 0;  //record the territory that is occupied by the circles of player1
var player2_area = 0;  //record the territory that is occupied by the circles of player2
var X, Y, R;    //X, Y for the center position, R for the radius of circle
var pointX, pointY;   //for the chosen point that is supposed to be on the circle of the previous chosen center.

/*
Green circles are pre-drawn circles
Yellow circles are the circles that belong to Player1
Blue circles are the circles that belong to Player2
Red small circles are the chosen center of the incoming circle.
*/

//create boundary of the board
drawBoard();
drawScore();
showWhichRound(1);
showWhoMoves("1");
//draw pre-drawn circles
randomPreCircles();

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function randomPreCircles() {
  var random_num = getRndInteger(3, 10);
  for(var i = 0; i < random_num; i++)
  {
    while(true) {
      var tempX;
      var tempY;
      var validXY;
      var rangeR1 = 500;
      while(true){
        validXY = true;
        tempX = getRndInteger(1, 499);
        tempY = getRndInteger(1, 499);
        // check (tempX, tempY) is not on other circle's territory
        for(var i = 0; i < PreCircle_arr.length; i++)
        {
          var dis = Math.sqrt(Math.pow((PreCircle_arr[i][0] - tempX), 2) + Math.pow((PreCircle_arr[i][1] - tempY), 2))
          if (dis < PreCircle_arr[i][2] + 1)
          {
            validXY = false;
            break;
          } else {
            if(rangeR1 > dis - PreCircle_arr[i][2])
            {
              rangeR1 = dis - PreCircle_arr[i][2]
            }
          }
        }
        if(validXY)
        {
          break;
        }
      }
      var rangeR2 = Math.min(500 - tempX, tempX, 500 - tempY, tempY, rangeR1);
      if (rangeR2 > 30)
      {
        var tempR = getRndInteger(30, rangeR2);
        preCircle(tempX, tempY, tempR);
        break;
      }
    }
  }
}


function drawBoard() {
  ctx.beginPath();
  ctx.rect(0, 0, boardX, boardY);
  ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
  ctx.stroke();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Player1's area: " + parseInt(player1_area, 10), 510, 100);
  ctx.fillText("Player2's area: " + parseInt(player2_area, 10), 510, 120);
}

function showScores(player1_area, player2_area){
  $("#player1_score").html("" + parseInt(player1_area));
  $("#player2_score").html("" + parseInt(player2_area));
}

function showWhichRound(round){
  $("#whichround").html("<b>Round: " + round + "</b>");
};

function showWhoMoves(turn){
  $("#whomoves").html("<b> Player " + turn + "</b> to move.");
};

function drawResult() {
  var result_info = "";
  if(player1_area > player2_area)
  {
    result_info = "Player 1 wins the game!";
  }
  else if (player1_area < player2_area)
  {
    result_info = "Player 2 wins the game!";
  } else {
    result_info = "The game ends in a tie!";
  }
  ctx.font = "16px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(result_info, 510, 150);
  // alert("Game finished!\n" + result_info);
  // document.location.reload();
}

function preCircle(x, y, radius) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI*2, false);
      ctx.fillStyle = "green";
      ctx.fill();
      ctx.closePath();
      var pos_arr = [x, y, radius];
      PreCircle_arr.push(pos_arr);
    }

function drawCenter() {
  ctx.beginPath();
  ctx.arc(X, Y, 1, 0, Math.PI*2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

function drawCircle1() {   //player1
      ctx.beginPath();
      ctx.arc(X, Y, R, 0, Math.PI*2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    }

function drawCircle2() {
      ctx.beginPath();
      ctx.arc(X, Y, R, 0, Math.PI*2);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();
    }

canvas.addEventListener('click', on_canvas_click, false);

var centerClick = false;
var isPlayer1 = false;
var circle = 1;   //track the index of the current circle num , 1-indexed based

function on_canvas_click(ev) {
  if(circle == 2 * circles_per_player + 1)
  {
    //game finished.
    alert("Game finished!\n" + result_info);
    return;
  }
  centerClick = !centerClick;
  if(centerClick) {
    X = ev.clientX - canvas.getBoundingClientRect().left;
    Y = ev.clientY - canvas.getBoundingClientRect().top;
    //check if the chosen center is valid position
    if( X > boardX  )
    {
      centerClick = false;
      return;
    }
    if( Y > boardY )
    {
      centerClick = false;
      return;
    }
    // check (X, Y) is not on other circle's territory
    for(var i = 0; i < PreCircle_arr.length; i++)
    {
      var dis = Math.sqrt(Math.pow((PreCircle_arr[i][0] - X), 2) + Math.pow((PreCircle_arr[i][1] - Y), 2))
      if (dis < PreCircle_arr[i][2])
      {
        centerClick = false;
        return;
      }
    }
    for(var i = 0; i < Player1_arr.length; i++)
    {
      var dis = Math.sqrt(Math.pow((Player1_arr[i][0] - X), 2) + Math.pow((Player1_arr[i][1] - Y), 2))
      if (dis <  Player1_arr[i][2])
      {
        centerClick = false;
        return;
      }
    }
    for(var i = 0; i < Player2_arr.length; i++)
    {
      var dis = Math.sqrt(Math.pow((Player2_arr[i][0] - X), 2) + Math.pow((Player2_arr[i][1] - Y), 2))
      if (dis < Player2_arr[i][2])
      {
        centerClick = false;
        return;
      }
    }
    drawCenter();
  } else {
    pointX = ev.clientX - canvas.getBoundingClientRect().left;
    pointY = ev.clientY - canvas.getBoundingClientRect().top;

    // check if pointX and pointY are at legal area
    if( pointX > boardX )
    {
      centerClick = true;
      return;
    }
    if( pointY > boardY )
    {
      centerClick = true;
      return;
    }
    for(var i = 0; i < PreCircle_arr.length; i++)
    {
      var dis = Math.sqrt(Math.pow((PreCircle_arr[i][0] - pointX), 2) + Math.pow((PreCircle_arr[i][1] - pointY), 2))
      if (dis < PreCircle_arr[i][2])
      {
        centerClick = true;
        return;
      }
    }
    for(var i = 0; i < Player1_arr.length; i++)
    {
      var dis = Math.sqrt(Math.pow((Player1_arr[i][0] - pointX), 2) + Math.pow((Player1_arr[i][1] - pointY), 2))
      if (dis <  Player1_arr[i][2])
      {
        centerClick = true;
        return;
      }
    }
    for(var i = 0; i < Player2_arr.length; i++)
    {
      var dis = Math.sqrt(Math.pow((Player2_arr[i][0] - pointX), 2) + Math.pow((Player2_arr[i][1] - pointY), 2))
      if (dis < Player2_arr[i][2])
      {
        centerClick = true;
        return;
      }
    }

    R = Math.sqrt(Math.pow((pointX - X), 2) + Math.pow((pointY - Y), 2))
    // check if R is valid value, if not, then narraw it down automatically
    if( X + R > boardX )
    {
      R = boardX - X;
    }
    if( X - R < 0 )
    {
      R = X;
    }
    if( Y + R > boardY )
    {
      R = boardY - Y;
    }
    if( Y - R < 0 )
    {
      R = Y;
    }
    for(var i = 0; i < PreCircle_arr.length; i++)
    {
      var dis = Math.sqrt(Math.pow((PreCircle_arr[i][0] - X), 2) + Math.pow((PreCircle_arr[i][1] - Y), 2))
      if (dis < R + PreCircle_arr[i][2])
      {
        R = dis - PreCircle_arr[i][2];
      }
    }
    for(var i = 0; i < Player1_arr.length; i++)
    {
      var dis = Math.sqrt(Math.pow((Player1_arr[i][0] - X), 2) + Math.pow((Player1_arr[i][1] - Y), 2))
      if (dis < R + Player1_arr[i][2])
      {
        R = dis - Player1_arr[i][2];
      }
    }
    for(var i = 0; i < Player2_arr.length; i++)
    {
      var dis = Math.sqrt(Math.pow((Player2_arr[i][0] - X), 2) + Math.pow((Player2_arr[i][1] - Y), 2))
      if (dis < R + Player2_arr[i][2])
      {
        R = dis - Player2_arr[i][2];
      }
    }
    if(circle%4 == 1 || circle%4 == 0)
    {
      isPlayer1 = true;
    } else{
      isPlayer1 = false;
    }

    var circle_info = [X, Y, R];
    if(isPlayer1 )
    {
      player1_area = player1_area + Math.PI * Math.pow(R, 2)
      Player1_arr.push(circle_info);
      drawCircle1();
    } else {
      player2_area = player2_area + Math.PI * Math.pow(R, 2)
      Player2_arr.push(circle_info);
      drawCircle2();
    }
    ctx.clearRect(boardX, 0, canvas.width - boardX, canvas.height);
    drawScore();
    showScores(player1_area, player2_area);
    circle = circle + 1;
    if(circle == 2 * circles_per_player + 1)
    {
      // game finished
      drawResult();
    }
    else if(circle%4 == 1 || circle%4 == 0)
    {
      showWhichRound(parseInt((circle + 1) / 2));
      showWhoMoves("1");
    }
    else {
      showWhichRound(parseInt((circle + 1) / 2));
      showWhoMoves("2");
    }
  }
}
