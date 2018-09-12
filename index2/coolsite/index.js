var _coolsite = require('./coolsite.js');
var _ani = require('./animation.js');
var _act = require('./action.js');
var _component = require('./component.js');
var _timeline = require('./timeline.js');
var coolsite360 = {
    _coolsite: _coolsite,
    Ani: _ani,
    Act:_act,
    Component:_component,
    globalTimeline:{},
    globalAni:{},
    $:_coolsite.$,
    Query:_coolsite.$,
    fireEvent:_coolsite.callEvent,
    DATA:{},
    Timeline:_timeline,
    drawCanvasCir : _component.drawCanvasCir
}

//coolsite360 注册
coolsite360.register = function(d){
    var config = coolsite360.DATA[d.__route__];
    if(!config) return;
    //注册动画
    if(config.animations) coolsite360.Ani.register(d,config.animations);
    //注册事件
    if(config.actions) coolsite360.Act.register(d,config.actions);
    //注册组件
    coolsite360.Component.register(d);
}
//coolsite360 组件模块执行
coolsite360.onShow = function(d){
    coolsite360.Component.onShow(d);
}
module.exports = coolsite360;


