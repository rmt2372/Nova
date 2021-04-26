
demo.reminder = function(){};
demo.reminder.prototype = {
    preload: function(){
        game.load.image('bubble_shield', 'assets/sprites/Bubble_shield.png');
        game.load.image('laser', 'assets/sprites/Laser_cannon.png');
        game.load.spritesheet('missle', 'assets/sprites/Smart_missle.png', 75, 75);
        game.load.image('burst', 'assets/sprites/Debris_burst.png');
    },
    create: function(){
        if (supers == 0){
            text = game.add.text(1024/2, 576/2 - 100, 'No Supers', {fontSize: 20 + 'px', fill: '#00FFFF'});
            text.anchor.setTo(0.5, 0.5);
        }
        else{
            text = game.add.text(1024/2, 576/2 - 100, 'Supers', {fontSize: 20 + 'px', fill: '#00FFFF'});
            text.anchor.setTo(0.5, 0.5);
            text = game.add.text(1024/2, 576/2, 'Press corresponding button when blue super meter is filled to use super.', {fontSize: 20 + 'px', fill: '#00FFFF'});
            text.anchor.setTo(0.5, 0.5);
        }
        
        text = game.add.text(1024/2, 576/2 + 100, 'Press Enter when ready for boss battle!', {fontSize: 20 + 'px', fill: '#00FFFF'});
        text.anchor.setTo(0.5, 0.5);
        if (missle == true){
            mis = game.add.sprite(32, 82, 'missle');
            mis.anchor.setTo(0.5, 0.5);
            text = game.add.text(32, 125, 'H', {fontSize: 20 + 'px', fill: '#00FFFF'});
            text.anchor.setTo(0.5, 0.5);
        }
        if (laser == true){
            lase = game.add.sprite(332, 82, 'laser');
            lase.anchor.setTo(0.5, 0.5);
            text = game.add.text(632, 125, 'K', {fontSize: 20 + 'px', fill: '#00FFFF'});
            text.anchor.setTo(0.5, 0.5);
        }
        if (shield == true){
            bub = game.add.sprite(632, 82, 'bubble_shield');
            bub.anchor.setTo(0.5, 0.5);
            text = game.add.text(332, 125, 'J', {fontSize: 20 + 'px', fill: '#00FFFF'});
            text.anchor.setTo(0.5, 0.5);
        }
        if (burst == true){
            wav = game.add.sprite(932, 82, 'burst');
            wav.anchor.setTo(0.5, 0.5);
            text = game.add.text(932, 125, 'L', {fontSize: 20 + 'px', fill: '#00FFFF'});
            text.anchor.setTo(0.5, 0.5);
        }
    },
    update: function(){
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('battle');
        }
    }
}