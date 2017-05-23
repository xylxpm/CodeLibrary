/*!
 * Name: 兼容html5js插件
 * Date: 2016.11.16
 * Copyright: Copyright (c) 2016 www.etiantian.com
 * @author : 徐嫣
 * @version : 1.00
 * @function : 本插件解决ie9不支持html5新加入的js api。一些新的api做向下兼容的脚步处理。如果页面要使用h5新的js，请先加载本插件
 */

/*!
 * Explain: 解决ie9以下不支持classList方法
 */
if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function () {
            var self = this;

            function update(fn) {
                return function (value) {
                    var classes = self.className.split(/\s+/g),
                        index = classes.indexOf(value);
                    fn(classes, index, value);
                    self.className = classes.join(" ");
                }
            }

            return {
                add: update(function (classes, index, value) {
                    if (!~index) classes.push(value);
                }),
                remove: update(function (classes, index) {
                    if (~index) classes.splice(index, 1);
                }),
                toggle: update(function (classes, index, value) {
                    if (~index)
                        classes.splice(index, 1);
                    else
                        classes.push(value);
                }),
                contains: function (value) {
                    return !!~self.className.split(/\s+/g).indexOf(value);
                },
                item: function (i) {
                    return self.className.split(/\s+/g)[i] || null;
                }
            };
        }
    });
}


Date.prototype.EttFormat = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
        (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

