# Staking Claims
This is the final project for HPS Fall 2018 of Team Wildcats.

##Instructions:
You are given a 500x500 canvas. We place some number of circles of different radius at start of the game. Your mission is to draw circles in the remain blank space. Smart Circles is a two person game that works as follows:
Every 4 circles finishing being drawn is treated as one round.
Round 1:
For each round, player1 draws one circle with control of the center and radius of the circle.
After player1 properly chooses a center and a point supposedly on the circle, a new circle will be drawn on the canvas.
Then player2 starts to draw a new circle in the remain blank space with the opponent's circle just drawn.
And player2 continues to draw a third circle of the current round, following by player1 draws the fourth circle.
Round 2:
Repeat instruction in round1.
...

Note:
The players are allowed to manually set the number of rounds.
e.g. If the new game is set to 4 rounds, then 16 new circles will be drawn on the canvas when the game is over

##How is Score calculated?
As the game proceeds, the score will be calculated as the total area of already drawn circles owned by the player.
After all rounds, the player with higher score will win the game.

##Rules:
If the new drawn circle somehow steps on the area of other previous circles or is beyond the border of the canvas, then the circle will be automatically narrowed down to proper radius to fit in a blank space of the canvas.
