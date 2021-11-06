import Phaser from "phaser";

export default class UI extends Phaser.GameObjects.BitmapText {
    cnt = 9;
    circles: Phaser.GameObjects.Image[] = []
    ix_circles = 7

    constructor(scene: Phaser.Scene) {
        super(scene, 800, 800, 'dosis','10', 300);
        scene.add.existing(this);
        this.setOrigin();
        this.visible = false;

        for (let i = 0; i < 8; i += 1) {
            this.circles.push(scene.add.image
                (575 + 150 * (i % 4), (i < 4 ? 1525 : 75), 'circle'))
        }

        scene.time.delayedCall(5000, () => {
            this.visible = true;
            scene.time.addEvent({
                repeat: 7,
                delay: 10000,
                callback: () => {
                    this.circles[this.ix_circles].setFrame(1)
                    this.ix_circles -= 1
                }
            })
            scene.time.addEvent({
                loop: true,
                delay: 1000,
                callback: () => {
                    this.setText(this.cnt.toString());
                    this.cnt -= 1;
                    if (this.cnt == 0) {
                        this.cnt = 10
                    }
                }
            });
        })
    }
}
