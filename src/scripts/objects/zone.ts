import Phaser from "phaser"
import { randomItem } from "../utils"

export default class Zone extends Phaser.GameObjects.Rectangle {
    readonly green1 = 0x91cb61
    readonly green2 = 0x8fd258
    bgreen = true
    cnt = 1

    constructor(scene: Phaser.Scene) {
        super(scene, 400, 400, 800, 800, 0x8fd258)
        scene.add.existing(this)
        scene.time.addEvent({
            delay: 500,
            callback: () => {
                this.setFillStyle(this.bgreen ? this.green1 : this.green2)
                this.bgreen = !this.bgreen
            },
            loop: true
        })
    }

    move() {
        let xy = randomItem([[400, 400], [400, 1200],
            [1200, 400], [1200, 1200]])

        while (this.x === xy[0] && this.y === xy[1]) {
            xy = randomItem([[400, 400], [400, 1200],
                [1200, 400], [1200, 1200]])
        }

        this.x = xy[0]
        this.y = xy[1]
    }

    rect(): Phaser.Geom.Rectangle {
        return new Phaser.Geom.Rectangle(this.x - 450, this.y - 450,
            this.width + 100, this.height + 100)
    }

    contains(rect: Phaser.Geom.Rectangle): boolean {
        return Phaser.Geom.Rectangle.ContainsRect(this.rect(), rect)
    }
}
