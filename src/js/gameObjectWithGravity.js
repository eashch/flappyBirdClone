

class GameObjectWithGravity extends CollidableGameObject {
    #gravityController = null;

    constructor (imageSource, canvas) {
        super(imageSource, canvas);
        this.#gravityController = new GravityControllerForObject(0, GRAVITY);
    }

    calculatePosition(timeStamp) {
        this.setY(this.getY() + this.#gravityController.getCalculatedVerticalSpeed(timeStamp));
    }

    addVerticalSpeed(speedValue) {
        this.#gravityController.addVerticalSpeed(speedValue);
    }

    setVerticalSpeed(speedValue) {
        this.#gravityController.setVerticalSpeed(speedValue);
    }

    setGravityActive(isActive) {
        this.#gravityController.setActive(isActive);
    }

    getVerticalSpeed() {
        return this.#gravityController.getVerticalSpeed();
    }

    resetSpeed() {
        this.#gravityController.resetSpeed();
    }
}