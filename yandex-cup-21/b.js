function renderWaterfall(rootNode, columnCount, elementGap) {
    const elements = rootNode.children;
    const columnWidth = findColumnWidth();

    const columns = new Array(columnCount);
    const columnHeights = new Array(columnCount).fill(0);

    for (let i = 0; i < columns.length; i++) {
        columns[i] = [];
    }

    rootNode.style.width = columnWidth + 'px';

    for (let element of elements) {
        const index = findIndexOfMinHeight();

        columns[index].push(element);
        columnHeights[index] += element.clientHeight + elementGap;
    }

    console.log('columns: ', columns);
    console.log('columnHeights: ', columnHeights);

    for (let i = 0; i < columns.length; i++) {
        const columnDiv = createColumnDiv(columns[i]);
        columnDiv.style.width = columnWidth + 'px';

        if (i < columns.length - 1) {
            columnDiv.style.marginInlineEnd = elementGap + 'px';
        }

        rootNode.appendChild(columnDiv);
    }

    rootNode.style.display = 'flex';
    rootNode.style.width = '100%';

    function findColumnWidth() {
        const rootWidth = rootNode.clientWidth;
        const sumGaps = (columnCount - 1) * elementGap;

        return (rootWidth - sumGaps) / columnCount;
    }

    function findIndexOfMinHeight() {
        const minHeight = Math.min(...columnHeights);
        return columnHeights.indexOf(minHeight);
    }

    function createColumnDiv(column) {
        const columnDiv = document.createElement('div');

        for (let i = 0; i < column.length; i++) {
            if (i < column.length - 1) {
                column[i].style.marginBlockEnd = elementGap + 'px';
            }
            columnDiv.appendChild(column[i]);
        }
        
        return columnDiv;
    }
}

const root = document.querySelector('.root');

renderWaterfall(root, 3, 15);

