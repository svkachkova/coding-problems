# Yandex Cup 2019

## A Аннигилируй это

Вы устроились работать в лабораторию по изучению антиматерии, где проводят различные опыты. Ваш отдел изучает процессы, которые происходят при объединении материи и антиматерии. Вам необходимо провести серию опытов над некоторым количеством молекул.

Соседний отдел разработал аппарат, который превращает материю в антиматерию на небольшое время. Он пригодится вам в проведении опытов, в которых используется следующий алгоритм:

- Находим 2 самых тяжёлых молекулы.
- Одну из них превращаем в антиматерию.
- Объединяем их. При этом, если вес одинаковый, они аннигилируются. Если же вес различается, то мы получаем новую молекулу, вес которой равен разнице весов предыдущих двух. Сама получившаяся молекула является материей.
- Если осталась одна молекула — нужно выяснить её вес. Если же молекул много — возвращаемся к пункту 1.

Вам необходимо узнать, молекула какого веса останется в конце опыта, это знание нужно учёным другого отдела.

Предыдущий разработчик набросал код, который занимался этими расчётами, однако код не может закончить расчёты в случае, когда опыт проводится на большом количестве молекул. Вам необходимо усовершенствовать код, чтобы он работал за приемлемое время.

### Код, доставшийся вам в «наследство»

В качестве входных данных у вас будет массив с весами молекул. В качестве выходных данных необходимо вернуть число, которое обозначает вес последней молекулы. Если молекул не останется, то необходимо вернуть 0.

```js
var findLatestWeight = function(weights, i = weights.length - 1) {  
  const cur = weights.length - 1 === i;  
 
  if (i === 0) return weights[0];  
 
  weights.sort((a, b) => a - b);  
  weights[i - 1] = (weights[i] === weights[i-1]) ? 0 : weights[i] - weights[i-1];  
 
  return findLatestWeight(weights, i - 1);  
}
```

### Пример работы

Вход: [2,7,4,1,8,1]

Выход: 1

Берём молекулы с весом 7 и 8, превращаем 7 в антимолекулу и сталкиваем её с молекулой весом 8. Остаётся молекула весом 1. Веса оставшихся молекул стали [2,4,1,1,1]. Берём молекулы с весом 2 и 4, превращаем 2 в антимолекулу и сталкиваем её с молекулой весом 4. Остаётся молекула весом 2. Веса оставшихся молекул стали [2,1,1,1]. Берем молекулы с весом 2 и 1, превращаем 1 в антимолекулу и сталкиваем её с молекулой весом 2. Остаётся молекула весом 1. Веса оставшихся молекул стали [1,1,1]. Берем молекулы с весом 1 и 1, превращаем одну из них в антимолекулу и сталкиваем ее со второй. Они аннигилируются. Веса оставшихся молекул [1]. Осталась одна молекула. Результат — 1.

## B БЭМ

Верстальщик Александр участвует в множестве проектов с использованием БЭМ-методологии. Он даже создал удобный плагин для любимой IDE, который позволяет ему писать имена классов в сокращенной записи и разворачивать их в полную. Но проблема в том, что для каждого проекта люди устанавливают разные разделители между блоком, элементом и модификатором (`block__mod__val—elem`, `block–mod–val___elem`), и ему приходится каждый раз править это в своём плагине вручную. Помогите Александру написать модуль, который будет на основании класса определять разделитель для сущностей.

Правило для разделителей – произвольное количество символов (не буквы).

Примеры возможных нотаций (модификаторы для блока во входящих данных могут быть без значения):

- `block_mod__elem` // Считаем, что модификатор идет первым  
- `block_mod_mod__elem`  
- `block__elem_mod_mod`

Уточнения:

- Классы в проектах пишут только маленькими буквами.
- На вход модуля подаётся строка с валидным CSS-классом.

### Формат ввода

Строка с классом

### Формат вывода

Ваш модуль должен вернуть ответ вида:

```js
{  
  mod: "_", // разделитель для модификатора  
  elem: "__", // разделитель для элемента  
}
```

## C Отладка кофемашины

Программист Фёдор Ракушкин разрабатывает умную кофемашину. Он столкнулся с проблемой: у кофемашины нет разъема, через который можно подключиться отладчиком. Если что-то сломалось или зависло, хочется иметь возможность быстро получить отладочную информацию.

У кофемашины есть небольшой чёрно-белый дисплей размером 300 на 96 пикселей. Фёдор придумал следующую схему: когда что-то ломается, кофемашина выводит на дисплей баркод с закодированной отладочной информацией.

Помогите Фёдору реализовать функцию, которая будет рендерить баркод с отладочной информацией по придуманному Фёдором алгоритму.

### Формат отладочной информации ПО кофемашины

Кофемашина генерирует отладочную информацию в виде объекта следующего вида

```ts
type CoffeeMachineDebugInfo = {  
    /**  
     * Идентификатор конкретной кофе-машины — строка из маленьких  
     * и больших латинских букв и цифр, строго 10 символов  
     */  
    id: string;  
    /**  
     * Код ошибки — целое число от 0 до 999  
     */  
    code: number;  
    /**  
     * Сообщение об ошибке — строка из маленьких и больших  
     * латинских букв, цифр и пробелов (от 0 до 34 символов)  
     */  
    message: string;  
}
```

### Алгоритм отрисовки баркода

Баркод имеет фиксированный размер (по экрану кофемашины) — 300 на 96 пикселей. С левого и правого края баркод ограничен пятью полосками (чёрная, белая, чёрная, белая, чёрная). Ширина чёрной полоски — 4 пикселя, белой полоски - 5 пикселей.

Между полосками находится контент баркода, закодированный чёрными и белыми квадратами, состоящий из 12 строк по 32 квадрата в каждой строке. Размер каждого квадрата — 8 на 8 пикселей.

Белые квадраты в контенте кодируют 0, чёрные — 1.

### Алгоритм формирования контента баркода

Из отладчной информации формируется строка вида `<id><code><message>`. Поле code дополняется незначащими нулями до трех символов. Поле message дополняется пробелами в конце до 34 символов.

Далее строка конвертируется в байтовый массив - каждому символу строки ставится в соотвествие его ASCII-код (число от 0 до 255). В конец массива дописывается один байт контрольной суммы, которая вычисляется как побитовое сложение по модулю 2 (XOR) всех элементов массива.

Затем, каждый элемент полученного массива переводится в двоичную запись (восемь сивмолов 0 или 1) и кодируется последовательностью из восьми квадратов (0 - белый квардрат, 1 - черный квадрат). Квадраты отрисовываются в контенте баркода последовательно и построчно.

### Примеры

Отладочная информация:

```js
{  
     "id": "ezeb2fve0b",  
     "code": 10,  
     "message": "404 Error coffee not found"  
}
```

Баркод: https://contest.yandex.ru/testsys/statement-image?imageId=f37625061f759da40ce3e02a28ce7f4abab6c9d8cfd88a3614609051e7b153a7

Отладочная информация:

```js
{  
    "id": "Teapot1234",  
    "code": 0,  
    "message": "No coffee this is a teapot"  
}
```

Баркод: https://contest.yandex.ru/testsys/statement-image?imageId=b195b513214a228276aee97746209ea7ee83cf73cec6e258363178582f124214

## D Автоматизируй это

На государственном портале предоставления услуг сделали возможность подавать заявление на получение документов полностью автоматически, для этого надо только заполнить таблицу с персональными данными.

Эти данные затем передаются на проверку в несколько инстанций, включая МВД. После начала тестирования выяснилось, что МВД принимает данные в формате markdown, а ГосУслуги пользуются html-форматом. Помогите написать скрипт миграции одного формата в другой, чтобы ребята поскорее запустились.

Вам нужно написать функцию, которая на вход принимает HTML-таблицу и преобразует ее в markdown-подобную разметку.

В качестве решения этого задания отправьте файл .js, в котором объявлена функция solution:

```js
function solution(input) {  
    // ...  
}
```

### Формат ввода

HTML-таблица приходит в виде строки:

```html
<table>  
    <colgroup>  
        <col align="right" />  
        <col />  
        <col align="center" />  
    </colgroup>  
    <thead>  
        <tr>  
            <td>Command         </td>  
            <td>Description     </td>  
            <th>Is implemented  </th>  
        </tr>  
    </thead>  
    <tbody>  
        <tr>  
            <th>git status</th>  
            <td>List all new or modified    files</td>  
            <th>Yes</th>  
        </tr>  
        <tr>  
            <th>git diff</th>  
            <td>Show file differences that haven’t been  
 staged</td>  
            <td>No</td>  
        </tr>  
    </tbody>  
</table>
```

В таблице могут содержаться теги `colgroup`, `thead` и `tbody` в фиксированном порядке.
Все эти теги опциональны, но всегда будет присутствовать как минимум `thead` либо `tbody`.

- `colgroup` содержит теги `col`, у которых может быть опциональный атрибут `align` с одним из трех значений (left|center|right)
- `thead` и `tbody` содержат 1 или более `tr`
- `tr`, в свою очередь, содержат как `td`, так и `th`

В таблице всегда будет хотя бы одна строка. \
В строке всегда будет хотя бы одна ячейка. \
В ячейке всегда присутствует хотя бы один не-whitespace символ.

Количество элементов `th`/`td` в строках всегда совпадает между всеми строками и с количеством элементов `col` в `colgroup`, при наличии `colgroup`.

Пробелы и переносы строк в исходном HTML могут встречаться в любом месте, не нарушающем валидность HTML.

### Формат вывода

На выходе должна получиться строка с markdown-разметкой:

```md
| Command | Description | **Is implemented** |  
| ---: | :--- | :---: |  
| **git status** | List all new or modified files | **Yes** |  
| **git diff** | Show file differences that haven’t been staged | No |
```

Первая встретившаяся строка в таблице должна всегда превращаться в строку-заголовок в markdown-разметке. \
Все остальные строки идут в тело таблицы. \
Разделитель заголовка выводится всегда.

Содержимое `td` вставляется как есть, содержимое `th` как `**bold**`. \
Между содержимым ячейки в markdown-разметке и разделителями ячеек (|) всегда один пробел.

Пробелы по краям содержимого тегов `td` и `th` должны быть удалены. \
Переносы строк в содержимом ячеек должны быть удалены. \
Более одного пробела подряд в содержимом ячеек должны быть заменены одним пробелом.

За выравнивание в ячейках столбцов markdown-таблицы отвечает форматирование разделителя заголовка:
- | :--- | значит выравнивание по левому краю
- | :---: | значит выравнивание по центру
- | ---: | значит выравнивание по правому краю

При отсутствии заданного в теге `col` атрибута `align` выравнивание должно быть задано влево.

### Примечания

- Для перевода строки нужно использовать символ \n.
- Решение будет проверяться в браузерном окружении (Chrome 78) с доступом к объектам document и window.
- Можно использовать синтаксис до es2018 включительно.