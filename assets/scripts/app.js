const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackMonster(attackMode){
    let maxDamage;
    if (attackMode === 'ATTACK'){
        maxDamage = ATTACK_VALUE;
    } else if (attackMode === 'STRONG_ATTACK'){
        maxDamage = STRONG_ATTACK_VALUE; 
    }
     const damage = dealMonsterDamage(maxDamage);
     currentMonsterHealth -= damage;
     const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
     currentPlayerHealth -= playerDamage;
     if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
       alert("Hurray! Monster destroyed.");
     } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
       alert("OOPS! You got crushed.");
     } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
       alert("emm... There seem to be an entanglement.");
     }
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler(){
    attackMonster("STRONG_ATTACK");
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
