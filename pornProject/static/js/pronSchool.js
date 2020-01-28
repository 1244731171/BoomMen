let errorList = new Map();
let domId = new Map();
let currentLocalFileName = "";

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
                    index: 0,
                    pages: ['1'],
                    length: 0,
                    lessons: [],
                    lessonText: "",
                    lessonList: [],
                    lessonIndex: 0,
                    lessonPages: ['1'],
                    lessonLength: 0,
                    mineList: [],
                    mineIndex: 0,
                    minePages: ['1'],
                    mineLength: 0
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
                    document.querySelector('#s_p_i_2').value = "";
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
                    this.getHot(1);
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
                this.asideBtnClick();
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
            switch (this.status.current.type) {
                case "hot":
                    this.getHot(num);
                    break;
                case "lesson":
                    this.getLesson(this.status.current.lessonText, num);
                    break;
                case "mine":
                    this.getMine(num)
                    break;
                default:
                    break;
            }
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
        _choiceFile() {
            if (!domId.get('u_f_f')) {
                domId.set('u_f_f', document.querySelector("#u_f_f"));
            }
            if (!domId.get('doUploadBtn')) {
                domId.set('doUploadBtn', document.querySelector("#doUploadBtn"));
            }
            if (!domId.get('uploadImg')) {
                domId.set('uploadImg', document.querySelector("#uploadImg"));
            }
            if (!domId.get('uploadVideo')) {
                domId.set('uploadVideo', document.querySelector("#uploadVideo"));
            }
            domId.get('uploadImg').classList.add("dn");
            domId.get('uploadVideo').classList.add("dn");
            if (domId.get('u_f_f').files.length > 0) {
                let f = domId.get('u_f_f').files[0];
                this._doUpload(f);
                if (f.type.indexOf("video") != -1) {
                    let reads = new FileReader();
                    reads.readAsDataURL(f);
                    reads.onload = function(e) {
                        domId.get('uploadVideo').src = this.result;
                        domId.get('uploadVideo').classList.remove("dn");
                    };
                } else if (f.type.indexOf("image") != -1) {
                    let reads = new FileReader();
                    reads.readAsDataURL(f);
                    reads.onload = function(e) {
                        domId.get('uploadImg').src = this.result;
                        domId.get('uploadImg').classList.remove("dn");
                    };
                }
                domId.get('doUploadBtn').classList.remove("dn");
            } else {
                domId.get('doUploadBtn').classList.add("dn");
            }
        },
        _doUpload(f) {
            let formData = new FormData();
            // formData.append('name', f.name);
            // formData.append('size', f.size);
            // formData.append('type', f.type);
            formData.append('img', f);
            vm.$http.post(`/upload`, formData).then(function(data) {
                currentLocalFileName = data.body.fileName;
                return vm.$http.post("/linkFile", {
                    "fileName": currentLocalFileName,
                    "userId": localStorage.getItem("uuid")
                }, {
                    emulateJSON: true
                }).then(function() {

                }).catch(function(result) {

                });
            }).then(function() {

            }).catch(function(result) {

            });
        },
        doUpload() {
            if (currentLocalFileName) {
                vm.$http.post("/activeLink", {
                    "fileName": currentLocalFileName,
                    "userId": localStorage.getItem("uuid"),
                    "isPublic": false,
                    "tag": [],
                    "title": ""
                }, {
                    emulateJSON: true
                }).then(function(data) {
                    this.alertContent = data.body.data;
                    this.isAlert = true;
                    this._autoHideAlert(0.7);
                }).catch(function() {
                    this.alertContent = "上传失败！请稍后重试";
                    this.isAlert = true;
                    this._autoHideAlert(0.7);
                });
            } else if (domId.get('u_f_f').files[0]) {
                this._doUpload(domId.get('u_f_f').files[0]);
                this.alertContent = "上传失败！请稍后重试";
                this.isAlert = true;
                this._autoHideAlert(0.7);
            } else {
                this.alertContent = "上传失败！请稍后重试";
                this.isAlert = true;
                this._autoHideAlert(0.7);
            }
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
                    // this.status.last.mainHeaderText = this.status.current.mainHeaderText;
                    // this.status.current.mainHeaderText = "most hot lessons in China";
                    if (!this.status.current.lessonText) {
                        this.getLesson(this.status.current.lessonText, 1);
                    }
                    break;
                case 'mine':
                    this.getMine(1);
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
        _closeFull(e) {
            document.querySelector(".ful").classList.remove("ful");
            e.target.classList.add("dn");
        },
        _openFull(e, type) {
            if (type === "gif" || type === "jpg") {
                document.querySelector(".closeFull").classList.remove("dn");
                e.target.parentElement.classList.add("ful");
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
                        this.getLessons();
                    } else {
                        // this.clearUserInfo();
                    }
                }).catch(function(data) {
                    this.clearUserInfo();
                });
            }
        },
        getHot(num = 1) {
            if (this.status.current.index == num) {
                this._autoHideAlert(0);
                return;
            }
            document.querySelector("#app").scrollTop = 0;
            vm.$http.get(`/getHot?index=${num}`).then(function(data) {
                this._autoHideAlert(0);
                data = data.body;
                this.status.current.list = [...data.list];
                let _index = index = parseInt(data.index);
                let length = data.length;
                this.status.current.index = index;
                this.status.current.length = length;
                let arr = [index];
                if (index >= 5) {
                    while (index-- > 1 && arr.length < 5) {
                        arr.unshift(index);
                    }
                    while (arr.length < 9 && _index++ < length) {
                        arr.push(_index)
                    }
                } else {
                    while (arr.length < 5 && _index++ < length) {
                        arr.push(_index)
                    }
                    while (index-- > 1 && arr.length < 9) {
                        arr.unshift(index);
                    }
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
                this._autoHideAlert(0);
                this.status.current.list = [];
                this.status.current.index = 1;
                this.status.current.length = 1;
                this.status.current.pages = [];
            });
        },
        getMine(index) {
            vm.$http.post(`/getMine`, {
                "index": index,
                "userId": localStorage.getItem("uuid")
            }, {
                emulateJSON: true
            }).then(function(data) {
                this._autoHideAlert(0);
                data = data.body;
                this.status.current.mineList = [...data.list];
                let _index = index = parseInt(data.index);
                let length = data.length;
                this.status.current.mineIndex = index;
                this.status.current.mineLength = length;
                let arr = [index];
                if (index >= 5) {
                    while (index-- > 1 && arr.length < 5) {
                        arr.unshift(index);
                    }
                    while (arr.length < 9 && _index++ < length) {
                        arr.push(_index)
                    }
                } else {
                    while (arr.length < 5 && _index++ < length) {
                        arr.push(_index)
                    }
                    while (index-- > 1 && arr.length < 9) {
                        arr.unshift(index);
                    }
                }
                if (arr.length == 9) {
                    if (length > arr[8]) {
                        arr.splice(7, 2, '...', length)
                    }
                    if (arr[0] >= 2) {
                        arr.splice(0, 2, 1, '...')
                    }
                }
                this.status.current.minePages = arr;
            }).catch(function() {
                this._autoHideAlert(0);
                this.status.current.mineList = [];
                this.status.current.mineIndex = 1;
                this.status.current.mineLength = 1;
                this.status.current.minePages = [];
            });
        },
        getLessons() {
            vm.$http.get(`/getLessons`).then(function(data) {
                this.status.current.lessons = data.body;
            });
        },
        getLesson(name, index = 1, needHideLeft = false) {
            if (!name) {
                name = this.status.current.lessons[0];
            }
            if (this.status.current.lessonIndex == index && this.status.current.lessonText == name) {
                this._autoHideAlert(0);
                return;
            }
            if (needHideLeft) {
                this.asideBtnClick();
            }
            this.status.current.type = 'lesson';
            this.status.current.lessonText = name;
            document.querySelector("#app").scrollTop = 0;
            vm.$http.get(`/getLesson?name=${encodeURIComponent(name)}&index=${index}`).then(function(data) {
                this._autoHideAlert(0);
                data = data.body;
                this.status.current.lessonList = [...data.list];
                let _index = index = parseInt(data.index);
                let length = data.length;
                this.status.current.lessonIndex = index;
                this.status.current.lessonLength = length;
                let arr = [index];
                if (index >= 5) {
                    while (index-- > 1 && arr.length < 5) {
                        arr.unshift(index);
                    }
                    while (arr.length < 9 && _index++ < length) {
                        arr.push(_index)
                    }
                } else {
                    while (arr.length < 5 && _index++ < length) {
                        arr.push(_index)
                    }
                    while (index-- > 1 && arr.length < 9) {
                        arr.unshift(index);
                    }
                }
                if (arr.length == 9) {
                    if (length > arr[8]) {
                        arr.splice(7, 2, '...', length)
                    }
                    if (arr[0] >= 2) {
                        arr.splice(0, 2, 1, '...')
                    }
                }
                this.status.current.lessonPages = arr;
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

document.querySelector(".leftMenu").style.height = document.body.offsetHeight - 48 + 'px'