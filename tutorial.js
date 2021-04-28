var enemy_num = 0, content, lineIndex, wordIndex, wordDelay, lineDelay;
demo.tutorial = function(){};
demo.tutorial.prototype = {
    preload: function(){
        
        game.load.tilemap('map', 'assets/map/tutorialmap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('sky', 'assets/map/map_sky_night.png');
        game.load.image('map_sky_night2', 'assets/map/map_sky_night2.png');
        game.load.image('map_ground_dirt', 'assets/map/map_ground_dirt.png');
        game.load.image('map_ground_grass', 'assets/map/map_ground_grass.png');
        
        
        game.load.spritesheet('nova', 'assets/sprites/nova_.png', 91, 110);
        game.load.image('frog', 'assets/sprites/Frog_villan.png');
        game.load.image('shot', 'assets/sprites/Nova_shot.png');

    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        addChangeStateEventListeners();
        
        map = game.add.tilemap('map');
        map.addTilesetImage('map_sky_night2');
        map.addTilesetImage('map_ground_dirt');
        map.addTilesetImage('map_ground_grass');
        
        
        sky = map.createLayer("sky");
        Ground = map.createLayer("Ground");
        
        sky.resizeWorld();
        
        map.setCollisionBetween(1,8,true,"Ground");
        
        game.paused = false;
        
        nova = game.add.sprite(25, 620, 'nova');
        nova.scale.setTo(0.6, 0.6);
        nova.anchor.setTo(0.5, 0.5);
        game.physics.enable(nova);
        nova.body.collideWorldBounds = true;
        nova.body.bounce.y = 0.2;
        nova.body.gravity.y = 900;
        nova.invincibility = false;
        nova.animations.add('idle', [0, 1]);
        nova.animations.add('move', [2, 3, 4, 5, 6, 7, 8, 9, 10]);
        nova.animations.add('shoot', [15, 16, 17]);
        nova.animations.add('shoot_move', [20, 21, 22, 23, 24, 25]);
        
        cursors = game.input.keyboard.createCursorKeys();
        
        
        frogs = game.add.group();
        frogs.enableBody = true;
        game.physics.enable(frogs);
        var frog = frogs.create(1000, 625, 'frog');
        frog.scale.setTo(-0.4, 0.4);
        frog.body.gravity.y = 500;
        frog.body.collideWorldBounds = true;
        enemy_num += 1;
        frog = frogs.create(1450, 625, 'frog');
        frog.scale.setTo(-0.4, 0.4);
        frog.body.gravity.y = 500;
        frog.body.collideWorldBounds = true;
        enemy_num += 1;
        frog = frogs.create(1700, 625, 'frog');
        frog.scale.setTo(-0.4, 0.4);
        frog.body.gravity.y = 500;
        frog.body.collideWorldBounds = true;
        enemy_num += 1;
        frog = frogs.create(2400, 625, 'frog');
        frog.scale.setTo(-0.4, 0.4);
        frog.body.gravity.y = 500;
        frog.body.collideWorldBounds = true;
        enemy_num += 1;
        frog = frogs.create(2200, 625, 'frog');
        frog.scale.setTo(-0.4, 0.4);
        frog.body.gravity.y = 500;
        frog.body.collideWorldBounds = true;
        enemy_num += 1;
        
        game.camera.follow(nova);
        
        up = this.input.keyboard.addKey(Phaser.KeyCode.W);
        left = this.input.keyboard.addKey(Phaser.KeyCode.A);
        right = this.input.keyboard.addKey(Phaser.KeyCode.D);
        
        var txt = game.add.text(50, 400, 'Move with WASD', {fontSize: 20 + 'px', fill: '#00FFFF'});
        
        var txt = game.add.text(1025, 400, 'Shoot with Spacebar', {fontSize: 20 + 'px', fill: '#00FFFF'});
        
        var txt = game.add.text(1725, 400, 'Play through each world and find the\nsupers that will aid in the final fight.\nOr head stright to the boss fight.', {fontSize: 20 + 'px', fill: '#00FFFF'});
        
        
        weapon = game.add.weapon(50, 'shot');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.fireRate = 600;
        weapon.bulletSpeed = 500;
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        weapon.trackSprite(nova, 0, 0, true);
        
        content = ['You Have finished the tutorial!\nPress Enter to head to the level select screen.\nBe careful the black hole will suck you into the final fight.'];

        line = [];

        wordIndex = 0;
        lineIndex = 0;

        wordDelay = 120;
        lineDelay = 400;
        text = game.add.text(32, 32, '', { font: "15px Arial", fill: '#00FFFF' });
        text.fixedToCamera = true;
        
    },
    update:function(){
        
        console.log(nova.x);
        console.log(nova.y);
        
        game.physics.arcade.collide(nova, Ground);
        game.physics.arcade.collide(frogs, Ground);
        
        game.physics.arcade.overlap(nova, frogs, hitNova, null, this);
        game.physics.arcade.overlap(weapon.bullets, frogs, hitVilTut, null, this);
        nova.body.velocity.x = 0;
        if(left.isDown){
            nova.scale.setTo(-0.6, 0.6)
            nova.body.velocity.x = -200;
            weapon.bulletSpeed = -500;
            if (fireButton.isDown){
                nova.animations.play('shoot_move', 8, true);
            }
            else{
                nova.animations.play('move', 12, true);
            }
        }
        else if(right.isDown){
            nova.scale.setTo(0.6, 0.6)
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
        if(up.isDown && nova.body.blocked.down){
            nova.body.velocity.y = -510;
        }
        if (fireButton.isDown){
            if (nova.alive == true){
                weapon.fire();
                if (left.isDown == false && right.isDown == false){
                    nova.animations.play('shoot', 5, false);
                }
            }
        }
        if (enemy_num == 0){
            pauseGame();
            nextLine();
        }
    }
}
function hitVilTut(shot, villain){
    shot.kill();
    villain.kill();
    enemy_num -= 1;
}
function pauseGame (){
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