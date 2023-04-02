class Floor extends CollidableGameObject {

    constructor(imageSource, canvas) {
        super(imageSource, canvas);
        this.addSprite(SPRITE_FLOOR_X, 
                        SPRITE_FLOOR_Y, 
                        SPRITE_FLOOR_WIDTH, 
                        SPRITE_FLOOR_HEIGHT);
        this.setY(this.getCanvas().height - FLOOR_Y_OFFSET_FROM_BOTTOM);
        this.setCollidePaddings(2, -canvas.width, 0, 0);
    }

    gameStep(timeStamp, fps) {
        if (!this.getIsActive())
            return;
        this.setX((this.getX() + FLOOR_SPEED / fps)
                                         % this.getWidth());
    }

    draw(timeStamp) {
        this.drawTiledByWidth(timeStamp);
    }
};