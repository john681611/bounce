import { Ball } from './types'
import drawFrame, { canvas } from './screen'
import ballPhysx from './ballPhysx'
let balls: Ball[] = []

const getCursorPosition = (canvas: HTMLCanvasElement, event: any) => {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return [x, y]
}

canvas.addEventListener('mousedown', e => {
    balls.push({
        bias: -5 + Math.floor(Math.random() * 10) + 1,
        vel: Math.floor(Math.random() * 10) + 1,
        pos: getCursorPosition(canvas, e)
    })
})

export const getBalls = (): Ball[] => balls

setInterval(function () {
    const ctx = canvas.getContext("2d");
    balls = ballPhysx(balls, ctx);
    drawFrame(balls)
}, 1000 / 60);