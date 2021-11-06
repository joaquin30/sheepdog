import Phaser from "phaser"
import Item from "../objects/item"

export default class GameOver extends Phaser.Scene {
    retry: Phaser.GameObjects.Image
    items: Item[]

    constructor() {
        super('gameover')
    }

    create(data: object) {
        this.sound.play('barks')
        this.cameras.main.fadeIn(500, 255, 255, 255)
        this.add.image(800, 800, 'bg2')
        this.items = [
            new Item(this, 0, 0, 'cloud2', 0, 0),
            new Item(this, 1600, 0, 'sun2', 1, 0),
            new Item(this, 1600, 1600, 'ground4', 1, 1),
            new Item(this, 0, 1600, 'ground3', 0, 1)
        ]
        this.add.bitmapText(800, 700, 'dosis',
            `Rounds completed: ${data['rounds']}/8`, 100).setOrigin()
        this.add.bitmapText(800, 825, 'dosis',
            `Sheep contained: ${data['sheeps']}/8`, 100).setOrigin()
        this.retry = this.add.image(800, 1025, 'retry')
            .setOrigin()
            .setScale(1.5)
            .setInteractive()
            .on('pointerover', () => {this.retry.setScale(1.7)})
            .on('pointerout', () => {this.retry.setScale(1.5)})
            .on('pointerdown', () => {
                this.retry.disableInteractive()
                this.cameras.main.fadeOut(500, 255, 255, 255)
                this.time.delayedCall(500, () => {
                    this.scene.start('game')
                })
            })
    }

    update(): void {
        for (let item of this.items) {
            item.update()
        }
    }
}
