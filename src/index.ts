//引入样式
import "./style/index.less";
import Food from "./moduls/Food";
import ScorePanel from "./moduls/ScorePanel";

// test
const food = new Food();
console.log(food.X, food.Y);
food.change();
console.log(food.X, food.Y);

// test
const scorePanel = new ScorePanel(100, 2);
for(let i = 0; i < 200; i++){
    scorePanel.addScore();
} 