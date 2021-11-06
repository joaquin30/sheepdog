import Phaser from 'phaser'
import Preload from './scenes/preload'
import Menu from './scenes/menu'
import Game from './scenes/game'
import GameOver from './scenes/gameover'

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.CANVAS,
    backgroundColor: 0,
    width: 1600,
    height: 1600,
    scene: [Preload, Menu, Game, GameOver],
    render: {pixelArt: false},
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {debug: false}
    },
    input: {
        activePointers: 1,
    }
}

window.onload = () => {
    new Phaser.Game(config)
}
