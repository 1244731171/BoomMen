location.getValue = function(key) {
    if (this.__lastUrl !== this.href) {
        this.__lastUrl = this.href;
        let arr = this.search.replace("?", "").split("&").reduce((org, kv) => {
            org.push(kv.split("="));
            return org;
        }, []);
        this.__kvMap = new Map(arr);
    }
    return this.__kvMap.get(key);
}

let debounce = (func, time) => {
    let t = -1;
    return function() {
        clearTimeout(t);
        let self = this;
        let args = arguments;
        t = setTimeout(() => {
            func.apply(self, args);
        }, time);
    };
}