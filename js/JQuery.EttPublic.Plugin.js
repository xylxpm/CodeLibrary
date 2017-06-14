/*!
 * Name: jq公共方法
 * Date: 2017.05.23
 * Copyright: Copyright (c) 2016 www.etiantian.com
 * @ author : 徐嫣
 * @ version : 1.00
 */

(function ($) {
   // var laypage = layui.laypage, layer = layui.layer, flow = layui.flow;
    jQuery.fn.extend({

        GetToday: function () {
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            month = month < 10 ? ("0" + month) : month;
            var dt = d.getDate();
            dt = dt < 10 ? ("0" + dt) : dt;
            var today = year + "-" + month + "-" + dt;
            return today
        },

        GetOneWeek: function () {
            var today = new Date();
            var begin;
            var endTime;
            today.setTime(today.getTime() - 7 * 24 * 3600 * 1000);
            begin = today.EttFormat('yyyy-MM-dd');
            return begin
        },

        GetOneWeekAfter: function () {
            var today = new Date();
            var begin;
            var endTime;
            today.setTime(today.getTime() + 6 * 24 * 3600 * 1000);
            begin = today.EttFormat('yyyy-MM-dd');
            return begin
        },

        GetOneMonth: function () {
            var now = new Date($(document).GetToday().replace(/\-/g, "/"));
            var perMonth = new Date(now.setMonth(now.getMonth() - 1));
            var year = perMonth.getFullYear();
            var month = perMonth.getMonth() + 1;
            month = month < 10 ? ("0" + month) : month;
            var dt = perMonth.getDate();
            dt = dt < 10 ? ("0" + dt) : dt;
            var OneMonth = year + "-" + month + "-" + dt;
            return OneMonth;
        },

        GetThreeMonth: function () {
            var now = new Date($(document).GetToday().replace(/\-/g, "/"));
            var perMonth = new Date(now.setMonth(now.getMonth() - 3));
            var year = perMonth.getFullYear();
            var month = perMonth.getMonth() + 1;
            month = month < 10 ? ("0" + month) : month;
            var dt = perMonth.getDate();
            dt = dt < 10 ? ("0" + dt) : dt;
            var OneMonth = year + "-" + month + "-" + dt;
            return OneMonth;
        },

        GetAfterOneYear: function (options) {
            var Defaults = {
                strData: ""
            };
            Defaults = $.extend(Defaults, options);

            var now = new Date(Defaults.strData.replace(/\-/g, "/"));

            var perMonth = new Date(now.setMonth(now.getMonth()));
            var year = perMonth.getFullYear() + 1;
            var month = perMonth.getMonth() + 1;
            month = month < 10 ? ("0" + month) : month;
            var dt = perMonth.getDate();
            dt = dt < 10 ? ("0" + dt) : dt;
            var OneMonth = year + "-" + month + "-" + dt;
            return OneMonth;
        },

        GetDateDiff: function (options) {
            var Defaults = {
                sDate1: "",
                sDate2: ""
            };
            Defaults = $.extend(Defaults, options);
            var aDate, oDate1, oDate2, iDays
            aDate = Defaults.sDate1.split("-")
            oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
            aDate = Defaults.sDate2.split("-")
            oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
            iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
            return iDays
        },

        GetWeekNum: function (options) {
            var Defaults = {
                strData: "",
                isWord: false
            };
            Defaults = $.extend(Defaults, options);
            var day = new Date(Date.parse(Defaults.strData.replace(/-/g, '/')));
            var today = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
            if (Defaults.isWord) {
                return today[day.getDay()];
            } else {
                return day.getDay();
            }
        },

        GetDateStr: function (options) {
            var Defaults = {
                nowData: "",
                AddDayCount: ""
            };
            Defaults = $.extend(Defaults, options);
            var dd = new Date(Defaults.nowData);
            dd.setDate(dd.getDate() + Defaults.AddDayCount);
            var y = dd.getFullYear();
            var m = (dd.getMonth() + 1).toString();
            var d = dd.getDate().toString();
            if (m.length == 1) {
                m = "0" + m;
            }
            if (d.length == 1) {
                d = "0" + d;
            }

            return y + "-" + m + "-" + d;
        },

        GetDataScopeList: function (options) {
            var Defaults = {
                startData: "",
                endData: ""
            };
            Defaults = $.extend(Defaults, options);
            var getDate = function (str) {
                var list = str.split("-");
                var _m = '';

                if (list[1].split("")[0] == 0) {
                    _m = list[1].split("")[1]
                } else {
                    _m = list[1]
                }
                _m--;
                return new Date(list[0], _m, list[2]);
            }
            var date1 = getDate(Defaults.startData);
            var date2 = getDate(Defaults.endData);

            if (date1 > date2) {
                var tempDate = date1;
                date1 = date2;
                date2 = tempDate;
            }
            date1.setDate(date1.getDate());


            var dateArr = [];
            var i = 0;
            while (!(date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate())) {
                var dayStr = date1.getDate().toString();
                var moStr = (date1.getMonth() + 1).toString();
                if (dayStr.length == 1) {
                    dayStr = "0" + dayStr;
                }
                if (moStr.length == 1) {
                    moStr = "0" + moStr;
                }
                //dateArr[i] = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + dayStr;
                dateArr[i] = date1.getFullYear() + "-" + moStr + "-" + dayStr;
                i++;
                date1.setDate(date1.getDate() + 1);
            }
            dateArr.push(Defaults.endData);
            return dateArr;


        },

        SetCookie: function (options) {
            var Defaults = {
                name: "",
                value: ""
            };
            Defaults = $.extend(Defaults, options);

            var str = Defaults.name + '=' + Defaults.value;
            document.cookie = str;
        },

        GetCookie: function (options) {
            var Defaults = {
                name: ""
            };
            Defaults = $.extend(Defaults, options);
            var arr = document.cookie.split('; ');
            var i = 0;
            for (i = 0; i < arr.length; i++) {
                var arr1 = arr[i].split('=');
                if (arr1[0] == Defaults.name) {
                    return arr1[1];
                }
            }
            return '';
        },

        GetDataGridForArt: function (options) {
            /*==================方法说明=========================*/
            /* 本插件用于生成各种表格，具体参数如下               */
            /* 注：只生成表格，不包含其中方法                     */
            /*==================参数说明=========================*/
            /* flow   是否是信息流（滚动加载）             */
            /* isStaticPage   是否是静态分页（假分页，不走接口的）             */
            /* staticDataList   静态分页数据源（数据list）             */
            /* flow   是否是信息流（滚动加载）             */
            /* submitWay   提交方式             */
            /* dataUrl   数据源地址             */
            /* dataListName   数据源名称             */
            /* hasPage    是否要分页               */
            /* hasCondition    是否有搜索条件（startTime，endTime，searchValu）               */
            /* pageIndexName    当前页码(字段名)               */
            /* pageIndexNum    当前页码(值)               */
            /* pageSize    每页数据量               */
            /* tableContainer    table所在容器               */
            /* pageContainer    page所在容器               */
            /* param    其他参数               */
            /* callbackFunction    回调方法               */
            /* imageUrl 占位图地址 */
            /* scriptHtml art模板 */
            /*===================================================*/
            var Defaults = {
                flow: false,
                isStaticPage: false,
                staticDataList: null,
                submitWay: "post",
                dataUrl: "",
                dataListName: "",
                hasPage: false,
                hasCondition: false,
                pageIndexName: "",
                pageIndexNum: 1,
                pageSize: 5,
                tableContainer: '',
                pageContainer: "",
                param: "",
                callbackFunction: null,
                imageUrl: "",
                scriptHtml: ""
            };

            var Defaults = $.extend(Defaults, options);
            var data = new Array();
            var totalCount;
            var c = "";

            var findInput = function (num) {
                c = '"currentPage": "' + num + '","pageSize": "' + Defaults.pageSize + '","r": "' + Math.random() + '",';
                if (Defaults.hasCondition) {
                    var d = $(Defaults.tableContainer).find('input[type!="button"]');
                    $.each(d, function (i, item) {
                        if (i != d.length - 1) c += '"' + $(item).attr('name') + '":"' + $(item).val() + '",';
                        else c += '"' + $(item).attr('name') + '":"' + $(item).val() + '"';
                    });
                    if (Defaults.param != "") {
                        c = '{' + c + Defaults.param + '}';
                    } else {
                        c = '{' + c.substring(0, c.length - 1) + '}';
                    }

                } else {
                    if (Defaults.param != "") {
                        c = '{' + c + Defaults.param.toString() + '}';
                    } else {
                        c = '{' + c.substring(0, c.length - 1) + '}';
                    }
                }
                return jQuery.parseJSON(c);
            }

            var _layerindex;

            function queryForm() {
                $(Defaults.tableContainer).removeAttr("style");
                $.ajax({
                    url: Defaults.dataUrl,
                    data: findInput(Defaults.pageIndexNum),
                    type: Defaults.submitWay,
                    dataType: "jsonp",
                    beforeSend: function (e) {
                        _layerindex = layer.load(0, {shade: [0.3, '#000']});
                    },
                    success: function (d) {

                        layer.close(_layerindex);
                        if (d.result == 1) {
                            if (d.data != null && d.data != undefined && d.data.length != 0) {
                                for (var key in d.data) {
                                    if (key == Defaults.dataListName) {

                                        var data = d.data[Defaults.dataListName];


                                        if (data != null && data.length != 0) {

                                            template.config("escape", false);
                                            var render = template.compile(Defaults.scriptHtml);
                                            var html = render({
                                                list: data
                                            });

                                            $(Defaults.tableContainer).html(html);

                                            if (Defaults.callbackFunction != null) {
                                                Defaults.callbackFunction();
                                            }

                                            if (Defaults.hasPage) {
                                                $(Defaults.pageContainer).html("");
                                                totalCount = d.data.totalCount;
                                                pageInitialize($(Defaults.pageContainer), Defaults.pageIndexNum, Defaults.pageSize, totalCount);
                                            }
                                        } else {
                                            $(Defaults.tableContainer).css("background", "url(" + Defaults.imageUrl + ") no-repeat center center");
                                        }
                                    } else {
                                        // $(Defaults.tableContainer).css("background", "url(" + Defaults.imageUrl + ") no-repeat center center");
                                    }
                                }
                            }
                        } else if (d.result == 3) {
                            $(Defaults.tableContainer).css("background", "url(" + Defaults.imageUrl + ") no-repeat center center");
                        }
                        else {
                            layer.msg('<div>' + d.msg + '</div>', {time: TIME});
                        }
                    },
                    error: function (e) {
                        layer.close(_layerindex);
                        layer.msg('<div>出错了，稍后再试</div>', {time: TIME});
                    }
                });
            }

            function queryFormFlow() {
                flow.load({
                    elem: Defaults.tableContainer,
                    done: function (page, next) { //到达临界点（默认滚动触发），触发下一页
                        $(Defaults.tableContainer).removeAttr("style");
                        $.ajax({
                            url: Defaults.dataUrl,
                            data: findInput(Defaults.pageIndexNum),
                            type: Defaults.submitWay,
                            dataType: "jsonp",
                            beforeSend: function (e) {
                                _layerindex = layer.load(0, {shade: [0.3, '#000']});
                            },
                            success: function (d) {
                                layer.close(_layerindex);
                                if (d.result == 1) {
                                    if (d.data != null && d.data != undefined && d.data.length != 0) {
                                        for (var key in d.data) {
                                            if (key == Defaults.dataListName) {

                                                var data = d.data[Defaults.dataListName];
                                                if (data != null && data.length != 0) {

                                                    template.config("escape", false);
                                                    var render = template.compile(Defaults.scriptHtml);
                                                    var html = render({
                                                        list: data
                                                    });

                                                    next($(Defaults.tableContainer).append(html), page < d.data.totalPage);

                                                    if (Defaults.callbackFunction != null) {
                                                        Defaults.callbackFunction();
                                                    }

                                                } else {
                                                    $(Defaults.tableContainer).css("background", "url(" + Defaults.imageUrl + ") no-repeat center center");
                                                }
                                            }
                                        }
                                    } else {
                                        $(Defaults.tableContainer).css("background", "url(" + Defaults.imageUrl + ") no-repeat center center");
                                    }
                                } else if (d.result == 3) {
                                    $(Defaults.tableContainer).css("background", "url(" + Defaults.imageUrl + ") no-repeat center center");
                                } else {
                                    layer.msg('<div>' + d.msg + '</div>', {time: TIME});
                                }
                            },
                            error: function (e) {
                                layer.close(_layerindex);
                                layer.msg('<div>出错了，稍后再试</div>', {time: TIME});
                            }
                        })
                    }
                });
            }

            function queryStaticForm(curr) {
                $(Defaults.tableContainer).removeAttr("style");
                var nums = Defaults.pageSize

                if (Defaults.staticDataList != null && Defaults.staticDataList.length > 0) {
                    var last = curr * nums - 1, data = new Array();
                    last = last >= Defaults.staticDataList.length ? (Defaults.staticDataList.length - 1) : last;

                    for (var i = (curr * nums - nums); i <= last; i++) {
                        data.push(Defaults.staticDataList[i])
                    }
                    template.config("escape", false);
                    var render = template.compile(Defaults.scriptHtml);
                    var html = render({
                        list: data
                    });

                    $(Defaults.tableContainer).html(html);

                    if (Defaults.callbackFunction != null) {
                        Defaults.callbackFunction();
                    }

                    if (Defaults.staticDataList.length > 0 && Defaults.hasPage) {
                        $(Defaults.pageContainer).html("");
                        totalCount = Defaults.staticDataList.length;
                        pageStaticInitialize($(Defaults.pageContainer), Defaults.pageIndexNum, Defaults.pageSize, totalCount);
                    }
                } else {
                    $(Defaults.tableContainer).css("background", "url(" + Defaults.imageUrl + ") no-repeat center center");
                }

            }

            function pageStaticInitialize(pageContainer, pageIndex, pageSize, totalCount) {
                laypage({
                    cont: pageContainer,
                    pages: Math.ceil(totalCount / pageSize),
                    curr: pageIndex,
                    first: false,
                    last: false,
                    prev: '<i class="ett-toll-page-left"></i>',
                    next: '<i class="ett-toll-page-right"></i>',
                    jump: function (e, first) {
                        Defaults.pageIndexNum = e.curr;
                        if (!first) {
                            queryStaticForm(e.curr);
                        }
                    }
                });
            }

            function pageInitialize(pageContainer, pageIndex, pageSize, totalCount) {
                laypage({
                    cont: pageContainer,
                    pages: Math.ceil(totalCount / pageSize),
                    curr: pageIndex,
                    first: false,
                    last: false,
                    prev: '<i class="ett-toll-page-left"></i>',
                    next: '<i class="ett-toll-page-right"></i>',
                    jump: function (e, first) {
                        Defaults.pageIndexNum = e.curr;
                        if (!first) {
                            queryForm();
                        }
                    }
                });
            }


            if (Defaults.flow) {
                queryFormFlow()
            } else if (Defaults.isStaticPage) {
                queryStaticForm(Defaults.pageIndexNum);
            } else {
                queryForm();
            }


            var method = {};
            return method.getPageIndex = function () {
                return this.pageIndex;
            },
                method.onReload = function () {
                    queryForm();
                },
                method.onLoad = function () {
                    opts.pageIndex = 0;
                    queryForm();
                },
                method.getData = function () {
                    return data;
                },
                method.getTotalCount = function () {
                    return totalCount;
                },
                method
        },

        CountDown: function (opt) {
            function CountDown(ele, opt) {

                this.opt = $.extend({}, opt || {
                        time: 60, before: function () {
                        }, after: function () {
                        }
                    });

                this.opt.curTime = this.opt.time;

                this.opt.defaultText = $(ele).html() || $(ele).val();

                var _this = this;

                $(ele).on('click', function (e) {
                    if (_this.opt.curTime !== _this.opt.time) {

                        e.stopPropagation();
                        return false;
                    }
                    if (_this.opt.curTime === _this.opt.time) {
                        _this.opt.before.call(ele);
                    }
                    cd.call(this.cd, this);

                });

                function cd(ele) {
                    var _this = this;
                    if (_this.opt.curTime === 0) {
                        _this.opt.curTime = _this.opt.time;
                        _this.opt.after.call(ele);
                        ele.innerHTML = ele.value = _this.opt.defaultText;
                        return;
                    }
                    ele.innerHTML = ele.value = (_this.opt.curTime--) + 'S';
                    setTimeout(function () {
                        cd.call(_this, ele);
                    }, 1000);
                }
            }


            return this.each(function () {
                if (!this.cd) {
                    this.cd = new CountDown(this, opt);
                }
            });

        },

        /* 动态加载css和js文件 */
        LoadJsCssFile: function (options) {
            var Defaults = {
                filename: '',
                filetype: ''
            };
            Defaults = $.extend(Defaults, options);
            if (Defaults.filetype == "js") {
                var fileref = document.createElement('script');
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", Defaults.filename);
            } else if (filetype == "css") {
                var fileref = document.createElement('link');
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", Defaults.filename);
            }
            if (typeof fileref != "undefined") {
                document.getElementsByTagName("head")[0].appendChild(fileref);
            }
        },

        /* 取得js文件后参数值 */
        GetJSQueryString: function (paramName) {
            var Defaults = {
                paramName: ''
            };
            Defaults = $.extend(Defaults, options);
            var tt
            var jsFileName = Defaults.paramName;
            var rName = new RegExp(jsFileName + "(\\?(.*))?$")
            var jss = document.getElementsByTagName('script');
            for (var i = 0; i < jss.length; i++) {
                var j = jss[i];
                if (j.src && j.src.match(rName)) {
                    var oo = j.src.match(rName)[2];
                    if (oo && (t = oo.match(/([^&=]+)=([^=&]+)/g))) {
                        for (var l = 0; l < t.length; l++) {
                            r = t[l];
                            tt = r.match(/([^&=]+)=([^=&]+)/);
                            if (tt) {
                                return tt;
                            }
                        }
                    }
                }
            }
            return "";
        },

        SetUrlParam: function (para_name, para_value, url) {
            var strNewUrl = new String();
            var strUrl = url;
            if (strUrl.indexOf("?") != -1) {
                strUrl = strUrl.substr(strUrl.indexOf("?") + 1);
                //alert(strUrl);
                if (strUrl.toLowerCase().indexOf(para_name.toLowerCase()) == -1) {
                    strNewUrl = url + "&" + para_name + "=" + para_value;
                    return strNewUrl;
                } else {
                    var aParam = strUrl.split("&");
                    //alert(aParam.length);
                    for (var i = 0; i < aParam.length; i++) {
                        if (aParam[i].substr(0, aParam[i].indexOf("=")).toLowerCase() == para_name.toLowerCase()) {
                            aParam[i] = aParam[i].substr(0, aParam[i].indexOf("=")) + "=" + para_value;
                        }
                    }

                    strNewUrl = url.substr(0, url.indexOf("?") + 1) + aParam.join("&");
                    // alert(strNewUrl);
                    return strNewUrl;
                }

            } else {
                strUrl += "?" + para_name + "=" + para_value;
                //alert(strUrl);
                return strUrl
            }
        },

        GetRequest: function (paramName) {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },

        WhichBrowser: function () {
            var agt = navigator.userAgent.toLowerCase();
            if (agt.indexOf("opera") != -1) return 'Opera';
            if (agt.indexOf("staroffice") != -1) return 'Star Office';
            if (agt.indexOf("webtv") != -1) return 'WebTV';
            if (agt.indexOf("beonex") != -1) return 'Beonex';
            if (agt.indexOf("chimera") != -1) return 'Chimera';
            if (agt.indexOf("netpositive") != -1) return 'NetPositive';
            if (agt.indexOf("phoenix") != -1) return 'Phoenix';
            if (agt.indexOf("firefox") != -1) return 'Firefox';
            if (agt.indexOf("chrome") != -1) return 'chrome';
            if (agt.indexOf("safari") != -1) return 'Safari';
            if (agt.indexOf("skipstone") != -1) return 'SkipStone';
            if (agt.indexOf("msie") != -1) return 'Internet Explorer';
            if (agt.indexOf("netscape") != -1) return 'Netscape';
            if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
            if (agt.indexOf('\/') != -1) {
                if (agt.substr(0, agt.indexOf('\/')) != 'mozilla') {
                    return navigator.userAgent.substr(0, agt.indexOf('\/'));
                }
                else return 'Netscape';
            } else if (agt.indexOf(' ') != -1)
                return navigator.userAgent.substr(0, agt.indexOf(' '));
            else return navigator.userAgent;
        },

        UItoTop: function (options) {
            var defaults = {
                min: 200,
                inDelay: 600,
                outDelay: 400,
                containerID: 'toTop',
                containerHoverID: 'reTop',
                scrollSpeed: 300,
                easingType: 'linear'
            };
            var settings = $.extend(defaults, options);
            var containerIDhash = '#' + settings.containerID;
            $(containerIDhash).hide().click(function () {
                $('html, body').animate({scrollTop: 0}, settings.scrollSpeed, settings.easingType);
                $(this).stop().animate({}, settings.inDelay, settings.easingType);
                return false;
            });

            if ($(window).scrollTop() > settings.min) {
                $(containerIDhash).fadeIn(settings.inDelay);
            }
            $(window).scroll(function () {
                var sd = $(window).scrollTop();
                if (sd > settings.min) {
                    $(containerIDhash).fadeIn(settings.inDelay);
                } else {
                    $(containerIDhash).fadeOut(settings.Outdelay);
                }
            });
        },

        FollowingRoll: function (options) {
            var defaults = {
                conTopHeight: 250, /*滚动容器与页面顶部的距离*/
                conAfterTopHeight: 105, /*滚动容器之后的容器与滚动容器直接的高*/
                container: $('.js_menudiv'), /*需要跟随的容器*/
                containerAfter: $(".goods_tab")/*滚动容器之后的容器*/
            };
            var settings = $.extend(defaults, options);
            $(window).scroll(function () {    //滚动
                var _scroll = $(window).scrollTop();  //滚动条高度
                if (_scroll >= settings.conTopHeight) {    //判断当大于等于对象的offsetTop的时候
                    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) { //针对IE6的判断
                        settings.container.css({'top': _scroll - settings.conTopHeight, 'z-index': '90'});
                    } else {
                        settings.container.css({'position': 'fixed', 'top': '0', 'z-index': '90'});
                        settings.containerAfter.css("margin-top", settings.conAfterTopHeight);
                    }
                } else {
                    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) { //针对IE6的判断
                        settings.container.css({'top': '0'});
                    } else {
                        settings.container.css({'position': 'relative'});
                        settings.containerAfter.css("margin-top", 0);
                    }
                }
            });

        },

        /* 折叠吸顶插件
         *  页面是列表显示，包含大分类和下属条目，条目初始折叠。滚动时，展开的那个大分类吸顶。页面见0.html
         *  参数说明
         *   ObjClass：折叠和吸顶的触发元素，即大分类（class名称）
         *   Placeholder:占位元素id前缀
         *   ObjHeight：吸顶元素的高速
         *   FixClassName : 吸顶效果的class
         *   ListsClassName：条目的class
         *   CrrClassName：大分类的icon
         *
         * */
        Sticky: function (options) {
            var defaults = {
                ObjClass: '.class-head',
                Placeholder: "sticky-place",
                ObjHeight: 60,
                FixClassName: "fix",
                ListsClassName:'.weui-cells',
                CrrClassName:"class-head-icon-crr"
            };
            var settings = $.extend(defaults, options);


            var $head = null, $next_head = null, btop = 0, titleTop = 0;

            $(settings.ObjClass).off().on('click', function () {
                $("div[id^=sticky-place]").remove();
                $(settings.ObjClass).removeAttr('style');
                var _this = $(this);
                var _isopen = _this.attr('isopen');
                $(settings.ObjClass).removeClass(settings.FixClassName);
                if (_isopen == 0) {
                    $(settings.ObjClass).attr('isopen', '0');
                    $(settings.ListsClassName).addClass('hide');
                    $(settings.ObjClass).find('i').removeClass(settings.CrrClassName);
                    _this.attr('isopen', '1');
                    _this.next('div').removeClass('hide');
                    _this.find('i').addClass(settings.CrrClassName);
                    $head = _this;
                    $next_head = _this.next().next();
                    titleTop = _this.offset().top;

                } else if (_isopen == 1) {
                    $head = null, $next_head = null;
                    _this.attr('isopen', '0');
                    _this.next('div').addClass('hide');
                    _this.find('i').removeClass(settings.CrrClassName);
                }

                $(window).scrollTop(titleTop);

            });
            $(window).scroll(function () {
                btop = document.body.scrollTop || document.documentElement.scrollTop;
                if ($head != null) {

                    var nexttop1 = $head.offset().top
                    var nexttop = $next_head.offset().top - btop;

                    if (btop > titleTop) {
                        addPlaceholder($head, $head.attr('id'));
                        $head.addClass(settings.FixClassName);
                    } else {
                        $head.removeClass(settings.FixClassName).removeAttr('style');
                        removePlaceholder($head.attr('id'));

                    }

                    if (nexttop <= settings.ObjHeight) {
                        $head.css("position", "absolute").css("top", nexttop1 + "px");
                    } else {
                        $head.removeAttr('style');
                    }

                }
            })

            var addPlaceholder = function (obj, id) {
                if ($('#'+settings.Placeholder + id).length != 0) {
                    return;
                } else {
                    var width = obj.width(), height = obj.height();
                    obj.before('<div style="width: ' + width + 'px; height: ' + height + 'px; visibility: hidden;" id="' + settings.Placeholder + id + '"></div>')
                }

            }
            var removePlaceholder = function (id) {
                $('#'+settings.Placeholder + id).remove();
            };


        }

    })

})(jQuery);
