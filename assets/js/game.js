var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

window.alert("Welcome to Robot Gladiators!");

var fight = function(enemyName) {

  while( enemyHealth > 0) {
    

    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");

    //if player chooses to fight, then fight

    if (promptFight === "fight" || promptFight === "FIGHT") {
        //Subtract value of playerAttack from the value of enemyHealth and use that result to update the value in the enemyHealth variable
      enemyHealth = enemyHealth - playerAttack;
      //Subtract the value of enemyAttack from the value of playerHealth and use that result to update the value in the playerHealth variable
      playerHealth = playerHealth - enemyAttack;
      //Log a resulting message to the console so we know that it worked
      console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
      
      //check enemy's health
      if(enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
      }
      else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
      }
        
      console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

      // check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
      }
      else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
      } 

    } else if (promptFight === "skip" || promptFight === "SKIP") {
      window.alert(playerName + " has chosen to skip the fight!");
      //confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you want to skip the fight?");

      // if yes (true) leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip the fight. Goodbye!");
        //subtract money from playerMoney for skipping
        playerMoney = playerMoney - 2;
      }

      //if no (false), ask question again by running fight() again
      else {
        fight();
      }

    } else {
      window.alert("You need to choose a valid option. Try again.");
    }

  } // close while enemyHealth > 0



} // close fight(enemyName)

for(var i = 0; i < enemyNames.length; i++) {
  var pickedEnemyName = enemyNames[i];
  enemyHealth = 50;
  fight(pickedEnemyName);
}