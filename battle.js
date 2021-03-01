var weapon, flame, sound, ground, map, sky, ship;
demo.battle = function(){};
demo.battle.prototype = {
    preload: function(){
        game.load.tilemap('map', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('sky', 'assets/map/map_sky_night.png');
        game.load.image('map_sky_night2', 'assets/map/map_sky_night2.png');
        game.load.image('map_ground_dirt', 'assets/map/map_ground_dirt.png');
        game.load.image('map_ground_grass', 'assets/map/map_ground_grass.png');
        game.load.image('ship', 'assets/sprites/spaceship.png');
        game.load.image('boss', 'assets/sprites/Enemy.png');
        game.load.image('bullet', 'assets/sprites/bullet_beam.png');
        game.load.image('flame', 'assets/sprites/bullet_fire.png')
        game.load.audio('shot', 'assets/sounds/blaster.mp3');
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
        
        sound = game.add.audio('shot');
        sound.addMarker('pew', 0, 1)
        
        weapon = game.add.weapon(50, 'bullet');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.fireRate = 400;
        weapon.bulletSpeed = 500;
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        weapon.trackSprite(ship, 0, 0, true);
        
        flame = game.add.weapon (10, 'flame');
        flame.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        flame.fireRate = 2000;
        flame.bulletSpeed = -500;
        flame.trackSprite(boss, 0, 0, true)
        flame.autofire = true;
        
        
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
        } 
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            ship.scale.setTo(-0.7, 0.7);
            ship.x -= speed;
            weapon.bulletSpeed = -500;
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
            flame.bulletSpeed = 500;
            boss.scale.setTo(1, 1);
        }
        else if(boss.x > ship.x){
            flame.bulletSpeed = -500
            boss.scale.setTo(-1, 1);
        }
        if (boss.alive == false || ship.alive == false){
            flame.autofire = false;
        }
        game.physics.arcade.overlap(ship, flame.bullets, hitShip, null, this)
        game.physics.arcade.overlap(ship, boss, hitShip, null, this)
        game.physics.arcade.overlap(boss, weapon.bullets, hitEnemy, null, this)
        game.physics.arcade.moveToObject(boss, ship, null, 3000);
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
    bullet.kill();
    ship_life -=1;
    if (ship_life <= 0){
        ship.kill();
    }
}