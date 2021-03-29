var selectSong, ship, currentSpeed = 0;
demo.levelSelect = function(){};
demo.levelSelect.prototype = {
    preload: function(){
        addChangeStateEventListeners();
        
        game.load.audio('selectSong', 'assets/sounds/Vastanberg.wav');
        game.load.spritesheet('ship', 'assets/sprites/spaceshipSheet2.png', 98, 94);
        game.load.image('blackhole', 'assets/sprites/blackHole.png');
        
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
        blackhole = game.add.sprite(750, 800, 'blackhole');
        blackhole.scale.setTo(2, 2);
        blackhole.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(blackhole);
        blackhole.body.immovable = true;
        
        map.setCollisionBetween(13,265,true,"planets");
        
        selectSong = game.add.audio('selectSong');
        selectSong.addMarker('select', 0.5, 22.5, 0.1, true);
        selectSong.play('select');
        
        ship = game.add.sprite(256, 200, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.scale.setTo(1, 1);
        ship.animations.add('walk', [1, 2]);
        game.physics.enable(ship);
        ship.body.collideWorldBounds = true;
        
        game.camera.follow(ship)
        
        cursors = game.input.keyboard.createCursorKeys();
        text = game.add.text(32, 32, 'Pre-alpha side note: only puple world has content right now.', { font: "25px Arial", fill: '#00FFFF' });
        
    },
    update: function(){
        game.physics.arcade.collide(ship, planets, changeLevel);
        game.physics.arcade.collide(ship, blackhole, bossBattle);
        
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
            ship.animations.stop('walk');
            ship.frame = 0;
        }
        if (cursors.down.isDown){
            currentSpeed = -200;
        }
        else if (currentSpeed < 0){
            currentSpeed += 5;
        }
        if (currentSpeed == 0){
            game.physics.arcade.velocityFromRotation(ship.rotation, currentSpeed, ship.body.velocity);
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
function changeLevel(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
        if (ship.x < 500 && ship.y < 800){
            game.sound.stopAll();
            resetHealth();
            game.state.start('planet2');
            console.log('planet2');
        }
        if (ship.x < 500 && ship.y > 800){
            game.sound.stopAll();
            resetHealth();
            game.state.start('planet1'); 
        }
        if (ship.x > 800 && ship.y < 800){
            game.sound.stopAll();
            resetHealth();
            game.state.start('planet3');
            console.log('planet3');
        }
        if (ship.x > 800 && ship.y > 800){
            game.sound.stopAll();
            resetHealth();
            game.state.start('planet4');
            console.log('planet4');
        }
    }
}
function bossBattle(){
    game.sound.stopAll();
    resetHealth();
    game.state.start('battle');
}