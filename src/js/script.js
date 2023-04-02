
const canvasRegular = document.getElementById("canvas");
const canvasSmallScreen = document.getElementById("canvasSmallScreen");
let gameCore = null;
let currentCanvas = null;

window.onresize = () => {
    const width = document.documentElement.clientWidth 
                        || document.body.clientWidth;
    let newCanvas = width > 1024 
                        ? canvasRegular 
                        : canvasSmallScreen;
    if (newCanvas !== currentCanvas) {
        currentCanvas = newCanvas;
        if (gameCore !== null)
            gameCore.clear();
        gameCore = new GameCore(currentCanvas);
    }
}
window.onresize();