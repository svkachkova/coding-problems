// type CoffeeMachineDebugInfo = {  
//     id: string;
//     // строка из маленьких и больших латинских букв и цифр, строго 10 символов

//     code: number;
//     // целое число от 0 до 999

//     message: string;
//     // строка из маленьких и больших латинских букв, цифр и пробелов (от 0 до 34 символов)
// }

function renderBarcode(debugInfo, element) {
    const barcode = createBarcode(debugInfo);
    element.style.display = 'flex';

    element.appendChild(createStripes());
    element.appendChild(createContent(barcode));
    element.appendChild(createStripes());
}

function createBarcode(debugInfo) {
    const code = debugInfo.code.toString().padStart(3, '0');
    const message = debugInfo.message.padEnd(34, ' ');

    const info = `${debugInfo.id}${code}${message}`
        .split('')
        .map(char => char.charCodeAt(0).toString(2))
        .join(''); 

    // const checkSum = info.reduce((sum, code) => {
    //     return sum ^ code;
    // }, 0);

    // info.push(checkSum);

    const checkSum = 0;

    for (let i = 0; i < info.length; i++) {
        if (info[i] === 1) checkSum++;
    }

    console.log('info: ', info.length);

    // return info.map(code => intToBinary(code)).join('');
    return info + checkSum % 2;
}

function intToBinary(num) {
    const binary = [];

    while(num > 0) {
        binary.push(num % 2);
        num = Math.floor(num / 2);
    }

    return binary.reverse().join('').padStart(8, '0');
}

function createStripes() {
    const stripes = document.createElement('div');
    stripes.style.display = 'flex';

    for (let i = 0; i < 5; i++) {
        const stripe = document.createElement('div');
        stripe.style.height = '96px';

        stripe.style.backgroundColor = (i % 2) ? 'white' : 'black';
        stripe.style.width = (i % 2) ? '5px' : '4px';

        stripes.appendChild(stripe);
    }

    return stripes;
}

function createContent(code) {
    const content = document.createElement('div');

    content.style.width = '256px';
    content.style.height = '96px';
    content.style.display = 'grid';
    content.style.gridTemplate = 'repeat(12, 1fr) / repeat(32, 1fr)';

    for (let i = 0; i < code.length; i++) {
        const cell = document.createElement('div');

        cell.style.width = '8px';
        cell.style.height = '8px';
        cell.style.backgroundColor = (code[i] === '1') ? 'black' : 'white'
        // console.log('code[i]: ', code[i]);
 
        content.appendChild(cell);
    }

    return content;
}

// const debugInfo = {
//     'id': 'ezeb2fve0b',  
//     'code': 10, 
//     'message': '404 Error coffee not found' 
// };

const debugInfo = {  
    'id': 'Teapot1234',  
    'code': 0,  
    'message': 'No coffee this is a teapot'  
};

const element = document.createElement('div');

renderBarcode(debugInfo, element);

document.body.append(element);
