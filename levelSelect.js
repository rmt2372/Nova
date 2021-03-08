var selectSong;
demo.levelSelect = function(){};
demo.levelSelect.prototype = {
    preload: function(){
        addChangeStateEventListeners();
        
        game.load.audio('selectSong', 'assets/sounds/Vastanberg.wav');
        
        game.world.setBounds(0, 0, 1600, 1600);

        
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
        
        selectSong = game.add.audio('selectSong');
        selectSong.addMarker('select', 0.5, 22.5, 0.1, true);
        selectSong.play('select');
        
    },
    update: function(){}
}