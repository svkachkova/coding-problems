// Не забудьте перед отправкой изменить в module.exports = function main(game, start) {
// Не деструктурируйте game, ваше решение не будет проходить тесты.
export default function main(game, start) {

    // let { x, y } = start;
    let isFinish = false;

    const stack = [];

    const priorityMove = {
        bottom: 'down',
        right: 'right',
        top: 'up',
        left: 'left',
    };

    const changeXY = (x, y, move) => {
        return {
            bottom: [x, y + 1],
            right: [x + 1, y],
            top: [x, y - 1],
            left: [x - 1, y],
        }[move];
    };

    const findAliableDirections = (state) => {
        const directions = [];

        for (let move in priorityMove) {
            if (state[move]) {
                directions.push(move);
            }
        }

        return directions;
    }

    const appendDirections = async (x, y) => {
        const state = await game.state(x, y);
        const directions = findAliableDirections(state);

        if (state.finish) isFinish = true;

        for (let move of directions) {
            stack.push({ x, y, move });
        }
    };

    const takeMove = async (x, y) => {
        await appendDirections(x, y);

        while (stack.length) {
            const { x, y, move } = stack.pop();
            await game[priorityMove[move]](x, y);
            await appendDirections(...changeXY(x, y, move));

            if (isFinish) return { x, y };
        } 
    };

    return game.right(start.x, start.y).then(() => ({ x: start.x + 1, y: start.y + 1 }));

    // return takeMove(start.x, start.y)
    //     .then(result => Promise.resolve({ x: result.x, y: result.y }));
    
    // return game.right(start.x, start.y)
    //     .then(() => game.right(start.x + 1, start.y))
    //     .then(() => game.right(start.x + 2, start.y))
    //     .then(() => game.right(start.x + 3, start.y))
    //     .then(() => ({ x: start.x + 4, y: start.y }));
}
