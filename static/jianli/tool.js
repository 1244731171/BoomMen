class table {
    constructor(data) {
        let col = data.col;
        let body = data.data;
        let table = $(`<table ${data.align ? `align=${data.align}` : ""} style="${data.width ? `width:${data.width}` : ""}"></table>`);
        if (data.title) {
            table.append(`<tr class='title'><td colspan="${col.length + 1}">${data.title}</td></tr>`);
        }
        let tr = $(`<tr class="thead tr"></tr>`);
        let isHideThead = true;
        col.forEach(e => {
            if (e.n) {
                isHideThead = false;
            }
            tr.append(`<td class="td" width="${e.w}">${e.n}</td>`);
        });
        if (!isHideThead) {
            table.append(tr);
        }
        body.forEach(tds => {
            tr = $(`<tr class="tbody tr"></tr>`);
            let i = 0;
            tds.forEach(e => {
                tr.append(`<td class="td" width="${col[i].w}" style="${col[i].b ? 'font-weight:bold' : ''}">${e}</td>`);
                i++;
            });
            table.append(tr);
        });
        return table;
    }
}