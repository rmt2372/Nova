
demo.planet1 = function(){};
demo.planet1.prototype = {
    preload: function(){
        game.load.image('nova', 'assets/sprites/Nova.png');
        game.load.image('bubble_shield', 'assets/sprites/Bubble_shield.png');
        game.load.image('laser', 'assets/sprites/Laser_cannon.png');
        game.load.image('missle', 'assets/sprites/Smart_missle.png');
        game.load.image('burst', 'assets/sprites/Debris_burst.png');
        
        game.load.tilemap('map', 'assets/map/level_1_map.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.image('map_sky_night2', 'assets/map/map_sky_night2.png');
        game.load.image('level_1_Ground', 'assets/map/level_1_Ground.png');
    },
    create: function(){
        addChangeStateEventListeners();
        
        map = game.add.tilemap('map');
        map.addTilesetImage('map_sky_night2');
        map.addTilesetImage('level_1_Ground');
        
        sky = map.createLayer("sky");
        planets = map.createLayer("ground");
        
        map.setCollisionBetween(13,265,true,"ground");
    },
    update:function(){}
}