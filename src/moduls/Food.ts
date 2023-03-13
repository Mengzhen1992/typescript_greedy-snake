class Food{
    // define an attribute to represent the element
    element: HTMLElement;
    constructor(){
        this.element = document.getElementById("food")!;
    }

    // define a method to get the x-value of the food
    get X(){
        return this.element.offsetLeft;
    }

    // define a method to get the y-value of the food
    get Y(){
        return this.element.offsetTop;
    }

    // modify the position of the food
    change(){
        // generate a random position for the food
        // the position of the food is min 0 and max 290
        // the coordinate of the food must be a multiple of 10
        let top = Math.round(Math.random() * 29) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = top + "px";
        this.element.style.top = left + "px";
    }
}

export default Food;