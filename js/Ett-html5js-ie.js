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



function BrowserType() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器

    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return "IE7";
        }
        else if (fIEVersion == 8) {
            return "IE8";
        }
        else if (fIEVersion == 9) {
            return "IE9";
        }
        else if (fIEVersion == 10) {
            return "IE10";
        }
        else if (fIEVersion == 11) {
            return "IE11";
        }
        else {
            return "0"
        }//IE版本过低
    }//isIE end

    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }
    if (isEdge) {
        return "Edge";
    }
}//myBrowser() end

//判断是否是IE浏览器
function isIE() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    if (isIE) {
        return "1";
    }
    else {
        return "-1";
    }
}

//判断是否是IE浏览器，包括Edge浏览器
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return "IE7";
        }
        else if (fIEVersion == 8) {
            return "IE8";
        }
        else if (fIEVersion == 9) {
            return "IE9";
        }
        else if (fIEVersion == 10) {
            return "IE10";
        }
        else if (fIEVersion == 11) {
            return "IE11";
        }
        else {
            return "0"
        }//IE版本过低
    }
    else if (isEdge) {
        return "Edge";
    }
    else {
        return "-1";//非IE
    }
}


/*—————————————————————————————————————————————————————————————————以下代码可以判断ie11—————————————————————————————————————————————————————————————————————————————————————*/
/**
 * Usually used browser compatibility.
 * Get browser name agent version.
 * return browser name and version.
 * return eg：ie9.0、ie11.0、firefox34.0、chrome37.0
 * */
function getBrowserNV(){
    var agent = navigator.userAgent.toLowerCase();
    var regStr_ie = /msie [\d.]+/gi ;
    var regStr_ff = /firefox\/[\d.]+/gi
    var regStr_chrome = /chrome\/[\d.]+/gi ;
    var regStr_saf = /safari\/[\d.]+/gi ;
    var browserNV = "";
    //IE
    if(agent.indexOf("msie") > 0){
        browserNV = agent.match(regStr_ie) ;
    }
    //firefox
    if(agent.indexOf("firefox") > 0){
        browserNV = agent.match(regStr_ff) ;
    }
    //Chrome
    if(agent.indexOf("chrome") > 0){
        browserNV = agent.match(regStr_chrome) ;
    }
    //Safari
    if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0){
        browserNV = agent.match(regStr_saf) ;
    }
    browserNV = browserNV.toString();
    //other
    if(""==browserNV){
        browserNV  = "Is not a standard browser";
    }
    //Here does not display "/"
    if(browserNV.indexOf('firefox')!= -1 || browserNV.indexOf('chrome')!= -1){
        browserNV = browserNV.replace("/","");
    }
    //Here does not display space
    if(browserNV.indexOf('msie')!= -1){
        //msie replace IE & trim space
        browserNV = browserNV.replace("msie","ie").replace(/\s/g,"");
    }
    if(browserNV == "Is not a standard browser"){
        if(isIENew()){
            browserNV = "ie11.0";
        }
    }
    //return eg:ie9.0 firefox34.0 chrome37.0
    return browserNV;
}
//IE11
function isIENew() { //IE
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}