demo.tutorial = function(){};
demo.tutorial.prototype = {
    preload: function(){
        game.load.image('nova', 'assets/sprites/Nova.png');

    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        addChangeStateEventListeners();
        
        nova = game.add.sprite(25, 475, 'nova');
        nova.scale.setTo(0.2, 0.2);
        nova.anchor.setTo(0.5, 0.5);
        game.physics.enable(nova);
        nova.body.collideWorldBounds = true;
        nova.body.bounce.y = 0.2;
        nova.body.gravity.y = 500;
        
        cursors = game.input.keyboard.createCursorKeys();
    },
    update:function(){
        if(cursors.left.isDown){
            nova.scale.setTo(-0.2, 0.2)
            nova.body.velocity.x = -200;
        }
        else if(cursors.right.isDown){
            nova.scale.setTo(0.2, 0.2)
            nova.body.velocity.x = 200;
        }
        if(cursors.up.isDown){
            nova.body.velocity.y = -425;
        }
    }
}