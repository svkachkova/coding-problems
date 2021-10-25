const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin
});
 
let lines = [];

rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const testResults = [];
    const result = [];
    
    for (let i = 1; i < lines.length; i += 2) {
        const [N, D, C, M] = lines[i].split(' ').map(item => parseInt(item, 10));
        const S = lines[i + 1];
        
        testResults.push(isEnougthFood(D, C, M, S) ? 'YES' : 'NO');
    }

    for (let i = 0; i < testResults.length; i++) {
        result.push(`Case #${i + 1}: ${testResults[i]}`);
    }

    process.stdout.write(result.join('\n'));
});

function isEnougthFood(dog, cat, addition, queue) {

    const lastDog = queue.lastIndexOf('D');

    for (let i = 0; i <= lastDog; i++) {
        if (queue[i] === 'D') {
            dog--;
            cat += addition;
        } else {
            cat--;
        }

        if (dog < 0 || cat < 0) return false;
    }

    return true;
}

