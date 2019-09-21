# Canvas #

## 注意事项 ##


## 初始化 ##
``` javascript
    // 获取 canvas 对象
    let canvas = document.getElementById('myCanvas')
    canvas.width = 750
    canvas.height = 1054
    // 获取 canvas 2D 上下文对象
    let ctx = canvas.getContext('2d')
```

## 平移translate + 旋转rotate ##
``` javascript
    // 平移translate方法和旋转rotate方法只能影响后画的东西，之前画的不受影响
    // 使用了坐标系位移了就不要在在画东西的时候增加位移

    // 平移 - 该操作后,画布坐标系就变了，新画的x,y都是平移以后的
    ctx.translate(x, y);
    // 旋转 - 该操作后,画布坐标系就变了，新画的x,y都是旋转以后的
    ctx.rotate(angle * Math.PI / 180);
    // 画完以后如果想恢复原来的坐标系
    // 1.完全逆操作
    // 形变开始
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    // 逆操作
    ctx.rotate(-angle * Math.PI / 180);
    ctx.translate(-x, -y);

    // 2.利用save()和restore()，详见save()和restore()解释
    // 保存形变前的坐标系
    ctx.save();
    // 形变开始
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    // 恢复最近一次保存的坐标系
    ctx.restore();
```

## 坐标系保存save() 和 恢复restore() ##
``` javascript 
    // save()会将当前坐标系保存进一个数据，等待restore()方法恢复
    // save()相当于数组操作的push()，restore()相当于数组操作的pop()
    // 保存当前坐标系1
    ctx.save();
    // 形变开始
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    // 保存当前坐标系2
    ctx.save();
    // 形变开始2
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    // 恢复坐标系2
    ctx.restore();
    // 恢复坐标系1
    ctx.restore();
```

## 翻转坐标轴(缩放) ##
``` javascript 
    // -1代表对应坐标轴反转
    // 翻转x轴
    ctx.scale(-1, 1);
    draw(img, 0, 0, w, h);
    // 继续翻转y轴(x,y轴都被翻转)
    ctx.scale(1, -1);
    draw(img, 0, 0, w, h);
    // 继续翻转x轴(y轴都被翻转)
    ctx.scale(-1, 1);
    draw(img, 0, 0, w, h);
    // 继续翻转y轴(x,y轴重置)
    ctx.scale(1, -1);
    draw(img, 0, 0, w, h);
```

## 矩阵 转换  transform ##
### 矩阵计算是用来计算位移后每个点坐标 ###
1. 矩阵关系
    x'       a  c  e     x       ax + cy + e
  [ y' ] = [ b  d  f ] [ y ] = [ bx + dy + f ]
    0        0  0  1     1            1
2. 公式  (x,y)为原坐标 (x',y')是位移后坐标
    x' = ax + cy + e
    y' = bx + dy + f
``` javascript 
    // 矩阵参数 a b c d e f
    ctx.transform(a, b, c, d, e, f);

    // 平移 translate 
    // x' = 1x+0y+tx = x+tx
    // y' = 0x+1y+ty = y+ty
    // 坐标系,x轴位移x y轴位移y
    ctx.transform(1, 0, 0, 1, x, y);
    draw(img, 0, 0, w, h);

    // 旋转 rotate 
    // x' = x*cosθ-y*sinθ+0 = x*cosθ-y*sinθ
    // y' = x*sinθ+y*cosθ+0 = x*sinθ+y*cosθ
    // 坐标系,中心顺时针旋转30度
    ctx.save();
    ctx.transform(cos(30), sin(30), -sin(30), cos(30), 0, 0);
    draw(img, 0, 0, w, h);
    ctx.restore();

    // 缩放 scale 
    // x' = Sx*x+0y+0 = Sx*x
    // y' = 0x+Sy*y+0 = Sy*y
    // 0.5倍大小
    ctx.save();
    ctx.transform(0.5, 0, 0, 0.5, 0, 0);
    draw(img, 0, 0, w, h);
    ctx.restore();
    // y轴翻转
    ctx.save();
    ctx.transform(-1, 0, 0, 1, 0, 0);
    draw(img, 0, 0, w, h);
    ctx.restore();
    // X轴翻转
    ctx.save();
    ctx.transform(1, 0, 0, -1, 0, 0);
    draw(img, 0, 0, w, h);
    ctx.restore();

    // 定义(ux,uy)为直线(y=kx)方向的单位向量
    // ux=1/sqrt(1+k^2)
    // uy=k/sqrt(1+k^2)
    // x' = (2*ux^2-1)*x+2*ux*uy*y
    // y' = 2*ux*uy*x+(2*uy^2-1)*y
    // x轴旋转 直线 y=0
    ctx.save();
    // 45度
    let k = 1 / tan(45);
    let ux = 1 / Math.sqrt(1 + k * k);
    let uy = k / Math.sqrt(1 + k * k);
    ctx.transform((2 * ux * ux - 1), (2 * ux * uy), (2 * ux * uy), (2 * uy * uy - 1), 0, 0);
    draw(img, 0, 0, w, h);
    // 标出 y=kx
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 200 * k);
    ctx.stroke();
    ctx.restore();
```
