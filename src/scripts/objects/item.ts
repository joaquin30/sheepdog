import Phaser from "phaser"

export default class Item extends Phaser.GameObjects.Image {
    up = true
    num = 0

    constructor(scene: Phaser.Scene, x: number, y: number,
        key: string, ox: number, oy: number) {
        super(scene, x, y, key)
        scene.add.existing(this)
        this.setOrigin(ox, oy)
    }

    update(): void {
        this.setScale(1 + this.num / 3000)

        if (this.up && this.num <= 150) {
            this.num += 1
        } else {
            this.up = false
            this.num -= 1

            if (this.num < 0) {
                this.up = true
                this.num += 1
            }
        }
    }
}
