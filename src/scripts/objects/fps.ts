import Phaser from 'phaser'

export default class FPS extends Phaser.GameObjects.Text {
    constructor(scene: Phaser.Scene) {
        super(scene, 10, 10, '', { color: 'white', fontSize: '72px' })
        scene.add.existing(this)
        this.setOrigin(0)
    }

    update() {
        this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`)
    }
}
