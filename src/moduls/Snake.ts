class Snake{
    head: HTMLElement;
    bodies: HTMLCollection;
    element: HTMLElement;

    constructor(){
        this.element = document.getElementById("snake")!;
        this.head = document.querySelector("#snake > div") as HTMLElement; //type assertion
        this.bodies = this.element.getElementsByTagName("div");
    }

    //get the coordinates of the snake head
    get X(){
        return this.head.offsetLeft;
    }

    get Y(){
        return this.head.offsetTop;
    }

    // set the position of the snake's head
    set X(value:number){
        // return directly without modification if the new value is the same as the old value
        if(this.X === value){
            return;
        }
        // the value of x is within the valid range of 0 to 290
        if(value < 0 || value > 290){
            // enter the judgment indicates that the snake has hit the wall
            throw new Error("the snake has hit the wall!")
        }

        // when the snake is moving left, it cannot turn right 
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            // if a U-turn happens, let the snake continue moving in the opposite direction
            if(value > this.X){
                // if the new value is greater than the old value x, it means the snake is moving right and turning back. In this case, the snake should continue moving left
                value = this.X - 10;
            }else{
                // move left
                value = this.X + 10;
            }
        }

        
        // move body
        this.moveBody();
        this.head.style.left = value + "px";
        // check if the snake has collided with itself
        this.checkHeadBody();
    }

    set Y(value:number){
        // if the new value is the same as the old value, return directly without making any modifications
        if(this.Y === value){
            return;
        }
        // the value of y is within the valid range of 0 to 290
        if(value < 0 || value > 290){
            throw new Error("the snake has hit the wall!")
        }

        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            if(value > this.Y){
                value = this.Y - 10;
            }else{
                value = this.Y + 10;
            }
        }

        
        this.moveBody();
        this.head.style.top = value + "px";
        this.checkHeadBody();
    }

    addBody(){
        this.element.insertAdjacentHTML("beforeend","<div></div>");
    }

    moveBody(){
        // Set the position of the following body segment to the position of the preceding body segment
        
        for(let i=this.bodies.length - 1; i > 0; i--){
            
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;

            
            (this.bodies[i] as HTMLElement).style.left = X + "px";
            (this.bodies[i] as HTMLElement).style.top = Y + "px";

        }
    }
    
    
    checkHeadBody(){
        // get all body and check if they overlap with the coordinates of the snake's head
        for(let i = 1; i < this.bodies.length; i++){
            let bd = this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                throw new Error("Hit the body!")
            }
        }
    }

}

export default Snake;