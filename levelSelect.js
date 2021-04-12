var selectSong, ship, currentSpeed = 0;
demo.levelSelect = function(){};
demo.levelSelect.prototype = {
    preload: function(){
        addChangeStateEventListeners();
        
        game.load.audio('selectSong', 'assets/sounds/Piano.wav');
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
        planet_1 = map.createLayer("planet_1");
        planet_2 = map.createLayer("planet_2");
        planet_3 = map.createLayer("planet_3");
        planet_4 = map.createLayer("planet_4");
        blackhole = game.add.sprite(750, 800, 'blackhole');
        blackhole.scale.setTo(2, 2);
        blackhole.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(blackhole);
        blackhole.body.immovable = true;
        
        //Planet 1 collision
        map.setCollisionBetween(37,43,true,"planet_1");
        map.setCollisionBetween(55,61,true,"planet_1");
        map.setCollisionBetween(71,77,true,"planet_1");
        map.setCollisionBetween(91,97,true,"planet_1");
        map.setCollisionBetween(109,117,true,"planet_1");
        map.setCollisionBetween(127,133,true,"planet_1");
        
        //Planet 2 Collision
        map.setCollisionBetween(45,49,true,"planet_2");
        map.setCollisionBetween(63,67,true,"planet_2");
        map.setCollisionBetween(79,83,true,"planet_2");
        map.setCollisionBetween(99,103,true,"planet_2");
        
        //Planet 3 Collision
        map.setCollisionBetween(37,360,true,"planet_3");
        
        //Planet 4 Collision
        map.setCollisionBetween(37,360,true,"planet_4");
        
        
        selectSong = game.add.audio('selectSong');
        selectSong.addMarker('select', 3, 160, 0.03, true);
        selectSong.play('select');
        
        ship = game.add.sprite(256, 200, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.scale.setTo(1, 1);
        ship.animations.add('walk', [1, 2]);
        game.physics.enable(ship);
        ship.body.collideWorldBounds = true;
        
        game.camera.follow(ship)
        
        cursors = game.input.keyboard.createCursorKeys();
        
    },
    update: function(){
        game.physics.arcade.collide(ship, planet_1, changeLevel);
        game.physics.arcade.collide(ship, planet_2, changeLevel);
        game.physics.arcade.collide(ship, planet_3, changeLevel);
        game.physics.arcade.collide(ship, planet_4, changeLevel);
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
function changeLevel(n, m){
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
        
        console.log(m.layer.name);
        
        
        if (m.layer.name == 'planet_1'){
            game.sound.stopAll();
            resetHealth();
            game.state.start('planet1');
            console.log('planet1');
        }
        if (m.layer.name == 'planet_2'){
            game.sound.stopAll();
            resetHealth();
            game.state.start('planet2');
            console.log('planet2');
        }
        if (m.layer.name == 'planet_3'){
            game.sound.stopAll();
            resetHealth();
            game.state.start('planet3');
            console.log('planet3');
        }
        if (m.layer.name == 'planet_4'){
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