class Dungeon {
    constructor() {
        this.map = [];
        this.visitedCells = new Set();

        this.stack = [];
        this.unicStack = new Set();

        this.ceil = 0;
        this.floor = 0;
        this.both = 0;
    }

    scan(map) {
        this.map = map;

        this.traverseMap((cell) => {
            const [i, j] = cell;

            if (!this.visitedCells.has(i + '-' + j) && this.map[i][j] === 1) {
                const [min, max] = this.findMinMaxI(cell);
                this.defineTreasure(min, max);
            }
        });

        return { ceil, floor, both };
        
        // return { 
        //     ceil: this.ceil, 
        //     floor: this.floor, 
        //     both: this.both 
        // };
    }

    traverseMap(callback) {
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                callback([i, j]);
            }
        }
    }
    
    findMinMaxI([i, j]) {
        let min = i;
        let max = i;

        this.stack = [[i, j]];
        this.unicStack = new Set([i + '-' + j]);
        
        while (this.stack.length) {
            const [i, j] = this.stack.pop();

            this.visitedCells.add(i + '-' + j);
            this.addAroundCells([i, j]);
    
            min = Math.min(min, i);
            max = Math.max(max, i);
        }
    
        return [min, max];
    }

    addAroundCells([i, j]) {
        if (i - 1 >= 0) this.addCell([i - 1, j]);
        if (i + 1 < this.map.length) this.addCell([i + 1, j]);
        if (j - 1 >= 0) this.addCell([i, j - 1]);
        if (j + 1 < this.map[i].length) this.addCell([i, j + 1]);
    }

    addCell([i, j]) {
        if (this.map[i][j] === 1 && !this.unicStack.has(i + '-' + j)) {
            this.unicStack.add(i + '-' + j);
            this.stack.push([i, j]);
        }
    }

    defineTreasure(min, max) {
        if (min === 0 && max === this.map.length - 1) {
            this.both++;
        } else if (min === 0) {
            this.ceil++;
        } else if (max === this.map.length - 1) {
            this.floor++;
        }
    }
}

function scan(map) {
    const dungeon = new Dungeon();
    const treasure = dungeon.scan(map);

    return treasure;
}

const testMap = [  
    [1, 1, 0, 0, 0, 1, 0, 1, 1],  
    [1, 1, 0, 1, 0, 1, 0, 0, 0],  
    [0, 1, 0, 1, 0, 0, 0, 1, 1]  
];

const test = [  
    [1, 0, 1],  
    [0, 1, 0],  
];

const result = scan(testMap);
console.log('result: ', result);
