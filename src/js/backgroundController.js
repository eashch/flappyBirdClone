
class BackgroundController extends AnimatedGameObject {

    constructor(imageSource, canvas) {
        super(imageSource, canvas);
        this.addSprite(0, 0, SPRITE_BACKGROUND_WIDTH, 
            SPRITE_BACKGROUND_HEIGHT);
        this.setHeight(canvas.height * BACKGROUND_HEIGHT_AS_PART_OF_CANVAS_HEIGHT);
        const newWidth = this.getHeight() * BACKGROUND_SIZE_RATIO;
        this.setWidth(newWidth);
        this.setY(this.getCanvas().height - this.getHeight());
    }

    gameStep(timeStamp, fps) {
        if (!this.getIsActive())
            return;
        this.setX((this.getX() + BACKGROUND_SPEED / fps)
                                         % this.getWidth());
    }

    draw(timeStamp) {
        this.drawTiledByWidth(timeStamp);
    }
};