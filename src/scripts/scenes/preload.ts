import Phaser from 'phaser'

export default class Preload extends Phaser.Scene {
    constructor() {
        super('preload')
    }

    loadImg(str: string) : void {
        this.load.image(str, `assets/img/${str}.webp`)
    }

    loadSpr(str: string, w: number, h: number) : void {
        this.load.spritesheet(str, `assets/img/${str}.webp`,
            {frameWidth: w, frameHeight: h})
    }

    loadSnd(str: string) : void {
        this.load.audio(str, `assets/snd/${str}.ogg`)
    }

    loadFnt(str: string) : void {
        this.load.bitmapFont(str,
            `assets/fnt/${str}.webp`,
            `assets/fnt/${str}.xml`)
    }

    preload(): void {
        this.loadFnt('dosis')
        this.loadSpr('dog', 80, 275)
        this.loadSpr('sheep', 100, 202)
        this.loadSpr('circle', 50, 50)
        this.loadSpr('wasd', 150, 150)
        this.loadSpr('space', 450, 150)
        this.loadSpr('bzone', 600, 600)
        let img = ['play', 'retry', 'bg1', 'bg2', 'ground1', 'ground2',
            'ground3', 'ground4', 'cloud1', 'cloud2', 'sun1', 'sun2', 'arrow']

        for (let i of img) {
            this.loadImg(i)
        }

        let snd = ['bark1', 'bark2', 'bark3', 'barks', 'bleat1', 'bleat2',
            'bleat3', 'bach']

        for (let i of snd) {
            this.loadSnd(i)
        }
    }

    create() {
        this.sound.play('bach', {
            loop: true
        })
        this.anims.create({
            key: 'anim_dog',
            frames: 'dog',
            repeat: -1,
            frameRate: 20
        })
        this.anims.create({
            key: 'anim_sheep',
            frames: 'sheep',
            repeat: -1,
            frameRate: 20
        })
        this.scene.start('menu')
    }
}
