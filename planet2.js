
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
        game.load.image("level_2_ground","assets/map/level_2_Ground.png");
        game.load.image('shot', 'assets/sprites/Nova_shot.png');
        
        
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
        
        map.setCollisionBetween(5,20,true,"ground");
        
        nova = game.add.sprite(31, 1017, 'nova');
        nova.scale.setTo(0.7, 0.7);
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
        plant1.scale.setTo(0.5, 0.5);
        plant1.body.gravity.y = 500;
        
        
        game.camera.follow(nova);
        
        cursors = game.input.keyboard.createCursorKeys();
        
        text3 = game.add.text(0, 0, 'Lives ' + nova_life, {fontSize: 20 + 'px', fill: '#00FFFF'});
        text3.fixedToCamera = true;
        
        game.add.tween(plant1).to({x: '+150'}, 875, 'Linear', 'true', 0, false, true).loop(true);
        
    },
    update:function(){
        console.log(nova.x);
        console.log(nova.y);
        
        text3.setText('Lives ' + nova_life);
        
        game.physics.arcade.collide(nova, ground);
        game.physics.arcade.overlap(nova, bub_shield, collectShield, null, this);
        game.physics.arcade.collide(enemies, ground);
        game.physics.arcade.collide(weapon.bullets, ground, killBull);
        game.physics.arcade.overlap(weapon.bullets, enemies, hitVil, null, this);
        game.physics.arcade.overlap(nova, enemies, hitNova, null, this);
        
        nova.body.velocity.x = 0;
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
    }
}