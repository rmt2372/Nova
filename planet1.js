var laser_cannon, bub_shield, wave_burst, mis, frogs, plants, song1, content1, lineIndex1, wordIndex1, wordDelay1, lineDelay1, misCount = 1;
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
        game.load.spritesheet('frog', 'assets/sprites/Frog_villan_jump.png', 132, 138);
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
        planets = map.createLayer("ground");
        
        sky.resizeWorld();
        
        map.setCollisionBetween(1,34,true,"ground");
        
        
        nova = game.add.sprite(25, 475, 'nova');
        nova.scale.setTo(0.7, 0.7);
        nova.anchor.setTo(0.5, 0.5);
        game.physics.enable(nova);
        nova.body.collideWorldBounds = true;
        nova.body.bounce.y = 0.2;
        nova.body.gravity.y = 500;
        nova.invincibility = false;
        nova.animations.add('idle', [0, 1]);
        nova.animations.add('move', [2, 3, 4, 5, 6, 7, 8, 9, 10]);
        nova.animations.add('shoot_move', [20, 21, 22, 23, 24, 25]);
        nova.animations.add('shoot', [15, 16, 17]);
        
        
        cursors = game.input.keyboard.createCursorKeys();
        /*
        laser_cannon = game.add.sprite(500, 200, 'laser');
        game.physics.enable(laser_cannon);
        bub_shield = game.add.sprite(650, 200, 'bubble_shield');
        game.physics.enable(bub_shield);
        wave_burst = game.add.sprite(750, 200, 'burst');
        game.physics.enable(wave_burst);
        */
        mis = game.add.sprite(3017, 460, 'missle');
        mis.anchor.setTo(0.5, 0.5);
        mis.scale.setTo(1.3);
        game.physics.enable(mis);
        /*
        laser_cannon.enableBody = true;
        bub_shield.enableBody = true;
        wave_burst.enableBody = true;
        mis.enableBody = true;
        */
        
        weapon = game.add.weapon(50, 'shot');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.fireRate = 600;
        weapon.bulletSpeed = 500;
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        weapon.trackSprite(nova, 0, 0, true);
        
        frogs = game.add.group();
        frogs.enableBody = true;
        game.physics.enable(frogs);
        //frog.body.gravity.y = 500;
        frog1 = frogs.create(200, 425, 'frog');
        frog1.scale.setTo(-0.5, 0.5);
        frog1.body.gravity.y = 500;
        frog1.animations.add('hop', [0, 1, 2, 3, 2, 1, 0]);
        
        frog = frogs.create(1000, 0, 'frog');
        frog.scale.setTo(-0.5, 0.5);
        frog.body.gravity.y = 500;
        frog = frogs.create(1500, 0, 'frog');
        frog.scale.setTo(-0.5, 0.5);
        frog.body.gravity.y = 500;
        frog = frogs.create(2000, 0, 'frog');
        frog.scale.setTo(-0.5, 0.5);
        frog.body.gravity.y = 500;
        frog = frogs.create(2500, 0, 'frog');
        frog.scale.setTo(-0.5, 0.5);
        frog.body.gravity.y = 500;
        
        plants = game.add.group();
        plants.enableBody = true;
        game.physics.enable(plants);
        //plants.body.gravity.y = 500;
        plant1 = plants.create(350, 300, 'plant');
        plant1.scale.setTo(0.5, 0.5);
        plant1.body.gravity.y = 500;
        plant = plants.create(1250, 425, 'plant');
        plant.scale.setTo(0.5, 0.5);
        plant.body.gravity.y = 500;
        plant = plants.create(1750, 0, 'plant');
        plant.scale.setTo(0.5, 0.5);
        plant.body.gravity.y = 500;
        plant = plants.create(2250, 0, 'plant');
        plant.scale.setTo(0.5, 0.5);
        plant.body.gravity.y = 500;
        plant = plants.create(2750, 0, 'plant');
        plant.scale.setTo(0.5, 0.5);
        plant.body.gravity.y = 500;
        
        game.camera.follow(nova);
        
        song1 = game.add.audio('level1Song');
        song1.addMarker('song1', 0, 235, 0.1, true);
        song1.play('song1');
        
        content1 = ['You have collected the smart missle.', 'In the final fight, after building up the super meter press Z to fire the tracker missle for extra damage.', 'Press Enter to get back to level select!'];

        line1 = [];

        wordIndex1 = 0;
        lineIndex1 = 0;

        wordDelay1 = 120;
        lineDelay1 = 400;
        text1 = game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });
        text1.fixedToCamera = true;
        
        text2 = game.add.text(0, 0, 'Lives ' + nova_life, {fontSize: 20 + 'px', fill: '#00FFFF'});
        text2.fixedToCamera = true;
        game.add.tween(plant1).to({x: '-50'}, 750, 'Linear', 'true', 0, false, true).loop(true);
    },
    update:function(){
    
        text2.setText('Lives ' + nova_life);
        game.physics.arcade.collide(nova, planets);
        game.physics.arcade.collide(frogs, planets);
        game.physics.arcade.collide(plants, planets);
        game.physics.arcade.overlap(nova, laser_cannon, collectLaser, null, this);
        game.physics.arcade.overlap(nova, bub_shield, collectShield, null, this);
        game.physics.arcade.overlap(nova, mis, collectMissle, null, this);
        game.physics.arcade.overlap(nova, wave_burst, collectWave, null, this);
        game.physics.arcade.overlap(weapon.bullets, frogs, hitVil, null, this);
        game.physics.arcade.overlap(weapon.bullets, plants, hitVil, null, this);
        game.physics.arcade.overlap(nova, frogs, hitNova, null, this);
        game.physics.arcade.overlap(nova, plants, hitNova, null, this);
        nova.body.velocity.x = 0;
        
        if (nova.x > plant1.x){
            plant1.scale.setTo(-0.5, 0.5);
        }
        else if(nova.x < plant1.x){
            plant1.scale.setTo(0.5, 0.5);
        }
        if(cursors.left.isDown){
            nova.scale.setTo(-0.7, 0.7)
            nova.body.velocity.x = -200;
            weapon.bulletSpeed = -500;
            if (fireButton.isDown){
                nova.animations.play('shoot_move', 8, true);
            }
            else{
                nova.animations.play('move', 12, true);
            }
        }
        else if(cursors.right.isDown){
            nova.scale.setTo(0.7, 0.7)
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
        if(cursors.up.isDown && nova.body.blocked.down){
            nova.body.velocity.y = -510;
        }
        if (fireButton.isDown){
            if (nova.alive == true){
                weapon.fire();
                if (cursors.left.isDown == false && cursors.right.isDown == false){
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
    }
}
function collectLaser(nova, laser_cannon){
    laser_cannon.kill();
    laser = true;
}
function collectMissle(nova, mis){
    mis.kill();
    missle = true;
    supers += 1;
    misCount -= 1;
    nextLine1();
}
function collectShield(nova, bub_shield){
    bub_shield.kill();
    shield = true;
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
function pauseGame1 (){
    nova.body.velocity.x = 0;
    nova.body.velocity.y = 0;
    //nextLine1();
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
        changeState(null, 'l');
    }
}


