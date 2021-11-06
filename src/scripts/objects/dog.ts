import Phaser from 'phaser'
import { randomItem } from '../utils';

export default class Dog extends Phaser.Physics.Arcade.Sprite {
    readonly speed = 600
    readonly speedxy = 600 * Math.sqrt(2)
    barks: Phaser.Sound.BaseSound[] = []

    constructor(scene: Phaser.Scene) {
        super(scene, 800, 800, 'dog')
        this.setOrigin()
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.play('anim_dog')
        this.body.setSize(50, 50)
        this.body.setOffset(15, 112.5)
        this.setCollideWorldBounds()
        this.barks.push(scene.sound.add('bark1'))
        this.barks.push(scene.sound.add('bark2'))
        this.barks.push(scene.sound.add('bark3'))
    }

    setVel(x: number, y: number): void {
        x = x > 0 ? 1 : (x < 0 ? -1 : 0)
        y = y > 0 ? 1 : (y < 0 ? -1 : 0)
        this.setVelocity(x * this.speed, y * this.speed)

        if (x !== 0 && y == 0) {
            this.setVelocityX(x * this.speedxy)
        } else if (y !== 0 && x == 0) {
            this.setVelocityY(y * this.speedxy)
        }

        if (x > 0) {
            this.angle = 90
        } else if (x < 0) {
            this.angle = 270
        }

        if (y < 0) {
            this.angle = 360

            if (x > 0) {
                this.angle += 45
            } else if (x < 0) {
                this.angle -= 45
            }
        } else if (y > 0) {
            this.angle = 180

            if (x > 0) {
                this.angle -= 45
            } else if (x < 0) {
                this.angle += 45
            }
        }
    }

    bark(): void {
        randomItem(this.barks).play()
    }
}
