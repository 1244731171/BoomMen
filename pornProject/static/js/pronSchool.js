let errorList = new Map();
let domId = new Map();
let confirmPromise = {};
let isChangeFile = false;

if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    // alert('移动端')
} else {
    if (!location.getValue("dia")) {
        document.body.innerHTML = "";
        location.href = "";
    }
    // alert('pc端')
}

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
            confirmContent: "",
            isConfirm: false,
            alertTimer: -1,
            message: [],
            userSort: []
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
                this._alert("<span>注册信息有错误！</span>");
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
                    this._alert(`<span>${data.body.data}</span>`);
                    this._autoHideAlert(0.7);
                    this.asideBtnClick();
                } else {
                    if (data.body.reason === "sameId") {
                        errorList.set("id", 1);
                        document.querySelector('#error_id').innerHTML = "登录ID重复，请更换";
                        document.querySelector('#error_id').classList.remove("dn");
                        errorList.set("id", 1);
                    } else {
                        this._alert(`<span>${data.body.data}</span>`);
                        this._autoHideAlert(0.7);
                    }
                }
            }).catch(function(data) {
                this._alert(`<span>${data.body.data || "服务器错误！请稍后重试"}</span>`);
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
                this._alert(`<span>登录信息有错误！</span>`);
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
                    this._alert(`<span>${data.data}</span>`);
                    this.user.id = data.info.id;
                    localStorage.setItem("uuid", data.info.id);
                    this.user.name = data.info.name;
                    this.user.isLogin = true;
                    localStorage.setItem("islogin", "1");
                    this.checkMessage();
                    this._autoHideAlert(1);
                    this._changeType(this.mainId);
                    this.getHot(1);
                    this.getLessons();
                } else {
                    this._alert(`<span>${data.body.data}</span>`);
                    this._autoHideAlert(0.7);
                }
            }).catch(function(data) {
                this._alert(`<span>${data.body.data || "服务器错误！请稍后重试"}</span>`);
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
            this._alert(`<span>登出完成！</span>`);
            this._autoHideAlert(0.7);
        },
        showMessage(e) {
            e.stopPropagation();
            localStorage.removeItem("messageInfo");
            this._alert(`<span>${this.message.shift()}</span>`);
        },
        upload(e) {
            if (this.user.isLogin) {
                this._changeType("upload");
                this.asideBtnClick();
            } else {
                this._alert(`<span>请先登录！</span>`);
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
            let c = this.status.current;
            if (num < 1 || num > c[c.type == "hot" ? "length" : (c.type + 'Length')]) {
                return;
            }
            this._alert(`<span>准备跳转第 ${num} 页</span>`);
            switch (c.type) {
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
        checkSort() {
            this._changeType("userSort");
            this.asideBtnClick();
            vm.$http.get(`/userSort?userId=${localStorage.getItem("uuid")}`)
                .then(function(data) {
                    this.userSort = data.body;
                });
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
            if (!domId.get('uploadImgDiv')) {
                domId.set('uploadImgDiv', document.querySelector(".uploadImgDiv"));
            }
            isChangeFile = true;
            document.querySelectorAll(".uploadImg").forEach(e => {
                e.remove();
            });
            document.querySelectorAll(".uploadVideo").forEach(e => {
                e.remove();
            });
            let p = domId.get('uploadImgDiv');
            if (domId.get('u_f_f').files.length > 0) {
                let fs = [...domId.get('u_f_f').files];
                fs.forEach(f => {
                    if (f.type.startsWith("video")) {
                        // let v = document.createElement("video");
                        // v.classList.add("uploadVideo");
                        // v.setAttribute("controls", "controls");
                        // p.append(v);
                        // let reads = new FileReader();
                        // reads.readAsDataURL(f);
                        // reads.onload = function(e) {
                        //     v.src = this.result;
                        // };
                    } else if (f.type.startsWith("image")) {
                        let i = new Image();
                        i.classList.add("uploadImg");
                        p.append(i);
                        let reads = new FileReader();
                        reads.readAsDataURL(f);
                        reads.onload = function(e) {
                            i.src = this.result;
                        };
                    }
                });
                domId.get('doUploadBtn').classList.remove("dn");
            } else {
                domId.get('doUploadBtn').classList.add("dn");
            }
        },
        doUpload() {
            if (!isChangeFile) {
                this._alert(`<span>这些文件已经上传过啦，上传些新的吧~</span>`);
                this._autoHideAlert(0.7);
                return;
            }
            let formData = new FormData();
            let fs = [...domId.get('u_f_f').files];
            if (fs.length > 1) {
                this._alert("<span>多文件上传，耗时稍久，请耐心等待~</span>");
            }
            formData.append("userId", localStorage.getItem("uuid"));
            fs.forEach((f, i) => {
                formData.append(`img${i}`, f);
            });
            vm.$http.post(`/upload`, formData).then(function(data) {
                if (data.body.result) {
                    vm.$http.post("/linkAndActiveFile", {
                        "fileNames": JSON.stringify(data.body.data),
                        "userId": localStorage.getItem("uuid")
                    }, {
                        emulateJSON: true
                    }).then(function(data) {
                        if (data.body.result) {
                            isChangeFile = false;
                        }
                        this._alert(`<span>${data.body.data}</span>`);
                        this._autoHideAlert(1);
                    }).catch(function(result) {
                        this._alert("<span>上传失败！请稍后重试</span>");
                        this._autoHideAlert(1);
                    });
                } else {
                    this._alert(`<span>${data.body.data}</span>`);
                    this._autoHideAlert(1);
                }
            }).catch(function(error) {
                console.log(error);
                this._alert("<span>上传失败！请稍后重试</span>");
                this._autoHideAlert(1);
            });
        },
        // _doUpload(f) {
        //     let formData = new FormData();
        //     // formData.append('name', f.name);
        //     // formData.append('size', f.size);
        //     // formData.append('type', f.type);
        //     formData.append('img', f);
        //     isUpload = false;
        //     vm.$http.post(`/upload`, formData).then(function(data) {
        //         currentLocalFileName = data.body.fileName;
        //         isLinked = false;
        //         isUpload = true;
        //         vm.$http.post("/linkFile", {
        //             "fileName": currentLocalFileName,
        //             "userId": localStorage.getItem("uuid")
        //         }, {
        //             emulateJSON: true
        //         }).then(function() {
        //             isLinked = true;
        //         }).catch(function(result) {
        //             isLinked = false;
        //             isUpload = false;
        //         });
        //     }).catch(function(result) {
        //         isUpload = false;
        //         isLinked = false;
        //     });
        // },
        // doUpload() {
        //     if (!isChangeFile) {
        //         this._alert(`<span>请勿重复上传</span>`);
        //         this._autoHideAlert(0.7);
        //         return;
        //     }
        //     if (isLinked && isUpload) {
        //         vm.$http.post("/activeLink", {
        //             "fileName": currentLocalFileName,
        //             "userId": localStorage.getItem("uuid"),
        //             "isPublic": false,
        //             "tag": [],
        //             "title": ""
        //         }, {
        //             emulateJSON: true
        //         }).then(function(data) {
        //             isChangeFile = false;
        //             this._alert(`<span>${data.body.data}</span>`);
        //             this._autoHideAlert(0.7);
        //         }).catch(function() {
        //             this._alert("<span>上传失败！请稍后重试</span>");
        //             this._autoHideAlert(0.7);
        //         });
        //     } else if (domId.get('u_f_f').files[0]) {
        //         this._doUpload(domId.get('u_f_f').files[0]);
        //         this._alert("<span>上网络有点差，请稍后重试</span>");
        //         this._autoHideAlert(0.7);
        //     } else {
        //         this._alert("<span>请添加文件后再上传</span>");
        //         this._autoHideAlert(0.7);
        //     }
        // },
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
            if (this.status.current.type == type) {
                return;
            }
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
        _alert(str) {
            this.isAlert = true;
            this.alertContent = str;
        },
        _autoHideAlert(time) {
            time = time * 1000;
            clearTimeout(this.alertTimer);
            if (!time) {
                this.isAlert = false;
                this.alertContent = '';
            } else {
                this.alertTimer = setTimeout(() => {
                    this.isAlert = false;
                    this.alertContent = '';
                }, time);
            }
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
            if (type === "gif" || type === "jpg" || type === "img") {
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
        getHot(num = 1, force = false) {
            if (this.status.current.index == num && !force) {
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
                    while (arr.length < (10 - index) && _index++ < length) {
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
        getMine(index = 1, force = false) {
            if (this.status.current.type == 'mine' && this.status.current.mineIndex == index && !force) {
                this._autoHideAlert(0);
                return;
            }
            if (this.status.current.type == 'mine') {
                document.querySelector(".mine").querySelectorAll("img").forEach(e => {
                    e.src = "";
                });
            } else {
                this.status.current.type = 'mine'
            }
            document.querySelector("#app").scrollTop = 0;
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
                    while (arr.length < (10 - index) && _index++ < length) {
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
                this.status.current.mineIndex = 0;
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
            document.querySelector("#app").scrollTop = 0;
            if (this.status.current.type == 'lesson') {
                document.querySelector(".lesson").querySelectorAll("img").forEach(e => {
                    e.src = "";
                });
            } else {
                this.status.current.type = 'lesson'
            }
            this.status.current.lessonText = name;
            this.status.current.lessonList = [];
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
                    while (arr.length < (10 - index) && _index++ < length) {
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
        shareSelf(fileName) {},
        deleteSelf(fileName) {
            this._confirm(`<span>确认删除</span>`).then(result => {
                if (result) {
                    vm.$http.post("/passiveLink", {
                        "fileName": fileName,
                        "userId": localStorage.getItem("uuid")
                    }, {
                        emulateJSON: true
                    }).then(function(data) {
                        this._alert(`<span>${data.body.data}</span>`);
                        this._autoHideAlert(0.7);
                        this.getMine(1, true);
                    }).catch(function() {
                        this._alert("<span>删除失败！请稍后重试</span>");
                        this._autoHideAlert(0.7);
                    });
                }
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
            this.status.current = {
                mainHeaderText: "Hot Lessons in CHINA",
                type: "hot",
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
            };
            localStorage.removeItem("uuid");
            localStorage.removeItem("islogin");
            localStorage.removeItem("checkMessageDate");
            localStorage.removeItem("messageInfo");
        },
        _confirm(str) {
            this.confirmContent = str;
            this.isConfirm = true;
            return new Promise(function(resolve, reject) {
                confirmPromise.ensure = function() {
                    resolve(true);
                };
                confirmPromise.cancel = function() {
                    resolve(false);
                };
            });
        },
        cancel() {
            this.confirmContent = "";
            this.isConfirm = false;
            confirmPromise.cancel();
        },
        ensure() {
            this.confirmContent = "";
            this.isConfirm = false;
            confirmPromise.ensure();
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
        },
        'status.current.lessonList': {
            deep: true,
            handler(n, o) {}
        },
        'status.current.mineList': {
            deep: true,
            handler(n, o) {}
        }
    }
});

vm.getUserInfo();

document.querySelector(".leftMenu").style.height = document.body.offsetHeight - 48 + 'px'