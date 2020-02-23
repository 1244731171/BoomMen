<template>
  <!-- <div id="app" @click="bodyClick"> -->
  <div id="app">
    <content class="content">
      <header class="header">
        <button class="asideBtn btn" type="button" @click="asideBtnClick">
          <i class="icon"></i>
        </button>
        <div class="logoDiv">
          <img
            src="./assets/images/logo-60.png"
            alt="TripInfo"
            width="128"
            height="37"
            class="logo"
          />
        </div>
      </header>
      <nav class="nav">
        <div
          :class="'navBtn ' + (current.type == info.id ? 'hover' : '') "
          v-for="(info, index) in navTypes"
          :key="index"
          v-html="info.txt"
          @click="navBtnClick(info.id)"
        ></div>
      </nav>
      <!--
                ==========================
                LIST
                ==========================
      -->
      <TripList v-if="current.type === 'list'"></TripList>
      <!--
                ==========================
                MAP
                ==========================
      -->
      <TripMap
        v-if="current.type === 'map'"
        :type="map.type"
        :lat="map.lat"
        :lng="map.lng"
        :name="map.name"
      ></TripMap>
    </content>

    <!--
            ==========================
            LEFTMENU
            ==========================
    -->
    <div class="shadow dn" @click="asideBtnClick"></div>
    <aside class="leftMenu">
      <div class="blank"></div>
      <div v-if="!user.isLogin" class="menuBtn userAction">
        <div class="userBtn">
          <i class="login" @click="login"></i>
          <span>登录</span>
        </div>
        <div class="userBtn">
          <i class="signin" @click="signin"></i>
          <span>注册</span>
        </div>
        <div class="userBtn">
          <i class="upload" @click="checkLocal"></i>
          <span>照片定位</span>
        </div>
      </div>
      <div v-if="user.isLogin" class="menuBtn userAction">
        <div class="userBtn">
          <i class="logout" @click="logout"></i>
          <span>登出</span>
        </div>
        <div class="userBtn">
          <i class="message" @click="showMessage"></i>
          <div class="news" v-if="message.length > 0"></div>
          <span>信息</span>
        </div>
        <div class="userBtn">
          <i class="upload" @click.stop="checkLocal"></i>
          <span>照片定位</span>
        </div>
      </div>
      <div v-if="user.isLogin" class="menuBtn userInfo">
        <img src="./assets/images/panda.png" alt width="43" height="43" />
        <!-- <embed src="./assets/images/fox.svg" type="image/svg+xml" width="43" height="43"  /> -->
        <span v-text="user.name"></span>
      </div>
      <!-- <div v-if="user.isLogin" class="menuBtn userInfoAction" @click="setEmail">
                <span>设置通知邮箱</span>
            </div>
            <div v-if="user.isLogin" class="menuBtn userInfoAction" @click="setPwd">
                <span>修改密码</span>
            </div>
            <div class="menuGap">
            </div>
            <div v-if="user.isLogin" class="menuBtn userInfoAction" @click="checkSort">
                <span>查看排名</span>
      </div>-->
      <template v-for="(info) in navTypes">
        <div
          v-if="user.isLogin"
          class="menuBtn userInfoAction"
          :key="info.id"
          @click="navBtnClick(info.id)"
        >
          <span v-html="info.txt"></span>
        </div>
      </template>
      <div class="menuGap"></div>
    </aside>
    <div v-if="isAlert || isConfirm" class="alertDiv">
      <div class="alert" v-if="isAlert" v-html="alertContent"></div>
      <div class="confirm" v-if="isConfirm">
        <div class="confirmContent" v-html="confirmContent"></div>
        <div class="confirmBtns">
          <button class="c_ensure" @click.stop="ensure">确认</button>
          <button class="c_cancel" @click.stop="cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let mainId = "map";

import TripMap from "./components/TripMap";
import TripList from "./components/TripList";

export default {
  name: "Main",
  components: {
    TripMap,
    TripList
  },
  data() {
    return {
      navTypes: [
        {
          id: "map",
          txt: "<span>世界地图</span>"
        },
        {
          id: "list",
          txt: "<span>全部信息</span>"
        },
        {
          id: "mine",
          txt: "<span>我的行程</span>"
        }
      ],
      current: {
        type: "map"
      },
      mainId: mainId,
      user: {
        name: "Boss",
        id: "",
        pwd: "",
        isLogin: true,
        ecode: "",
        email: ""
      },
      map: {
        type: "mine",
        lat: "48.200488",
        lng: "16.372744",
        size: 14,
        name: "我就是金色大厅"
      },
      alertContent: "",
      isAlert: false,
      confirmContent: "",
      isConfirm: false,
      alertTimer: -1,
      message: []
    };
  },
  methods: {
    created() {},

    navBtnClick(id) {
      this.current.type = id;
      if(document.querySelector(".leftMenuShow")){
        // 如果左边栏显示中，切换tag页就要隐藏左边栏
        this.asideBtnClick();
      }
    },

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

    bodyClick() {},

    ensure() {},

    cancel() {},

    signin() {},

    login() {},

    logout() {},

    checkLocal() {},

    showMessage() {}
  }
};
</script>

<style lang="less">
@import "./assets/less/base.less";
@import "./assets/less/main.less";
</style>
