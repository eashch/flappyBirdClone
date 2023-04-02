
class PipeController {
    #canvas = null;
    #imageSource = null;
    #pipePairsArray = [];
    #generatingNewPipes = false;
    #lastTimeStamp = 0;
    #deltaTimeStamp = 0;
    #timeBetweenSpawnsms = PIPE_PAIR_SPAWN_INTERVAL_MS;
    #onPassingPipeWindow = null;
    #isActive = true;
    #speed = 0;
    #speedInitial = 0;

    constructor(imageSource, canvas, onPassingPipeWindow) {
        this.#imageSource = imageSource;
        this.#canvas = canvas;
        this.#onPassingPipeWindow = onPassingPipeWindow;
        this.#speedInitial = this.#canvas.height * PIPE_PAIR_X_SPEED;
        this.#speed = this.#speedInitial;
    }

    gameStep(timeStamp, fps) {
        if (!this.#isActive)
            return;
        this.#checkForNewPipePair(timeStamp);
        this.#checkForPassingPipeWindow();
        this.#movePipesAndDeleteOutOfBounds(fps);
    }

    draw(timeStamp) {
        this.#pipePairsArray.forEach(item => {
            item.draw(timeStamp);
        });
    }

    isCollided(collidableObj) {
        if (!this.#pipePairsArray.length)
            return false;
        let isCollided = false;
        this.#pipePairsArray.forEach(item => {
            if (item.isCollided(collidableObj))
                isCollided = true;
        });
        return isCollided;
    }

    startGenerationOfPipes() {
        this.#generatingNewPipes = true;
    }

    stopGenerationOfPipes() {
        this.#generatingNewPipes = false;
    }

    #checkForNewPipePair(timeStamp) {
        if (!this.#generatingNewPipes)
            return;
        if (this.#lastTimeStamp === 0) {
            this.#lastTimeStamp = timeStamp;
        }
        this.#deltaTimeStamp += timeStamp - this.#lastTimeStamp;
        this.#lastTimeStamp = timeStamp;
        if (this.#deltaTimeStamp >= this.#timeBetweenSpawnsms) {
            this.#deltaTimeStamp = 0;
            this.#pipePairsArray.push(
                new PipePair(this.#imageSource, this.#canvas));
        }
    }

    #checkForPassingPipeWindow() {
        this.#pipePairsArray.forEach(item => {
            if (item.isJustPassedMiddle())
                this.#onPassingPipeWindow();
        });
    }

    #movePipesAndDeleteOutOfBounds(fps) {
        if (this.#pipePairsArray.length === 0)
            return;
        
        if (this.#pipePairsArray[0].isOutOfBounds())
            this.#pipePairsArray.shift();

        this.#pipePairsArray.forEach(item => {
            item.addToX(this.#speed / fps);
        });
    }

    reset() {
        this.#pipePairsArray = [];
    }

    setIsActive(isActive) {
        this.#isActive = isActive;
    }

    increaseSpeed() {
        if ((this.#speed / this.#speedInitial) > PIPE_PAIR_SPEED_CAP)
            return;
        this.#timeBetweenSpawnsms /= PIPE_PAIR_GENERATION_INCREASE;
        this.#speed *= PIPE_PAIR_GENERATION_INCREASE;
    }
}