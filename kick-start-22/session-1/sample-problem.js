const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin
});
 
const lines = [];

rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const testResults = [];
    const result = [];
    
    for (let i = 1; i < lines.length; i += 2) {
        const [N, M] = lines[i].split(' ').map(item => parseInt(item, 10));
        const C = lines[i + 1].split(' ').map(item => parseInt(item, 10));
        
        testResults.push(solution(C, M));
    }

    for (let i = 0; i < testResults.length; i++) {
        result.push(`Case #${i + 1}: ${testResults[i]}`);
    }

    process.stdout.write(result.join('\n'));
});

function solution(candies, kidsAmount) {
    const totalCandies = candies.reduce((total, candyAmount) => total += candyAmount);

    return totalCandies % kidsAmount;
}
