var demo = {};
var centerX = 1024/2, centerY = 576/2, ship, boss, speed = 4;
demo.menu = function(){};
demo.menu.prototype = {
    preload: function(){
        game.load.image('sky', 'assets/map/map_sky_night.png')
    },
    create: function(){
        addChangeStateEventListeners();
        var skyBG = game.add.sprite(0, 0, 'sky');
        var txt = game.add.text(centerX, centerY, 'press "b" to get to battle', {fontSize: 50 + 'px', fill: '#00FFFF'});
        txt.anchor.setTo(0.5, 0.5);
    },
    update: function(){}
}
function changeState(i, stateNum){
    if (stateNum == 'm'){
        console.log("menu");
        score = 0;
        game.state.start("menu");
    } else if (stateNum == 'b'){
        console.log('battle');
        game.state.start('battle');
    }
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.M, changeState, 'm');
    addKeyCallback(Phaser.Keyboard.B, changeState, 'b');
}