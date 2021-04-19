var laser_cannon, bub_shield, wave_burst, mis, enemies, song1, content1, lineIndex1, wordIndex1, wordDelay1, lineDelay1, misCount = 1;
demo.planet1 = function(){};
demo.planet1.prototype = {
    preload: function(){
        game.load.spritesheet('nova', 'assets/sprites/nova_.png', 91, 110);
        game.load.image('bubble_shield', 'assets/sprites/Bubble_shield.png');
        game.load.image('laser', 'assets/sprites/Laser_cannon.png');
        game.load.spritesheet('missle', 'assets/sprites/Smart_missle.png', 75, 75);
        game.load.image('burst', 'assets/sprites/Debris_burst.png');
        game.load.image('shot', 'assets/sprites/Nova_shot.png');
        
        game.load.tilemap('map', 'assets/map/level_1_map.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.image('map_sky_night2', 'assets/map/map_sky_night2.png');
        game.load.image('level_1_Ground', 'assets/map/level_1_Ground.png');
        game.load.spritesheet('frog', 'assets/sprites/Frog_villan_jump2.png', 132, 138);
        game.load.spritesheet('bird', 'assets/sprites/bird_enemy.png', 56, 52);
        game.load.image('plant', 'assets/sprites/plant_enemy.png');
        game.load.audio('level1Song', 'assets/sounds/Starmachine.wav');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        addChangeStateEventListeners();
        
        map = game.add.tilemap('map');
        map.addTilesetImage('map_sky_night2');
        map.addTilesetImage('level_1_Ground');
        
        sky = map.createLayer("sky");
        ground = map.createLayer("ground");
        
        sky.resizeWorld();
        
        map.setCollisionBetween(1,36,true,"ground");
        
        nova = game.add.sprite(31, 1017, 'nova');
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
        
        
        cursors = game.input.keyboard.createCursorKeys();
    
        mis = game.add.sprite(4760, 920, 'missle');
        mis.anchor.setTo(0.5, 0.5);
        mis.scale.setTo(1.3);
        game.physics.enable(mis);
        
        weapon = game.add.weapon(50, 'shot');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.fireRate = 600;
        weapon.bulletSpeed = 500;
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        weapon.trackSprite(nova, 0, 0, true);
        
        enemies = game.add.group();
        enemies.enableBody = true;
        game.physics.enable(enemies);

        frog1 = enemies.create(200, 1000, 'frog');
        frog1.scale.setTo(-0.4, 0.4);
        frog1.body.gravity.y = 500;
        frog1.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog2 = enemies.create(1000, 825, 'frog');
        frog2.scale.setTo(-0.4, 0.4);
        frog2.body.gravity.y = 500;
        frog2.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog3 = enemies.create(1500, 970, 'frog');
        frog3.scale.setTo(-0.4, 0.4);
        frog3.body.gravity.y = 500;
        frog3.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog4 = enemies.create(2000, 970, 'frog');
        frog4.scale.setTo(-0.4, 0.4);
        frog4.body.gravity.y = 500;
        frog4.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog5 = enemies.create(2165, 825, 'frog');
        frog5.scale.setTo(-0.4, 0.4);
        frog5.body.gravity.y = 500;
        frog5.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog6 = enemies.create(3224, 925, 'frog');
        frog6.scale.setTo(-0.4, 0.4);
        frog6.body.gravity.y = 500;
        frog6.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog7 = enemies.create(4650, 925, 'frog');
        frog7.scale.setTo(-0.4, 0.4);
        frog7.body.gravity.y = 500;
        frog7.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        
        plant1 = enemies.create(350, 800, 'plant');
        plant1.scale.setTo(0.4, 0.4);
        plant1.body.gravity.y = 500;
        
        plant2 = enemies.create(575, 700, 'plant');
        plant2.scale.setTo(0.4, 0.4);
        plant2.body.gravity.y = 500;
        
        plant3 = enemies.create(1750, 990, 'plant');
        plant3.scale.setTo(0.4, 0.4);
        plant3.body.gravity.y = 500;
        
        plant4 = enemies.create(2250, 700, 'plant');
        plant4.scale.setTo(0.4, 0.4);
        plant4.body.gravity.y = 500;
        
        plant5 = enemies.create(2785, 875, 'plant');
        plant5.scale.setTo(0.4, 0.4);
        plant5.body.gravity.y = 500;
        
        plant7 = enemies.create(4125, 865, 'plant');
        plant7.scale.setTo(0.4, 0.4);
        plant7.body.gravity.y = 500;
        
        plant6 = enemies.create(3470, 930, 'plant');
        plant6.scale.setTo(0.4, 0.4);
        plant6.body.gravity.y = 500;
        
        birds = game.add.group();
        birds.enableBody = true;
        game.physics.enable(birds);
        
        bird1 = enemies.create(1500, 750, 'bird');
        bird1.scale.setTo(1, 1);
        bird1.animations.add('fly', [0, 1, 2, 3]);
        
        bird2 = enemies.create(2000, 600, 'bird');
        bird2.scale.setTo(1, 1);
        bird2.animations.add('fly', [0, 1, 2, 3]);
        
        bird3 = enemies.create(2500, 600, 'bird');
        bird3.scale.setTo(1, 1);
        bird3.animations.add('fly', [0, 1, 2, 3]);
        
        bird4 = enemies.create(3000, 600, 'bird');
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
        
        game.camera.follow(nova);
        
        up = this.input.keyboard.addKey(Phaser.KeyCode.W);
        left = this.input.keyboard.addKey(Phaser.KeyCode.A);
        right = this.input.keyboard.addKey(Phaser.KeyCode.D);
        
        song1 = game.add.audio('level1Song');
        song1.addMarker('song1', 6.5, 235, 0.03, true);
        song1.play('song1');
        
        content1 = ['You have collected the smart missle.', 'In the final fight, after building up the super meter press Q to fire the tracker missle for extra damage.', 'Press Enter to get back to level select!'];

        line1 = [];

        wordIndex1 = 0;
        lineIndex1 = 0;

        wordDelay1 = 120;
        lineDelay1 = 400;
        text1 = game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });
        text1.fixedToCamera = true;
        
        textlife = game.add.text(0, 0, 'Lives ' + nova_life, {fontSize: 20 + 'px', fill: '#00FFFF'});
        textlife.fixedToCamera = true;
        
        game.add.tween(plant1).to({x: '-50'}, 750, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant2).to({x: '+50'}, 750, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant3).to({x: '+25'}, 750, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant4).to({x: '+20'}, 700, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant5).to({x: '-40'}, 725, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant6).to({x: '+200'}, 1000, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant7).to({x: '+200'}, 1000, 'Linear', 'true', 0, false, true).loop(true);
        
    },
    update:function(){
        
        console.log(nova.x);
        console.log(nova.y);
        textlife.setText('Lives ' + nova_life);

        game.physics.arcade.collide(nova, ground);
    
        game.physics.arcade.collide(enemies, ground);
        game.physics.arcade.collide(weapon.bullets, ground, killBull);
        game.physics.arcade.overlap(nova, mis, collectMissle, null, this);
        game.physics.arcade.overlap(nova, wave_burst, collectWave, null, this);
        game.physics.arcade.overlap(weapon.bullets, enemies, hitVil, null, this);
        game.physics.arcade.overlap(nova, enemies, hitNova, null, this);
        nova.body.velocity.x = 0;
        
        if (nova.y > 1050){
            nova.body.collideWorldBounds = false;
            if (nova.inCamera == false){
                nova.kill();
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
        if (misCount == 0){
            pauseGame1();
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
    }
}

function collectMissle(nova, mis){
    mis.kill();
    missle = true;
    supers += 1;
    misCount -= 1;
    nextLine1();
}

function collectWave(nova, wave_burst){
    wave_burst.kill();
    burst = true;
}
function hitVil(shot, villain){
    shot.kill();
    villain.kill();
}
function hitNova(nova, enemy){
    console.log(nova_life);
     if(nova.invincibility == false){
        toggleNovaInvincibility();
        nova_life -=1;
        game.time.events.add(Phaser.Timer.SECOND * 2, toggleNovaInvincibility, this);
        game.time.events.add(300, tweenTintHelperNova, this, 1);
        game.time.events.add(500, tweenTintHelperNova, this, 0);
        game.time.events.add(750, tweenTintHelperNova, this, 1);
        game.time.events.add(1000, tweenTintHelperNova, this, 0);
        game.time.events.add(1300, tweenTintHelperNova, this, 1);
        game.time.events.add(1500, tweenTintHelperNova, this, 0);
        game.time.events.add(1750, tweenTintHelperNova, this, 1);
    } 
    if (nova_life <= 0){
        endGameLevel();
    }
}
function toggleNovaInvincibility(){
    nova.invincibility = !nova.invincibility;
}
function tweenTintNova(obj, startColor, endColor, time){
    var colorBlend = {step: 0};
    var colorTween = game.add.tween(colorBlend).to({step: 100}, time);
    colorTween.onUpdateCallback(function() {obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);});
    obj.tint = startColor;
    colorTween.start();
}
function tweenTintHelperNova(num){
    if (num == 0){
        tweenTint(nova, 0xffffff, 0xbbbbbb, 300);
    }
    if (num == 1){
        tweenTint(nova, 0xbbbbbb, 0xffffff, 300);
    }
    if (num == 2){
        tweenTint(nova, 0xffffff, 0x00FFFF, 300);
    }
    if (num == 3){
        tweenTint(nova, 0x00FFFF, 0xffffff, 300);
    }
}
function endGameLevel(){
    nova.kill();
}
function nextLine1() {

    if (lineIndex1 === content1.length)
    {
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line1 = content1[lineIndex1].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex1 = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(wordDelay1, line1.length, nextWord1, this);

    //  Advance to the next line
    lineIndex1++;

}

function nextWord1() {

    //  Add the next word onto the text string, followed by a space
    text1.text = text1.text.concat(line1[wordIndex1] + " ");

    //  Advance the word index to the next word in the line
    wordIndex1++;

    //  Last word?
    if (wordIndex1 === line1.length)
    {
        //  Add a carriage return
        text1.text = text1.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay1, nextLine1, this);
    }

}
function killBull(shot){
    shot.kill()
}
function pauseGame1 (){
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
        changeState(null, 'l');
    }
}


