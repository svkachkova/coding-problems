'use strict';

((global) => {
    const timeout = 20;

    const _async = (fn, cb) => {
        setTimeout(() => {
            cb(fn());
        }, Math.random() * timeout);
    };

    const Folder = function (a = []) {
        if (!new.target) {
            return new Folder(a);
        }

        this.read = (index, cb) => _async(() => a[index], cb);
        this.size = (cb) => _async(() => a.length, cb);
    };

    Object.freeze(Folder);
    global.Folder = Folder;
})(typeof window === 'undefined' ? global : window);

const input = Folder([
    'file',
    'ffffile',
    Folder([
        'file',
    ]),
    Folder([
        'fiiile',
    ]),
    Folder([
        {},
        null,
        'file',
        'ffiillee',
        'ffiillee',
    ]),
    Folder([
        Folder([
            'filllle',
            'file',
            null,
        ]),
        {},
        Folder([])
    ]),
]);

// проверка решения
solution(input).then(result => {
    console.log('result: ', result);
    const answer = ['ffffile', 'ffiillee', 'ffiillee', 'fiiile', 'filllle'];
    const isEqual = String(answer) === String(result);

    if (isEqual) {
        console.log('OK');
    } else {
        console.log('WRONG');
    }
});

// function promisify(f) {
//     return function(...args) {
//         return new Promise(resolve => {
//             args.push(result => resolve(result));
//             f.call(this, ...args);
//         });
//     };
// }

// const read = promisify(input.read);
// const getSize = promisify(input.size);

async function solution(input) {

    function read(data, index) {
        return new Promise(resolve => {
            data.read(index, (file) => resolve(file));
        });
    };

    function getSize (data) {
        return new Promise(resolve => {
            data.size(size => resolve(size));
        });
    };

    async function createPromises(data) {
        const promises = [];
        const size = await getSize(data);

        for (let i = 0; i < size; i++) {
            promises.push(read(data, i));
        }

        return promises;
    }

    async function findFiles(data) {
        if (data === null || Object.keys(data).length === 0) {
            return [];
        }

        const promises = await createPromises(data);
        const response = await Promise.all(promises);
        
        for (let file of response) {
            if (typeof file === 'string') {
                files.push(file);
            } else {
                await findFiles(file);
            }
        }
    }

    const files = [];
    await findFiles(input);

    return files.filter(file => file !== 'file').sort();
}
