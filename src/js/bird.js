
class Bird extends GameObjectWithGravity {

    constructor (imageSource, canvas) {
        super(imageSource, canvas);
        this.addSprite(SPRITE_BIRD_X, SPRITE_BIRD_FLAP_1_Y, 
                        SPRITE_BIRD_WIDTH, SPRITE_BIRD_HEIGHT);
        this.addSprite(SPRITE_BIRD_X, SPRITE_BIRD_FLAP_2_Y, 
                        SPRITE_BIRD_WIDTH, SPRITE_BIRD_HEIGHT);
        this.addSprite(SPRITE_BIRD_X, SPRITE_BIRD_FLAP_3_Y, 
                        SPRITE_BIRD_WIDTH, SPRITE_BIRD_HEIGHT);
        this.setAnimationSpeed(BIRD_ANIMATION_SPEED_MS);
        this.setAnimated(true);

        this.setHeight(canvas.height * (PIPE_PAIR_WINDOW_PART 
                                    * BIRD_HEIGHT_AS_PART_OF_PIPE_WINDOW));
        const newWidth = this.getHeight() * BIRD_SIZE_RATIO;
        this.setWidth(newWidth);
        this.setCollidePaddings(8, 8, 8, 8);
        this.setGravityActive(false);
        this.reset();
    }

    resetPosition() {
        const canvas = this.getCanvas();
        this.setX(canvas.width / 2 - this.getWidth() / 2);
        this.setY(canvas.height / 2 - this.getHeight() / 2);
    }

    gameStep(timeStamp, fps) {
        if (!this.getIsActive())
            return;
        this.calculatePosition(timeStamp);
        this.clampYToCanvas();
    }

    draw(timeStamp) {
        super.drawRotated(timeStamp, 
            this.#getRotationAngleDegreesByVerticalSpeedValue());        
    }

    startFlying() {
        this.resetSpeed();
        this.setGravityActive(true);
    }

    stopFlying() {
        this.setAnimated(false);
        this.setGravityActive(false);
    }

    flyUp(fps) {
        this.setVerticalSpeed(BIRD_FLY_UP_SPEED * (FPS_BASE / fps));
    }

    #getRotationAngleDegreesByVerticalSpeedValue() {
        return Math.min(Math.max(this.getVerticalSpeed() 
                                    * BIRD_DUCK_FROM_SPEED_MODIFIER, 
                                    -BIRD_DUCK_ANGLE_MAX), 
                                        BIRD_DUCK_ANGLE_MAX);
    }

    reset() {
        this.resetPosition();
        this.resetSpeed();
        this.setAnimated(true);
    }
};