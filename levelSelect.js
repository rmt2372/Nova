
demo.levelSelect = function(){};
demo.levelSelect.prototype = {
    preload: function(){
        game.load.tilemap('map', 'assets/map/open_world_map.json',null,Phaser.Tilemap.TILED_JSON);
        game.load.image('map_sky_night2', 'assets/map/map_sky_night2.png');
        game.load.image('map_sky_planets', 'assets/map/map_sky_planets.png');
    },
    create: function(){
        addChangeStateEventListeners();
        
        map = game.add.tilemap('map');
        map.addTilesetImage('map_sky_night2');
        map.addTilesetImage('map_sky_planets');
        
        sky = map.createLayer("sky");
        planets = map.createLayer("planets");
        
    },
    update: function(){}
}