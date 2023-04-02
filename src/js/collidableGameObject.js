
class CollidableGameObject extends AnimatedGameObject {
    #collidePaddingTop = 0;
    #collidePaddingBottom = 0;
    #collidePaddingLeft = 0;
    #collidePaddingRight = 0;

    constructor (imageSource, canvas) {
        super(imageSource, canvas);
    }

    isCollided(otherCollidable) {
        const rect1 = this.getCollideRectData();
        const rect2 = otherCollidable.getCollideRectData();
        const isCollided = ((rect1.x < rect2.x + rect2.width) 
                                && (rect1.x + rect1.width > rect2.x) 
                                && (rect1.y < rect2.y + rect2.height) 
                                && (rect1.height + rect1.y > rect2.y));
        return isCollided;
    }
    
    setCollidePaddings(top, right, bottom, left) {
        this.#collidePaddingTop = top;
        this.#collidePaddingBottom = bottom;
        this.#collidePaddingLeft = left;
        this.#collidePaddingRight = right;
    }

    drawCollideRect() {
        const rect1 = this.getCollideRectData();
        const ctx = this.getContext();
        ctx.fillStyle = "#00ffff";
        ctx.fillRect(rect1.x, 
            rect1.y, 
            rect1.width, 
            rect1.height);
    }

    getCollideRectData() {
        const rect = this.getRectData();
        rect.x += this.#collidePaddingLeft;
        rect.width -= (this.#collidePaddingLeft 
                            + this.#collidePaddingRight);
        rect.y += this.#collidePaddingTop;
        rect.height -= (this.#collidePaddingTop 
            + this.#collidePaddingBottom);
        return rect;
    }
};