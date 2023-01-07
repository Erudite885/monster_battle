const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife  );
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("saved by the bonus");
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("Hurray! Monster destroyed.");
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("OOPS! You got crushed.");
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("emm... There seem to be an entanglement.");
  }

  if (
    currentMonsterHealth <= 0 && currentPlayerHealth > 0 || 
    currentPlayerHealth <= 0 && currentMonsterHealth > 0 || 
    currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
        reset();
    } 
}

function attackMonster(attackMode) {
  let maxDamage;
  if (attackMode === "ATTACK") {
    maxDamage = ATTACK_VALUE;
  } else if (attackMode === "STRONG_ATTACK") {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
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
  endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
