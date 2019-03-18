;(function($){
    "use strict";

    // $.extend({
    //     nav:function(){}
    // })

    // $.extend($.fn,{
    //     nav:function(){}
    // })

    // $.fn.extend({
    //     nav:function(){}
    // })

    // $.nav = function(){}

    $.fn.nav = function(){
        console.log(this)
        this.children("ul").children("li").hover(function(){
            $(this).css("background","#aaa").children("ul").stop().slideDown().parent().siblings().css("background","#ccc").children("ul").stop().slideUp();
        },function(){
            $(this).css("background","#ccc").children("ul").stop().slideUp()
        })
        
        return this;
    }

    // console.log($)
})(jQuery);