function solution(input) { 
    const div = document.createElement('div');
    div.innerHTML = input;
    const table = div.firstChild;

    const rows = [];
    const alignments = [];

    let markdown = '';

    const clearString = (str) => str.replace(/\s+/g, ' ').replace(/\r?\n|\r/g, '').trim();

    const processCell = (cell) => {
        const tag = cell.tagName.toLowerCase();
        const content = clearString(cell.innerHTML);

        return tag === 'td' ? content : `**${content}**`;
    };

    const processTr = (tr) => [...tr.children].map(processCell);

    const processThead = (thead) => {
        rows.push(...[...thead.children].map(processTr));
    };

    const processTbody = (tbody) => {
        rows.push(...[...tbody.children].map(processTr));
    };
    
    const processColgroup = (colgroup) => {
        alignments.push(...[...colgroup.children].map(col => col.align || 'left'));
    };

    const processors = {
        'colgroup': processColgroup,
        'thead': processThead,
        'tbody': processTbody,
    };

    for (let child of table.children) {
        processors[child.tagName.toLowerCase()](child);
    }

    const updateAlignments = () => {
        if (alignments.length === 0) {
            alignments.push(...rows[0].map(cell => 'left'));
        }
    };
    
    updateAlignments();

    const alignmentsContents = alignments.map(align => {
        return {
            'left': ':---',
            'center': ':---:',
            'right': '---:'
        }[align];
    });

    const delimiter = `| ${alignmentsContents.join(' | ')} |\n`;

    console.log('alignments: ', alignments);
    console.log('rows: ', rows);
    console.log('delimiter: ', delimiter);

    for (let [index, row] of rows.entries()) {
        markdown += `| ${row.join(' | ')} |\n`;

        if (index === 0) markdown += delimiter;
    }

    return markdown;
}

const table = `<table>  
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
</table>`;

const markdown = solution(table);
console.log('markdown: ', markdown);
