new Vue({
    el: "#app",
    data: {
        actionLog: [],
        monsterHealth: 100,
        playerHealth: 100,
        showNewGameControls: true,
        healCount: 3,
        attackCount: 0,
        damageDealt: 0,
        damageTaken: 0,
        hmSpecialAttacks: 0,
        healsUsed: 0,
    },
    methods: {
        rand(min, max) {
            return Math.floor(Math.random() * ((max - min) + 1) + min);
        },
        increaseAttackCount() {
            if (this.attackCount < 8) {
                this.attackCount++;
            }
        },
        playerAttack() {
            let attac = this.rand(2, 8); //3
            this.monsterHealth -= attac;
            this.increaseAttackCount();
            this.damageDealt += attac;
            this.logActioin("attack", "Player", "Success", attac);
            this.monsterAttack(8, 10); //8

        },
        playerSpecialAttack() {
            let plus = this.rand(10, 20);
            if (this.attackCount == 8) {
                plus = this.rand(10, 15)

            }
            this.attackCount -= 4;
            this.monsterHealth -= plus;
            this.damageDealt += plus;
            this.hmSpecialAttacks++;
            this.logActioin("specialAttack", "Player", "warning", plus);

        },
        monsterAttack(min, max) {
            let attac = this.rand(min, max);
            this.playerHealth -= attac;
            this.damageTaken += attac;
            this.logActioin("attacked", "MOnster", "damger", attac);

        },
        healPlayer() {
            let plus = this.rand(10, 20); //10 

            if (this.healsUsed < 3) {
                this.playerHealth += plus;
                this.healCount++;
                this.healsUsed++;
                this.logActioin("heal", "player", "damger", plus);

            }



        },
        startNewGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.healCount = 3;
            this.attackCount = 0;
            this.damageDealt = 0;
            this.damageTaken = 0;
            this.hmSpecialAttacks = 0;
            this.showNewGameControls = false;
            this.actionLog = [];
        },
        playerSurrender() {
            this.playerHealth = 0;
            this.showNewGameControls = true;
        },
        logActioin(actionTaken, entity, color, value) {
            let action = {
                actionTaken: actionTaken,
                entity: entity,
                class: 'alert-' + color,
                actionValue: value
            };
            this.actionLog.push(action);
        },
    },
    computed: {
        healsUsed: function() {
            return 3 - this.healCount;
        }
    },
    watch: {
        monsterHealth: function() {
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0;
                this.showNewGameControls = true;
            }
        },
        playerHealth: function() {
            if (this.playerHealth <= 0) {
                this.playerHealth = 0;
                this.showNewGameControls = true;
            }
        }
    },
})