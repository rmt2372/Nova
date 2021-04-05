
demo.planet3 = function(){};
demo.planet3.prototype = {
    preload: function(){
        game.load.tilemap('map', 'assets/map/level_3_map.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.image('map_sky_night2', 'assets/map/map_sky_night2.png');
        game.load.image('Level_3_Ground', 'assets/map/level_3_Ground.png');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        addChangeStateEventListeners();
        
        map = game.add.tilemap('map');
        map.addTilesetImage('map_sky_night2');
        map.addTilesetImage('Level_3_Ground');
        
        sky = map.createLayer("sky");
        ground = map.createLayer("ground");
        
        sky.resizeWorld();
        
        map.setCollisionBetween(14,15,true,"ground");
        map.setCollisionBetween(22,23,true,"ground");
        
    },
    update:function(){}
}