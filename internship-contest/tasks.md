# Internship contest (pre)

## 1. Найти ошибки в коде

Разработчик Василий торопился на встречу с коллегами, поэтому быстро написал программу. Код получился неидеальным. Помогите Василию исправить ошибки в коде:
```js
module.exports = function (participants, sports) {  
    /**  
     * Подобно оператору new создает экземпляр объекта,  
     * используя функцию-конструктор и параметры для нее  
     */  
    function constructFrom (fnConstructor, params) {  
        const res = {};  
 
        fnConstructor.bind(res).call(params);  
 
        Object.setPrototypeOf(res, fnConstructor);  
 
        return res;  
    }  
 
    /**  
     * Создает пары вида [’вид спорта’, ’имя участника’],  
     * где первому виду спорта соответствует последний участник  
     */  
    function assignParicipants () {  
        const participants = this.participants;  
        const sports = this.sports;  
        const orderIndexes = [];  
        let i = sports.length;  
 
        while (i--) {  
            orderIndexes.push(function() {  
                return i;  
            });  
        }  
 
        return orderIndexes.map(  
          (getSportIndex, i) => [sports[i], participants[getSportIndex()]]  
          );  
    }  
 
    function Contest (participants, sports) {  
        this.participants = participants;  
        this.sports = sports;  
    }  
 
    Contest.prototype.assignParicipants = assignParicipants;  
 
 
    const contest = constructFrom(Contest, participants, sports);  
 
    return contest.assignParicipants();  
}
```

И отправить исправленный вариант в качестве решения.

### Формат ввода

На вход подается список участников participants и список видов спорта sports. Оба списка одинаковой длины.

### Пример

```
{
    "participants": ["Mary", "Kate"],
    "sports": ["football", "hockey"]
}

[["football","Kate"],["hockey","Mary"]]
```

## 2. Яндекс.Тележенька на CSS

Вам нужно сверстать картинку 1000 на 1000 пикселей при помощи HTML и CSS. Использовать SVG, встроенные изображения, JavaScript нельзя. 

### Формат ввода
```html
<style>  
    /* стили */  
</style>  
<body>  
    <!-- верстка -->  
</body>
```

### Примечания

Для отладки решения используйте инструмент для наложения вёрстки на картинку: https://yadi.sk/d/i_o213fkouFEqA

Вёрстка должна в точности соответствовать изображению (pixel perfect). Все числовые значения в оригинальном решении кратны 5.

Для рисования робота использовались следующие цвета: #f45a3b, #000000, #d8d8d8, #f0000, #999999, #666666, #222222, #fff.

## 3. Поврежденные файлы Бальтазара

Магнитная буря здорово потрепала файлы Бальтазара. Раньше он хранил в своей папке разные файлы и поддиректории, но теперь там настоящая неразбериха.

Бальтазар был минималистом, поэтому всегда все файлы называл ﬁle и использовал собственную асинхронную файловую систему, которая базировалась на объекте Folder c двумя методами:

```ts
type File = string | Folder | {} | null | undefined;  
 
type Folder = {  
  // Получить по индексу файл или папку  
  read(index: number, callback: (file: File) => void): void;  
 
  // Получить количество элементов в директории  
  size(callback: (size: number) => void): void;  
}  
```

Часть файлов осталась без повреждений, часть — потеряна навсегда, потому что превратилась в `null` или `{}`, а еще часть повреждена и, кажется, может быть восстановлена. Понять, что файл поврежден очень просто — часть букв в названии продублировались. Помогите Бальтазару найти все такие файлы и сложите их в массив для дальнейшего анализа. Массив надо отсортировать лексиграфически.

### Формат ввода

Объект с определенной структурой:

```js
Folder([  
    ’file’,  
    ’ffffile’,  
    Folder([  
        ’file’,  
    ]),  
    Folder([  
        ’fiiile’,  
    ]),  
    Folder([  
        {},  
        null,  
        ’file’,  
        ’ffiillee’,  
        ’ffiillee’,  
    ]),  
    Folder([  
        Folder([  
            ’filllle’,  
            ’file’,  
            null,  
        ]),  
        {},  
        Folder([]),  
    ]),  
]);
```

### Формат вывода

Массив строк, отсортированный в лексикографическом порядке:

```
[  
    ’ffffile’,  
    ’ffiillee’,  
    ’ffiillee’,  
    ’fiiile’,  
    ’filllle’,  
]
```

### Примечания

Задачу требуется решить на JavaScript (ES2017) и оформить решение по шаблону:

```js
module.exports = async function(input) {  
    // ...  
    return result;  
}
```

## 4. Подземелье

В поисках сокровищ известный археолог попал в огромную сеть двумерных пещер. Он вспомнил, что в университете как раз делал дипломную работу по этой местности: руками подсчитывал количество сталактитов, сталагмитов и сталагнатов и записывал всё это в рабочую тетрадь. Да, ошибиться легко. Приходилось проверять себя несколько раз. Теперь же у него с собой есть портативный сканер местности, который переводит всё в матрицу из 0 и 1. Только вот незадача, там нет возможности узнать количество объектов на карте. Для знаменитого археолога нет непреодолимых препятствий, а проверить свои студенческие расчеты очень хочется.

### Формат ввода

Нужно реализовать метод `scan`, который принимает на вход карту – матрицу NxM, состоящую только из 1 (каменная порода) и 0 (пустое пространство). Матрица – это 2D карта пещеры, вид сбоку, аля платформер.

Пример карты:

```
[  
  [1, 1, 0, 0, 0, 1, 0, 1, 1],  
  [1, 1, 0, 1, 0, 1, 0, 0, 0],  
  [0, 1, 0, 1, 0, 0, 0, 1, 1]  
]
```

Метод экспортировать таким образом:
`module.exports = { scan };`

Проверяться будет результат вывода:
`scan([...массив с картой...]);`

### Формат вывода

Метод scan возвращает объект с количеством каждого типа образования `{ceil: 0, ﬂoor: 0, both: 0}`

- Если образование свисает с потолка и не касается пола – `ceil`
- Если образование растет от пола и не касается потолка – `ﬂoor`
- Если образование свисает с потолка и при этом еще и касается пола – `both`

Результат вывода на примере карты выше: `{ceil: 2, ﬂoor: 2, both: 1}`

### Примечания

У одного образования может быть несколько точек касания.

1. Пример:
```
[  
  [1, 0, 1],  
  [1, 1, 1],  
  [0, 0, 0]  
]
```

Результат: `{ceil: 1, ﬂoor: 0, both: 0}`

2. Пример:
```
[  
  [1, 0, 1],  
  [1, 1, 1],  
  [0, 0, 1]  
]
```

Результат: `{ceil: 0, ﬂoor: 0, both: 1}`

Считаем, что по диагонали образования не пересекаются:
```
[  
  [1, 0, 1],  
  [0, 1, 0],  
]
```

Результат: `{ceil: 2, ﬂoor: 1, both: 0}`