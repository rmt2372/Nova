demo.battle = function(){};
demo.battle.prototype = {
    preload: function(){
        game.load.image('sky', 'assets/map/map_sky_night2.png');
        game.load.image('nova', 'assets/sprites/Nova.png');
        game.load.image('boss', 'assets/sprites/Enemy.png');
    },
    create:function(){
        addChangeStateEventListeners();
        var skyBG = game.add.sprite(0, 0, 'sky');
        nova = game.add.sprite(256, 200, 'nova');
        boss = game.add.sprite(768, 200, 'boss');
        nova.anchor.setTo(0.5, 0.5)
        boss.anchor.setTo(0.5, 0.5)
        nova.scale.setTo(0.2, 0.2)
        boss.scale.setTo(-1, 1)
    },
    update: function(){}
}