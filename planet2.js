
demo.planet2 = function(){};
demo.planet2.prototype = {
    preload: function(){
        
        game.load.spritesheet('nova', 'assets/sprites/nova_.png', 91, 110);
        
        
        game.load.tilemap("map", "assets/map/level_2_map.json",null,Phaser.Tilemap.TILED_JSON);
        game.load.image("map_sky_night2","assets/map/map_sky_night2.png");
        game.load.image("level_2_ground","assets/map/level_2_Ground.png");
        
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
        
        
        game.camera.follow(nova);
        
        
        
    },
    update:function(){}
}