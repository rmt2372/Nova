var credits, names, thanks, menu;
demo.credits = function(){};
demo.credits.prototype = {
    preload: function(){
        game.load.image('sky', 'assets/map/map_sky_night.png');
        game.load.image('credits', 'assets/sprites/credits.png');
        game.load.image('names', 'assets/sprites/names.png');
        game.load.image('thanks', 'assets/sprites/thanks.png');
        game.load.image('menu', 'assets/sprites/menu.png');
    },
    create: function(){
        addChangeStateEventListeners();
        console.log('credits');
        
        var skyBG = game.add.sprite(0, 0, 'sky');
        
        credits = game.add.sprite(centerX, 650, 'credits');
        credits.anchor.setTo(0.5, 0.5);
        credits.scale.setTo(0.7, 0.7);
        
        names = game.add.sprite(centerX, 1000, 'names');
        names.anchor.setTo(0.5, 0.5);
        names.scale.setTo(0.4, 0.4);
        
        thanks = game.add.sprite(centerX, 1688, 'thanks');
        thanks.anchor.setTo(0.5, 0.5);
        thanks.scale.setTo(0.4, 0.4);
        
        menu = game.add.button(centerX, 1888, 'menu', function(){
            laser = false;
            missle = false;
            shield = false;
            burst = false;
            nova_life = 2;
            ship_life = 5;
            boss_life = 20;
            changeState(null, 'm');
        });
        menu.anchor.setTo(0.5, 0.5);
        menu.scale.setTo(0.4, 0.4);
        
        game.add.tween(credits).to({y: -850}, 10000, 'Linear', 'true');
        game.add.tween(names).to({y: -500}, 10000, 'Linear', 'true');
        game.add.tween(thanks).to({y: 188}, 10000, 'Linear', 'true');
        game.add.tween(menu).to({y: 388}, 10000, 'Linear', 'true');
    },
    update: function(){}
}
