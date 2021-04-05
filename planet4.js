
demo.planet4 = function(){};
demo.planet4.prototype = {
    preload: function(){
        game.load.tilemap("map", "assets/map/level_4_map.json",null,Phaser.Tilemap.TILED_JSON);
        game.load.image("map_sky_night2","assets/map/map_sky_night2.png");
        game.load.image("Level_4_Ground","assets/map/level_4_Ground.png");
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
        map.setCollisionBetween(14,15,true,"ground");
        map.setCollisionBetween(22,23,true,"ground");
    },
    update:function(){}
}