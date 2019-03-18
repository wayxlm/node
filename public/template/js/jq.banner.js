;(function($){
	"use strict"
	$.extend($.fn,{
		banner:function(opstions){
//			if(opstions.autoPlay===false){
//				var autoPlay = false;
//			}else{
//				var autoPlay = true;
//			}
			this.LOCAL = {
				
				autoPlay : opstions.autoPlay ===false ? false : true,
				delayTime : opstions.delayTime || 2000,
				moveTime : opstions.moveTime || 200,
				index : 0,    //index在list功能中表示上一张，在btn功能中表示当前
                iPrev : opstions.items.length-1  //在list中没用，在btn中表示上一张				
			};
			
		//	console.log(opstions.items)

			var that = this
			
			if(opstions.list != undefined && opstions.list.length>0){
				opstions.list.eq(0).css("background","red")
				
				
				this.LOCAL.listMove = function(i,type){
					opstions.items.eq(that.LOCAL.index).css({
							left:0
						}).stop().animate({
							left:-opstions.items.eq(0).width() * type
						}).end().eq(i).css({
							left:opstions.items.eq(0).width() * type
						}).stop().animate({
							left:0
						})					
				}				
				opstions.list.on("mouseover",function(){
					
					if(that.LOCAL.index < $(this).index()){
						that.LOCAL.listMove($(this).index(),1)
					}
					if(that.LOCAL.index > $(this).index()){
						that.LOCAL.listMove($(this).index(),-1)
					}
					that.LOCAL.index = $(this).index()
					opstions.list.css("background-color","black").eq(that.LOCAL.index)
					.css("background-color","red")
				})
			}	
		}
	})
	
	
})(jQuery);
