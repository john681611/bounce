import { getBalls } from "../ts/index";


test('should get balls initially and find to be none', () => {
    expect(getBalls()).toEqual([])
});