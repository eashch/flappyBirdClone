class GravityControllerForObject {
    #gravityValue = 0;
    #currentTime = 0;
    #speed = 0;
    #isActive = true;

    constructor(initialSpeed, gravityValue) {
        this.#gravityValue = gravityValue;
        this.#speed = initialSpeed;
    }

    getCalculatedVerticalSpeed(timeStamp) {
        if (!this.#isActive)
            return this.#speed;
        if (this.#currentTime === 0) {
            this.#currentTime = timeStamp;
            return this.#speed;
        }
        const deltaTime = timeStamp - this.#currentTime;
        const fps = 1000 / deltaTime;
        this.#speed += this.#gravityValue / fps;
        this.#currentTime = timeStamp;
        return this.#speed;
    }

    resetSpeed() {
        this.#speed = 0;
        this.#currentTime = 0;
    }

    addVerticalSpeed(speedValue) {
        this.#speed += speedValue;
    }
    
    setVerticalSpeed(speedValue) {
        this.#speed = speedValue;
    }

    setActive(isActive) {
        this.#isActive = isActive;
    }

    getVerticalSpeed() {
        return this.#speed;
    }
}