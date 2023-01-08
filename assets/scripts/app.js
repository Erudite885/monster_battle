const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const enteredValue = prompt("Max Life", "100");

let battleLog = [];

let chosenMaxLife = +enteredValue;
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(e, val, monsterHealth, playerHealth) {
    let logEntry = {
      event: e,
      value: val,
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth,
    };
    if (e === 'PLAYER_ATTACK'){
        logEntry.target = 'MONSTER';
    } else if (e === 'PLAYER_STRONG_ATTACK'){
        logEntry = {
            event: e,
            value: val,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    } else if (e === 'MONSTER_ATTACK'){
        logEntry = {
            event: e,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    } else if (e === 'PLAYER_HEAL'){
        logEntry = {
            event: e,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    } else if (e === 'GAMEOVER'){
        logEntry = {
            event: e,
            value: val,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    }
    battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog('MONSTER_ATTACK', playerDamage, currentMonsterHealth, currentPlayerHealth);

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("saved by the bonus");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("Hurray! Monster destroyed.");
    writeToLog('GAME_OVER', 'Monster destroyed, player won', currentMonsterHealth, currentPlayerHealth);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("OOPS! You got crushed.");
    writeToLog(
      "GAME_OVER",
      "Player killed, monster won",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("emm... There seem to be an entanglement.");
    writeToLog(
      "GAME_OVER",
      "Draw",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  if (
    (currentMonsterHealth <= 0 && currentPlayerHealth > 0) ||
    (currentPlayerHealth <= 0 && currentMonsterHealth > 0) ||
    (currentPlayerHealth <= 0 && currentMonsterHealth <= 0)
  ) {
    reset();
  }
}

function attackMonster(attackMode) {
  let maxDamage;
  let logEvent;
  if (attackMode === "ATTACK") {
    maxDamage = ATTACK_VALUE;
    logEvent = "PLAYER_ATTACK"
  } else if (attackMode === "STRONG_ATTACK") {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = "PLAYER_STRONG_ATTACK"
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
   writeToLog(
     logEvent,
     maxDamage,
     currentMonsterHealth,
     currentPlayerHealth
   );
  endRound();
}

function attackHandler() {
  attackMonster("ATTACK");
}

function strongAttackHandler() {
  attackMonster("STRONG_ATTACK");
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("you can't heal more than max life.");
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(HEAL_VALUE);
  currentPlayerHealth += HEAL_VALUE;
  writeToLog(
    "PLAYER_HEAL",
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler(){
    console.log(battleLog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);