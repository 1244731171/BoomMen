let getUrlParam = (key) => {
    let url = window.location.href.split("?")[1] || "";
    let params = url.split("&");
    let val = "";
    for (let k in params) {
        if (k === key) {
            val = params[k];
            break;
        }
    }
    return val;
}

let fire = (url, cb = () => { }) => {
    $.ajax({
        url: url,
        type: 'get',
        timeout: 10000,
        dataType: 'JSON',
        success: cb,
        error: cb
    });
}