let base64decode = (data) => {
    let b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];
    if (!data) {return data;}
    data += '';
    do { 
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));
        bits = h1<<18 | h2<<12 | h3<<6 | h4;
        o1 = bits>>16 & 0xff;
        o2 = bits>>8 & 0xff;
        o3 = bits & 0xff;
        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);
    dec = tmp_arr.join('');
    dec = utf8_decode(dec);
    return dec;
}

let utf8_decode = ( str_data ) => {
    let tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;
    str_data += '';
    while ( i < str_data.length ) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if ((c1 > 191) && (c1 < 224)) {
            c2 = str_data.charCodeAt(i+1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i+1);
            c3 = str_data.charCodeAt(i+2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return tmp_arr.join('');
}

// let str = "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";
let str = '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';
console.log(base64decode(str));