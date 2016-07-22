/*选项卡切换*/
(function () {
    var boxList = utils.getElementsByClass("box");
    var box1 = new zyyTab(boxList[0], 0);
    var box2 = new zyyTab(boxList[1], 0);
})();

/*recommend_shop 鼠标滑过显示隐藏*/
(function () {
    var zhao = utils.getElementsByClass("zhao");
    var mask = utils.getElementsByClass("mask");
    var adds = utils.getElementsByClass("add");
    for (var i = 0; i < zhao.length; i++) {
        var aa = zhao[i];
        aa.index = i;
        aa.onmouseenter = function () {
            mask[this.index].style.display = "block";
        };
        aa.onmouseleave = function () {
            mask[this.index].style.display = "none";
        }
    }
    for (var j = 0; j < adds.length; j++) {
        var bb = adds[j];
        bb.index = j;
        bb.onmouseenter = function () {
            adds[this.index].innerHTML = "取消关注";
        };
        bb.onmouseleave = function () {
            adds[this.index].innerHTML = "已关注";
        }
    }
})();

/*nav to fixed*/
(function () {
    var nav = utils.getElementsByClass("nav")[0];

    function nav_fixed() {
        var aa = utils.win("scrollTop");
        if (aa > 150) {
            nav.style.position = "fixed";
            nav.style.top = "0px";
            nav.style.zIndex = "99";
        } else {
            nav.style.position = "static";
        }
    }

    window.onscroll = nav_fixed;
})();

/*banner_left_list*/
(function () {
    var list_lis = utils.getElementsByClass("list_left_li");
    var list_right = utils.getElementsByClass("list_right");
    for (var i = 0; i < list_lis.length; i++) {
        var cc = list_lis[i];
        cc.index = i;
        cc.onmouseenter = function () {
            list_right[this.index].style.display = "block";
            utils.addClass(this, "act");
        };
        cc.onmouseleave = function () {
            list_right[this.index].style.display = "none";
            utils.removeClass(this, "act");
        }
    }
})();

/*right_bar*/
(function () {
    var relative_div = utils.getElementsByClass("relative_div")[0];
    var bar_two = utils.getElementsByClass("bar_two")[0];

    relative_div.onmouseenter = function () {
        zyyAnimate(bar_two, {left: 0}, 300);
    };
    relative_div.onmouseleave = function () {
        zyyAnimate(bar_two, {left: 38}, 300);
    };

    var cart = utils.getElementsByClass("xs");
    var che = utils.getElementsByClass("bar_che");

    for (var i = 0; i < cart.length; i++) {
        var aa = cart[i];
        aa.index = i;
        aa.onmouseenter = function () {
            var em = this.getElementsByTagName("em");
            em[0].style.display = "none";
            em[1].style.display = "block";
            this.style.background = "#f69";
            if(this.index>1){
                var tip = this.getElementsByTagName("div")[0];
                tip.style.display = "block";
                return;
            }
            che[this.index].style.color = "#fff";
        };
        aa.onmouseleave = function () {
            var em = this.getElementsByTagName("em");
            em[0].style.display = "block";
            em[1].style.display = "none";
            this.style.background = "#f6f6f6";
            if(this.index>1){
                var tip = this.getElementsByTagName("div")[0];
                tip.style.display = "none";
                return;
            }
            che[this.index].style.color = "#666";
        }
    }
})();

/*nav更多*/
(function () {
    var drop = utils.getElementsByClass("drop");
    var down = utils.getElementsByClass("down");

    for(var i=0;i<drop.length;i++){
        var dropDa = drop[i];
        dropDa.index = i;
        dropDa.onmouseenter = function () {
            down[this.index].style.display = "block";
        };
        dropDa.onmouseleave = function () {
            var cc = utils.lastChild(this, "down");
            down[this.index].style.display = "none";
        }
    }
})();

/*foot*/
!function () {
    var link_side = utils.getElementsByClass("link_side")[0];
    var lis = utils.children(link_side, "li");
    var count = lis.length;
    var step = 0, interval = 1500, autoTimer = null;
    autoTimer = window.setInterval(autoMove, interval);
    function autoMove() {
        if (step >= (count - 1)) {
            step = 0;
            link_side.style.top = 0;
        }
        step++;
        zyyAnimate(link_side, {top: -step * 32}, 500);
    }
}();

/*go top*/
!function () {
    var goLink = utils.getElementsByClass("go_top")[0];
    var em = utils.firstChild(goLink);
    var div = utils.lastChild(goLink);
    goLink.onmouseenter = function () {
        em.style.display = "none";
        div.style.display = "block";
    };
    goLink.onmouseleave = function () {
        em.style.display = "block";
        div.style.display = "none";
    };

    window.onscroll = computedDisplay;
    function computedDisplay() {
        var curTop = document.documentElement.scrollTop || document.body.scrollTop;
        var curHeight = document.documentElement.clientHeight || document.body.clientHeight;
        goLink.style.display = curTop > curHeight ? "block" : "none";
    }

    goLink.onclick = function () {
        this.style.display = "none";
        window.onscroll = null;

        var duration = 500, interval = 10, target = document.documentElement.scrollTop || document.body.scrollTop;
        var step = (target / duration) * interval;
        var timer = window.setInterval(function () {
            var curTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (curTop === 0) {
                window.clearInterval(timer);
                window.onscroll = computedDisplay;
                return;
            }
            curTop -= step;
            document.documentElement.scrollTop = curTop;
            document.body.scrollTop = curTop;
        }, interval);
    }
}();

/*search*/
!(function () {
    var searchInput = utils.getElementsByClass('search_input')[0];
    var searchBtn = utils.getElementsByClass('search_btn')[0];
    var box = utils.getElementsByClass('search-list-content')[0];
    var ul = utils.getElementsByClass('a')[0];
    var boxIsShow = {
        isShow: false,
        show: function () {
            if (!this.isShow) {
                box.style.display = 'block';
                this.isShow = true;
            }
        },
        hide: function () {
            if (this.isShow) {
                box.style.display = 'none';
                this.isShow = false;
            }
        }
    };
    searchInput.onkeyup = searchBtn.onclick = function (e) {
        var value = searchInput.value;
        if (value !== null) {
            boxIsShow.show();
            callBaiDu(value);
        }
        e.cancelBubble = true;
        e.stopPropagation();
        return false;
    };

    /**
     * 调用百度jsonp接口
     * @param {string} value 要搜索的关键字
     */
    function callBaiDu(value) {
        jsonp('http://suggestion.baidu.com/su', {wd: value}, 'cb', function (data) {
            var fragement = document.createDocumentFragment();
            for (var i = 0, len = data.s.length; i < len; i++) {
                var li = document.createElement('li');
                li.innerHTML = data.s[i];
                fragement.appendChild(li);
            }
            ul.innerHTML = '';
            ul.appendChild(fragement);
        })
    }
    ul.onclick = function (e) {
        e || (e = window.event);
        var target = e.target || e.srcElement;
        window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(target.innerHTML), '_blank');

    };
    document.body.onclick = function () {
        boxIsShow.hide();
    }
})();