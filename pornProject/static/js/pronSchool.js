let errorList = new Map();
let domId = new Map();

let vm = new Vue({
    el: "#app",
    data() {
        let mainId = "hot";
        return {
            navTypes: [{
                id: 'lesson',
                txt: '<span>教材</span>'
            }, {
                id: 'hot',
                txt: '<span style="color:red">HOT!</span>'
            }, {
                id: 'mine',
                txt: '<span>我的自拍</span>'
            }],
            mainId: mainId,
            status: {
                last: {

                },
                current: {
                    mainHeaderText: "Hot Lessons in CHINA",
                    type: mainId,
                    list: [],
                    index: 1,
                    pages: ['1']
                },
                next: {

                }
            },
            user: {
                name: "",
                id: "",
                pwd: "",
                isLogin: false,
                ecode: "",
                email: ""
            },
            alertContent: "",
            isAlert: false,
            alertTimer: -1,
            message: []
        }
    },
    methods: {
        asideBtnClick() {
            let leftMenu = document.querySelector(".leftMenu");
            let shadow = document.querySelector(".shadow");
            if (leftMenu.classList.value.indexOf("leftMenuShow") != -1) {
                leftMenu.classList.remove("leftMenuShow");
                shadow.classList.add("dn");
            } else {
                leftMenu.classList.add("leftMenuShow");
                shadow.classList.remove("dn");
            }
        },
        navBtnClick(type) {
            this._changeType(type);
        },
        saveSignin(e) {
            e.stopPropagation();
            if (this.user.id == "") {
                errorList.set("id", 1);
                document.querySelector('#error_id').innerHTML = "登录ID不得为空";
                document.querySelector('#error_id').classList.remove("dn");
            }
            if (this.user.name == "") {
                errorList.set("name", 1);
                document.querySelector('#s_n_e').classList.remove("dn");
            }
            if (this.user.pwd == "") {
                errorList.set("pwd", 1);
                document.querySelector('#s_p_e').classList.remove("dn");
            }
            if (errorList.size > 0) {
                this.alertContent = '<span>注册信息有错误！</span>';
                this.isAlert = true;
                this._autoHideAlert(0.7);
                return;
            }
            vm.$http.post(`/signin`, {
                data: JSON.stringify(vm.user)
            }, {
                emulateJSON: true
            }).then(function(data) {
                if (data.body.result) {
                    this.clearUserInfo();
                    document.querySelector('#userPassword2').value = "";
                    this.alertContent = `<span>${data.body.data}</span>`;
                    this.isAlert = true;
                    this._autoHideAlert(0.7);
                    this.asideBtnClick();
                } else {
                    if (data.body.reason === "sameId") {
                        errorList.set("id", 1);
                        document.querySelector('#error_id').innerHTML = "登录ID重复，请更换";
                        document.querySelector('#error_id').classList.remove("dn");
                        errorList.set("id", 1);
                    } else {
                        this.alertContent = `<span>${data.body.data}</span>`;
                        this.isAlert = true;
                        this._autoHideAlert(0.7);
                    }
                }
            }).catch(function(data) {
                this.alertContent = `<span>${data.body.data || "服务器错误！请稍后重试"}</span>`;
                this.isAlert = true;
                this._autoHideAlert(0.7);
            });
        },
        login(e) {
            this.clearUserInfo();
            this._changeType('login');
            this.asideBtnClick();
            this._hideFormError();
            e.stopPropagation();
        },
        doLogin(e) {
            e.stopPropagation();
            if (this.user.id == "") {
                errorList.set("id", 1);
                document.querySelector('#l_i_e').classList.remove("dn");
            }
            if (this.user.pwd == "") {
                errorList.set("pwd", 1);
                document.querySelector('#l_p_e').classList.remove("dn");
            }
            if (errorList.size > 0) {
                this.alertContent = '<span>登录信息有错误！</span>';
                this.isAlert = true;
                this._autoHideAlert(0.7);
                return;
            }
            vm.$http.post(`/login`, {
                data: JSON.stringify(vm.user)
            }, {
                emulateJSON: true
            }).then(function(data) {
                if (data.body.result) {
                    data = data.body;
                    this.alertContent = `<span>${data.data}</span>`;
                    this.isAlert = true;
                    this.user.id = data.info.id;
                    localStorage.setItem("uuid", data.info.id);
                    this.user.name = data.info.name;
                    this.user.isLogin = true;
                    localStorage.setItem("islogin", "1");
                    this.checkMessage();
                    this._autoHideAlert(1);
                    this._changeType(this.mainId);
                    this.getHot();
                } else {
                    this.alertContent = `<span>${data.body.data}</span>`;
                    this.isAlert = true;
                    this._autoHideAlert(0.7);
                }
            }).catch(function(data) {
                this.alertContent = `<span>${data.body.data || "服务器错误！请稍后重试"}</span>`;
                this.isAlert = true;
                this._autoHideAlert(0.7);
            });
        },
        signin(e) {
            e.stopPropagation();
            this.clearUserInfo();
            this._changeType('signin');
            this.asideBtnClick();
            this._hideFormError();
        },
        logout(e) {
            e.stopPropagation();
            this.clearUserInfo();
            this.alertContent = '<span>登出完成！</span>';
            this.isAlert = true;
            this._autoHideAlert(0.7);
        },
        showMessage(e) {
            e.stopPropagation();
            localStorage.removeItem("messageInfo");
            this.alertContent = this.message.shift();
            this.isAlert = true;
        },
        upload(e) {
            if (this.user.isLogin) {
                this._changeType("upload");
            } else {
                this.alertContent = '<span>请先登录！</span>';
                this.isAlert = true;
                this._autoHideAlert(0.7);
                e.stopPropagation();
            }
        },
        bodyClick() {
            if (this.isAlert) {
                clearTimeout(this.alertTimer);
                this.isAlert = false;
                this.alertContent = '';
            }
        },
        showDetail(info) {

        },
        gotopage(num) {
            this.isAlert = true;
            this.alertContent = `<span>准备跳转第 ${num} 页</span>`;
        },
        setEmail() {},
        setPwd() {},
        checkUpload() {},
        checkMessage() {
            if (this.user.isLogin) {
                var cur = new Date().toDateString();
                if (localStorage.getItem("checkMessageDate") !== cur) {
                    localStorage.setItem("checkMessageDate", cur);
                    this.message.push("<span>新的一天！你该拍裸照咯~</span>");
                    localStorage.setItem("messageInfo", "<span>新的一天！你该拍裸照咯~</span>");
                }
            } else {
                this.message = [];
            }
            setTimeout(vm.checkMessage.bind(vm), 60 * 1000 * 60);
        },
        _hideFormError() {
            document.querySelectorAll(".formError").forEach(e => {
                e.classList.add("dn");
            });
            errorList = new Map();
        },
        _checkID() {
            var checkStr = this.user.id.replace(/[a-zA-Z0-9]/g, "");
            if (this.user.id.length < 6) {
                errorList.set("id", 1);
                document.querySelector('#error_id').innerHTML = "登录ID长度不得小于6位";
                document.querySelector('#error_id').classList.remove("dn");
            } else if (checkStr !== "") {
                errorList.set("id", 1);
                document.querySelector('#error_id').innerHTML = "请使用数字和字母填写登录ID";
                document.querySelector('#error_id').classList.remove("dn");
            } else {
                document.querySelector('#error_id').innerHTML = "登录ID重复，请更换";
                document.querySelector('#error_id').classList.add("dn");
                vm.$http.get(`/checkId?id=${this.user.id}`).then(function(data) {
                    if (data.body.result === "pass") {
                        errorList.delete("id");
                        document.querySelector('#error_id').classList.add("dn");
                    } else {
                        errorList.set("id", 1);
                        document.querySelector('#error_id').classList.remove("dn");
                    }
                }).catch(function() {
                    errorList.delete("id");
                    document.querySelector('#error_id').classList.add("dn");
                });
            }
        },
        _changeType(type) {
            switch (type) {
                case 'hot':
                    this.status.last.mainHeaderText = this.status.current.mainHeaderText;
                    this.status.current.mainHeaderText = "most hot girl in China";
                    break;
                case 'lesson':
                    this.status.last.mainHeaderText = this.status.current.mainHeaderText;
                    this.status.current.mainHeaderText = "most hot lessons in China";
                    break;
                default:
                    break;
            }
            this.status.last.type = this.status.current.type;
            this.status.current.type = type;
        },
        _autoHideAlert(time) {
            time = time * 1000;
            clearTimeout(this.alertTimer);
            this.alertTimer = setTimeout(() => {
                this.isAlert = false;
                this.alertContent = '';
            }, time);
        },
        _checkEmpty(inputId, errorId, type) {
            if (!domId.get(inputId)) {
                domId.set(inputId, document.querySelector("#" + inputId));
            }
            if (!domId.get(errorId)) {
                domId.set(errorId, document.querySelector("#" + errorId));
            }
            if (domId.get(inputId).value != "") {
                domId.get(errorId).classList.add("dn");
                errorList.delete(type);
            }
        },
        _checkSame(id1, id2, errorId, type) {
            if (!domId.get(id1)) {
                domId.set(id1, document.querySelector("#" + id1));
            }
            if (!domId.get(id2)) {
                domId.set(id2, document.querySelector("#" + id2));
            }
            if (!domId.get(errorId)) {
                domId.set(errorId, document.querySelector("#" + errorId));
            }
            if (domId.get(id1).value != domId.get(id2).value) {
                domId.get(errorId).classList.remove("dn");
                errorList.set(type, 1);
            } else {
                domId.get(errorId).classList.add("dn");
                errorList.delete(type);
            }
        },
        getUserInfo() {
            if (localStorage.getItem("islogin") == "1" && localStorage.getItem("uuid")) {
                vm.$http.post(`/getInfo`, {
                    id: localStorage.getItem("uuid")
                }, {
                    emulateJSON: true
                }).then(function(data) {
                    if (data.body.isPass) {
                        data = data.body.data;
                        localStorage.setItem("uuid", data.id);
                        this.user.name = data.name;
                        this.user.isLogin = true;
                        if (localStorage.getItem("messageInfo")) {
                            this.message = [localStorage.getItem("messageInfo")];
                        }
                        this.checkMessage();
                        this.getHot();
                    } else {
                        // this.clearUserInfo();
                    }
                }).catch(function(data) {
                    this.clearUserInfo();
                });
            }
        },
        getHot() {
            vm.$http.get("/getHot").then(function(data) {
                data = data.body;
                this.status.current.list = [...data.list];
                let _index = index = data.index;
                this.status.current.index = index;
                this.status.current.length = data.length;
                let arr = [index];
                while (index-- > 1 && arr.length < 5) {
                    arr.unshift(index);
                }
                while (arr.length < 9 && _index++ < length) {
                    arr.push(_index)
                }
                if (arr.length == 9) {
                    if (length > arr[8]) {
                        arr.splice(7, 2, '...', length)
                    }
                    if (arr[0] >= 2) {
                        arr.splice(0, 2, 1, '...')
                    }
                }
                this.status.current.pages = arr;
            }).catch(function() {
                this.status.current.list = [];
                this.status.current.index = 1;
                this.status.current.length = 1;
                this.status.current.pages = [];
            });
        },
        clearUserInfo() {
            this.user = {
                name: "",
                id: "",
                pwd: "",
                isLogin: false,
                email: ""
            };
            this.message = [];
            localStorage.removeItem("uuid");
            localStorage.removeItem("islogin");
            localStorage.removeItem("checkMessageDate");
            localStorage.removeItem("messageInfo");
        }
    },
    watch: {
        'user': {
            deep: true,
            handler(n, o) {}
        },
        'status.current.list': {
            deep: true,
            handler(n, o) {}
        }
    }
});

vm.getUserInfo();