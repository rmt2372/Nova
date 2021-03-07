var weapon, flame1, sound, ground, map, sky, ship, flame2, flame3, gameOver, music;
demo.battle = function(){};
demo.battle.prototype = {
    preload: function(){
        game.load.tilemap('map', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('sky', 'assets/map/map_sky_night.png');
        game.load.image('map_sky_night2', 'assets/map/map_sky_night2.png');
        game.load.image('map_ground_dirt', 'assets/map/map_ground_dirt.png');
        game.load.image('map_ground_grass', 'assets/map/map_ground_grass.png');
        game.load.spritesheet('ship', 'assets/sprites/spaceshipSheet.png', 100, 100);
        game.load.image('boss', 'assets/sprites/Villian.png');
        game.load.image('bullet', 'assets/sprites/bullet_beam.png');
        game.load.image('flame', 'assets/sprites/bullet_fire.png');
        game.load.audio('shot', 'assets/sounds/blaster.mp3');
        game.load.audio('music', 'assets/sounds/Sommarfgel.wav');
    },
    create:function(){
        addChangeStateEventListeners();
        var skyBG = game.add.sprite(0, 0, 'sky');
        game.world.setBounds(0, 0, 2048, 480);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        map = game.add.tilemap('map');
        map.addTilesetImage('map_sky_night2');
        map.addTilesetImage('map_ground_dirt');
        map.addTilesetImage('map_ground_grass');
        
        
        sky = map.createLayer("sky");
        ground = map.createLayer("Ground");
        
        
        ship = game.add.sprite(256, 200, 'ship');
        boss = game.add.sprite(768, 200, 'boss');
        ship.anchor.setTo(0.5, 0.5);
        ship.scale.setTo(0.7, 0.7);
        boss.anchor.setTo(0.5, 0.5);
        boss.scale.setTo(-1, 1);
        ship.animations.add('walk', [0, 1]);
        ship.invincibility = false;
        
        
        sound = game.add.audio('shot');
        sound.addMarker('pew', 0, 1)
        music = game.add.audio('music');
        music.addMarker('fight', 82, 140, 0.1, true);
        if (game.state.getCurrentState().key == 'battle'){
            music.play('fight');
        }
        
        weapon = game.add.weapon(50, 'bullet');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.fireRate = 400;
        weapon.bulletSpeed = 500;
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        weapon.trackSprite(ship, 0, 0, true);
        
        flame1 = game.add.weapon (10, 'flame');
        flame1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        flame1.fireRate = 2000;
        flame1.bulletSpeed = 500;
        flame1.fireAngle = 360;
        flame1.trackSprite(boss, -75, -25, false)
        flame1.autofire = true;
        
        flame2 = game.add.weapon (10, 'flame');
        flame2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        flame2.fireRate = 2000;
        flame2.bulletSpeed = 500;
        flame2.fireAngle = 345;
        flame2.trackSprite(boss, -75, -25, false)
        flame2.autofire = true;
        
        flame3 = game.add.weapon (10, 'flame');
        flame3.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        flame3.fireRate = 2000;
        flame3.bulletSpeed = 500;
        flame3.fireAngle = 13;
        flame3.trackSprite(boss, -75, -25, false)
        flame3.autofire = true;
        
        
        game.physics.enable(ship);
        game.physics.enable(boss);
        ship.body.collideWorldBounds = true;
        boss.body.collideWorldBounds = true;
        game.camera.follow(ship);
        
    },
    update: function(){
        
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            ship.x += speed;
            ship.scale.setTo(0.7, 0.7);
            weapon.bulletSpeed = 500;
            ship.animations.play('walk', 12, true);
        } 
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            ship.scale.setTo(-0.7, 0.7);
            ship.x -= speed;
            weapon.bulletSpeed = -500;
            ship.animations.play('walk', 12, true);
        }
        else{
            ship.animations.stop('walk');
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            ship.y -= speed;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            ship.y += speed;
        }
        if (fireButton.isDown){
            if (ship.alive == true){
                weapon.fire();
                weapon.onFire.add(function(){
                    sound.play('pew');
                })
            }
        }
        if (boss.x < ship.x){
            flame1.bulletSpeed = 500;
            flame2.bulletSpeed = 500;
            flame3.bulletSpeed = 500;
            boss.scale.setTo(1, 1);
        }
        else if(boss.x > ship.x){
            flame1.bulletSpeed = -500;
            flame2.bulletSpeed = -500;
            flame3.bulletSpeed = -500;
            boss.scale.setTo(-1, 1);
        }
        if (boss.alive == false || ship.alive == false){
            flame1.autofire = false;
            flame2.autofire = false;
            flame3.autofire = false;
        }
        game.physics.arcade.overlap(ship, flame1.bullets, hitShip, null, this);
        game.physics.arcade.overlap(ship, flame2.bullets, hitShip, null, this);
        game.physics.arcade.overlap(ship, flame3.bullets, hitShip, null, this);
        game.physics.arcade.overlap(ship, boss, hitBoss, null, this);
        game.physics.arcade.overlap(boss, weapon.bullets, hitEnemy, null, this);
        //game.physics.arcade.moveToObject(boss, ship, null, 3000);
    }
}
function hitEnemy(boss, bullet){
    bullet.kill();
    boss_life -= 1;
    if (boss_life <= 0){
        boss.kill();
    }
}
function hitShip(ship, bullet){
    if(ship.invincibility == false){
        bullet.kill();
        toggleInvincibility();
        ship_life -=1;
        game.time.events.add(2000, toggleInvincibility, this);
        tweenTintHelper(0);
        game.time.events.add(250, tweenTintHelper, this, 1);
        game.time.events.add(500, tweenTintHelper, this, 0);
        game.time.events.add(750, tweenTintHelper, this, 1);
        game.time.events.add(1000, tweenTintHelper, this, 0);
        game.time.events.add(1250, tweenTintHelper, this, 1);
        game.time.events.add(1500, tweenTintHelper, this, 0);
        game.time.events.add(1750, tweenTintHelper, this, 1);
    } 
    if (ship_life <= 0){
        endGame()
    }
}
function hitBoss(ship, boss){
     if(ship.invincibility == false){
        toggleInvincibility();
        ship_life -=1;
        game.time.events.add(Phaser.Timer.SECOND * 2, toggleInvincibility, this);
        game.time.events.add(250, tweenTintHelper, this, 1);
        game.time.events.add(500, tweenTintHelper, this, 0);
        game.time.events.add(750, tweenTintHelper, this, 1);
        game.time.events.add(1000, tweenTintHelper, this, 0);
        game.time.events.add(1250, tweenTintHelper, this, 1);
        game.time.events.add(1500, tweenTintHelper, this, 0);
        game.time.events.add(1750, tweenTintHelper, this, 1);
    } 
    if (ship_life <= 0){
        endGame();
    }
}
function toggleInvincibility(){
    ship.invincibility = !ship.invincibility
}
function tweenTint(obj, startColor, endColor, time){
    var colorBlend = {step: 0};
    var colorTween = game.add.tween(colorBlend).to({step: 100}, time);
    colorTween.onUpdateCallback(function() {obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);});
    obj.tint = startColor;
    colorTween.start();
}
function tweenTintHelper(num){
    if (num == 0){
        tweenTint(ship, 0xffffff, 0xbbbbbb, 250);
    }
    if (num == 1){
        tweenTint(ship, 0xbbbbbb, 0xffffff, 250);
    }
}
function endGame(){
    ship.kill()
    music.pause();
    flame1.autofire = false;
    flame2.autofire = false;
    flame3.autofire = false;
}
