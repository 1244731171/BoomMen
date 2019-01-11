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

let str = 'L3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQwNl81MDc3cUEuRC52YXE1QS5ELl9zbWFsbC5qcGVnJHFpbmd0aWFuZHkkL3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQwNl82MTcxZWVhQS5ELmN2bmtfc21hbGwuanBlZyRxaW5ndGlhbmR5JC91cGxvYWQyLzIwNjMwLzIwMTgvMTAtMTkvMjAxODEwMTkxODM0MDZfNzEwOG9uMTlBLkQuN3VseF9zbWFsbC5qcGVnJHFpbmd0aWFuZHkkL3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQwNl84MDQ2b2lpdWV4NnFfc21hbGwuanBlZyRxaW5ndGlhbmR5JC91cGxvYWQyLzIwNjMwLzIwMTgvMTAtMTkvMjAxODEwMTkxODM0MDZfOTE0MDE5azllZUEuRC51MTlfc21hbGwuanBlZyRxaW5ndGlhbmR5JC91cGxvYWQyLzIwNjMwLzIwMTgvMTAtMTkvMjAxODEwMTkxODM0MDdfMDcwMnZjYndBLkQueDdrX3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDA3XzE2NDA3QS5ELmFBLkQuMTlwb29fc21hbGwuanBlZyRxaW5ndGlhbmR5JC91cGxvYWQyLzIwNjMwLzIwMTgvMTAtMTkvMjAxODEwMTkxODM0MDdfMjQyMWE3d291NzJlX3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDA3XzMzNTg4aXhiam9jYl9zbWFsbC5qcGVnJHFpbmd0aWFuZHkkL3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQwN180Mjk2cWFvNzRwajM0X3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDA3XzUzOTBwdWlldmFwcV9zbWFsbC5qcGVnJHFpbmd0aWFuZHkkL3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQwN182MzI3eGFhcmN4cndfc21hbGwuanBlZyRxaW5ndGlhbmR5JC91cGxvYWQyLzIwNjMwLzIwMTgvMTAtMTkvMjAxODEwMTkxODM0MDdfNzEwOG92djE5eHV3X3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDA3XzgwNDZQdm92MTkzNG8zNF9zbWFsbC5qcGVnJHFpbmd0aWFuZHkkL3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQwN185MTQwNjE4MzRhdTE4aW9fc21hbGwuanBlZyRxaW5ndGlhbmR5JC91cGxvYWQyLzIwNjMwLzIwMTgvMTAtMTkvMjAxODEwMTkxODM0MDdfOTkyMWpraXZpa3Z1X3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDA4XzA4NTh2MTkxOGtxcFBpX3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDA4XzE3OTZQYzZvQS5ELndiMV9zbWFsbC5qcGVnJHFpbmd0aWFuZHkkL3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQwOF8yNzMzZWxjMThsYTgzNF9zbWFsbC5qcGVnJHFpbmd0aWFuZHkkL3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQwOF8zNjcxOGNlanZBLkQudmtfc21hbGwuanBlZyRxaW5ndGlhbmR5JC91cGxvYWQyLzIwNjMwLzIwMTgvMTAtMTkvMjAxODEwMTkxODM0MDhfNDc2NWF3dXVuQS5ELnd1X3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDA4XzU4NThhMTlsNWk1cHFfc21hbGwuanBlZyRxaW5ndGlhbmR5JC91cGxvYWQyLzIwNjMwLzIwMTgvMTAtMTkvMjAxODEwMTkxODM0MDhfNzEwOHBsZXdsOHYxOV9zbWFsbC5qcGVnJHFpbmd0aWFuZHkkL3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQwOF84MzU4ZWVyODE5bnYxOV9zbWFsbC5qcGVnJHFpbmd0aWFuZHkkL3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQwOF85OTIxMTlxeGs5NmljX3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDA5XzA4NTh2aWlQaWlsMF9zbWFsbC5qcGVnJHFpbmd0aWFuZHkkL3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQwOV8yMTA4cWx2MjM0dWtlX3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDA5XzMyMDI3amNjYmxvd19zbWFsbC5qcGVnJHFpbmd0aWFuZHkkL3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQwOV80MTQweFBqbGU5ZXBfc21hbGwuanBlZyRxaW5ndGlhbmR5JC91cGxvYWQyLzIwNjMwLzIwMTgvMTAtMTkvMjAxODEwMTkxODM0MDlfNTIzNFAzNHdidWFlbl9zbWFsbC5qcGVnJHFpbmd0aWFuZHkkL3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQwOV82MzI3azZlaTljbzM0X3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDA5Xzc1Nzc3cXZyMTl3aTlfc21hbGwuanBlZyRxaW5ndGlhbmR5JC91cGxvYWQyLzIwNjMwLzIwMTgvMTAtMTkvMjAxODEwMTkxODM0MDlfODY3MWViQS5ELnJ3YkEuRC5pX3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDA5Xzk2MDkxODM0MTg5bzM0MTlfc21hbGwuanBlZyRxaW5ndGlhbmR5JC91cGxvYWQyLzIwNjMwLzIwMTgvMTAtMTkvMjAxODEwMTkxODM0MTBfMDg1OXZ2eG5qZXhpX3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDEwXzIxMDkxMGFQam9jQS5ELnVfc21hbGwuanBlZyRxaW5ndGlhbmR5JC91cGxvYWQyLzIwNjMwLzIwMTgvMTAtMTkvMjAxODEwMTkxODM0MTBfMzIwMnJlUDE4cjM0MzE5X3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDEwXzQxNDAzNHJvbnViMTlQX3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDEwXzUzOTBqb2lyamxiZV9zbWFsbC5qcGVnJHFpbmd0aWFuZHkkL3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQxMF85NDUycGlpY2xpbHZfc21hbGwuanBlZyRxaW5ndGlhbmR5JC91cGxvYWQyLzIwNjMwLzIwMTgvMTAtMTkvMjAxODEwMTkxODM0MTFfMDIzNGpuZXFjamVpX3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDExXzIxMDl2MjM0UGljcDZfc21hbGwuanBlZyRxaW5ndGlhbmR5JC91cGxvYWQyLzIwNjMwLzIwMTgvMTAtMTkvMjAxODEwMTkxODM0MTFfMzM1OWN4dzMxOVBpcl9zbWFsbC5qcGVnJHFpbmd0aWFuZHkkL3VwbG9hZDIvMjA2MzAvMjAxOC8xMC0xOS8yMDE4MTAxOTE4MzQxMV80NjA5MzQ2Y2p4aXA0X3NtYWxsLmpwZWckcWluZ3RpYW5keSQvdXBsb2FkMi8yMDYzMC8yMDE4LzEwLTE5LzIwMTgxMDE5MTgzNDExXzU3MDJqbnUzNHFldkEuRC5fc21hbGwuanBlZw==';
console.log(base64decode(str));