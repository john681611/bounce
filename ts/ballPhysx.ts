import { Ball } from './types'

const leftWall = (ball: Ball, ballR:number) => ball.pos[0] <= ballR
const rightWall = (ball: Ball, can: HTMLCanvasElement, ballR:number) => ball.pos[0] >= can.width - ballR
const roof = (ball: Ball, ballR:number) => ball.pos[1] <= ballR
const floor = (ball: Ball, can: HTMLCanvasElement, ballR:number) => ball.pos[1] >= can.height - ballR

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (can: HTMLCanvasElement, ballR: number): any => (balls: Ball[]): Ball[] => balls.map(ball => processBall(ball, can, ballR))
    .filter(ball => !(ball.vel < .1 && ball.vel > -.1 && floor(ball,can, ballR)))


const processBall =  (ball: Ball, can: HTMLCanvasElement, ballR:number): Ball => {
    if (floor(ball, can, ballR) || roof(ball, ballR)) {
        ball.vel *= -0.9
    }

    if (leftWall(ball, ballR) || rightWall(ball, can, ballR)) {
        ball.bias *= -0.9
    }

    if (ball.vel < 5) { //vertical drag
        ball.vel += 0.1
    }

    ball.pos[0] += ball.bias
    ball.pos[1] += ball.vel

    //pull balls within bounds
    if(roof(ball, ballR)) {
        ball.pos[1] = ballR
    } else if(floor(ball, can, ballR)) {
        ball.pos[1] = can.height - ballR
    }

    if(leftWall(ball, ballR)) {
        ball.pos[0] = ballR
    } else if(rightWall(ball, can, ballR)) {
        ball.pos[0] = can.width - ballR
    }

    return ball
}