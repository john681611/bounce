import {Ball} from './types'
export const canvas = <HTMLCanvasElement> document.getElementById('stage')
const ctx = canvas.getContext("2d");


const drawFrame  = (balls: Ball[]) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    balls.forEach(ball => drawBall(ball.pos));
}

const drawBall = (ballPos: number[]) => {
    ctx.beginPath();
    ctx.arc(ballPos[0],ballPos[1], 10, 0, 2 * Math.PI);
    ctx.fill();
}



export default drawFrame