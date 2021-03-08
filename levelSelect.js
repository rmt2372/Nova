var selectSong, ship, currentSpeed = 0;
demo.levelSelect = function(){};
demo.levelSelect.prototype = {
    preload: function(){
        addChangeStateEventListeners();
        
        game.load.audio('selectSong', 'assets/sounds/Vastanberg.wav');
        game.load.spritesheet('ship', 'assets/sprites/spaceshipSheet.png', 100, 100);
        
        game.world.setBounds(0, 0, 1600, 1600);

        
        game.load.tilemap('map', 'assets/map/open_world_map.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.image('map_sky_night2', 'assets/map/map_sky_night2.png');
        game.load.image('map_sky_planets', 'assets/map/map_sky_planets.png');
    },
    create: function(){
        addChangeStateEventListeners();
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        map = game.add.tilemap('map');
        map.addTilesetImage('map_sky_night2');
        map.addTilesetImage('map_sky_planets');
        
        sky = map.createLayer("sky");
        planets = map.createLayer("planets");
        
        selectSong = game.add.audio('selectSong');
        selectSong.addMarker('select', 0.5, 22.5, 0.1, true);
        selectSong.play('select');
        
        ship = game.add.sprite(256, 200, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.scale.setTo(1, 1);
        ship.animations.add('walk', [0, 1]);
        game.physics.enable(ship);
        
        cursors = game.input.keyboard.createCursorKeys();
        
    },
    update: function(){
        if (cursors.left.isDown){
            ship.angle -= 2;
        }
        else if (cursors.right.isDown){
            ship.angle += 2;
        }
        if (cursors.up.isDown){
            currentSpeed = 200;
            ship.animations.play('walk', 6, true);
        } 
        else if(currentSpeed > 0) {
            currentSpeed -= 5;
        }
        if (cursors.down.isDown){
            currentSpeed = -200;
        }
        else if (currentSpeed < 0){
            currentSpeed += 5;
        }
        if (currentSpeed > 0){
            game.physics.arcade.velocityFromRotation(ship.rotation, currentSpeed, ship.body.velocity);
        }
        if (currentSpeed < 0){
            game.physics.arcade.velocityFromRotation(ship.rotation, currentSpeed, ship.body.velocity);
        }
        if (cursors.up.isDown == false){
            ship.animations.stop('walk');
        }
    }
}