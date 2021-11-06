import Phaser from 'phaser'
import { randomItem, randomRange, rad2Deg } from '../utils'

export class Sheep extends Phaser.Physics.Arcade.Sprite {
    readonly speed = 140
    readonly speedxy = 140 * Math.sqrt(2)
    bleats: Phaser.Sound.BaseSound[] = []

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'sheep')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setSize(70, 70)
        this.body.setOffset(15, 66)
        this.play({
            key: 'anim_sheep',
            frameRate: randomRange(15, 25)
        })
        this.setBounce(1, 1)
        this.setCollideWorldBounds()
        this.bleats.push(scene.sound.add('bleat1'))
        this.bleats.push(scene.sound.add('bleat2'))
        this.bleats.push(scene.sound.add('bleat3'))
    }

    bleat(): void {
        randomItem(this.bleats).play()
    }

    setVel(x: number, y: number): void {
        if (x === 0 && y === 0) {
            let tmp = [-1, 0 , 1]
            let i = randomRange(0, 2);
            this.setVel(tmp[i], tmp[(i+1)%3])
            return
        }

        x = x > 0 ? 1 : (x < 0 ? -1 : 0)
        y = y > 0 ? 1 : (y < 0 ? -1 : 0)
        this.setVelocity(x * this.speed, y * this.speed)

        if (x !== 0 && y == 0) {
            this.setVelocityX(x * this.speedxy)
        } else if (y !== 0 && x == 0) {
            this.setVelocityY(y * this.speedxy)
        }
    }

    rotate() {
        let x = this.body.velocity.x
        let y = this.body.velocity.y
        this.setVel(x, y)

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

    move(pos: Phaser.Math.Vector2): void {
        if (Phaser.Math.Distance.
            BetweenPoints(this.getCenter(), pos) > 250) {
            return
        }

        this.bleat()
        let a = rad2Deg(Phaser.Math.Angle.Normalize(
            Phaser.Math.Angle.BetweenPoints(this.getCenter(), pos)
        ))

        if ((a >= 0 && a <= 20) || (a >= 340 && a <= 360)) {
            this.setVel(-1, 0)
        } else if (a > 20 && a < 70) {
            this.setVel(-1, -1)
        } else if (a >= 70 && a <= 110) {
            this.setVel(0, -1)
        } else if (a > 110 && a < 160) {
            this.setVel(1, -1)
        } else if (a >= 160 && a <= 200) {
            this.setVel(1, 0)
        } else if (a > 200 && a < 250) {
            this.setVel(1, 1)
        } else if (a >= 250 && a <= 290) {
            this.setVel(0, 1)
        } else if (a > 290 && a < 340) {
            this.setVel(-1, 1)
        }

        this.rotate()
    }

    rect(): Phaser.Geom.Rectangle {
        return new Phaser.Geom.Rectangle(
            this.body.x,
            this.body.y,
            this.body.width,
            this.body.height
        )
    }
}

export function createSheeps(scene: Phaser.Scene): Sheep[] {
    let sheeps: Sheep[] = []

    for (let i = 0; i < 9; i += 1) {
        if (i === 4) {
            continue
        }

        let tmp = new Sheep(scene, 600 + 200 * (i % 3),
            600 + 200 * Math.floor(i / 3))
        tmp.setOrigin()
        tmp.setVel(0, 0)
        sheeps.push(tmp)
    }

    return sheeps
}
