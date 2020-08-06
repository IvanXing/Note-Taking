const proto = {}

function defineGetter(target,key){
    // 已经被废弃了  Object.defineProperty
    proto.__defineGetter__(key,function () {
        return this[target][key];
    });
}

function defineSetter(target,key){
    // 已经被废弃了  Object.defineProperty
    proto.__defineSetter__(key,function (value) {
        this[target][key] = value;
    });
}
defineGetter('request','url'); // ctx.url => ctx.request.url
defineGetter('request','path');
defineGetter('request','query');// ctx.query => ctx.request.query


defineGetter('response','body');// ctx.body => ctx.response.body
defineSetter('response','body');// ctx.body => ctx.response.body
module.exports = proto;
