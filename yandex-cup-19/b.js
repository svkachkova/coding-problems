// module.exports = function(str) { 
function b(str) {
    const separators = str.trim().split(/[a-z]+/g).filter(item => item !== '');
    const map = new Map();

    let mod = '';
    let elem = '';

    for (let i = 0; i < separators.length; i++) {
        if (!map.has(separators[i])) {
            map.set(separators[i], 0);
        }
        map.set(separators[i], map.get(separators[i]) + 1); 
    }

    const [sep1, sep2] = map.keys();

    if (map.get(sep1) >= map.get(sep2)) {
        mod = sep1;
        elem = sep2
    } else {
        elem = sep1;
        mod = sep2;
    }

    return { mod, elem };
}

const str = 'block+elem=mod=mod ';
const result = b(str);

console.log('result: ', result);
