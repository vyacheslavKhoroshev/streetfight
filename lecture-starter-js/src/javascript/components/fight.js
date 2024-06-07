import createElement from '../helpers/domHelper';

export class Status {
    static winner = false;

    static fighterStatus = [
        {
            health: 0,
            healthWidth: 100,
            onBlock: false,
            criticalHitCombination: true,
        },
        {
            health: 0,
            healthWidth: 100,
            onBlock: false,
            criticalHitCombination: true,
        }
    ];

    constructor (actionName) {
        this.index = actionName.includes('One') ? 0 : 1;
        this.position = actionName.includes('One') ? 'left' : 'right';
        this.block = actionName.includes('Block') ? true : false;
        this.actionName = actionName;
        this.criticalHit = actionName.includes('CriticalHit') && Status.fighterStatus[this.index].criticalHitCombination
            ? true : false;
        this.bar = actionName.includes('One') 
            ? document.querySelectorAll('.arena___health-bar')[1]
            : document.querySelectorAll('.arena___health-bar')[0];
    }
}

export async function fight(firstFighter, secondFighter) {
    
    return new Promise(async (resolve, reject) => {
        // resolve the promise with the winner when fight is over

        // not the right decision, there was no time
        function check() {
            if(Status.winner) {
                resolve(Status.winner);
            } else {
                setTimeout(check, 1000);
            }
        }
        check();
    })
}

export function getDamage(attacker, defender, onBlock) {
    let damage;

    if (attacker > defender) {
        damage = onBlock ? attacker - defender : attacker;
    } else {
        damage = 0;
    }

    console.log({attacker, defender, onBlock, damage});

    return damage;
}

export function getHitPower(fighter, isCriticalHit) {
    console.log({isCriticalHit});

    function criticalHitChance() {
        let rand = Math.random() + 1;

        return rand;
    }

    let hitPower = isCriticalHit
        ? fighter.attack * 2 
        : fighter.attack * criticalHitChance();

    return hitPower;
}

export function getBlockPower(fighter, IsCriticalHitCombination) {
    function dodgeChance() {
        return Math.random() + 1;
    }

    const blockPower = IsCriticalHitCombination
        ? 0 
        : fighter.defense * dodgeChance();

    return blockPower;
}

function createActionElement(position, actionName, time) {
    const actionElement = createElement({ tagName: 'div', className: 'arena___fighter-action'});
    actionElement.innerHTML = actionName.includes('hit') ? 'Critical Hit' : actionName

    const arenaFighterElement = document.querySelector(`.arena___${position}-fighter`)
    arenaFighterElement.append(actionElement)

    setTimeout(() => {
        actionElement.remove()
    }, time)
}

function createCriticalHitElement(position) {
    const criticalHitElement = createElement({ tagName: 'div', className: `arena___criticalHit arena___criticalHit-${position}`});

    const arenaFighterElement = document.querySelector(`.arena___${position}-fighter`)
    arenaFighterElement.append(criticalHitElement)

    setTimeout(() => {
        criticalHitElement.remove()
    }, 10000)
}

function decreaseHealth(dam, statusInactiveFighter, bar) {
    let damage = (dam / statusInactiveFighter.health) * 100
    let healthWidth = statusInactiveFighter.healthWidth - damage

    statusInactiveFighter.healthWidth = healthWidth
    bar.style.width = `${healthWidth}%`

    if (healthWidth < 71) {
        bar.style.backgroundColor = `#e1dd15`;
    }

    if (healthWidth < 41) {
        bar.style.backgroundColor = `#ba0303`;
    }

    if (healthWidth < 1) {
        return true;
    }
}
export function calculateAction(selectedFighters, actionName) {
    const fighterParams = new Status(actionName);
    const indexInactiveFighter = fighterParams.index == 1 ? 0 : 1;
    const statusActiveFighter = Status.fighterStatus[fighterParams.index];
    const statusInactiveFighter = Status.fighterStatus[indexInactiveFighter];

    if (fighterParams.block) {
        statusActiveFighter.onBlock = true;
        createActionElement(fighterParams.position, fighterParams.actionName, 700);

        // one press - 0.7s of block
        setTimeout(() => {
            statusActiveFighter.onBlock = false;
        }, 700);

        return;
    } 

    if (fighterParams.criticalHit) {
        createCriticalHitElement(fighterParams.position);
        statusActiveFighter.criticalHitCombination = false;
        
        setTimeout(() => {
            statusActiveFighter.criticalHitCombination = true;
        }, 10000);
    } else {
        fighterParams.actionName = 'Player Attack'
    }

    const attackFighter = selectedFighters[fighterParams.index];
    const defenderFighter = selectedFighters[indexInactiveFighter];
    const attacker = getHitPower(attackFighter, fighterParams.criticalHit);
    const defender = getBlockPower(defenderFighter, fighterParams.criticalHit);
    const damage = getDamage(attacker, defender, statusInactiveFighter.onBlock);
        
    createActionElement(
    fighterParams.position, fighterParams.actionName, 400);
    decreaseHealth(damage, statusInactiveFighter, fighterParams.bar) && (Status.winner = attackFighter);

    console.log(actionName);
}
