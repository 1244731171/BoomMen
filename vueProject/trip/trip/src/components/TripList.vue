<template>
  <div class="list main">
    <div id="list">
      <div class="parent_flex_column">
        <div class="html_nav parent_flex_row">
          <input type="text" id="name_search" v-model="nameSearch" />
          <template v-for="(value, key) in key2CN">
            <input :key="key" type="checkbox" :id="'type_'+key" class="i_c" v-model="showMap[key]" />
            <label
              :key="value"
              :class="'i_c_l '+ (showMap[key] ? 'i_c_l_checked' : '')"
              :for="'type_'+key"
              v-text="value"
              v-if="list.type[key]"
            ></label>
          </template>
        </div>
        <div class="parent_flex_row html_content">
          <main class="py_content">
            <article v-for="(value, key) in list.py" :key="key">
              <section :id="key">
                <header>
                  <b>{{key}}</b>
                </header>
                <content>
                  <div
                    class="name_info"
                    v-for="(info) in value"
                    :title="info.id"
                    :key="info.id"
                    v-if="showMap[info.type]"
                  >
                    <div class="showName" @click="showSelf(info.id)">
                      <span class="type" v-text="key2CN[info.type]"></span>
                      <span class="name" v-text="info.name"></span>
                    </div>
                  </div>
                </content>
                <!-- <footer>
                <small>-</small>
                </footer>-->
              </section>
            </article>
          </main>
          <nav class="py_nav">
            <div>
              <a v-for="(value, key) in list.py" :key="key" :href="'#'+key" :id="'py_nav_'+key">
                <b>{{key}}</b>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let py_head = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z #".split(
  " "
);
const KEY2CN = {
  ST: "攻略",
  W: "官网",
  P: "景点游乐园",
  D: "餐饮",
  S: "购物",
  H: "酒店",
  T: "交通枢纽",
  I: "信息中心"
};
export default {
  name: "TripList",
  props: [],
  data() {
    return {
      key2CN: KEY2CN,
      showMap: {
        ST: true,
        W: true,
        P: true,
        D: true,
        S: true,
        H: true,
        T: true,
        I: true
      },
      nameSearch: "",
      isSelectable: true,
      list: {
        py: {},
        type: {}
      }
    };
  },
  created() {
    console.log("triplist created");
    this.$http
      .get(`http://114.116.250.115:8099/list`)
      .then(data => {
        let newData = {
          py: {},
          type: {}
        };
        for (var key of py_head) {
          let infos = data.body.py[key];
          if (infos) {
            newData.py[key] = infos;
          }
        }
        for (var key in data.body.types) {
          newData.type[key] = true;
        }
        this.updateList(newData);
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  },
  updated() {
    // let py_div = document.querySelectorAll(".py_content article");
    // let py_nav = document.querySelectorAll(".py_nav")[0];
    // py_div.forEach(e => {
    //   let hrefWord = py_nav.querySelector(
    //     "#py_nav_" + e.getAttribute("keyname")
    //   );
    //   if (e.querySelectorAll(".name_info").length === 0) {
    //     e.style.display = "none";
    //     hrefWord.style.display = "none";
    //   } else {
    //     e.style.display = "block";
    //     hrefWord.style.display = "block";
    //   }
    // });
  },
  methods: {
    updateList(data) {
      this.list = data;
    },
    showSelf(id) {
      window.open(`./insertInfo?id=${id}`);
    },
    search() {}
  }
};
</script>

<style lang="less" scoped>
@import "../assets/less/list.less";
</style>