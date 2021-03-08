var game = new Phaser.Game(1024, 576, Phaser.AUTO);
game.state.add("menu", demo.menu);
game.state.add("battle", demo.battle);
game.state.add("levelSelect", demo.levelSelect);
game.state.add("planet1", demo.planet1);
game.state.add("planet2", demo.planet2);
game.state.add("planet3", demo.planet3);
game.state.add("planet4", demo.planet4);
game.state.start("menu");