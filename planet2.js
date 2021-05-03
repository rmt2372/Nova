var bubCount = 1, content2, lineIndex2, wordIndex2, wordDelay2, lineDelay2;
demo.planet2 = function(){};
demo.planet2.prototype = {
    preload: function(){
        
        game.load.spritesheet('nova', 'assets/sprites/nova_.png', 91, 110);
        game.load.image('bubble_shield', 'assets/sprites/Bubble_shield.png');
        
        game.load.spritesheet('frog', 'assets/sprites/Frog_villan_jump2.png', 132, 138);
        game.load.spritesheet('bird', 'assets/sprites/bird_enemy.png', 56, 52);
        game.load.image('plant', 'assets/sprites/plant_enemy.png');
        
        game.load.tilemap("map", "assets/map/level_2_map.json",null,Phaser.Tilemap.TILED_JSON);
        game.load.image("map_sky_night2","assets/map/map_sky_night2.png");
        game.load.image("level_2_ground","assets/map/Level_2_ground.png");
        game.load.image('end', 'assets/sprites/GameOver.png');
        game.load.image('reset', 'assets/sprites/reset.png');
        game.load.image('LS', 'assets/sprites/LevelSelectBut.png');
        game.load.image('resume', 'assets/sprites/resume.png');
        game.load.image('heart', 'assets/sprites/Heart.png');
        
        game.load.image('shot', 'assets/sprites/Nova_shot.png');
        game.load.audio('level2song', 'assets/sounds/Paradise.wav');
        game.load.audio('nova_shot', 'assets/sounds/nova_shot.wav');
        
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        addChangeStateEventListeners();
        
        map = game.add.tilemap("map");
        map.addTilesetImage('map_sky_night2');
        map.addTilesetImage('level_2_ground');
        
        sky = map.createLayer("sky");
        ground = map.createLayer("ground");
        
        sky.resizeWorld();
        
        map.setCollisionBetween(37,72,true,"ground");
        
        nova = game.add.sprite(31, 1200, 'nova');
        nova.scale.setTo(0.6, 0.6);
        nova.anchor.setTo(0.5, 0.5);
        game.physics.enable(nova);
        nova.body.collideWorldBounds = true;
        nova.body.bounce.y = 0.2;
        nova.body.gravity.y = 900;
        nova.invincibility = false;
        nova.animations.add('idle', [0, 1]);
        nova.animations.add('move', [2, 3, 4, 5, 6, 7, 8, 9, 10]);
        nova.animations.add('shoot_move', [20, 21, 22, 23, 24, 25]);
        nova.animations.add('shoot', [15, 16, 17]);
        
        nova_shot = game.add.audio('nova_shot', 0.04);
        
        bub_shield = game.add.sprite(7968, 665, 'bubble_shield');
        bub_shield.anchor.setTo(0.5, 0.5);
        game.physics.enable(bub_shield);
        
        weapon = game.add.weapon(50, 'shot');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.fireRate = 600;
        weapon.bulletSpeed = 500;
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        weapon.trackSprite(nova, 0, 0, true);
        
        
        enemies = game.add.group();
        enemies.enableBody = true;
        game.physics.enable(enemies);
        
        frog1 = enemies.create(975, 1300, 'frog');
        frog1.scale.setTo(-0.4, 0.4);
        frog1.anchor.setTo(0.5, 0.5);
        frog1.body.gravity.y = 500;
        frog1.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog2 = enemies.create(2276, 1300, 'frog');
        frog2.scale.setTo(-0.4, 0.4);
        frog2.anchor.setTo(0.5, 0.5);
        frog2.body.gravity.y = 500;
        frog2.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog3 = enemies.create(2514, 1200, 'frog');
        frog3.scale.setTo(-0.4, 0.4);
        frog3.anchor.setTo(0.5, 0.5);
        frog3.body.gravity.y = 500;
        frog3.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog4 = enemies.create(3293, 1045, 'frog');
        frog4.scale.setTo(-0.4, 0.4);
        frog4.anchor.setTo(0.5, 0.5);
        frog4.body.gravity.y = 500;
        frog4.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog5 = enemies.create(4775, 660, 'frog');
        frog5.scale.setTo(-0.4, 0.4);
        frog5.anchor.setTo(0.5, 0.5);
        frog5.body.gravity.y = 500;
        frog5.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog6 = enemies.create(7268, 1075, 'frog');
        frog6.scale.setTo(-0.4, 0.4);
        frog6.anchor.setTo(0.5, 0.5);
        frog6.body.gravity.y = 500;
        frog6.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        plant1 = enemies.create(385, 1275, 'plant');
        plant1.scale.setTo(0.4, 0.4);
        plant1.body.gravity.y = 500;

        plant2 = enemies.create(1050, 1250, 'plant');
        plant2.scale.setTo(0.4, 0.4);
        plant2.body.gravity.y = 500;

        plant3 = enemies.create(1700, 1175, 'plant');
        plant3.scale.setTo(0.4, 0.4);
        plant3.body.gravity.y = 500;

        plant4 = enemies.create(2805, 1150, 'plant');
        plant4.scale.setTo(0.4, 0.4);
        plant4.body.gravity.y = 500;

        plant5 = enemies.create(3400, 1200, 'plant');
        plant5.scale.setTo(0.4, 0.4);
        plant5.body.gravity.y = 500;

        plant6 = enemies.create(3650, 1200, 'plant');
        plant6.scale.setTo(0.4, 0.4);
        plant6.body.gravity.y = 500;

        plant7 = enemies.create(3975, 850, 'plant');
        plant7.scale.setTo(0.4, 0.4);
        plant7.body.gravity.y = 500;

        plant8 = enemies.create(5150, 607, 'plant');
        plant8.scale.setTo(0.4, 0.4);
        plant8.body.gravity.y = 500;

        plant9 = enemies.create(5200, 1020, 'plant');
        plant9.scale.setTo(0.4, 0.4);
        plant9.body.gravity.y = 500;

        plant10 = enemies.create(5100, 550, 'plant');
        plant10.scale.setTo(0.4, 0.4);
        plant10.body.gravity.y = 500;

        plant11 = enemies.create(6500, 1200, 'plant');
        plant11.scale.setTo(0.4, 0.4);
        plant11.body.gravity.y = 500;
        
        
        birds = game.add.group();
        birds.enableBody = true;
        game.physics.enable(birds);

        bird1 = enemies.create(385, 1000, 'bird');
        bird1.scale.setTo(1, 1);
        bird1.animations.add('fly', [0, 1, 2, 3]);
        game.camera.follow(nova);

        bird2 = enemies.create(1000, 1200, 'bird');
        bird2.scale.setTo(1, 1);
        bird2.animations.add('fly', [0, 1, 2, 3]);
        
        bird3 = enemies.create(2500, 1300, 'bird');
        bird3.scale.setTo(1, 1);
        bird3.animations.add('fly', [0, 1, 2, 3]);
        
        bird4 = enemies.create(3000, 900, 'bird');
        bird4.scale.setTo(1, 1);
        bird4.animations.add('fly', [0, 1, 2, 3]);
        
        bird5 = enemies.create(3500, 600, 'bird');
        bird5.scale.setTo(1, 1);
        bird5.animations.add('fly', [0, 1, 2, 3]);
        
        bird6 = enemies.create(4000, 600, 'bird');
        bird6.scale.setTo(1, 1);
        bird6.animations.add('fly', [0, 1, 2, 3]);
        
        bird7 = enemies.create(4500, 600, 'bird');
        bird7.scale.setTo(1, 1);
        bird7.animations.add('fly', [0, 1, 2, 3]);

        bird8 = enemies.create(6000, 800, 'bird');
        bird8.scale.setTo(1, 1);
        bird8.animations.add('fly', [0, 1, 2, 3]);

        bird9 = enemies.create(6250, 700, 'bird');
        bird9.scale.setTo(1, 1);
        bird9.animations.add('fly', [0, 1, 2, 3]);

        bird10 = enemies.create(6500, 750, 'bird');
        bird10.scale.setTo(1, 1);
        bird10.animations.add('fly', [0, 1, 2, 3]);

        bird11 = enemies.create(7500, 600, 'bird');
        bird11.scale.setTo(1, 1);
        bird11.animations.add('fly', [0, 1, 2, 3]);
        
        up = this.input.keyboard.addKey(Phaser.KeyCode.W);
        left = this.input.keyboard.addKey(Phaser.KeyCode.A);
        right = this.input.keyboard.addKey(Phaser.KeyCode.D);
        
        
        song2 = game.add.audio('level2song');
        song2.addMarker('song2', 75, 80, 0.03, true);
        song2.play('song2');
        
        cursors = game.input.keyboard.createCursorKeys();
        
        heart1 = game.add.sprite(0, 0, 'heart');
        heart1.fixedToCamera = true;
        heart2 = game.add.sprite(18, 0, 'heart');
        heart2.fixedToCamera = true;
        
        tween1 = game.add.tween(plant1).to({x: '+150'}, 875, 'Linear', 'true', 0, false, true).loop(true);
        tween2 = game.add.tween(plant2).to({x: '+50'}, 900, 'Linear', 'true', 0, false, true).loop(true);
        tween3 = game.add.tween(plant3).to({x: '+175'}, 870, 'Linear', 'true', 0, false, true).loop(true);
        tween4 = game.add.tween(plant4).to({x: '+50'}, 875, 'Linear', 'true', 0, false, true).loop(true);
        tween5 = game.add.tween(plant5).to({x: '+100'}, 900, 'Linear', 'true', 0, false, true).loop(true);
        tween6 = game.add.tween(plant6).to({x: '+100'}, 900, 'Linear', 'true', 0, false, true).loop(true);
        tween7 = game.add.tween(plant7).to({x: '+50'}, 900, 'Linear', 'true', 0, false, true).loop(true);
        tween8 = game.add.tween(plant8).to({x: '+50'}, 900, 'Linear', 'true', 0, false, true).loop(true);
        tween9 = game.add.tween(plant9).to({x: '+100'}, 900, 'Linear', 'true', 0, false, true).loop(true);
        tween10 = game.add.tween(plant10).to({x: '+75'}, 900, 'Linear', 'true', 0, false, true).loop(true);
        tween11 = game.add.tween(plant11).to({x: '+125'}, 900, 'Linear', 'true', 0, false, true).loop(true);


        content2 = ['You have collected the shields.', 'In the final fight, after building up the super meter press J to become invincible and obtain a speed boost for a brief time.', 'Press Enter to get back to level select!'];

        line2 = [];

        wordIndex2 = 0;
        lineIndex2 = 0;

        wordDelay2 = 120;
        lineDelay2 = 400;
        textBub = game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });
        textBub.fixedToCamera = true;
        
        game.physics.arcade.isPaused = false;
        
        
        pause = game.add.text(975, 0, 'Pause', {fontSize: 20 + 'px', fill: '#00FFFF'});
        pause.fixedToCamera = true;
        pause.anchor.setTo(0.5, 0);
        pause.inputEnabled = true;
        pause.events.onInputUp.add(function () {
        // When the paus button is pressed, we pause the game
            game.physics.arcade.isPaused = true;
            tween1.pause();
            tween2.pause();
            tween3.pause();
            tween4.pause();
            tween5.pause();
            tween6.pause();
            tween7.pause();
            tween8.pause();
            tween9.pause();
            tween10.pause();
            tween11.pause();
            LS = game.add.button(centerX, 400, 'LS', function(){
                changeState(null, 'l');
            });
            LS.anchor.setTo(0.5, 0.5);
            LS.fixedToCamera = true;
            LS.scale.setTo(0.5);
            reset = game.add.button(centerX, 300, 'reset', function(){
                    if(game.state.getCurrentState().key == 'planet1'){
                        changeState(null, '1');
                    }
                    if(game.state.getCurrentState().key == 'planet2'){
                        changeState(null, '2');
                    }
                    if(game.state.getCurrentState().key == 'planet3'){
                        changeState(null, '3');
                    }
                    if(game.state.getCurrentState().key == 'planet4'){
                        changeState(null, '4');
                    }
                });
            reset.anchor.setTo(0.5, 0.5);
            reset.fixedToCamera = true;
            reset.scale.setTo(0.75);
            resume = game.add.button(centerX, centerY - 100, 'resume', function(){
                game.physics.arcade.isPaused = false;
                tween1.resume();
                tween2.resume();
                tween3.resume();
                tween4.resume();
                tween5.resume();
                tween6.resume();
                tween7.resume();
                tween8.resume();
                tween9.resume();
                tween10.resume();
                tween11.resume();
                LS.destroy();
                reset.destroy();
                resume.destroy();
            });
            resume.anchor.setTo(0.5, 0.5);
            resume.fixedToCamera = true;
            resume.scale.setTo(0.5);
        });
        
    },
    update:function(){
        
        
        if (nova.y > 1350){
            nova.body.collideWorldBounds = false;
            if (nova.inCamera == false){
                heart1.kill();
                heart2.kill();
                endGameLevel();
                nova_life = 0;
            }
        }
        else{
            nova.body.collideWorldBounds = true;
        }
        
        game.physics.arcade.collide(nova, ground);
        game.physics.arcade.overlap(nova, bub_shield, collectShield, null, this);
        game.physics.arcade.collide(enemies, ground);
        game.physics.arcade.collide(weapon.bullets, ground, killBull);
        game.physics.arcade.overlap(weapon.bullets, enemies, hitVil, null, this);
        game.physics.arcade.overlap(nova, enemies, hitNova, null, this);
        
        nova.body.velocity.x = 0;
        
        if (nova.x > plant1.x){
            plant1.scale.setTo(-0.4, 0.4);
        }
        else if(nova.x < plant1.x){
            plant1.scale.setTo(0.4, 0.4);
        }
        if (nova.x > plant2.x){
            plant2.scale.setTo(-0.4, 0.4);
        }
        else if(nova.x < plant2.x){
            plant2.scale.setTo(0.4, 0.4);
        }
        if (nova.x > plant3.x){
            plant3.scale.setTo(-0.4, 0.4);
        }
        else if(nova.x < plant3.x){
            plant3.scale.setTo(0.4, 0.4);
        }
        if (nova.x > plant4.x){
            plant4.scale.setTo(-0.4, 0.4);
        }
        else if(nova.x < plant4.x){
            plant4.scale.setTo(0.4, 0.4);
        }
        if (nova.x > plant5.x){
            plant5.scale.setTo(-0.4, 0.4);
        }
        else if(nova.x < plant5.x){
            plant5.scale.setTo(0.4, 0.4);
        }
        if (nova.x > plant6.x){
            plant6.scale.setTo(-0.4, 0.4);
        }
        else if(nova.x < plant6.x){
            plant6.scale.setTo(0.4, 0.4);
        }
        if (nova.x > plant7.x){
            plant7.scale.setTo(-0.4, 0.4);
        }
        else if(nova.x < plant7.x){
            plant7.scale.setTo(0.4, 0.4);
        }
        if (nova.x > plant8.x){
            plant8.scale.setTo(-0.4, 0.4);
        }
        else if(nova.x < plant8.x){
            plant8.scale.setTo(0.4, 0.4);
        }
        if (nova.x > plant9.x){
            plant9.scale.setTo(-0.4, 0.4);
        }
        else if(nova.x < plant9.x){
            plant9.scale.setTo(0.4, 0.4);
        }
        if (nova.x > plant10.x){
            plant10.scale.setTo(-0.4, 0.4);
        }
        else if(nova.x < plant10.x){
            plant10.scale.setTo(0.4, 0.4);
        }
        if (nova.x > plant11.x){
            plant11.scale.setTo(-0.4, 0.4);
        }
        else if(nova.x < plant11.x){
            plant11.scale.setTo(0.4, 0.4);
        }


        if (nova.x > bird1.x){
            bird1.scale.setTo(-1, 1);
        }
        else if(nova.x < bird1.x){
            bird1.scale.setTo(1, 1);
        }
        if (nova.x > bird2.x){
            bird2.scale.setTo(-1, 1);
        }
        else if(nova.x < bird2.x){
            bird2.scale.setTo(1, 1);
        }
        if (nova.x > bird3.x){
            bird3.scale.setTo(-1, 1);
        }
        else if(nova.x < bird3.x){
            bird3.scale.setTo(1, 1);
        }
        if (nova.x > bird4.x){
            bird4.scale.setTo(-1, 1);
        }
        else if(nova.x < bird4.x){
            bird4.scale.setTo(1, 1);
        }
        if (nova.x > bird5.x){
            bird5.scale.setTo(-1, 1);
        }
        else if(nova.x < bird5.x){
            bird5.scale.setTo(1, 1);
        }
        if (nova.x > bird6.x){
            bird6.scale.setTo(-1, 1);
        }
        else if(nova.x < bird6.x){
            bird6.scale.setTo(1, 1);
        }
        if (nova.x > bird7.x){
            bird7.scale.setTo(-1, 1);
        }
        else if(nova.x < bird7.x){
            bird7.scale.setTo(1, 1);
        } 
        if (nova.x > bird8.x){
            bird8.scale.setTo(-1, 1);
        }
        else if(nova.x < bird8.x){
            bird8.scale.setTo(1, 1);
        } 
        if (nova.x > bird9.x){
            bird9.scale.setTo(-1, 1);
        }
        else if(nova.x < bird9.x){
            bird9.scale.setTo(1, 1);
        } 

        if (nova.x > bird10.x){
            bird10.scale.setTo(-1, 1);
        }
        else if(nova.x < bird10.x){
            bird10.scale.setTo(1, 1);
        } 

        if (nova.x > bird11.x){
            bird11.scale.setTo(-1, 1);
        }
        else if(nova.x < bird11.x){
            bird11.scale.setTo(1, 1);
        } 
        
        if(left.isDown){
            nova.scale.setTo(-0.6, 0.6)
            nova.body.velocity.x = -200;
            weapon.bulletSpeed = -500;
            if (fireButton.isDown){
                nova.animations.play('shoot_move', 8, true);
            }
            else{
                nova.animations.play('move', 12, true);
            }
        }
        else if(right.isDown){
            nova.scale.setTo(0.6, 0.6)
            nova.body.velocity.x = 200;
            weapon.bulletSpeed = 500;
            if (fireButton.isDown){
                nova.animations.play('shoot_move', 8, true);
            }
            else{
                nova.animations.play('move', 12, true);
            }
        }
        else{
            nova.animations.stop('move');
            nova.animations.play('idle', 3, true);
        }
        if(up.isDown && jump < 2 && jumping == false){
            nova.body.velocity.y = -375;
            jumping = true;

        }
        if(nova.body.blocked.down){
            jump = 0;
            jumping = false;
        }
        if (jumping && up.isDown == false) {
            jump += 1;
            jumping = false;
        }
        if (fireButton.isDown){
            if (nova.alive == true){
                weapon.fire();
                if (left.isDown == false && right.isDown == false){
                    nova.animations.play('shoot', 5, false);
                }
            }
        }
        weapon.onFire.add(function(){
            nova_shot.play();
        })
        
        if (bubCount == 0){
            pauseGame1();
        }

        if(bird1.inCamera){
            bird1.animations.play('fly', 12, true);
            game.physics.arcade.moveToObject(bird1, nova, 120, null);
        }
        if(bird2.inCamera){
            bird2.animations.play('fly', 12, true);
            game.physics.arcade.moveToObject(bird2, nova, 120, null);
        }
        if(bird3.inCamera){
            bird3.animations.play('fly', 12, true);
            game.physics.arcade.moveToObject(bird3, nova, 120, null);
        }
        if(bird4.inCamera){
            bird4.animations.play('fly', 12, true);
            game.physics.arcade.moveToObject(bird4, nova, 120, null);
        }
        if(bird5.inCamera){
            bird5.animations.play('fly', 12, true);
            game.physics.arcade.moveToObject(bird5, nova, 120, null);
        }
        if(bird6.inCamera){
            bird6.animations.play('fly', 12, true);
            game.physics.arcade.moveToObject(bird6, nova, 120, null);
        }
        if(bird7.inCamera){
            bird7.animations.play('fly', 12, true);
            game.physics.arcade.moveToObject(bird7, nova, 120, null);
        }
        if(bird8.inCamera){
            bird8.animations.play('fly', 12, true);
            game.physics.arcade.moveToObject(bird8, nova, 120, null);
        }
        if(bird9.inCamera){
            bird9.animations.play('fly', 12, true);
            game.physics.arcade.moveToObject(bird9, nova, 120, null);
        }
        if(bird10.inCamera){
            bird10.animations.play('fly', 12, true);
            game.physics.arcade.moveToObject(bird10, nova, 120, null);
        }
        if(bird11.inCamera){
            bird11.animations.play('fly', 12, true);
            game.physics.arcade.moveToObject(bird11, nova, 120, null);
        }
        
        if(frog1.body.blocked.down){
            frog1.body.velocity.y = -300;
            frog1.animations.play('hop', 6, false);
        }
        if(frog2.body.blocked.down){
            frog2.body.velocity.y = -300;
            frog2.animations.play('hop', 6, false);
        }
        if(frog3.body.blocked.down){
            frog3.body.velocity.y = -300;
            frog3.animations.play('hop', 6, false);
        }
        if(frog4.body.blocked.down){
            frog4.body.velocity.y = -300;
            frog4.animations.play('hop', 6, false);
        }
        if(frog5.body.blocked.down){
            frog5.body.velocity.y = -300;
            frog5.animations.play('hop', 6, false);
        }
        if(frog6.body.blocked.down){
            frog6.body.velocity.y = -300;
            frog6.animations.play('hop', 6, false);
        }
        if (nova_life == 0){
            heart1.kill();
        }
        if (nova_life == 1){
            heart2.kill();
        }
        
    }
}
function collectShield(nova, bub_shield){
    bub_shield.kill();
    shield = true;
    supers += 1;
    bubCount -= 1;
    nextLine2();
}
function nextLine2() {

    if (lineIndex2 === content2.length)
    {
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line2 = content2[lineIndex2].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex2 = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(wordDelay2, line2.length, nextWord2, this);

    //  Advance to the next line
    lineIndex2++;

}

function nextWord2() {

    //  Add the next word onto the text string, followed by a space
    textBub.text = textBub.text.concat(line2[wordIndex2] + " ");

    //  Advance the word index to the next word in the line
    wordIndex2++;

    //  Last word?
    if (wordIndex2 === line2.length)
    {
        //  Add a carriage return
        textBub.text = textBub.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay2, nextLine2, this);
    }

}
