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