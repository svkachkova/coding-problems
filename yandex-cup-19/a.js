function findLatestWeight(weights) {
    weights.sort((a, b) => a - b);

    let [max1, max2, max1Index, max2Index] = twoMax(weights);

    while (max2 !== 0) {
        [max1, max2, max1Index, max2Index] = twoMax(weights);

        weights[max1Index] = 0;
        weights[max2Index] = max1 - max2;

        // if (weights[weights.length - 1] === 0) weights.length--;
        
        console.log('weights: ', weights);
    }

    return max1;
}

function twoMax(arr) {
    let max1 = Math.max(arr[0], arr[1]);
    let max2 = Math.min(arr[0], arr[1]);
    let max1Index = arr.indexOf(max1);
    let max2Index = arr.indexOf(max2);

    for (let i = 2; i < arr.length; i++) {
        if (arr[i] > max1) {
            [max1, max2] = [arr[i], max1];
            [max1Index, max2Index] = [i, max1Index];
        } else if (arr[i] > max2) {
            max2 = arr[i];
            max2Index = i;
        }
    }

    return [max1, max2, max1Index, max2Index];
}

const w = [2, 7, 4, 1, 8, 1];
const result = findLatestWeight(w);

console.log('result: ', result);
   
module.exports = findLatestWeight;

// function findLatestWeight(weights) {
//     weights.sort((a, b) => a - b);

//     while (weights.length > 1) {
//         const index = weights.length - 1;
//         const diff = weights[index] - weights[index - 1];

//         if (diff !== 0) {
//             for (let i = 0; i < index; i++) {
//                 if (weights[i] >= diff) {
//                     weights.splice(i, 0, diff);
//                     break;
//                 }
//             }
//         }

//         weights.length -= 2;
//     }

//     return weights.length ? weights[0] : 0;
// }
