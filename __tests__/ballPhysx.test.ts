import ballPhysxInit from '../ts/ballPhysx'

const size = {
    height: 100,
    width: 100
}
const ballR = 10;
const ballPhysx = ballPhysxInit(size,ballR)
test('should move ball down relative to velocity', () => {
    const balls = [{
        vel: 5,
        bias: 0,
        pos: [20, 20]
    }]
    expect(ballPhysx(balls)[0]).toEqual({ ...balls[0], pos: [20, 25] })
});

test('should move ball left relative to bias', () => {
    const balls = [{
        vel: 0,
        bias: 5,
        pos: [20, 20]
    }]
    expect(ballPhysx(balls)[0]).toEqual({ ...balls[0], pos: [25, 20.1] })
});

test('should move ball right relative to bias', () => {
    const balls = [{
        vel: 0,
        bias: -5,
        pos: [20, 20]
    }]
    expect(ballPhysx(balls)[0]).toEqual({ ...balls[0], pos: [15, 20.1] })
});

test('should experience pull when going slower than terminal velocity (5)', () => {
    const balls = [{
        vel: 4,
        bias: 0,
        pos: [20, 20]
    }]
    expect(ballPhysx(balls)[0]).toEqual({ ...balls[0], vel: 4.1, pos: [20, 24.1] })
});

test('should experience drag when going up ', () => {
    const balls = [{
        vel: -1,
        bias: 0,
        pos: [20, 20]
    }]
    expect(ballPhysx(balls)[0]).toEqual({ ...balls[0], vel: -0.9, pos: [20, 19.1] })
});

test('should bounce loosing some velocity when within the floor - radius (10)', () => {
    const balls = [{
        vel: 5,
        bias: 0,
        pos: [20, 91]
    }]
    expect(ballPhysx(balls)[0]).toEqual({ ...balls[0], vel: -4.4, pos: [20, 86.6] })
});

test('should bounce loosing some velocity when within the roof - radius (10)', () => {
    const balls = [{
        vel: -5,
        bias: 0,
        pos: [20, 9]
    }]
    expect(ballPhysx(balls)[0]).toEqual({ ...balls[0], vel: 4.6, pos: [20, 13.6] })
});

test('should bounce loosing some velocity when within the left wall - radius (10)', () => {
    const balls = [{
        vel: 0,
        bias: -5,
        pos: [9, 20]
    }]
    expect(ballPhysx(balls)[0]).toEqual({ ...balls[0], bias: 4.5, pos: [13.5, 20.1] })
});

test('should bounce loosing some velocity when within the right wall - radius (10)', () => {
    const balls = [{
        vel: 0,
        bias: 5,
        pos: [90, 20]
    }]
    expect(ballPhysx(balls)[0]).toEqual({ ...balls[0], bias: -4.5, pos: [85.5, 20.1] })
});

test('should reset to floor if goes below floor', () => {
    const balls = [{
        vel: 5,
        bias: 0,
        pos: [20, 99]
    }]
    expect(ballPhysx(balls)[0]).toEqual({ ...balls[0], pos: [20, 90] })
});

test('should reset to roof if goes above roof', () => {
    const balls = [{
        vel: -5,
        bias: 0,
        pos: [20, 1]
    }]
    expect(ballPhysx(balls)[0]).toEqual({ ...balls[0], pos: [20, 10] })
});

test('should reset to left wall if goes beyond left wall', () => {
    const balls = [{
        vel: 0,
        bias: -5,
        pos: [2, 20]
    }]
    expect(ballPhysx(balls)[0]).toEqual({ ...balls[0], pos: [10, 20.1] })
});

test('should reset to right wall if goes beyond right wall', () => {
    const balls = [{
        vel: 0,
        bias: 5,
        pos: [99, 20]
    }]
    expect(ballPhysx(balls)[0]).toEqual({ ...balls[0], pos: [90, 20.1] })
});

test('should not delete ball if going too fast down and breaching floor ', () => {
    const balls = [{
        vel: 1,
        bias: 0,
        pos: [20, 95]
    }]
    expect(ballPhysx(balls)[0]).toEqual(balls[0])
});

test('should delete ball if going too slow down and breaching floor ', () => {
    const balls = [{
        vel: 0.01,
        bias: 0,
        pos: [20, 95]
    }]
    expect(ballPhysx(balls)).toEqual([])
});
