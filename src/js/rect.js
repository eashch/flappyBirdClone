class Rect {
    #x = 0;
    #y = 0;
    #width = 0;
    #height = 0;

    constructor (x = 0, y = 0, width = 0, height = 0) {
        this.#x = x;
        this.#y = y;
        this.#width = width;
        this.#height = height;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    getRectData() {
        return {
            x: this.#x,
            y: this.#y,
            width: this.#width,
            height: this.#height
        };
    }

    setWidth(width) {
        this.#width = width;
    }

    setHeight(height) {
        this.#height = height;
    }

    setX(x) {
        this.#x = x;
    }

    setY(y) {
        this.#y = y;
    }

    addToX(xToAdd) {
        this.#x += xToAdd;
    }
};