import Phaser from 'phaser'
import Dog from '../objects/dog'
import { Sheep, createSheeps } from '../objects/sheep'
import Zone from '../objects/zone'
import FPS from '../objects/fps'
import UI from '../objects/ui'

export default class Game extends Phaser.Scene {
    dog: Dog
    sheeps: Sheep[]
    keys: object
    rect: Phaser.GameObjects.Rectangle
    zone: Zone
    fps: FPS
    ui: UI
    ended: boolean
    circle: Phaser.GameObjects.Image

    constructor() {
        super('game')
    }

    create(): void {
        this.ended = false
        this.cameras.main.fadeIn(500, 255, 255, 255)
        this.add.rectangle(800, 800, 1600, 1600, 0x099834)
        this.zone = new Zone(this)
        this.circle = this.add.image(800, 800, 'bzone')
            .setOrigin()
            .setScale(0.83)
        this.dog = new Dog(this)
        this.sheeps = createSheeps(this)
        this.physics.add.collider(this.sheeps, this.sheeps)
        this.keys = this.input.keyboard.addKeys('W,A,S,D,SPACE')
        this.time.delayedCall(5000, () => {
            this.time.addEvent({
                callback: () => {
                    for (let i = 0; i < this.sheeps.length;) {
                        if (!this.zone.contains(this.sheeps[i].rect())) {
                            this.sheeps[i].bleat()
                            this.sheeps[i].destroy()
                            this.sheeps.splice(i, 1)
                        } else {
                            i += 1
                        }
                    }

                    if (this.sheeps.length === 0) {
                        this.end()
                    }

                    this.zone.move()
                },
                delay: 10000,
                repeat: 7
            })
        })
        this.keys['SPACE'].onDown = () => {
            this.dog.bark()
            this.circle.setFrame(1)

            for (let sheep of this.sheeps) {
                sheep.move(this.dog.getCenter())
            }
        }
        this.keys['SPACE'].onUp = () => {
            this.circle.setFrame(0)
        }
        this.ui = new UI(this)
        this.time.delayedCall(85000, () => {this.end()})
        let txt1 = this.add.bitmapText(800, 400, 'dosis',
            'Take the sheep\nto this area', 100, 1)
            .setOrigin()
        let arrow = this.add.image(400, 400, 'arrow')
            .setScale(0.4)
            .setOrigin()
        let txt2 = this.add.bitmapText(800, 1200, 'dosis',
            'Press SPACE\nto bark', 100, 1)
            .setOrigin()
        this.time.delayedCall(5000, () => {
            txt1.destroy()
            txt2.destroy()
            arrow.destroy()
        })

        if (this.game.config.physics.arcade?.debug)
            this.fps = new FPS(this)
    }

    update(): void {
        this.circle.x = this.dog.x;
        this.circle.y = this.dog.y;
        let x = 0, y = 0

        if (this.keys['D'].isDown) {
            x = 1
        } else if (this.keys['A'].isDown) {
            x = -1
        }

        if (this.keys['W'].isDown) {
            y = -1
        } else if (this.keys['S'].isDown) {
            y = 1
        }

        this.dog.setVel(x, y);

        for (let sheep of this.sheeps) {
            sheep.rotate()
        }

        if (this.game.config.physics.arcade?.debug) {
            this.fps.update()
        }
    }

    end(): void {
        if (this.ended) {
            return
        }

        this.time.delayedCall(2000, () => {
            this.cameras.main.fadeOut(500, 255, 255, 255)
            this.time.delayedCall(500, () => {
                this.scene.start('gameover', {
                    'sheeps': this.sheeps.length,
                    'rounds': this.sheeps.length > 0 ? 8
                        : 8 - this.ui.ix_circles - 2
                })
            })
        })
        this.ended = true
    }
}
