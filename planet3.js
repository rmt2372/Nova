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
        
        nova = game.add.sprite(0, 0, 'nova');
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
        
        game.camera.follow(nova);
        
        up = this.input.keyboard.addKey(Phaser.KeyCode.W);
        left = this.input.keyboard.addKey(Phaser.KeyCode.A);
        right = this.input.keyboard.addKey(Phaser.KeyCode.D);
        
        
        song3 = game.add.audio('level3Song');
        song3.addMarker('song3', 0, 127, 0.03, true);
        song3.play('song3');
        
        cursors = game.input.keyboard.createCursorKeys();
        
        content3 = ['You have collected the wave burst.', 'In the final fight, after building up the super meter press F to fire a wave blocking all projectiles!', 'Press Enter to get back to level select!'];

        line3 = [];

        wordIndex3 = 0;
        lineIndex3 = 0;

        wordDelay3 = 120;
        lineDelay3 = 400;
        textWav = game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });
        textWav.fixedToCamera = true;
        
        textlife = game.add.text(0, 0, 'Lives ' + nova_life, {fontSize: 20 + 'px', fill: '#00FFFF'});
        textlife.fixedToCamera = true;
        
    },
    update:function(){
        console.log(nova.x);
        console.log(nova.y);
        
        textlife.setText('Lives ' + nova_life);
        
        game.physics.arcade.overlap(nova, wave_burst, collectWave, null, this);
        game.physics.arcade.collide(nova, ground);
        game.physics.arcade.overlap(weapon.bullets, enemies, hitVil, null, this);
        game.physics.arcade.collide(weapon.bullets, ground, killBull);
        
        if (nova.y > 1375){
            nova.body.collideWorldBounds = false;
            if (nova.inCamera == false){
                endGameLevel();
                nova_life = 0;
            }
        }
        else{
            nova.body.collideWorldBounds = true;
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
        if (wavCount == 0){
            pauseGame1();
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