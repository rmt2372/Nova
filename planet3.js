var wavCount = 1, content3, lineIndex3, wordIndex3, wordDelay3, lineDelay3;
demo.planet3 = function(){};
demo.planet3.prototype = {
    preload: function(){
        game.load.tilemap('map', 'assets/map/level_3_map.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.image('map_sky_night2', 'assets/map/map_sky_night2.png');
        game.load.image('Level_3_Ground', 'assets/map/Level_3_Ground.png');
        game.load.image('shot', 'assets/sprites/Nova_shot.png');
        game.load.spritesheet('nova', 'assets/sprites/nova_.png', 91, 110);
        game.load.image('burst', 'assets/sprites/Debris_burst.png');
        game.load.spritesheet('frog', 'assets/sprites/Frog_villan_jump2.png', 132, 138);
        game.load.spritesheet('bird', 'assets/sprites/bird_enemy.png', 56, 52);
        game.load.image('plant', 'assets/sprites/plant_enemy.png');
        game.load.audio('level3Song', 'assets/sounds/Slottskogen.wav');
        game.load.image('end', 'assets/sprites/GameOver.png');
        game.load.image('reset', 'assets/sprites/reset.png');
        game.load.image('LS', 'assets/sprites/LevelSelectBut.png');
        game.load.image('resume', 'assets/sprites/resume.png');
        game.load.image('heart', 'assets/sprites/Heart.png');
        
        game.load.audio('nova_shot', 'assets/sounds/nova_shot.wav');
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        addChangeStateEventListeners();
        
        map = game.add.tilemap('map');
        map.addTilesetImage('map_sky_night2');
        map.addTilesetImage('Level_3_Ground');
        
        sky = map.createLayer("sky");
        ground = map.createLayer("ground");
        
        sky.resizeWorld();
        
        map.setCollisionBetween(37,40,true,"ground");
        map.setCollisionBetween(45,48,true,"ground");
        map.setCollisionBetween(53,56,true,"ground");
        map.setCollisionBetween(61,64,true,"ground");
        
        nova = game.add.sprite(27, 500, 'nova');
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
        
        wave_burst = game.add.sprite(6406, 1375, 'burst');
        game.physics.enable(wave_burst);
        wave_burst.anchor.setTo(0.5, 0.5);
        wave_burst.scale.setTo(1.3);
        
        weapon = game.add.weapon(50, 'shot');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.fireRate = 600;
        weapon.bulletSpeed = 500;
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        weapon.trackSprite(nova, 0, 0, true);
        
        enemies = game.add.group();
        enemies.enableBody = true;
        game.physics.enable(enemies);
        birds = game.add.group();
        birds.enableBody = true;
        game.physics.enable(birds);
        
        frog1 = enemies.create(1101, 1105, 'frog');
        frog1.scale.setTo(-0.4, 0.4);
        frog1.anchor.setTo(0.5, 0.5);
        frog1.body.gravity.y = 500;
        frog1.animations.add('hop', [0, 1, 2, 3, 2, 1, 0])
        
        frog2 = enemies.create(1645, 1300, 'frog');
        frog2.scale.setTo(-0.4, 0.4);
        frog2.anchor.setTo(0.5, 0.5);
        frog2.body.gravity.y = 500;
        frog2.animations.add('hop', [0, 1, 2, 3, 2, 1, 0])
        
        frog3 = enemies.create(2797, 1350, 'frog');
        frog3.scale.setTo(-0.4, 0.4);
        frog3.anchor.setTo(0.5, 0.5);
        frog3.body.gravity.y = 500;
        frog3.animations.add('hop', [0, 1, 2, 3, 2, 1, 0])
        
        frog4 = enemies.create(5264, 625, 'frog');
        frog4.scale.setTo(-0.4, 0.4);
        frog4.anchor.setTo(0.5, 0.5);
        frog4.body.gravity.y = 500;
        frog4.animations.add('hop', [0, 1, 2, 3, 2, 1, 0])
        
        frog5 = enemies.create(6480, 1350, 'frog');
        frog5.scale.setTo(0.4, 0.4);
        frog5.anchor.setTo(0.5, 0.5);
        frog5.body.gravity.y = 500;
        frog5.animations.add('hop', [0, 1, 2, 3, 2, 1, 0])

        bird1 = enemies.create(850, 900, 'bird');
        bird1.scale.setTo(1, 1);
        bird1.animations.add('fly', [0, 1, 2, 3]);

        bird2 = enemies.create(2815, 1220, 'bird');
        bird2.scale.setTo(1, 1);
        bird2.animations.add('fly', [0, 1, 2, 3]);

        bird3 = enemies.create(4650, 425, 'bird');
        bird3.scale.setTo(1, 1);
        bird3.animations.add('fly', [0, 1, 2, 3]);

        bird4 = enemies.create(5050, 300, 'bird');
        bird4.scale.setTo(1, 1);
        bird4.animations.add('fly', [0, 1, 2, 3]);

        bird5 = enemies.create(5500, 250, 'bird');
        bird5.scale.setTo(1, 1);
        bird5.animations.add('fly', [0, 1, 2, 3]);

        bird6 = enemies.create(6880, 800, 'bird');
        bird6.scale.setTo(1, 1);
        bird6.animations.add('fly', [0, 1, 2, 3]);
        
        bird7 = enemies.create(6560, 1300, 'bird');
        bird7.scale.setTo(1, 1);
        bird7.animations.add('fly', [0, 1, 2, 3]);
        
        bird8 = enemies.create(7070, 490, 'bird');
        bird8.scale.setTo(1, 1);
        bird8.animations.add('fly', [0, 1, 2, 3]);
        
        bird9 = enemies.create(7275, 250, 'bird');
        bird9.scale.setTo(1, 1);
        bird9.animations.add('fly', [0, 1, 2, 3]);
        
        bird10 = enemies.create(7550, 200, 'bird');
        bird10.scale.setTo(1, 1);
        bird10.animations.add('fly', [0, 1, 2, 3]);

        game.camera.follow(nova);

        plant1 = enemies.create(2100, 1200, 'plant');
        plant1.scale.setTo(0.4, 0.4);
        plant1.body.gravity.y = 500;

        plant2 = enemies.create(4620, 550, 'plant');
        plant2.scale.setTo(0.4, 0.4);
        plant2.body.gravity.y = 500;

        plant3 = enemies.create(5480, 975, 'plant');
        plant3.scale.setTo(0.4, 0.4);
        plant3.body.gravity.y = 500;

        plant4 = enemies.create(5780, 1000, 'plant');
        plant4.scale.setTo(0.4, 0.4);
        plant4.body.gravity.y = 500;

        plant5 = enemies.create(5500, 580, 'plant');
        plant5.scale.setTo(0.4, 0.4);
        plant5.body.gravity.y = 500;

        plant6 = enemies.create(6300, 550, 'plant');
        plant6.scale.setTo(0.4, 0.4);
        plant6.body.gravity.y = 500;
        
        plant7 = enemies.create(7455, 1190, 'plant');
        plant7.scale.setTo(0.4, 0.4);
        plant7.body.gravity.y = 500;
        
        up = this.input.keyboard.addKey(Phaser.KeyCode.W);
        left = this.input.keyboard.addKey(Phaser.KeyCode.A);
        right = this.input.keyboard.addKey(Phaser.KeyCode.D);
        
        
        song3 = game.add.audio('level3Song');
        song3.addMarker('song3', 0, 127, 0.03, true);
        song3.play('song3');
        
        cursors = game.input.keyboard.createCursorKeys();
        
        content3 = ['You have collected the wave burst.', 'In the final fight, after building up the super meter press L to fire a wave blocking all projectiles!', 'Press Enter to get back to level select!'];

        line3 = [];

        wordIndex3 = 0;
        lineIndex3 = 0;

        wordDelay3 = 120;
        lineDelay3 = 400;
        textWav = game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });
        textWav.fixedToCamera = true;
        
        heart1 = game.add.sprite(0, 0, 'heart');
        heart1.fixedToCamera = true;
        heart2 = game.add.sprite(18, 0, 'heart');
        heart2.fixedToCamera = true;
        
        tween1 = game.add.tween(plant1).to({x: '-50'}, 750, 'Linear', 'true', 0, false, true).loop(true);
        tween2 = game.add.tween(plant2).to({x: '-75'}, 750, 'Linear', 'true', 0, false, true).loop(true);
        tween3 = game.add.tween(plant3).to({x: '-75'}, 750, 'Linear', 'true', 0, false, true).loop(true);
        tween4 = game.add.tween(plant4).to({x: '-30'}, 700, 'Linear', 'true', 0, false, true).loop(true);
        tween5 = game.add.tween(plant5).to({x: '-40'}, 725, 'Linear', 'true', 0, false, true).loop(true);
        tween6 = game.add.tween(plant6).to({x: '-100'}, 1000, 'Linear', 'true', 0, false, true).loop(true);
        tween7 = game.add.tween(plant7).to({x: '+250'}, 1000, 'Linear', 'true', 0, false, true).loop(true);
        
        game.physics.arcade.isPaused = false;
        
        
        pause = game.add.text(975, 0, 'Pause', {fontSize: 20 + 'px', fill: '#00FFFF'});
        pause.fixedToCamera = true;
        pause.anchor.setTo(0.5, 0);
        pause.inputEnabled = true;
        pause.events.onInputUp.add(function () {
            game.physics.arcade.isPaused = true;
            tween1.pause();
            tween2.pause();
            tween3.pause();
            tween4.pause();
            tween5.pause();
            tween6.pause();
            tween7.pause();
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
                tween6.resume();
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
    
        
        game.physics.arcade.overlap(nova, wave_burst, collectWave, null, this);
        game.physics.arcade.collide(nova, ground);
        game.physics.arcade.overlap(weapon.bullets, enemies, hitVil, null, this);
        game.physics.arcade.collide(weapon.bullets, ground, killBull);
        game.physics.arcade.collide(enemies, ground);
        game.physics.arcade.collide(weapon.bullets, ground, killBull);
        game.physics.arcade.overlap(weapon.bullets, enemies, hitVil, null, this);
        game.physics.arcade.overlap(nova, enemies, hitNova, null, this);

      
      
        
        if (nova.y > 1375){
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


        nova.body.velocity.x = 0;
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
        
        if (wavCount == 0){
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
        if (nova_life == 0){
            heart1.kill();
        }
        if (nova_life == 1){
            heart2.kill();
        }
    }
}
function collectWave(nova, wave_burst){
    wave_burst.kill();
    burst = true;
    supers += 1;
    wavCount -= 1;
    nextLine3();
}
function nextLine3() {

    if (lineIndex3 === content3.length)
    {
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line3 = content3[lineIndex3].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex3 = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(wordDelay3, line3.length, nextWord3, this);

    //  Advance to the next line
    lineIndex3++;

}

function nextWord3() {

    //  Add the next word onto the text string, followed by a space
    textWav.text = textWav.text.concat(line3[wordIndex3] + " ");

    //  Advance the word index to the next word in the line
    wordIndex3++;

    //  Last word?
    if (wordIndex3 === line3.length)
    {
        //  Add a carriage return
        textWav.text = textWav.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay3, nextLine3 , this);
    }

}

function hitVil(shot, villain){
    shot.kill();
    villain.kill();
}