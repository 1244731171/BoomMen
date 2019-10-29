# VUE 自学 #
1.模板语言  

2.关系  
data中key=value  
赋值给 components.xxx.props.key1 = key  
得到 components.xxx.props.key1 = value  
赋值给 components.xxx.template中key1字段  
所得到 components.xxx.template  
直接赋值给 vue.template  
  
3.template中方法和参数  
``` javascript
    // {{ 参数名1, 参数名2 | 方法名 }}  
    // 多参数使用 逗号连接  
    // 竖线 分割参数和方法 
    // 方法名需要在 vue.filters 中声明 或者 全局声明 Vue.filter(方法名, 方法体)    
    new Vue({
        el:...,
        template: `{{ key1, key2 | methodName }}`,
        data:{
            key1:value1,
            key2:value2
        },
        filters: {
            methodName: () => {
                return "";
            }
        }
    });
    // 或者
    Vue.filter(methodName, () => {
        return "";
    });
``` 

4.关于template中参数的声明  
有且只能在 vue.data 或者 vue.computed 中声明一次  

5.关于template中参数的调用  
在 vue.computed、vue.watch、vue.methods 中可以直接使用 this.参数名 调用  

6.computed、watch、methods区别  
``` javascript
    // methods 关键字 => 方法名：主要是通过用户行为触发调用的 @click="methods中方法名"
    // watch 关键字 => 参数名：主要是该参数发生改变的时候自动触发 一般是在template中使用v-model声明
    // computed 关键字 => 参数名：主要是会改变该参数的其他参数发生改变的时候自动触发
     new Vue({
      el: document.getElementById('app'),
      template: `
        <div>
          <input type="text" v-model="number1" />
          +
          <input type="text" v-model="number2" />
          =
          {{result}}
        </div>
      `,
      data: {
        number1: 0,
        number2: 0,
      },
      computed: {
        // 如果原值不变，缓存不调函数的优化机制
        result: function() {
          // 监视对象，写在了函数内部，
          // 凡是函数内部有 this. 相关属性，改变都会触发当前函数
          let addSum = parseInt(this.number1) + parseInt(this.number2);
          let allSum = addSum * this.number3;
          return allSum;
        }
      },
      // computed 和 watch 本质是一样的
      watch: {
          number1: (v) => {
              this.result = v + this.number2;
          },
          number2: (v) => {
              this.result = v + this.number1;
          }
      }
    });
```

7. 事件点  
  7.1. beforeCreate 和 created
  顺序为 beforeCreate => 创建data中参数 => created 
  7.2. beforeMount 和 mounted
  顺序为 beforeMount => 将template的dom节点挂在body上 => mounted
  7.3. 

8. this内参数
    this.$refs
``` javascript
    let App = {
      template: `
        <div>
          <button ref="btn">按钮</button>
        </div>
      `,
      beforeCreate: function() {
        // 这里不能操作数据，只是初始化了事件等……
        console.log(this.$refs.btn); // [Console] undefined
      },
      created: function() {
        // 可以操作数据了
        console.log(this.$refs.btn); // [Console] undefined
      },
      beforeMount: function() {
        // new Vue 发生装载，替换 <div id="app"></div> 之前
        console.log(this.$refs.btn); // [Console] undefined
      },
      mounted: function() {
        // 装载数据之后
        console.log(this.$refs.btn.innerHTML); // [Console] 按钮
      }
    }
```
$children - 当前组件的子组件 包含自己的$el $children等
$el - 当前组件的元素节点
$parent - 当前组件的父组件
$root - 获取 new Vue 实例
```javascript
    var App = {
      template: `
        <div>
          <temp ref="temp" />
        </div>
      `,
      mounted: function() {
        // 装载数据之后
        console.log(this.$children);
        // console.log(this.$refs.temp);
      }
    }

    new Vue({
      el: document.getElementById('app'),
      components: {
        app: App
      },
      template: `<app/>`
    })
```
nextTick: 类似promise.then
``` javascript
    var App = {
      template: `
        <div>
          <input v-if="isShow" ref="input" />
        </div>
      `,  
      data: function() {
        return {
          isShow: true
        }
      },
      mounted: function() {
        // 希望在 Vue 真正渲染 DOM 到页面之后进行下面操作
        this.$nextTick(()=>{
          //回调事件
        })
      }
    }

    // 或者部署个全局的
    Vue.nextTick(()=>{
      //回调事件
    });
```

https://www.jianshu.com/p/167fc3e8af6c

https://www.runoob.com/w3cnote/px-em-rem-different.html

https://blog.csdn.net/baokx/article/details/99416752

http://caibaojian.com/book/vue.html
