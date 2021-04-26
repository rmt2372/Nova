var lasCount = 1, content4, lineIndex4, wordIndex4, wordDelay4, lineDelay4, enemy;
demo.planet4 = function(){};
demo.planet4.prototype = {
    preload: function(){
        game.load.tilemap("map", "assets/map/level_4_map.json",null,Phaser.Tilemap.TILED_JSON);
        game.load.image("map_sky_night2","assets/map/map_sky_night2.png");
        game.load.image("Level_4_Ground","assets/map/Level_4_Ground.png");
        game.load.image('shot', 'assets/sprites/Nova_shot.png');
        game.load.spritesheet('nova', 'assets/sprites/nova_.png', 91, 110);
        game.load.image('laser', 'assets/sprites/Laser_cannon.png');
        game.load.spritesheet('frog', 'assets/sprites/Frog_villan_jump2.png', 132, 138);
        game.load.spritesheet('bird', 'assets/sprites/bird_enemy.png', 56, 52);
        game.load.image('plant', 'assets/sprites/plant_enemy.png');
        game.load.audio('level4Song', 'assets/sounds/Valentine.wav');
        game.load.image('end', 'assets/sprites/GameOver.png');
        game.load.image('reset', 'assets/sprites/reset.png');
        game.load.image('LS', 'assets/sprites/LevelSelectBut.png');
        game.load.image('resume', 'assets/sprites/resume.png');
        
        game.load.audio('nova_shot', 'assets/sounds/nova_shot.wav');
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        addChangeStateEventListeners();
        map = game.add.tilemap("map");
        map.addTilesetImage('map_sky_night2');
        map.addTilesetImage('Level_4_Ground');
        
        sky = map.createLayer("sky");
        ground = map.createLayer("ground");
        
        sky.resizeWorld();
        map.setCollisionBetween(37,40,true,"ground");
        map.setCollisionBetween(45,48,true,"ground");
        map.setCollisionBetween(53,56,true,"ground");
        map.setCollisionBetween(61,64,true,"ground");
        
        nova = game.add.sprite(128, 1015, 'nova');
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
        
        enemy = game.add.group();
        enemy.enableBody = true;
        game.physics.enable(enemy);
        
        plant1 = enemy.create(527, 970, 'plant');
        plant1.scale.setTo(0.4, 0.4);
        plant1.anchor.setTo(0.5, 0.5);
        plant1.body.gravity.y = 500;
        
        plant2 = enemy.create(1164, 870, 'plant');
        plant2.scale.setTo(0.4, 0.4);
        plant2.anchor.setTo(0.5, 0.5);
        plant2.body.gravity.y = 500;
        
        plant3 = enemy.create(1360, 1065, 'plant');
        plant3.scale.setTo(0.4, 0.4);
        plant3.anchor.setTo(0.5, 0.5);
        plant3.body.gravity.y = 500;
        
        plant4 = enemy.create(2812, 905, 'plant');
        plant4.scale.setTo(0.4, 0.4);
        plant4.anchor.setTo(0.5, 0.5);
        plant4.body.gravity.y = 500;
        
        plant5 = enemy.create(3152, 850, 'plant');
        plant5.scale.setTo(0.4, 0.4);
        plant5.anchor.setTo(0.5, 0.5);
        plant5.body.gravity.y = 500;
        
        plant6 = enemy.create(3892, 455, 'plant');
        plant6.scale.setTo(0.4, 0.4);
        plant6.anchor.setTo(0.5, 0.5);
        plant6.body.gravity.y = 500;
        
        plant7 = enemy.create(5042, 680, 'plant');
        plant7.scale.setTo(0.4, 0.4);
        plant7.anchor.setTo(0.5, 0.5);
        plant7.body.gravity.y = 500;
        
        plant8 = enemy.create(5422, 1010, 'plant');
        plant8.scale.setTo(0.4, 0.4);
        plant8.anchor.setTo(0.5, 0.5);
        plant8.body.gravity.y = 500;
        
        plant9 = enemy.create(6988, 870, 'plant');
        plant9.scale.setTo(0.4, 0.4);
        plant9.anchor.setTo(0.5, 0.5);
        plant9.body.gravity.y = 500;
        
        frog1 = enemy.create(1000, 815, 'frog');
        frog1.scale.setTo(-0.4, 0.4);
        frog1.anchor.setTo(0.5, 0.5)
        frog1.body.gravity.y = 500;
        frog1.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog2 = enemy.create(1661, 970, 'frog');
        frog2.scale.setTo(-0.4, 0.4);
        frog2.anchor.setTo(0.5, 0.5)
        frog2.body.gravity.y = 500;
        frog2.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog3 = enemy.create(3982, 840, 'frog');
        frog3.scale.setTo(0.4, 0.4);
        frog3.anchor.setTo(0.5, 0.5)
        frog3.body.gravity.y = 500;
        frog3.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog4 = enemy.create(5456, 715, 'frog');
        frog4.scale.setTo(-0.4, 0.4);
        frog4.anchor.setTo(0.5, 0.5)
        frog4.body.gravity.y = 500;
        frog4.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog5 = enemy.create(5682, 840, 'frog');
        frog5.scale.setTo(-0.4, 0.4);
        frog5.anchor.setTo(0.5, 0.5)
        frog5.body.gravity.y = 500;
        frog5.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog6 = enemy.create(7372, 330, 'frog');
        frog6.scale.setTo(-0.4, 0.4);
        frog6.anchor.setTo(0.5, 0.5)
        frog6.body.gravity.y = 500;
        frog6.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog7 = enemy.create(7564, 395, 'frog');
        frog7.scale.setTo(-0.4, 0.4);
        frog7.anchor.setTo(0.5, 0.5)
        frog7.body.gravity.y = 500;
        frog7.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog8 = enemy.create(7727, 555, 'frog');
        frog8.scale.setTo(-0.4, 0.4);
        frog8.anchor.setTo(0.5, 0.5)
        frog8.body.gravity.y = 500;
        frog8.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        bird1 = enemy.create(2114, 800, 'bird');
        bird1.scale.setTo(1, 1);
        bird1.animations.add('fly', [0, 1, 2, 3]);
        
        bird2 = enemy.create(2424, 600, 'bird');
        bird2.scale.setTo(1, 1);
        bird2.animations.add('fly', [0, 1, 2, 3]);
        
        bird3 = enemy.create(3038, 800, 'bird');
        bird3.scale.setTo(1, 1);
        bird3.animations.add('fly', [0, 1, 2, 3]);
        
        bird4 = enemy.create(3471, 600, 'bird');
        bird4.scale.setTo(1, 1);
        bird4.animations.add('fly', [0, 1, 2, 3]);
        
        bird5 = enemy.create(4600, 500, 'bird');
        bird5.scale.setTo(1, 1);
        bird5.animations.add('fly', [0, 1, 2, 3]);
        
        bird6 = enemy.create(6767, 400, 'bird');
        bird6.scale.setTo(1, 1);
        bird6.animations.add('fly', [0, 1, 2, 3]);
        
        bird7 = enemy.create(7050, 400, 'bird');
        bird7.scale.setTo(1, 1);
        bird7.animations.add('fly', [0, 1, 2, 3]);
        
        bird8 = enemy.create(4350, 850, 'bird');
        bird8.scale.setTo(1, 1);
        bird8.animations.add('fly', [0, 1, 2, 3]);
        
        weapon = game.add.weapon(50, 'shot');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.fireRate = 600;
        weapon.bulletSpeed = 500;
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        weapon.trackSprite(nova, 0, 0, true);
        
        laser_cannon = game.add.sprite(7965, 345, 'laser');
        laser_cannon.anchor.setTo(0.5, 0.5);
        game.physics.enable(laser_cannon);
        
        enemies = game.add.group();
        enemies.enableBody = true;
        game.physics.enable(enemies);
        
        game.camera.follow(nova);
        
        up = this.input.keyboard.addKey(Phaser.KeyCode.W);
        left = this.input.keyboard.addKey(Phaser.KeyCode.A);
        right = this.input.keyboard.addKey(Phaser.KeyCode.D);
        
        
        song4 = game.add.audio('level4Song');
        song4.addMarker('song4', 0, 74, 0.03, true);
        song4.play('song4');
        
        tween1 = game.add.tween(plant1).to({x: '+50'}, 750, 'Linear', 'true', 0, false, true).loop(true);
        tween2 = game.add.tween(plant2).to({x: '+75'}, 750, 'Linear', 'true', 0, false, true).loop(true);
        tween3 = game.add.tween(plant3).to({x: '+75'}, 750, 'Linear', 'true', 0, false, true).loop(true);
        tween4 = game.add.tween(plant4).to({x: '+150'}, 800, 'Linear', 'true', 0, false, true).loop(true);
        tween5 = game.add.tween(plant5).to({x: '+100'}, 775, 'Linear', 'true', 0, false, true).loop(true);
        tween6 = game.add.tween(plant6).to({x: '+400'}, 2000, 'Linear', 'true', 0, false, true).loop(true);
        tween7 = game.add.tween(plant7).to({x: '+200'}, 1000, 'Linear', 'true', 0, false, true).loop(true);
        tween8 = game.add.tween(plant8).to({x: '+200'}, 1000, 'Linear', 'true', 0, false, true).loop(true);
        tween9 = game.add.tween(plant9).to({x: '-200'}, 1000, 'Linear', 'true', 0, false, true).loop(true);
        
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
                LS.destroy();
                reset.destroy();
                resume.destroy();
            });
            resume.anchor.setTo(0.5, 0.5);
            resume.fixedToCamera = true;
            resume.scale.setTo(0.5);
        });
        
        cursors = game.input.keyboard.createCursorKeys();
        
        content4 = ['You have collected the Laser canon.', 'In the final fight, after building up the super meter press K to fire a continuous beam for damage.', 'Press Enter to get back to level select!'];

        line4 = [];

        wordIndex4 = 0;
        lineIndex4 = 0;

        wordDelay4 = 120;
        lineDelay4 = 400;
        textLas = game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });
        textLas.fixedToCamera = true;
        
        textlife = game.add.text(0, 0, 'Lives ' + nova_life, {fontSize: 20 + 'px', fill: '#00FFFF'});
        textlife.fixedToCamera = true;
    },
    update:function(){
        console.log(nova.x);
        console.log(nova.y);
        
        textlife.setText('Lives ' + nova_life);
        
        game.physics.arcade.collide(nova, ground);
        game.physics.arcade.overlap(nova, laser_cannon, collectLaser, null, this);
        game.physics.arcade.collide(enemy, ground);
        game.physics.arcade.collide(weapon.bullets, ground, killBull);
        game.physics.arcade.overlap(weapon.bullets, enemy, hitVil, null, this);
        game.physics.arcade.overlap(nova, enemy, hitNova, null, this);
        nova.body.velocity.x = 0;
        
        if (nova.y > 1360){
            nova.body.collideWorldBounds = false;
            if (nova.inCamera == false){
                endGameLevel();
                nova_life = 0;
            }
        }
        else{
            nova.body.collideWorldBounds = true;
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
        if(up.isDown && nova.body.blocked.down){
            nova.body.velocity.y = -510;
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
        
        if (lasCount == 0){
            pauseGame1();
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
        if(frog7.body.blocked.down){
            frog7.body.velocity.y = -300;
            frog7.animations.play('hop', 6, false);
        }
        if(frog8.body.blocked.down){
            frog8.body.velocity.y = -300;
            frog8.animations.play('hop', 6, false);
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
    }
}
function collectLaser(nova, laser_cannon){
    laser_cannon.kill();
    laser = true;
    lasCount -= 1;
    nextLine4();
    supers += 1;
}
function nextLine4() {

    if (lineIndex4 === content4.length)
    {
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line4 = content4[lineIndex4].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex4 = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(wordDelay4, line4.length, nextWord4, this);

    //  Advance to the next line
    lineIndex4++;

}

function nextWord4() {

    //  Add the next word onto the text string, followed by a space
    textLas.text = textLas.text.concat(line4[wordIndex4] + " ");

    //  Advance the word index to the next word in the line
    wordIndex4++;

    //  Last word?
    if (wordIndex4 === line4.length)
    {
        //  Add a carriage return
        textLas.text = textLas.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay4, nextLine4, this);
    }

}
