/*!
 * Name: jq公共方法
 * Date: 2017.05.23
 * Copyright: Copyright (c) 2016 www.etiantian.com
 * @ author : 徐嫣
 * @ vrsion : 1.00
 */

(function ($) {
    var laypage = layui.laypage, layer = layui.layer, flow = layui.flow;
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
        }

    })

})(jQuery);
