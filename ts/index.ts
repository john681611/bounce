import { Ball } from './types'
import drawFrameInit, { canvas } from './screen'
import ballPhysxInit from './ballPhysx'
let balls: Ball[] = []

const maxVel = 10
const maxBias = 10;
const ballR = 10;

const getCursorPosition = (canvas: HTMLCanvasElement, event: MouseEvent) => {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return [x, y]
}

canvas.addEventListener('mousedown', e => {
    balls.push({
        bias: -(maxBias/2) + Math.floor(Math.random() * maxBias) + 1,
        vel: Math.floor(Math.random() * maxVel) + 1,
        pos: getCursorPosition(canvas, e)
    })
})

export const getBalls = (): Ball[] => balls

const ctx = canvas.getContext("2d");
const ballPhysx = ballPhysxInit(ctx.canvas, ballR)
const drawFrame = drawFrameInit(ballR)
setInterval(function () {
    balls = ballPhysx(balls);
    drawFrame(balls,ballR)
}, 1000 / 60);