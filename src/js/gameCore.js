
const GameStateEnum = {
    startScreen: 0,
    pregamePause: 1,
    game: 2,
    gameOverScreen: 3,
    deleting: 4
}

class GameCore {
    #gameState = GameStateEnum.startScreen;
    #bird = null;
    #pipeController = null;
    #backgroundController = null;
    #floor = null;
    #imageSource = null;
    #audioController = null;

    #canvas = null;
    #context = null;
    #record = 0;
    #score = 0;
    #fps = 0;
    #previousTimeStamp = null;

    #startWindow = null;
    #gameOverWindow = null;
    #pregameTip = null;
    #inGameWindow = null;

    #scoreDisplay = null;
    #recordDisplays = null;

    #gameObjectsArray = [];

    constructor(canvas) {
        this.#canvas = canvas;
        this.#loadRecord();
        this.#getHTMLElements();
        
        this.#imageSource = new Image();
        this.#imageSource.src = SPRITE_SHEET_PATH;
        this.#context = this.#canvas.getContext("2d");

        const instantiateGameObject = classObj => {
            const newObj = new classObj(this.#imageSource, 
                                        this.#canvas);
            this.#gameObjectsArray.push(newObj);
            return newObj;
        }

        this.#backgroundController = instantiateGameObject(
                                        BackgroundController);
        this.#bird = instantiateGameObject(Bird);
        this.#pipeController = new PipeController(this.#imageSource, 
            this.#canvas, () => {
                this.#score++;
                this.#audioController.playAudio(SOUND_SCORE_UP);
                this.#updateScoreDisplay();
                if (this.#score % SCORE_STEP_TO_INCREASE_SPEED === 0) {
                    this.#pipeController.increaseSpeed();
                }
            });
        this.#gameObjectsArray.push(this.#pipeController);
        this.#floor = instantiateGameObject(Floor);
        
        this.#initializeAudioController();
        this.#initializeRenderer();
        this.#initializeEventListeners();

        this.#updateRecordDisplay();
        this.#switchGameState(GameStateEnum.startScreen);
    }

    #getHTMLElements() {
        this.#startWindow = document.querySelector(".div_start-window");
        this.#gameOverWindow = document.querySelector(".game-over");
        this.#pregameTip = document.querySelector(".text-tip");
        this.#inGameWindow = document.querySelector(".div_in-game");
        this.#scoreDisplay = document.querySelector(".score");
        this.#recordDisplays = document.querySelectorAll(".record");
    }

    #initializeEventListeners() {
        const body = document.querySelector(".body");
        body.addEventListener("click", this.bodyClickListener.bind(this));
        body.addEventListener("keydown", this.keyDownListener.bind(this));

        let startButton = document.querySelector(".button_start");
        startButton.addEventListener("click", this.startGame.bind(this));

        let restartButton = document.querySelector(".game-over__restart");
        restartButton.addEventListener("click", this.restartGame.bind(this));
    }

    bodyClickListener() {
        if (this.#gameState === GameStateEnum.pregamePause) {
            this.#startAfterPregamePause();
        } else if (this.#gameState === GameStateEnum.game) {
            this.#audioController.playAudio(SOUND_FLAP);
            this.#bird.flyUp(this.#fps);
        }
    }

    keyDownListener(event) {
        if (this.#gameState === GameStateEnum.game) {
            if (event.code === 'Space') {
                this.#audioController.playAudio(SOUND_FLAP);
                this.#bird.flyUp(this.#fps);
            } 
        } else if (this.#gameState === GameStateEnum.pregamePause) {
            if (event.code === 'Space') {
                this.#startAfterPregamePause();
            }
        } else if (this.#gameState === GameStateEnum.startScreen) {
            if (event.code === 'Enter') {
                this.startGame();
            }
        } else if (this.#gameState === GameStateEnum.gameOverScreen) {
            if (event.code === 'Enter') {
                this.restartGame();
            }
        }
        event.stopPropagation();
    }

    #initializeAudioController() {
        this.#audioController = new AudioController();
    }

    restartGame() {
        this.#audioController.playAudio(SOUND_BUTTON_CLICK);
        this.#pipeController.reset();
        this.#bird.reset();
        this.#setIsActive(true);
        this.#switchGameState(GameStateEnum.startScreen);
    }

    #startAfterPregamePause() {
        this.#bird.startFlying();
        this.#pipeController.startGenerationOfPipes();
        this.#switchGameState(GameStateEnum.game);
    }

    #initializeRenderer() {
        const render = (timeStamp) => {
            if (this.#gameState === GameStateEnum.deleting)
                return;
            if (!isNaN(timeStamp)) {
                this.#gameStep(timeStamp);
                this.#draw(timeStamp);
            }
            window.requestAnimationFrame(render);
        };
        
        this.#imageSource.onload = render;
    }
    
    #loadRecord() {
        const recordSaved = localStorage.getItem("record");
        if (recordSaved != null)
            this.#record = recordSaved;
    }

    #updateScoreDisplay() {
        this.#scoreDisplay.innerHTML = `${this.#score}`;
    }

    #updateRecordDisplay() {
        for (let item of this.#recordDisplays)
            item.innerHTML = `${this.#record}`;
    }

    #isNewRecord() {
        if (this.#record >= this.#score)
            return false;
        this.#record = this.#score;
        localStorage.setItem("record", this.#record);
        return true;
    }

    #gameStep(timeStamp) {
        this.#calculateFPS(timeStamp);

        this.#backgroundController.gameStep(timeStamp, this.#fps);
        this.#floor.gameStep(timeStamp, this.#fps);

        if (this.#gameState !== GameStateEnum.game)
            return;
        
        const collidedWithPipe = this.#pipeController
                                        .isCollided(this.#bird);
        const collidedWithFloor = this.#floor.isCollided(this.#bird);
        if (collidedWithPipe || collidedWithFloor) {
            this.#gameState = GameStateEnum.gameOverScreen;
            this.#finishGame();
            return;
        }
        this.#pipeController.gameStep(timeStamp, this.#fps);
        this.#bird.gameStep(timeStamp, this.#fps);  
    }

    #draw(timeStamp) {
        this.#fillWithBaseColor();
        this.#gameObjectsArray.forEach(
                    item => item.draw(timeStamp));
    }

    #setIsActive(isActive) {
        this.#gameObjectsArray.forEach(
                    item => item.setIsActive(isActive));
    }

    startGame() {
        this.#audioController.playAudio(SOUND_BUTTON_CLICK);
        this.#score = 0;
        this.#updateScoreDisplay();
        this.#updateRecordDisplay();
        this.#switchGameState(GameStateEnum.pregamePause);
    }

    #finishGame() {
        this.#switchGameState(GameStateEnum.gameOverScreen);
        this.#audioController.playAudio(SOUND_GAME_OVER);
        this.#bird.stopFlying();
        this.#setIsActive(false);
        const scoreItem = document.querySelector(".game-over__score");

        const isNewRecord = this.#isNewRecord();
        const isBlinking = scoreItem.classList.contains("blink");
        scoreItem.innerHTML = `${this.#score}${isNewRecord
                                        ? " (New record!)" : ""}`;
        if (isBlinking && !isNewRecord)
            scoreItem.classList.remove("blink");
        
        if (!isBlinking && isNewRecord)
            scoreItem.classList.add("blink");
        this.#updateRecordDisplay();
    }

    clear() {
        this.#gameState = GameStateEnum.deleting;

        const body = document.querySelector(".body");
        body.removeEventListener("click", this.bodyClickListener);
        body.removeEventListener("keydown", this.keyDownListener);

        let startButton = document.querySelector(".button_start");
        startButton.removeEventListener("click", this.startGame);

        let restartButton = document.querySelector(".game-over__restart");
        restartButton.removeEventListener("click", this.restartGame);
    }

    #calculateFPS(timeStamp) {
        if (this.#previousTimeStamp)
            this.#fps = 1000 / (timeStamp - this.#previousTimeStamp);
        else 
            this.#fps = 1;
        this.#previousTimeStamp = timeStamp;
    }

    #switchGameState (newState) {
        const setVisible = (item, isVisible, 
                            displayVisible = "flex") => {
            item.style.display = isVisible 
                                ? displayVisible : "none";            
        }

        setVisible(this.#startWindow, 
            newState === GameStateEnum.startScreen);
        setVisible(this.#gameOverWindow, 
            newState === GameStateEnum.gameOverScreen);

        setVisible(this.#pregameTip, 
            newState === GameStateEnum.game 
                            || newState === GameStateEnum.pregamePause);
        this.#pregameTip.style.opacity = newState 
                                        === GameStateEnum.pregamePause ? 1 : 0;
        setVisible(this.#inGameWindow,
            newState === GameStateEnum.game 
                            || newState === GameStateEnum.pregamePause);
        this.#gameState = newState;
    }

    #fillWithBaseColor() {
        this.#context.fillStyle = "#4EC0CC";
        this.#context.fillRect(0, 0, 
                                this.#canvas.width, 
                                this.#canvas.height);
    }
}