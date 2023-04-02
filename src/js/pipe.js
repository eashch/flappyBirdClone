
class Pipe extends CollidableGameObject {
    constructor (imageSource, canvas, isTop) {
        super(imageSource, canvas);
        this.setX(canvas.width - 10);
        this.addSprite(isTop ? SPRITE_PIPE_TOP_X 
                                : SPRITE_PIPE_BOTTOM_X, 
                        SPRITE_PIPE_Y, 
                        SPRITE_PIPE_WIDTH, 
                        SPRITE_PIPE_HEIGHT);
        this.setWidth(canvas.height * PIPE_WIDTH_AS_PART_OF_CANVAS_HEIGHT);
        this.setHeight(canvas.height * PIPE_HEIGHT_AS_PART_OF_CANVAS_HEIGHT);
        this.setY(isTop ? -canvas.height / 2 - 30 
                            : canvas.height / 2 + 30);
        this.setCollidePaddings(2, 4, 2, 4);
    }
};