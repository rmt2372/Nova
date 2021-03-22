var demo = {};
var centerX = 1024/2, centerY = 576/2, ship, boss, speed = 4, boss_life = 20, ship_life = 2, title, missle = false, laser = false, shield = false, burst = false, counter = 0, start_boss_life = 20, nova;
demo.menu = function(){};
demo.menu.prototype = {
    preload: function(){
        game.load.image('sky', 'assets/map/map_sky_night.png');
        game.load.image('title', 'assets/sprites/title.png');
        game.load.image('start', 'assets/sprites/startBut.png');

    },
    create: function(){
        addChangeStateEventListeners();
        var skyBG = game.add.sprite(0, 0, 'sky');
        var txt = game.add.text(centerX, 500, 'press "b" to get to battle', {fontSize: 50 + 'px', fill: '#00FFFF'});
        txt.anchor.setTo(0.5, 0.5);
        
        title = game.add.sprite(centerX, 200, 'title');
        title.anchor.setTo(0.5, 0.5);
        
        var start = game.add.button(centerX, 325, 'start', function(){
            changeState(null, 'l')
        });
        start.anchor.setTo(0.5, 0.5);
        start.scale.setTo(0.7, 0.7);
    },
    update: function(){}
}
function changeState(i, stateNum){
    game.sound.stopAll();
    if (stateNum == 'm'){
        console.log("menu");
        score = 0;
        game.state.start("menu");
    } if (stateNum == 'b'){
        console.log('battle');
        boss_life = 20;
        ship_life = 2;
        counter = 0;
        game.state.start('battle');
    } if (stateNum == 'l'){
        console.log('levelSelect');
        game.state.start('levelSelect');
    } if (stateNum == '1'){
        console.log('planet1');
        game.state.start('planet1');
    } if (stateNum == '2'){
        console.log('planet2');
        game.state.start('planet2');
    } if (stateNum == '3'){
        console.log('planet3');
        game.state.start('planet3');
    } if (stateNum == '4'){
        console.log('planet4');
        game.state.start('planet4');
    }
    
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.M, changeState, 'm');
    addKeyCallback(Phaser.Keyboard.B, changeState, 'b');
    addKeyCallback(Phaser.Keyboard.L, changeState, 'l');
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
    addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
    addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
}
function resetHealth(){
    ship_life = 2;
    boss_life = 20;
}