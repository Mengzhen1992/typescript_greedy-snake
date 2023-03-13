// import another classes
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

class GameControl{
    // define three attributes
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    // create an attribute to store the snake's movement direction, which is the direction of the key pressed
    direction: string = "";

    // create an attribute to keep track of whether the game is over
    isLive = true;

    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10,2);

        this.init();
    }

    // the game's initialization method to the game when called
    init(){
        // bind the event of pressing a keyboard key
        document.addEventListener("keydown", this.keydownHandler.bind(this));
        // call the "run" method to make snake move
        this.run();

    }

    // create a keydown event handler function
    keydownHandler(event: KeyboardEvent){
        // check if the value of "event.key" is valid and whether the correct key is pressed
        // modify the "direction" attribute
        this.direction = event.key; //event.key is the name of the key that the user pressed
    }

    // create a method to move the snake
    run(){
        //change the snake's position based on the direction
        //"top" decreases when going up
        //"top" increases when going down
        //"left" decreases when going left
        //"left" increases when going right
        //get the snake's current coordinates
        let X = this.snake.X;
        let Y = this.snake.Y;
        
        // modify the x and y values based on the direction of the key pressed
        switch(this.direction){
            case "ArrowUp":
                Y -= 10;
                break;
            case "ArrowDown":
                Y += 10;
                break;
            case "ArrowLeft":
                X -= 10;
                break;
            case "ArrowRight":
                X += 10;
                break;
        }

        // check if the snake has eaten the food
        this.checkEat(X, Y);
        

        // modify the x and y values 
        try{
            this.snake.X = X;
            this.snake.Y = Y;
        }catch (e){
            alert((e as Error).message + "GAME OVER!");
            this.isLive = false;
        }
        

        // start a setTimeout
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1)*30);

    }

    // define a method to check if the snake has eaten the food
    checkEat(X: number, Y: number){
        if(X === this.food.X && Y === this.food.Y){
            // the position of the food needs to be reset 
            this.food.change();         
            // score increases
            this.scorePanel.addScore();
            // the snake needs to add one segment
            this.snake.addBody();
        }
    }


}

export default GameControl;