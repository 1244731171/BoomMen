class Tips
{
    constructor() {
        this.registedDomMap = new Map();
    }

    set eventer(eventer) {

    }

    /**
     * @description 注册固定的
     * @param {Object} domInfo 
     * {
            // 节点
            dom: dom,
            // 唯一id
            id: 'id',
            // 隐藏属性：自动隐藏 人工隐藏 
            hideType: 'autoHide' || 'manualHide',
            // 如果是自动隐藏要设置该属性
            time: 5000, // timeType === 'autoHide', defaultValue = 3000 
            // 位置属性：左侧浮动 中部浮动 右侧浮动 固定
            positionType: 'left' || 'right' || 'middle' || 'fixed',
            // 定位属性
            top: 100, // positionType === 'fixed', top > bottom
            bottom: 100, // positionType === 'fixed'
            left: 100, // positionType === 'fixed', left > right
            right: 100, // positionType === 'fixed'
        }
     */
    registerDomTips(domInfo){
        // append dom on stage
        this.renderDom(domInfo);
        this.registedDomMap.set(domInfo['id'], domInfo);
    }

    registerTextTips(testInfo){

    }

    fireEvent(data){
        this.eventer.fire(data);
    }
}