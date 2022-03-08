const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin
});
 
const lines = [];

rl.on('line', (line) => {
    lines.push(line);
}).on('close', () => {
    const result = [];

    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const rulers = {
        alice: 'Alice',
        bob: 'Bob',
        nobody: 'nobody',
    };
    
    for (let i = 1; i < lines.length; i++) {
        const kindom = lines[i];
        
        result.push(`Case #${i}: ${kindom} is ruled by ${getRuler(kindom)}.`);
    }

    process.stdout.write(result.join('\n'));

    function getRuler(kindom) {
        const kindomLastLetter = kindom[kindom.length - 1];
        let ruler = '';
      
        if (vowels.includes(kindomLastLetter)) {
            ruler = rulers.alice;
        } else if (kindomLastLetter === 'y') {
            ruler = rulers.nobody;
        } else {
            ruler = rulers.bob;
        }
        
        return ruler;
    }
});
