
World.prototype.checkColliding_PlayHurt_andDeleyChicken = function(){
    
        this.level.enemies.forEach((enemies) => {
            if (this.Character.isChrushingChicken(enemies)) {
                console.log('chicken gechrushed')
                this.Character.y - 50 // test
                this.Character.makeInvincible(3)
                enemies.chrushChicken()
            }
            if (this.isCollidingWithChicken(enemies)) { //check if throwable Bottle is colliding with enemie
                console.log('chicken getroffen')
                enemies.chrushChicken(enemies);
            }

            if (this.Character.isColliding(enemies)) {
                if (!this.Character.isInvincible()) {
                    this.hit()
                    this.Character.playHurtAnimation(this.isHurt);
                    if (localStorage.getItem('muteStatus') == 'true') { } else {
                        this.hitSound.volume = 0.6
                        this.hitSound.play();
                    }
                }
            }
            if (!this.Character.isColliding(enemies) && this.lastHit > 0 && this.isHurt()) {
                if (!this.Character.isInvincible()) {
                    this.Character.playHurtAnimation(this.isHurt);
                }
            }
            if (this.timePassed > 2) {
                if (this.timePassed > 30) { this.timePassed = 0 }

            }
        });
    
}

World.prototype.checkColliding_PlayHurt_andDeleyMiniChicken = function(){
    this.level.miniEnemies.forEach((miniEnemies) => {
            if (this.Character.isChrushingMiniChicken(miniEnemies)) {
                console.log('MiniChicken gechrushed')
                this.Character.makeInvincible(3)
                miniEnemies.chrushMiniChicken(miniEnemies)
            }
            //checks if a throwable bottle is colliding with a miniEnemies
            if (this.isCollidingWithMiniChicken(miniEnemies)) {
                console.log('chicken getroffen')
                miniEnemies.chrushMiniChicken(miniEnemies);
            }
            if (this.Character.isCollidingMiniChicken(miniEnemies)) {
                if (!this.Character.isInvincible()) {
                    this.hit()
                    this.Character.playHurtAnimation(this.isHurt);
                    if (localStorage.getItem('muteStatus') == 'true') { } else {
                        this.hitSound.volume = 0.6
                        this.hitSound.play();
                    }
                }
            }
            if (!this.Character.isCollidingMiniChicken(miniEnemies) && this.lastHit > 0 && this.isHurt()) {
                if (!this.Character.isInvincible()) {
                    this.Character.playHurtAnimation(this.isHurt);
                }
            }
            if (this.timePassed > 2) {
                if (this.timePassed > 30) { this.timePassed = 0 }

            }
        });
}

World.prototype.checkCollisionWidth_Bottles = function(){
            this.level.bottles.forEach((bottles) => {
            if (this.isCollidingWidth_Bottle(bottles)) {
                bottles.y = 1000;
                this.collected++
                console.log(this.collected)
            }

            if (this.Keyboard.d == true && !this.d_wasPressed && this.collected > 0) {
                let bottle = new ThrowableObject(this.Character.x, this.Character.y);
                this.throwableObjects.push(bottle);
                let index = (this.throwableObjects?.length - 1)
                console.log(this.throwableObjects.length);
                if (this.Character.otherDirection) {
                    console.log(this.Character.otherDirection);
                    this.throwableObjects[index]?.throw(-35, this)
                } else { this.throwableObjects[index]?.throw(35, this) }
                this.collected--
                this.d_wasPressed = true;
            }

            if (this.d_wasPressed && this.Keyboard.d == false) {
                this.d_wasPressed = false
            }
        }
        )
    
}

