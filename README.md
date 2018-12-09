# HPS-project
This is the final project for HPS Fall 2018 of Team Wildcats.

#Instructions:
You are given a 500x500 canvas. We place some number of circles of different radius at start of the game. Your mission is to draw circles in the remain blank space. The Circle Painter is a two person game that works as follows:
Round 1:
PlayerA starts to draw one circle with control of the center and radius of the circle.  After playerA properly chooses a center and a point supposedly on the circle, a new circle will be drawn on the canvas.
PlayerB then starts to repeat what playerA did in the remain blank space with one new circle just drawn.
Round 2:
PlayerB starts first to draw a circle.
Then PlayerA gets to draw.
Round3:
Repeats instruction on round1
Round4:
Repeats instruction on round2   

Manually set n rounds
Repeat instruction from round1 to round4.

#How is Score calculated?
As the game proceeds, the score will be calculated as the total area of already drawn circles owned by the player. After 10 rounds, the player with high score will win the game.

#Rules:
If the new drawn circle somehow steps on the area of other previous circles or is beyond the border of the canvas, then the circle will be automatically narrowed down to proper radius to fit in a blank space of the canvas.
