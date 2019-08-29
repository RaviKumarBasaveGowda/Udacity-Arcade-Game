// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    this.x=x;
    this.y=y;
    this.speed=speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x+=this.speed*dt;
    if (this.x > 510) {
     this.x = 0;
     this.speed = 100 + Math.floor(Math.random() * 222);
    };
    // Checks for collisions between the player and the enemies
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        player.x = 202; //Move the player to the start postion
        player.y = 405;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player{
constructor(xAxis,yAxis){
    this.x=xAxis;
    this.y=yAxis;
    this.player='images/char-boy.png';
}

render () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

//Dummy Function
update (dt) {
}

handleInput(keyPress) {
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 30; //Move up 30 postion
    }
    else if(keyPress == 'down' && this.y < 405) {
        this.y += 30; //Move down 30 postion
    }
    else if (keyPress == 'left' && this.x > 0) {
       this.x -= 30; //Move left 30 postion
   }
   else if (keyPress == 'right' && this.x < 405) {
       this.x += 30; //Move down 30 postion
   }
   // The user has won
  if (this.y < 0) {
    alert('you won');
      setTimeout(() => {
          this.x = 202;
          this.y = 405;
      }, 800);
  }
}
}


// Now instantiate your objects.

// All enemies are placed in an array
var allEnemies = []; // Place all enemy objects in an array called allEnemies

// Location of the 3 enemies on the y axis located on the stone road
var enemyLocation = [60, 140, 220];


// For each enemy located on the y axis from 0 on the x axis move at a speed of 200
// Until randomly regenerated in the enemy update function above
enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

// Place the player object in a variable called player
// The starting location of the player is located at x=200, y=405
var player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
