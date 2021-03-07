var game = new Phaser.Game(1024, 576, Phaser.AUTO);
game.state.add("menu", demo.menu);
game.state.add("battle", demo.battle);
game.state.add("levelSelect", demo.levelSelect);
game.state.start("menu");