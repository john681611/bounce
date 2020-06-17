import { Ball } from './types'

const ballR = 10
const leftWall = (ball: Ball) => ball.pos[0] <= ballR
const rightWall = (ball: Ball, ctx: any) => ball.pos[0] >= ctx.canvas.width - ballR
const roof = (ball: Ball) => ball.pos[1] <= ballR
const floor = (ball: Ball, ctx: any) => ball.pos[1] >= ctx.canvas.height - ballR

export default (balls: Ball[], ctx: any): Ball[] => balls.map(ball => processBall(ball, ctx))
    .filter(ball => !(ball.vel < .1 && ball.vel > -.1 && floor(ball,ctx)))


const processBall =  (ball: Ball, ctx: any): Ball => {
    ball.vel
    if (floor(ball, ctx) || roof(ball)) { //bounce
        ball.vel *= -0.9
    }
    if (ball.vel < 5) { //vertical drag
        ball.vel += 0.1
    }

    if (leftWall(ball) || rightWall(ball, ctx)) { //wall
        ball.bias *= -0.9
    }
    ball.pos[0] += ball.bias
    ball.pos[1] += ball.vel

    if(roof(ball)) {
        ball.pos[1] = ballR
    } else if(floor(ball, ctx)) {
        ball.pos[1] = ctx.canvas.height - ballR
    }

    if(leftWall(ball)) {
        ball.pos[0] = ballR
    } else if(rightWall(ball, ctx)) {
        ball.pos[0] = ctx.canvas.width - ballR
    }

    return ball
}