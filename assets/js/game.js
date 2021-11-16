window.alert("Welcome to Robot Gladiators!");

var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) +min);
  return value;
}

var getPlayerName = function(){

  var name = "";

  while (name === "" || name === null) {
    name = window.prompt("What is your robot's name?");
  }

  console.log("Player robot name is " + name);
  return name;
}

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.attack = 10;
    this.money = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money.");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money.");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10,14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10,14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10,14)
  }
];

var fightOrSkip = function() {
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle?");

  if (!promptFight) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  promptFight = promptFight.toLowerCase();

  if (promptFight === "skip") {
    window.alert(playerInfo.name + " has chosen to skip the fight!");
    //confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you want to skip the fight?");

    // if yes (true) leave fight
    if (confirmSkip) {
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      return true;
    }
  }
  return false;
}

var shop = function() {
  //ask the player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to 1. REFILL your health, 2. UPGRADE your attack, or 3. LEAVE the store?"
  );

  shopOptionPrompt = parseInt(shopOptionPrompt);

  //use switch to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
      //do nothing so function will end
      break;
    default:
      window.alert("You did not pick a valid oiption. Try again.");

      //call shop() again to force player to pick a valid option
      shop();
      break;
  }
}

var fight = function(enemy) {
  console.log(enemy);

  var isPlayerTurn = true;

  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while(playerInfo.health > 0 && enemy.health > 0) {

    if (isPlayerTurn) {

      if (fightOrSkip()) {
        break;
      }
      
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);        
      enemy.health = Math.max(0, enemy.health - damage);     
      console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
    
      //check enemy's health
      if(enemy.health <= 0) { // if ded, run subroutine and break
        window.alert(enemy.name + " has died!");
        playerInfo.money = playerInfo.money + 20;
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }     
    } else { //not player's turn
      
      var damage = randomNumber(enemy.attack - 3, enemy.attack); //robot attacks player
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

      if (playerInfo.health <= 0) { //check if player is alive
        window.alert(playerInfo.name + " has died!");
        //leave while loop if player is dead
        break;
      }
      else { //player is still alive
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      } 

    }

    isPlayerTurn = !isPlayerTurn;
   
  } // close while enemy.health > 0
} // close fight(enemy.name)

var endGame = function() {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("You've lost your robot in battle.");
  }

  //ask the player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    //restart the game
    startGame();
  }
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
}



// function to start a new game
var startGame = function() {
  //reset player stats
  playerInfo.reset();

  for(var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert("Round "+(i+1)+". Fight!")
    
      var pickedEnemyObj = enemyInfo[i];
      pickedEnemyObj.health = randomNumber(40, 60);
      fight(pickedEnemyObj);

      //if we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        //ask the player if wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        //if yes, take them to shop()
        if(storeConfirm) {
          shop();
        }
      
      }

    } else {
      window.alert("You have lost your robot in battle! GAME OVER");
      break;
    }
  }
  endGame();
}



//start the game when the page loads
startGame();