
class AnimatedGameObject extends Rect {
    #currentSpriteID = null;
    #currentSprite = null;
    #spriteArray = [];
    #canvasPainter = null;
    #isActive = true;

    #animationSpeedms = 1000;
    #lastTimeStamp = 0;
    #deltaTimeStamp = 0;
    #isAnimated = false;

    constructor (imageSource, canvas) {
        super();
        this.#canvasPainter = new CanvasPainter(imageSource, canvas);  
    }

    setAnimationSpeed(animationSpeedms) {
        this.#animationSpeedms = animationSpeedms;
    }

    setAnimated(isAnimated) {
        this.#isAnimated = isAnimated;
    }

    addSprite(sheetX, sheetY, sheetWidth, 
                    sheetHeight, resizeToSprite = true) {
        this.#spriteArray.push(new Rect(sheetX, sheetY, 
                                        sheetWidth, sheetHeight));
        if (this.#spriteArray.length === 1)
            this.#currentSpriteID = 0;
            this.#currentSprite = this.#spriteArray[this.#currentSpriteID];
            this.#canvasPainter.setRectInSpriteSheet(
                this.#currentSprite.getRectData());
        if (resizeToSprite) {
            this.setWidth(sheetWidth);
            this.setHeight(sheetHeight);
        }
    }

    setNextSprite() {
        this.#currentSpriteID = (this.#currentSpriteID + 1) 
                                    % this.#spriteArray.length;
        this.#currentSprite = this.#spriteArray[this.#currentSpriteID];
        this.#canvasPainter.setRectInSpriteSheet(
            this.#currentSprite.getRectData());
    }

    #checkForSwitchingSprite(timeStamp) {
        if (this.#lastTimeStamp === 0) {
            this.#lastTimeStamp = timeStamp;
        }

        if (this.#isAnimated) {
            this.#deltaTimeStamp += timeStamp - this.#lastTimeStamp;
            this.#lastTimeStamp = timeStamp;
            if (this.#deltaTimeStamp >= this.#animationSpeedms) {
                this.#deltaTimeStamp = 0;
                this.setNextSprite();
            }
        }
    }

    draw(timeStamp) {
        if (this.#currentSpriteID === null)
            return;
        this.#checkForSwitchingSprite(timeStamp);
        this.#canvasPainter.draw(this.getRectData());
    }

    drawRotated(timeStamp, angleDegrees) {
        if (this.#currentSpriteID === null)
            return;
        this.#checkForSwitchingSprite(timeStamp);
        this.#canvasPainter.drawRotated(this.getRectData(), 
                                        angleDegrees);
    }

    drawTiledByWidth(timeStamp) {
        if (this.#currentSpriteID === null)
            return;
        this.#checkForSwitchingSprite(timeStamp);
        this.#canvasPainter.drawTiledByWidth(this.getRectData());
    }

    getCanvas() {
        return this.#canvasPainter.getCanvas();
    }

    clampYToCanvas() {
        const y = this.getY();
        this.setY(Math.min(Math.max(y, 0), 
                        this.#canvasPainter.getCanvas().height 
                        - this.getHeight()));
    }

    getContext() {
        return this.#canvasPainter.getContext();
    }

    getImageSource() {
        return this.#canvasPainter.getImageSource();
    }

    gameStep(timeStamp, fps) {

    }

    setIsActive(isActive) {
        this.#isActive = isActive;
    }

    getIsActive() {
        return this.#isActive;
    }
}