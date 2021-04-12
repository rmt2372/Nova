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
        
        game.load.image('shot', 'assets/sprites/Nova_shot.png');
        game.load.audio('level2song', 'assets/sounds/Vastanberg.wav');
        
        
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

        bird1 = enemies.create(385, 750, 'bird');
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
        song2.addMarker('song2', 0.5, 22.5, 0.03, true);
        song2.play('song2');
        
        cursors = game.input.keyboard.createCursorKeys();
        
        text3 = game.add.text(0, 0, 'Lives ' + nova_life, {fontSize: 20 + 'px', fill: '#00FFFF'});
        text3.fixedToCamera = true;
        
        game.add.tween(plant1).to({x: '+150'}, 875, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant2).to({x: '+50'}, 900, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant3).to({x: '+175'}, 870, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant4).to({x: '+50'}, 875, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant5).to({x: '+100'}, 900, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant6).to({x: '+100'}, 900, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant7).to({x: '+50'}, 900, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant8).to({x: '+50'}, 900, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant9).to({x: '+100'}, 900, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant10).to({x: '+75'}, 900, 'Linear', 'true', 0, false, true).loop(true);
        game.add.tween(plant11).to({x: '+125'}, 900, 'Linear', 'true', 0, false, true).loop(true);


        content2 = ['You have collected the shields.', 'In the final fight, after building up the super meter press SHIFT to become invincible and obtain a speed boost for a brief time.', 'Press Enter to get back to level select!'];

        line2 = [];

        wordIndex2 = 0;
        lineIndex2 = 0;

        wordDelay2 = 120;
        lineDelay2 = 400;
        textBub = game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });
        textBub.fixedToCamera = true;
        
    },
    update:function(){
        console.log(nova.x);
        console.log(nova.y);
        
        
        text3.setText('Lives ' + nova_life);
        
        if (nova.y > 1350){
            nova.body.collideWorldBounds = false;
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
