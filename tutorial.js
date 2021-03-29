var enemies = 0, content, lineIndex, wordIndex, wordDelay, lineDelay;
demo.tutorial = function(){};
demo.tutorial.prototype = {
    preload: function(){
        game.load.spritesheet('nova', 'assets/sprites/nova_.png', 91, 110);
        game.load.image('frog', 'assets/sprites/Frog_villan.png');
        game.load.image('shot', 'assets/sprites/Nova_shot.png');

    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        addChangeStateEventListeners();
        
        game.paused = false;
        
        nova = game.add.sprite(25, 475, 'nova');
        nova.scale.setTo(0.7, 0.7);
        nova.anchor.setTo(0.5, 0.5);
        game.physics.enable(nova);
        nova.body.collideWorldBounds = true;
        nova.body.bounce.y = 0.2;
        nova.body.gravity.y = 500;
        nova.invincibility = false;
        nova.animations.add('idle', [0, 1]);
        nova.animations.add('move', [2, 3, 4, 5, 6, 7, 8, 9, 10]);
        nova.animations.add('shoot', [15, 16, 17]);
        nova.animations.add('shoot_move', [20, 21, 22, 23, 24, 25]);
        
        cursors = game.input.keyboard.createCursorKeys();
        
        
        frogs = game.add.group();
        frogs.enableBody = true;
        game.physics.enable(frogs);
        var frog = frogs.create(300, 425, 'frog');
        frog.scale.setTo(-0.5, 0.5);
        frog.body.gravity.y = 500;
        frog.body.collideWorldBounds = true;
        enemies += 1;
        
        game.camera.follow(nova);
        
        var txt = game.add.text(50, 200, 'Move with Arrow keys \nand Jump with up arrow', {fontSize: 20 + 'px', fill: '#00FFFF'});
        
        var txt = game.add.text(325, 200, 'Shoot with Spacebar', {fontSize: 20 + 'px', fill: '#00FFFF'});
        
        
        weapon = game.add.weapon(50, 'shot');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.fireRate = 600;
        weapon.bulletSpeed = 500;
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        weapon.trackSprite(nova, 0, 0, true);
        
        content = ['You Have finished the tutorial. Press Enter to head to the level select screen. Be careful the black hole will suck you into the final fight.'];

        line = [];

        wordIndex = 0;
        lineIndex = 0;

        wordDelay = 120;
        lineDelay = 400;
        text = game.add.text(32, 32, '', { font: "15px Arial", fill: "#19de65" });
        
    },
    update:function(){
        game.physics.arcade.overlap(nova, frogs, hitNova, null, this);
        game.physics.arcade.overlap(weapon.bullets, frogs, hitVilTut, null, this);
        nova.body.velocity.x = 0;
        if(cursors.left.isDown){
            nova.scale.setTo(-0.7, 0.7)
            nova.body.velocity.x = -200;
            weapon.bulletSpeed = -500;
            if (fireButton.isDown){
                nova.animations.play('shoot_move', 8, true);
            }
            else{
                nova.animations.play('move', 12, true);
            }
        }
        else if(cursors.right.isDown){
            nova.scale.setTo(0.7, 0.7)
            nova.body.velocity.x = 200;
            weapon.bulletSpeed = 500;
            if (fireButton.isDown){
                nova.animations.play('shoot_move', 8, true);
            }
            else{
                nova.animations.play('move', 12, true);
            }
        }
        else{
            nova.animations.stop('move');
            nova.animations.play('idle', 3, true);
        }
        if(cursors.up.isDown){
            nova.body.velocity.y = -425;
        }
        if (fireButton.isDown){
            if (nova.alive == true){
                weapon.fire();
                if (cursors.left.isDown == false && cursors.right.isDown == false){
                    nova.animations.play('shoot', 5, false);
                }
            }
        }
        if (enemies == 0){
            pauseGame();
        }
    }
}
function hitVilTut(shot, villain){
    shot.kill();
    villain.kill();
    enemies -= 1;
}
function pauseGame (){
    nova.body.velocity.x = 0;
    nova.body.velocity.y = 0;
    nextLine();
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
        changeState(null, 'l');
    }
}
function nextLine() {

    if (lineIndex === content.length)
    {
        //  We're finished
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line = content[lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(wordDelay, line.length, nextWord, this);

    //  Advance to the next line
    lineIndex++;

}

function nextWord() {

    //  Add the next word onto the text string, followed by a space
    text.text = text.text.concat(line[wordIndex] + " ");

    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        text.text = text.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay, nextLine, this);
    }

}