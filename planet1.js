var laser_cannon, bub_shield, wave_burst, mis, frogs, plants, song1;
demo.planet1 = function(){};
demo.planet1.prototype = {
    preload: function(){
        game.load.image('nova', 'assets/sprites/Nova.png');
        game.load.image('bubble_shield', 'assets/sprites/Bubble_shield.png');
        game.load.image('laser', 'assets/sprites/Laser_cannon.png');
        game.load.spritesheet('missle', 'assets/sprites/Smart_missle.png', 75, 75);
        game.load.image('burst', 'assets/sprites/Debris_burst.png');
        game.load.image('shot', 'assets/sprites/Nova_shot.png');
        
        game.load.tilemap('map', 'assets/map/level_1_map.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.image('map_sky_night2', 'assets/map/map_sky_night2.png');
        game.load.image('level_1_Ground', 'assets/map/level_1_Ground.png');
        game.load.image('frog', 'assets/sprites/Frog_villan.png');
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
        nova.scale.setTo(0.2, 0.2);
        nova.anchor.setTo(0.5, 0.5);
        game.physics.enable(nova);
        nova.body.collideWorldBounds = true;
        nova.body.bounce.y = 0.2;
        nova.body.gravity.y = 500;
        nova.invincibility = false;
        
        
        cursors = game.input.keyboard.createCursorKeys();
        
        laser_cannon = game.add.sprite(500, 200, 'laser');
        game.physics.enable(laser_cannon);
        bub_shield = game.add.sprite(650, 200, 'bubble_shield');
        game.physics.enable(bub_shield);
        wave_burst = game.add.sprite(750, 200, 'burst');
        game.physics.enable(wave_burst);
        mis = game.add.sprite(400, 200, 'missle');
        game.physics.enable(mis);
        laser_cannon.enableBody = true;
        bub_shield.enableBody = true;
        wave_burst.enableBody = true;
        mis.enableBody = true;
        
        weapon = game.add.weapon(50, 'shot');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.fireRate = 400;
        weapon.bulletSpeed = 500;
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        weapon.trackSprite(nova, 0, 0, true);
        
        frogs = game.add.group();
        frogs.enableBody = true;
        game.physics.enable(frogs);
        //frog.body.gravity.y = 500;
        var frog = frogs.create(200, 425, 'frog');
        frog.scale.setTo(-0.5, 0.5);
        frog.body.gravity.y = 500;
        
        plants = game.add.group();
        plants.enableBody = true;
        game.physics.enable(plants);
        //plants.body.gravity.y = 500;
        var plant = plants.create(350, 425, 'plant');
        plant.scale.setTo(0.5, 0.5);
        plant.body.gravity.y = 500;
        
        game.camera.follow(nova);
        
        song1 = game.add.audio('level1Song');
        song1.addMarker('song1', 0, 235, 0.1, true);
        song1.play('song1');
    },
    update:function(){
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
        if(cursors.left.isDown){
            nova.scale.setTo(-0.2, 0.2)
            nova.body.velocity.x = -200;
            weapon.bulletSpeed = -500;
        }
        else if(cursors.right.isDown){
            nova.scale.setTo(0.2, 0.2)
            nova.body.velocity.x = 200;
            weapon.bulletSpeed = 500;
        }
        if(cursors.up.isDown && nova.body.blocked.down){
            nova.body.velocity.y = -510;
        }
        if (fireButton.isDown){
            if (nova.alive == true){
                weapon.fire();
            }
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