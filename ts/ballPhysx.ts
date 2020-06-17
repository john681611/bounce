import { Ball } from './types'

const ballR = 10
const leftWall = (ball: Ball) => ball.pos[0] <= ballR
const rightWall = (ball: Ball, can: any) => ball.pos[0] >= can.width - ballR
const roof = (ball: Ball) => ball.pos[1] <= ballR
const floor = (ball: Ball, can: any) => ball.pos[1] >= can.height - ballR

export default (balls: Ball[], can: any): Ball[] => balls.map(ball => processBall(ball, can))
    .filter(ball => !(ball.vel < .1 && ball.vel > -.1 && floor(ball,can)))


const processBall =  (ball: Ball, can: any): Ball => {
    if (floor(ball, can) || roof(ball)) {
        ball.vel *= -0.9
    }

    if (leftWall(ball) || rightWall(ball, can)) {
        ball.bias *= -0.9
    }

    if (ball.vel < 5) { //vertical drag
        ball.vel += 0.1
    }

    ball.pos[0] += ball.bias
    ball.pos[1] += ball.vel

    //pull balls within bounds
    if(roof(ball)) {
        ball.pos[1] = ballR
    } else if(floor(ball, can)) {
        ball.pos[1] = can.height - ballR
    }

    if(leftWall(ball)) {
        ball.pos[0] = ballR
    } else if(rightWall(ball, can)) {
        ball.pos[0] = can.width - ballR
    }

    return ball
}