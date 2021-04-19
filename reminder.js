
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
        }
        text = game.add.text(1024/2, 576/2, 'Press Enter when ready for boss battle!', {fontSize: 20 + 'px', fill: '#00FFFF'});
        text.anchor.setTo(0.5, 0.5);
        if (missle == true){
            mis = game.add.sprite(32, 32, 'missle');
            text = game.add.text(32, 75, 'H', {fontSize: 20 + 'px', fill: '#00FFFF'});
        }
        if (laser == true){
            lase = game.add.sprite(332, 32, 'laser');
            text = game.add.text(632, 75, 'K', {fontSize: 20 + 'px', fill: '#00FFFF'});
        }
        if (shield == true){
            bub = game.add.sprite(632, 32, 'bubble_shield');
            text = game.add.text(332, 75, 'J', {fontSize: 20 + 'px', fill: '#00FFFF'});
        }
        if (burst == true){
            wav = game.add.sprite(932, 32, 'burst');
            text = game.add.text(932, 75, 'L', {fontSize: 20 + 'px', fill: '#00FFFF'});
        }
    },
    update: function(){
        if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
            game.state.start('battle');
        }
    }
}