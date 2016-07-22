var input = utils.getElementsByClass("list_txt");
var bt = utils.getElementsByClass("bt");
var error_txt = utils.getElementsByClass("error_txt");
var pwd_ok = utils.getElementsByClass("pwd_ok")[0];
console.log(input,error_txt,bt);

var ary1 = [/^1[34578]\d{9}$/,/^[\u4e00-\u9fa5\w-]{4,20}$/,/[a-zA-Z\d\w-]{6,20}/,/[a-zA-Z\d\w-]{6,20}/];
var ary2 = ["请输入您的手机号码~~","请输入您的昵称~~","请输入您的密码~~","请确认您的密码~~"];
var ary3 = ["您输入的手机号不正确~~","您输入的昵称不符合格式~~","您输入的密码不符合格式","您两次密码输入不一致，请重新输入"];


function cc(){
    for(var i=0;i<input.length;i++){
        var inputDa = input[i];
        inputDa.index = i;
        inputDa.onfocus = function () {
            var val = this.value.replace(/(^ +| +$)/g,"");
            var reg = ary1[this.index];
            if(this.index===2){
                pwd_ok.style.display = "block";
                var pwd = input[this.index].value;
                if(val===pwd){
                    return;
                }
            }
            if(val.length === 0 || !reg.test(val)){
                utils.addClass(this,"br");
                utils.addClass(bt[this.index],"error");
                error_txt[this.index].style.display = "block";
                error_txt[this.index].innerHTML = val.length === 0 ? ary2[this.index]:ary3[this.index];
            }else{
                utils.removeClass(this,"br");
                utils.addClass(bt[this.index],"ok");
                error_txt[this.index].style.display = "none";
            }
        };
        inputDa.onblur = function () {
            var val = this.value.replace(/(^ +| +$)/g,"");
            var reg = ary1[this.index];
            if(this.index===3){
                var pwd = input[this.index-1].value;
                if(val===pwd){
                    utils.removeClass(this,"br");
                    utils.addClass(bt[this.index],"ok");
                    error_txt[this.index].style.display = "none";
                    return;
                }
            }
            if(val.length === 0 || !reg.test(val)){
                utils.addClass(this,"br");
                utils.addClass(bt[this.index],"error");
                utils.removeClass(bt[this.index],'ok');
                error_txt[this.index].style.display = "block";
                error_txt[this.index].innerHTML = val.length === 0 ? ary2[this.index]:ary3[this.index];
            }else{
                utils.removeClass(this,"br");
                utils.addClass(bt[this.index],"ok");
                utils.removeClass(bt[this.index],'error');
                error_txt[this.index].style.display = "none";
            }
        };
    }
}
cc();