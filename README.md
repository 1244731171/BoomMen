# NodeJs学习心得
——**由于NodeJs支持ES6，所以心得体会用会掺杂部分Js心得**


##### **const**、**let** 与 **var**  的区别
- let（高级的var）：

> let声明的对象**拥有块级作用域**
> ``` javascript
> //普通声明
> let a = 5;
> function show(){
> 	let a = 10;
> 	console.log(a);
> }
> console.log(a); // 5
> show();         // 10
> console.log(a); // 5
> //循环语句
> for(let i = 0; i < 5; i++){
> 	setTimeout(function(){
>       //let i 输出：0,1,2,3,4
>       //var i 输出：5,5,5,5,5
> 		console.log(i);
> 	}, 100);
> }
> ```
> 
> let声明的全局变量在window.下无法访问，let变量为**匿名变量**
> ``` javascript
> let a = 0;
> console.log(window.a);  //undefined
> ```
> 
> let不会发生**变量提升**
> ``` javascript
>  console.log(a);  //undefined
>  console.log(b);  //Uncaught ReferenceError: b is not defined
>  var a = 0;
>  let b = 0;
> ```
> 
> 在任何情况下都**不能再次声明(let/var/const)**一个已经被let声明过的**同名变量**,但是let可以在块作用域中二次声明一个
> ``` javascript
> //================
> var a = 0;
> let a = 0;  //Uncaught SyntaxError: Identifier 'a' has already been declared
> //================
> let b = 0;
> let b = 1;  //Uncaught SyntaxError: Identifier 'b' has already been declared
> var b = 0;  //Uncaught SyntaxError: Identifier 'b' has already been declared
> //================
> let c = 0;
> function _set(){
>   var c = 0; 
> }
> _set();  //Uncaught SyntaxError: Identifier 'c' has already been declared
> //================
> var d = 0;
> let e = 0;
> const f = 0;
> function _set(){
>   let c = 0;
>   let e = 0;
>   let f = 0;
> }
> _set()  //OK
> ```

- const（声明以后再也不能改变）：

> 声明时必须赋值

``` javascript
const MAX_NUMBER;  //Uncaught SyntaxError: Missing initializer in const declaration
```

> 声明赋值后再也不能改变该变量

``` javascript
 const MAX_NUMBER = 999999999999;
 MAX_NUMBER = 999999999999;  //Assignment to constant variable.
 MAX_NUMBER++; //Assignment to constant variable.
```