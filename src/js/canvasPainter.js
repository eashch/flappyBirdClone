class CanvasPainter {
    #canvas = null;
    #context = null;
    #imageSource = null;
    #rectInSpriteSheet = null;

    constructor (imageSource, canvas) {
        this.#canvas = canvas;
        this.#context = this.#canvas.getContext("2d");
        this.#imageSource = imageSource;
    }

    setRectInSpriteSheet(rectInSpriteSheet) {
        this.#rectInSpriteSheet = rectInSpriteSheet;
    }

    draw(rectDestination) {
        this.#context.drawImage(
            this.#imageSource,
        
            this.#rectInSpriteSheet.x,
            this.#rectInSpriteSheet.y,
            this.#rectInSpriteSheet.width,
            this.#rectInSpriteSheet.height,
        
            rectDestination.x,
            rectDestination.y,
            rectDestination.width,
            rectDestination.height
        );
    }

    drawRotated(rectDestination, angleDegrees) {
        const x = rectDestination.x + rectDestination.width / 2;
        const y = rectDestination.y + rectDestination.height / 2;
        const angleRads = angleDegrees * ANGLE_DEGREES_TO_RADIANS_TRANSFORM;
        const xRot = x * Math.cos(angleRads) 
                    + y * Math.sin(angleRads);
        const yRot = -x * Math.sin(angleRads) 
                    + y * Math.cos(angleRads);
        this.getContext().rotate(angleRads);
        this.#context.drawImage(
            this.#imageSource,
        
            this.#rectInSpriteSheet.x,
            this.#rectInSpriteSheet.y,
            this.#rectInSpriteSheet.width,
            this.#rectInSpriteSheet.height,
        
            xRot - rectDestination.width / 2,
            yRot - rectDestination.height / 2,
            rectDestination.width,
            rectDestination.height
        );
        this.getContext().rotate(-angleRads);
    }

    drawTiledByWidth(rectDestination) {
        let canvasWidth = this.#canvas.width - rectDestination.x;
        while (canvasWidth > 0) {
            this.draw(rectDestination);
            rectDestination.x += rectDestination.width;
            canvasWidth -= rectDestination.width;
        }
    }

    getCanvas() {
        return this.#canvas;
    }

    getContext() {
        return this.#context;
    }

    getImageSource() {
        return this.#imageSource;
    }
};