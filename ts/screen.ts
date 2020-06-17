import {Ball} from './types'
export const canvas = <HTMLCanvasElement> document.getElementById('stage')
const ctx = canvas.getContext("2d");

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const drawFrameInit = (ballR: number): any => (balls: Ball[]) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    balls.forEach(ball => drawBall(ball.pos, ballR));
}

const drawBall = (ballPos: number[], ballR: number) => {
    ctx.beginPath();
    ctx.arc(ballPos[0],ballPos[1], ballR, 0, 2 * Math.PI);
    ctx.fill();
}



export default drawFrameInit