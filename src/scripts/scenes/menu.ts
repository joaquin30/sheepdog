import Phaser from 'phaser'
import { randomItem } from '../utils'
import Item from '../objects/item'

export default class Menu extends Phaser.Scene {
    play: Phaser.GameObjects.Image
    barks: Phaser.Sound.BaseSound[] = []
    wasd: object = {}
    space: Phaser.GameObjects.Image
    keys: object
    items: Item[]

    constructor() {
        super('menu')
    }

    createKey(x: number, y: number, key: string): void {
        if (key.length <= 1) {
            this.wasd[key] = this.add.image(x, y, 'wasd').setOrigin()
        } else {
            this.wasd[key] = this.add.image(x, y, 'space').setOrigin()
        }

        this.add.bitmapText(x, y, 'dosis', key, 75).setOrigin()
    }

    create(): void {
        this.cameras.main.fadeIn(1000)
        this.add.image(800, 800, 'bg1')
        this.items = [
            new Item(this, 0, 0, 'cloud1', 0, 0),
            new Item(this, 1600, 0, 'sun1', 1, 0),
            new Item(this, 1600, 1600, 'ground2', 1, 1),
            new Item(this, 0, 1600, 'ground1', 0, 1)
        ]
        this.createKey(850, 1450, 'SPACE')
        this.createKey(300, 1300, 'W')
        this.createKey(150, 1450, 'A')
        this.createKey(300, 1450, 'S')
        this.createKey(450, 1450, 'D')
        this.keys = this.input.keyboard.addKeys('W,A,S,D,SPACE')
        this.play = this.add.image(1300, 700, 'play')
            .setScale(1.5)
            .setInteractive()
            .on('pointerover', () => {this.play.setScale(1.7)})
            .on('pointerout', () => {this.play.setScale(1.5)})
            .on('pointerdown', () => {
                this.play.disableInteractive()
                this.cameras.main.fadeOut(500, 255, 255, 255)
                this.time.delayedCall(500, () => {
                    this.scene.start('game')
                })
            })
        this.barks.push(this.sound.add('bark1'))
        this.barks.push(this.sound.add('bark2'))
        this.barks.push(this.sound.add('bark3'))
        this.keys['SPACE'].onDown = () => {
            randomItem(this.barks).play()
            this.wasd['SPACE'].setFrame(1)
        }
        this.keys['SPACE'].onUp = () => {
            this.wasd['SPACE'].setFrame(0)
        }
        this.add.bitmapText(700, 1300, 'dosis',
            'Try the controls!', 75).setOrigin()
    }

    update(): void {
        this.wasd['W'].setFrame(this.keys['W'].isDown ? 1 : 0)
        this.wasd['A'].setFrame(this.keys['A'].isDown ? 1 : 0)
        this.wasd['S'].setFrame(this.keys['S'].isDown ? 1 : 0)
        this.wasd['D'].setFrame(this.keys['D'].isDown ? 1 : 0)

        for (let item of this.items) {
            item.update()
        }
    }
}
