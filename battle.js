var weapon, boss_life = 5;
demo.battle = function(){};
demo.battle.prototype = {
    preload: function(){
        game.load.image('sky', 'assets/map/map_sky_night2.png');
        game.load.image('nova', 'assets/sprites/Nova.png');
        game.load.image('boss', 'assets/sprites/Enemy.png');
        game.load.image('bullet', 'assets/sprites/bullet_beam.png');
    },
    create:function(){
        addChangeStateEventListeners();
        var skyBG = game.add.sprite(0, 0, 'sky');
        game.world.setBounds(0, 0, 1024, 576);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        nova = game.add.sprite(256, 200, 'nova');
        boss = game.add.sprite(768, 200, 'boss');
        nova.anchor.setTo(0.5, 0.5)
        boss.anchor.setTo(0.5, 0.5)
        nova.scale.setTo(0.2, 0.2)
        boss.scale.setTo(-1, 1)
        weapon = game.add.weapon(50, 'bullet');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.fireRate = 400;
        weapon.bulletSpeed = 500;
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        weapon.trackSprite(nova, 0, 0, true);
        
        game.physics.enable(nova)
        game.physics.enable(boss)
        nova.body.collideWorldBounds = true;
        boss.body.collideWorldBounds = true;
        
    },
    update: function(){
        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            nova.scale.setTo(0.2, 0.2);
            nova.x += speed;
            weapon.bulletSpeed = 500;
        } 
        else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            nova.scale.setTo(-0.2, 0.2);
            nova.x -= speed;
            weapon.bulletSpeed = -500;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            nova.y -= speed;
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            nova.y += speed;
        }
        if (fireButton.isDown){
            weapon.fire();
        }
        game.physics.arcade.overlap(boss, weapon.bullets, hitEnemy, null, this)
    }
}
function hitEnemy(boss, bullet){
    bullet.kill();
    boss_life -= 1;
    if (boss_life <= 0){
        boss.kill()
    }
}