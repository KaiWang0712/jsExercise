$(document).ready(function(){
	$("#fullPage").fullpage({
		verticalCentered:false,
		anchors:["page1","page2","page3","page4"],
		navigation:true,
		navigationTooltips:["它，终于来了。","真正于你贴近的个人设备","非同一般的精准","你的风格"],
		afterRender:function(index){
			switch(index){
				case 1:
					break;
				case 2:
					break;
				case 3:
					break;
				case 4:
					break;
				default:
					break;
			}
		},
		afterLoad:function(anchorLink,index){
			switch(index){
				case 1:
					move(".section1 h1").scale(1.5).end();
					move(".section1 p").set("margin-top","5%").end();
					break;
				case 2:
					move(".section2 h1").scale(0.7).end();
					break;
				case 3:
					move(".section3 h1").set("margin-left","20%").end();
					move(".section3 p").set("margin-left","20%").end();
					break;
				case 4:
					move(".section4 img.primary").rotate(360).end(function(){
						move(".section4 img.sport").rotate(360).end(function(){
							move(".section4 img.edition").rotate(360).end(function(){
								move(".section4 h4.primary").scale(1.3).end(function(){
									move(".section4 h4.sport").scale(1.3).end(function(){
										move(".section4 h4.edition").scale(1.3).end();
									})
								})
							})
						})
					})
					break;
				default:
					break;
			}
		},
		onLeave:function(index, nextIndex, direction){
			switch(nextIndex){
				case 1:
					move('.section1 h1').scale(1).end();
                    move('.section1 p').set('margin-top','800px').end();
					break;
				case 2:
					move(".section2 h1").scale(1).end();
					break;
				case 3:
					move(".section3 h1").set("margin-left","-1500px").end();
					move(".section3 p").set("margin-left","1500px").end();
					break;
				case 4:
					move('.section4 img.primary').rotate(-360).end();
                    move('.section4 img.sport').rotate(-360).end();
                    move('.section4 img.edition').rotate(-360).end();
                    move('.section4 h4.primary').scale(1).end();
                    move('.section4 h4.sport').scale(1).end();
                    move('.section4 h4.edition').scale(1).end();
					break;
				default:
					break;
			}
		}

	});
})