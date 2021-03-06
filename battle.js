var weapon, flame1, sound, ground, map, sky, ship, flame2, flame3, gameOver, fightSong, smart_missle, beam, outline, fill, wave, laser_sound, wave_sound, missle_sound, shield_sound, win;
demo.battle = function(){};
demo.battle.prototype = {
    preload: function(){
        game.load.tilemap('map', 'assets/map/map.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('sky', 'assets/map/map_sky_night.png');
        game.load.image('map_sky_night2', 'assets/map/map_sky_night2.png');
        game.load.image('map_ground_dirt', 'assets/map/map_ground_dirt.png');
        game.load.image('map_ground_grass', 'assets/map/map_ground_grass.png');
        game.load.spritesheet('ship', 'assets/sprites/spaceshipSheet2.png', 98, 94);
        game.load.spritesheet('missle', 'assets/sprites/Smart_missle.png', 75, 75);
        game.load.spritesheet('boss', 'assets/sprites/Villian_attack.png', 132, 178);
        game.load.image('bullet', 'assets/sprites/bullet_beam.png');
        game.load.image('beam', 'assets/sprites/laserBeam.png');
        game.load.image('wave', 'assets/sprites/Wave.png');
        game.load.image('flame', 'assets/sprites/bullet_fire.png');
        game.load.image('healthOutline', 'assets/sprites/enemyHealthOutline.png');
        game.load.image('healthFill', 'assets/sprites/enemyHealthFill.png');
        game.load.image('superMeter', 'assets/sprites/superMeter.png');
        game.load.audio('shot', 'assets/sounds/blaster.mp3');
        game.load.audio('fire', 'assets/sounds/fire.mp3');
        game.load.audio('fightSong', 'assets/sounds/Sommarfgel.wav');
        game.load.image('end', 'assets/sprites/GameOver.png');
        game.load.image('reset', 'assets/sprites/reset.png');
        game.load.image('LS', 'assets/sprites/LevelSelectBut.png');
        game.load.image('resume', 'assets/sprites/resume.png');
        game.load.image('win', 'assets/sprites/win.png');
        game.load.image('heart', 'assets/sprites/Heart.png');
        
        game.load.audio('laser_sound', 'assets/sounds/laser_sound.mp3');
        game.load.audio('missle_sound', 'assets/sounds/missle_sound.wav');
        game.load.audio('shield_sound', 'assets/sounds/shield_sound.wav');
        game.load.audio('wave_sound', 'assets/sounds/wave_sound.wav');
    },
    create:function(){
        addChangeStateEventListeners();
        var skyBG = game.add.sprite(0, 0, 'sky');
        game.world.setBounds(0, 0, 2048, 480);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        map = game.add.tilemap('map');
        map.addTilesetImage('map_sky_night2');
        map.addTilesetImage('map_ground_dirt');
        map.addTilesetImage('map_ground_grass');
        
        
        sky = map.createLayer("sky");
        ground = map.createLayer("Ground");
        
        fill = game.add.sprite(768 - 100, 50, 'healthFill');
        fill.anchor.setTo(0, 0.5);
        fill.scale.setTo(2, 2);
        fill.fixedToCamera = true;
        
        outline = game.add.sprite(768 - 100, 50, 'healthOutline');
        outline.anchor.setTo(0, 0.5);
        outline.scale.setTo(2.2, 2);
        outline.fixedToCamera = true;
        
        superOutline = game.add.sprite(100, 50, 'healthOutline');
        superOutline.anchor.setTo(0, 0.5);
        superOutline.scale.setTo(2.2, 1);
        superOutline.fixedToCamera = true;
        
        superMeter = game.add.sprite(100, 50, 'superMeter');
        superMeter.anchor.setTo(0, 0.5);
        superMeter.scale.setTo(0, 1);
        superMeter.fixedToCamera = true;
        
        ship = game.add.sprite(156, 200, 'ship');
        boss = game.add.sprite(768, 200, 'boss');
        ship.anchor.setTo(0.5, 0.5);
        ship.scale.setTo(0.7, 0.7);
        boss.anchor.setTo(0.5, 0.5);
        boss.scale.setTo(-1, 1);
        ship.animations.add('walk', [1, 2]);
        ship.invincibility = false;
        
        boss.animations.add('attack', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        
        sound = game.add.audio('shot', 0.06);
        laser_sound = game.add.audio('laser_sound', 0.03);
        missle_sound = game.add.audio('missle_sound', 0.03);
        laser_sound.addMarker('short_las', 0, 1.5, 0.03, false);
        shield_sound = game.add.audio('shield_sound', 0.03);
        wave_sound = game.add.audio('wave_sound', 0.03);
        
        fire = game.add.audio('fire', 0.09);
        fightSong = game.add.audio('fightSong');
        fightSong.addMarker('fight', 82, 140, 0.03, true);
        fightSong.play('fight');
        
        weapon = game.add.weapon(50, 'bullet');
        weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        weapon.fireRate = 400;
        weapon.bulletSpeed = 500;
        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        weapon.trackSprite(ship, 0, 0, true);
        
        
        beam = game.add.weapon(1000, 'beam');
        beam.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        beam.fireRate = 25;
        beam.bulletSpeed = 1000;
        beamFire = this.input.keyboard.addKey(Phaser.KeyCode.K);
        beam.trackSprite(ship, 0, 0, true);
        
        smart_missle = game.add.weapon(1, 'missle');
        smart_missle.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        smart_missle.fireRate = 400;
        smart_missle.bulletSpeed = 700;
        missle_fire = this.input.keyboard.addKey(Phaser.KeyCode.H);
        smart_missle.trackSprite(ship, 0, 0, true);
        
        wave = game.add.weapon(1, 'wave');
        wave.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        wave.fireRate = 400;
        wave.bulletSpeed = 250;
        wave_fire = this.input.keyboard.addKey(Phaser.KeyCode.L);
        wave.trackSprite(ship, 0, 0, true);
        wave.bulletRotateToVelocity = true;
        
        shield_active = this.input.keyboard.addKey(Phaser.KeyCode.J);
        
        flame1 = game.add.weapon (10, 'flame');
        flame1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        flame1.fireRate = 2000;
        flame1.bulletSpeed = 500;
        flame1.fireAngle = 360;
        flame1.trackSprite(boss, -70, -30, false)
        flame1.autofire = false;
        flame1.bulletRotateToVelocity = true;
        
        flame2 = game.add.weapon (10, 'flame');
        flame2.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        flame2.fireRate = 2000;
        flame2.bulletSpeed = 500;
        flame2.fireAngle = 345;
        flame2.trackSprite(boss, -70, -30, false)
        flame2.autofire = false;
        flame2.bulletRotateToVelocity = true;
        
        flame3 = game.add.weapon (10, 'flame');
        flame3.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        flame3.fireRate = 2000;
        flame3.bulletSpeed = 500;
        flame3.fireAngle = 13;
        flame3.trackSprite(boss, -70, -30, false)
        flame3.autofire = false;
        flame3.bulletRotateToVelocity = true;
        
        
        game.physics.enable(ship);
        game.physics.enable(boss);
        game.physics.enable(smart_missle);
        ship.body.collideWorldBounds = true;
        boss.body.collideWorldBounds = true;
        game.camera.follow(ship);
        
        up = this.input.keyboard.addKey(Phaser.KeyCode.W);
        down = this.input.keyboard.addKey(Phaser.KeyCode.S);
        left = this.input.keyboard.addKey(Phaser.KeyCode.A);
        right = this.input.keyboard.addKey(Phaser.KeyCode.D);
        
        cursors = game.input.keyboard.createCursorKeys();
        
        heart1 = game.add.sprite(0, 0, 'heart');
        heart1.fixedToCamera = true;
        heart2 = game.add.sprite(18, 0, 'heart');
        heart2.fixedToCamera = true;
        heart3 = game.add.sprite(36, 0, 'heart');
        heart3.fixedToCamera = true;
        heart4 = game.add.sprite(54, 0, 'heart');
        heart4.fixedToCamera = true;
        heart5 = game.add.sprite(72, 0, 'heart');
        heart5.fixedToCamera = true;
        
        game.physics.arcade.isPaused = false;
        
        
        pause = game.add.text(975, 0, 'Pause', {fontSize: 20 + 'px', fill: '#00FFFF'});
        pause.fixedToCamera = true;
        pause.anchor.setTo(0.5, 0);
        pause.inputEnabled = true;
        pause.events.onInputUp.add(function () {
            game.physics.arcade.isPaused = true;
            LS = game.add.button(centerX, 400, 'LS', function(){
                changeState(null, 'l');
            });
            LS.anchor.setTo(0.5, 0.5);
            LS.fixedToCamera = true;
            LS.scale.setTo(0.5);
            reset = game.add.button(centerX, 300, 'reset', function(){
                    changeState(null, 'b');
                });
            reset.anchor.setTo(0.5, 0.5);
            reset.fixedToCamera = true;
            reset.scale.setTo(0.75);
            resume = game.add.button(centerX, centerY - 100, 'resume', function(){
                game.physics.arcade.isPaused = false;
                LS.destroy();
                reset.destroy();
                resume.destroy();
            });
            resume.anchor.setTo(0.5, 0.5);
            resume.fixedToCamera = true;
            resume.scale.setTo(0.5);
        });
        
        game.camera.onFadeComplete.add(win_game, this);
        
    },
    update: function(){
        game.time.events.add(1000, toggleAutoFire, this);

        if (boss.alive == true){
            boss.animations.play('attack', 10, true);
        }
        
        if (right.isDown){
            ship.x += speed;
            ship.scale.setTo(0.7, 0.7);
            weapon.bulletSpeed = 500;
            beam.bulletSpeed = 1000;
            wave.bulletSpeed = 250;
            ship.animations.play('walk', 12, true);
        } 
        else if (left.isDown){
            ship.scale.setTo(-0.7, 0.7);
            ship.x -= speed;
            weapon.bulletSpeed = -500;
            beam.bulletSpeed = -1000;
            wave.bulletSpeed = -250;
            ship.animations.play('walk', 12, true);
        }
        else{
            ship.animations.stop('walk');
            ship.frame = 0;
        }
        if (up.isDown){
            ship.animations.play('walk', 12, true)
            ship.y -= speed;
        }
        else if(down.isDown){
            ship.animations.play('walk', 12, true)
            ship.y += speed;
        }
        if (fireButton.isDown){
            if (ship.alive == true){
                weapon.fire();
            }
        }
        weapon.onFire.add(function(){
            sound.play();
        })
    
        if(missle_fire.isDown && missle == true && counter >= 5){
            smart_missle.fireAtSprite(boss);
            counter = 0;
            missle_sound.play();
            superMeter.scale.setTo(0, 1);
        }
        if(beamFire.isDown && laser == true && counter >= 5){
            game.time.events.repeat(0, 75, fireBeam, this);
            counter = 0;
            laser_sound.play('short_las');
            superMeter.scale.setTo(0, 1);
        }
        if(shield_active.isDown && shield == true && counter >= 5 && ship.invincibility == false){
            counter = 0;
            shield_sound.play();
            superMeter.scale.setTo(0, 1);
            if(ship.invincibility == false){
                speed = 6;
                game.time.events.add(2000, toggleSpeed, this);
                toggleInvincibility();
                tweenTintHelper(2);
                game.time.events.add(2000, toggleInvincibility, this);
                game.time.events.add(300, tweenTintHelper, this, 3);
                game.time.events.add(500, tweenTintHelper, this, 2);
                game.time.events.add(750, tweenTintHelper, this, 3);
                game.time.events.add(1000, tweenTintHelper, this, 2);
                game.time.events.add(1300, tweenTintHelper, this, 3);
                game.time.events.add(1500, tweenTintHelper, this, 2);
                game.time.events.add(1750, tweenTintHelper, this, 3);
            }
        }
        if(wave_fire.isDown && burst == true && counter >= 5){
            wave.fire();
            counter = 0;
            wave_sound.play();
            superMeter.scale.setTo(0, 1);
            
        }
        if (boss.x < ship.x){
            flame1.bulletSpeed = 500;
            flame2.bulletSpeed = 500;
            flame3.bulletSpeed = 500;
            flame1.trackSprite(boss, 70, -30, false)
            flame2.trackSprite(boss, 70, -30, false)
            flame3.trackSprite(boss, 70, -30, false)
            boss.scale.setTo(1, 1);
        }
        else if(boss.x > ship.x){
            flame1.bulletSpeed = -500;
            flame2.bulletSpeed = -500;
            flame3.bulletSpeed = -500;
            flame1.trackSprite(boss, -70, -30, false)
            flame2.trackSprite(boss, -70, -30, false)
            flame3.trackSprite(boss, -70, -30, false)
            boss.scale.setTo(-1, 1);
        }
        flame1.onFire.add(function(){
            fire.play();
        })
        if (boss.alive == false || ship.alive == false){
            flame1.autofire = false;
            flame2.autofire = false;
            flame3.autofire = false;
        }
        if (boss_life <= start_boss_life / 2){
            flame1.fireRate = 1000;
            flame2.fireRate = 1000;
            flame3.fireRate = 1000;
        }
        game.physics.arcade.overlap(ship, flame1.bullets, hitShip, null, this);
        game.physics.arcade.overlap(ship, flame2.bullets, hitShip, null, this);
        game.physics.arcade.overlap(ship, flame3.bullets, hitShip, null, this);
        game.physics.arcade.overlap(ship, boss, hitBoss, null, this);
        game.physics.arcade.overlap(boss, weapon.bullets, hitEnemy, null, this);
        game.physics.arcade.overlap(boss, smart_missle.bullets, missleHit, null, this);
        game.physics.arcade.overlap(wave.bullets, flame1.bullets, hitWave, null, this);
        game.physics.arcade.overlap(wave.bullets, flame2.bullets, hitWave, null, this);
        game.physics.arcade.overlap(wave.bullets, flame3.bullets, hitWave, null, this);
        game.physics.arcade.overlap(boss, beam.bullets, beamHit, null, this);
        
        if(game.physics.arcade.isPaused || boss.alive == false){
            flame1.autofire = false;
            flame2.autofire = false;
            flame3.autofire = false;
            up = this.input.keyboard.addKey(Phaser.KeyCode.P);
            down = this.input.keyboard.addKey(Phaser.KeyCode.O);
            left = this.input.keyboard.addKey(Phaser.KeyCode.I);
            right = this.input.keyboard.addKey(Phaser.KeyCode.U);
        } else{
            flame1.autofire = true;
            flame2.autofire = true;
            flame3.autofire = true;
            up = this.input.keyboard.addKey(Phaser.KeyCode.W);
            down = this.input.keyboard.addKey(Phaser.KeyCode.S);
            left = this.input.keyboard.addKey(Phaser.KeyCode.A);
            right = this.input.keyboard.addKey(Phaser.KeyCode.D);
        }
        if (ship_life == 0){
            heart1.kill();
        }
        if (ship_life == 1){
            heart2.kill();
        }
        if (ship_life == 2){
            heart3.kill();
        }
        if (ship_life == 3){
            heart4.kill();
        }
        if (ship_life == 4){
            heart5.kill();
        }
        if (ship.alive == false){
            flame1.autofire = false;
            flame2.autofire = false;
            flame3.autofire = false;
        }
    }
}
function missleHit(boss, bullet){
    bullet.kill();
    boss_life -= 2;
    if (boss_life >= 0){
        fill.scale.setTo((boss_life/ start_boss_life) * 2, 2)
    }
    if (boss_life < 0){
        fill.scale.setTo(0, 2)
    }
    if (boss_life <= 0){
        boss.kill();
    }
}
function hitEnemy(boss, bullet){
    bullet.kill();
    boss_life -= 1;
    if (counter < 5){
        counter += 1;
        superMeter.scale.setTo((counter / 5) * 2, 1);
    }
    if (boss_life >= 0){
        fill.scale.setTo((boss_life/ start_boss_life) * 2, 2)
    }
    if (boss_life === Math.floor(start_boss_life / 2)){
        tweenTintHelper(0);
        game.time.events.add(300, tweenTintHelperEnemy, this, 1);
        game.time.events.add(500, tweenTintHelperEnemy, this, 0);
        game.time.events.add(750, tweenTintHelperEnemy, this, 1);
        game.time.events.add(1000, tweenTintHelperEnemy, this, 0);
        game.time.events.add(1300, tweenTintHelperEnemy, this, 1);
        game.time.events.add(1500, tweenTintHelperEnemy, this, 0);
        game.time.events.add(1750, tweenTintHelperEnemy, this, 1);
    }
    if (boss_life < 0){
        fill.scale.setTo(0, 2)
    }
    if (boss_life <= 0){
        boss.kill();
    }
    if(boss.alive == false && ship.alive == true){
        win = game.add.sprite(centerX, centerY, 'win');
        win.anchor.setTo(0.5, 0.5);
        win.fixedToCamera = true;
        game.camera.fade(0x000000, 4000);
    }
}
function hitWave(wave, bullet){
    bullet.kill();
}
function hitShip(ship, bullet){
    if(ship.invincibility == false){
        bullet.kill();
        toggleInvincibility();
        ship_life -=1;
        game.time.events.add(2000, toggleInvincibility, this);
        tweenTintHelper(0);
        game.time.events.add(300, tweenTintHelper, this, 1);
        game.time.events.add(500, tweenTintHelper, this, 0);
        game.time.events.add(750, tweenTintHelper, this, 1);
        game.time.events.add(1000, tweenTintHelper, this, 0);
        game.time.events.add(1300, tweenTintHelper, this, 1);
        game.time.events.add(1500, tweenTintHelper, this, 0);
        game.time.events.add(1750, tweenTintHelper, this, 1);
    } 
    if (ship_life <= 0){
        endGame()
    }
}
function hitBoss(ship, boss){
     if(ship.invincibility == false){
        toggleInvincibility();
        ship_life -=1;
        
        game.time.events.add(Phaser.Timer.SECOND * 2, toggleInvincibility, this);
        
        tweenTintHelper(0);
        game.time.events.add(300, tweenTintHelper, this, 1);
        game.time.events.add(500, tweenTintHelper, this, 0);
        game.time.events.add(750, tweenTintHelper, this, 1);
        game.time.events.add(1000, tweenTintHelper, this, 0);
        game.time.events.add(1300, tweenTintHelper, this, 1);
        game.time.events.add(1500, tweenTintHelper, this, 0);
        game.time.events.add(1750, tweenTintHelper, this, 1);
        
    } 
    if (ship_life <= 0){
        endGame();
    }
}
function toggleInvincibility(){
    ship.invincibility = !ship.invincibility
}
function toggleSpeed(){
    speed = 4;
}
function tweenTint(obj, startColor, endColor, time){
    var colorBlend = {step: 0};
    var colorTween = game.add.tween(colorBlend).to({step: 100}, time);
    colorTween.onUpdateCallback(function() {obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);});
    obj.tint = startColor;
    colorTween.start();
}
function tweenTintHelperEnemy(num){
    if (num == 0){
        tweenTint(boss, 0xffffff, 0xFF0000, 250);
    }
    if (num == 1){
        tweenTint(boss, 0xFF0000, 0xffffff, 250);
    }
    if (num == 2){
        tweenTint(boss, 0xffffff, 0x00FFFF, 250);
    }
    if (num == 3){
        tweenTint(boss, 0x00FFFF, 0xffffff, 250);
    }
}
function tweenTintHelper(num){
    if (num == 0){
        tweenTint(ship, 0xffffff, 0xbbbbbb, 250);
    }
    if (num == 1){
        tweenTint(ship, 0xbbbbbb, 0xffffff, 250);
    }
    if (num == 2){
        tweenTint(ship, 0xffffff, 0x00FFFF, 250);
    }
    if (num == 3){
        tweenTint(ship, 0x00FFFF, 0xffffff, 250);
    }
}
function endGame(){
    ship.kill()
    fightSong.stop();
    flame1.autofire = false;
    flame2.autofire = false;
    flame3.autofire = false;
    end = game.add.sprite(1024/2, 576/2 - 100, 'end');
    end.anchor.setTo(0.5, 0.5);
    end.fixedToCamera = true;
    game.add.tween(end).to({alpha: 0}, 1000, 'Linear', 'true', 0, false, true).loop(true);
    reset = game.add.button(centerX, 300, 'reset', function(){
            changeState(null, 'b')
        });
    reset.anchor.setTo(0.5, 0.5);
    reset.fixedToCamera = true;
    reset.scale.setTo(0.75);
    LS = game.add.button(centerX, 400, 'LS', function(){
        changeState(null, 'l');
    });
    LS.anchor.setTo(0.5, 0.5);
    LS.fixedToCamera = true;
    LS.scale.setTo(0.5);
}
function toggleAutoFire(){
    game.physics.arcade.moveToObject(boss, ship, null, 3000);
    flame1.autofire = true;
    flame2.autofire = true;
    flame3.autofire = true;
}
function fireBeam(){
    if (ship.alive == true){
        beam.fire();
    }
}
function beamHit(boss, bullet){
    bullet.kill()
    boss_life -= 0.1;
    if (boss_life >= 0){
        fill.scale.setTo((boss_life/ start_boss_life) * 2, 2)
    }
    if (boss_life < 0){
        fill.scale.setTo(0, 2)
    }
    if (boss_life <= 0){
        boss.kill();
    }
}
function win_game(){
    game.sound.stopAll();
    game.state.start('credits'); 
}

