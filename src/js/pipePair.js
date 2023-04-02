class PipePair {
    #up = null;
    #down = null;
    #passedMiddle = false;

    constructor(imageSource, canvas) {
        this.#up = new Pipe(imageSource, canvas, true);
        this.#down = new Pipe(imageSource, canvas, false);
        this.#setPipeWindow();
    }

    #setPipeWindow() {
        const canvasHeight = this.#up.getCanvas().height;
        const windowHeight = canvasHeight * PIPE_PAIR_WINDOW_PART;
        const windowStartPositionMin = canvasHeight 
            * PIPE_PAIR_WINDOW_PART_OFFSET_FROM_EDGES;
        
        const windowStartPositionMax = canvasHeight 
            * (1 - PIPE_PAIR_WINDOW_PART_OFFSET_FROM_EDGES) - windowHeight;

        const windowStartPosition = Math.floor(Math.random() 
            * (windowStartPositionMax - windowStartPositionMin) 
                + windowStartPositionMin);
        this.#up.setY(windowStartPosition - this.#up.getHeight());
        this.#down.setY(windowStartPosition + windowHeight);
    }

    setX(x) {
        this.#up.setX(x);
        this.#down.setX(x);
    }

    getX() {
        return this.#up.getX();
    }

    getWidth() {
        return this.#up.getWidth();
    }

    isOutOfBounds() {
        return this.#up.getX() 
                    + this.#up.getWidth() < 0;
    }

    addToX(xToAdd) {
        this.#up.addToX(xToAdd);
        this.#down.addToX(xToAdd);
    }

    draw(timeStamp) {
        this.#up.draw(timeStamp);
        this.#down.draw(timeStamp);
    }

    isCollided(collidableObj) {
        return this.#up.isCollided(collidableObj) 
                || this.#down.isCollided(collidableObj);
    }

    isJustPassedMiddle() {
        if (this.#passedMiddle)
            return false;
        if ((this.getX() + this.#up.getWidth() / 2) < this.#up.getCanvas().width / 2) {
            this.#passedMiddle = true;
            return true;
        }
        return false;
    }
};