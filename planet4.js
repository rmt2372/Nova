var lasCount = 1, content4, lineIndex4, wordIndex4, wordDelay4, lineDelay4;
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
        
        cursors = game.input.keyboard.createCursorKeys();
        
        content4 = ['You have collected the Laser canon.', 'In the final fight, after building up the super meter press E to fire a continuous beam for damage.', 'Press Enter to get back to level select!'];

        line4 = [];

        wordIndex4 = 0;
        lineIndex4 = 0;

        wordDelay4 = 120;
        lineDelay4 = 400;
        textLas = game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });
        textLas.fixedToCamera = true;
    },
    update:function(){
        console.log(nova.x);
        console.log(nova.y);
        
        if (nova.y > 1360){
            nova.body.collideWorldBounds = false;
        }
        else{
            nova.body.collideWorldBounds = true;
        }
        
        game.physics.arcade.collide(nova, ground);
        game.physics.arcade.overlap(nova, laser_cannon, collectLaser, null, this);
        game.physics.arcade.collide(enemies, ground);
        game.physics.arcade.collide(weapon.bullets, ground, killBull);
        game.physics.arcade.overlap(weapon.bullets, enemies, hitVil, null, this);
        game.physics.arcade.overlap(nova, enemies, hitNova, null, this);
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
                if (cursors.left.isDown == false && cursors.right.isDown == false){
                    nova.animations.play('shoot', 5, false);
                }
            }
        }
        if (lasCount == 0){
            pauseGame1();
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