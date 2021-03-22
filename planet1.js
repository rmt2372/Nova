
demo.planet1 = function(){};
demo.planet1.prototype = {
    preload: function(){
        game.load.image('nova', 'assets/sprites/Nova.png');
        game.load.image('bubble_shield', 'assets/sprites/Bubble_shield.png');
        game.load.image('laser', 'assets/sprites/Laser_cannon.png');
        game.load.image('missle', 'assets/sprites/Smart_missle.png');
        game.load.image('burst', 'assets/sprites/Debris_burst.png');
    },
    create: function(){
        addChangeStateEventListeners();
    },
    update:function(){}
}