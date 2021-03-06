$(document).ready(function(){
	var data_array
	var currentweek = 4
	var currenttime_h = new Date().toISOString().split('T')[1].split(':')[0]
	var currenttime_m = new Date().toISOString().split('T')[1].split(':')[1]
	var currenttime_s = new Date().toISOString().split('T')[1].split(':')[2].split('.')[0]
	var current_rotation = currenttime_h*(360/24) + currenttime_m*(360/24/60) + currenttime_s*(360/24/60/60)
	console.log(current_rotation)
	var scrollpos = 0
	var mark_amount = 0
	var noscroll = false
	var w = window.innerWidth
	var spiral_unit
	var center_width_r = 3
	var wholeweek_length
if(window.location.hash && window.location.hash.split('#')[1] === 'spiral') {
	$('body').addClass('spiral_view')
} else if(window.location.hash && window.location.hash.split('#')[1] === 'week'){
	$('body').addClass('week_view')
}else{
	$('body').addClass('spiral_view')
}


            get_data_array()
            function get_data_array() {
                var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                        data_array = JSON.parse(this.responseText).values
                        wholeweek_length = (data_array.length-1)
                        spiral_unit = (w)/(wholeweek_length*2 + center_width_r*2)
						create_spiral(data_array) 
                        create_week_wrapper(currentweek)
                        popup()
                		analyze_data(data_array)
                		set_spiral_position()
                    };
                }
                xhttp.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/1j4pOnmU4NTyM7XoeXHG67Uy7VMfT_bAp4Kt0JxokUag/values/Sheet1?key=AIzaSyAmcp44cOi9-6XM4EqjCjIQLbj_D__1YPE");
                xhttp.send();
            }
            function set_spiral_position(){
            	console.log(wholeweek_length)
            	$('.camera_view').css({'height':(wholeweek_length - currentweek + center_width_r)*spiral_unit +'px'})
            }
            function create_week_wrapper(currentweek){
            	console.log(data_array)
            	$('.week_wrapper_original').clone().removeClass('week_wrapper_original').addClass('week_info_month_' + data_array[currentweek-3][0] + '_week_' + data_array[currentweek-3][1] + ' week_pre3').insertAfter('.week_wrapper_original');
            	$('.week_wrapper_original').clone().removeClass('week_wrapper_original').addClass('week_info_month_' + data_array[currentweek-2][0] + '_week_' + data_array[currentweek-2][1] + ' week_pre2').insertAfter('.week_wrapper_original');
            	$('.week_wrapper_original').clone().removeClass('week_wrapper_original').addClass('week_info_month_' + data_array[currentweek-1][0] + '_week_' + data_array[currentweek-1][1] + ' week_pre1').insertAfter('.week_wrapper_original');
            	$('.week_wrapper_original').clone().removeClass('week_wrapper_original').addClass('week_info_month_' + data_array[currentweek-0][0] + '_week_' + data_array[currentweek-0][1] + ' week_current').insertAfter('.week_wrapper_original');
            	$('.week_wrapper_original').clone().removeClass('week_wrapper_original').addClass('week_info_month_' + data_array[currentweek+1][0] + '_week_' + data_array[currentweek+1][1] + ' week_next1').insertAfter('.week_wrapper_original');
            	$('.week_wrapper_original').clone().removeClass('week_wrapper_original').addClass('week_info_month_' + data_array[currentweek+2][0] + '_week_' + data_array[currentweek+2][1] + ' week_next2').insertAfter('.week_wrapper_original');
            	$('.week_wrapper_original').remove()
	            $('.week_current .board').each(function(index){
	            	$(this).css({	'transform':'translateX(-50%) rotateY('+((-360/$('.week_current .board').length)*index)+'deg) translateZ(-130vh)'}).addClass('board_info_time_'+index)
	            })
	            $('.week_pre1 .board').each(function(index){
	            	$(this).css({	'transform':'translateX(-50%) rotateY('+((-360/$('.week_pre1 .board').length)*index)+'deg) translateZ(-131vh)'}).addClass('board_info_time_'+index)
	            })
	            $('.week_pre2 .board').each(function(index){
	            	$(this).css({	'transform':'translateX(-50%) rotateY('+((-360/$('.week_pre2 .board').length)*index)+'deg) translateZ(-132vh)'}).addClass('board_info_time_'+index)
	            })
	            $('.week_pre3 .board').each(function(index){
	            	$(this).css({	'transform':'translateX(-50%) rotateY('+((-360/$('.week_pre3 .board').length)*index)+'deg) translateZ(-133vh)'}).addClass('board_info_time_'+index)
	            })
	            $('.week_next1 .board').each(function(index){
	            	$(this).css({	'transform':'translateX(-50%) rotateY('+((-360/$('.week_next1 .board').length)*index)+'deg) translateZ(-129vh)'}).addClass('board_info_time_'+index)
	            })
	            $('.week_next2 .board').each(function(index){
	            	$(this).css({	'transform':'translateX(-50%) rotateY('+((-360/$('.week_next2 .board').length)*index)+'deg) translateZ(-128vh)'}).addClass('board_info_time_'+index)
	            })
	            for (var i = 2; i < data_array[currentweek].length; i++) {
	        		if(parseInt(data_array[currentweek][i]) !== 0){
	        			$('.week_current .board_info_time_'+i).append('<div class="content">'+data_array[currentweek][i]+'</div>')
	        		}
	            }
	            rotate_time()
            	week_scroll()
	            setTimeout(function(){hovereffect()},1000)
            }
            function week_scroll(){
	            $(window).on('scroll', function() {

				    scrollpos = ($(window).scrollTop()/30)%360
					$('.week_pre3 	').css({'transform':'perspective(40vh) translateY(-15vh) translateZ(90vh) rotateY('+(current_rotation+scrollpos+30)+'deg)'})
					$('.week_pre2 	').css({'transform':'perspective(40vh) translateY(-10vh) translateZ(90vh) rotateY('+(current_rotation+scrollpos+30)+'deg)'})
					$('.week_pre1 	').css({'transform':'perspective(40vh) translateY( -5vh) translateZ(90vh) rotateY('+(current_rotation+scrollpos+30)+'deg)'})
					$('.week_current').css({'transform':'perspective(40vh) 				     translateZ(90vh) rotateY('+(current_rotation+scrollpos+30)+'deg)'})
					$('.week_next1	').css({'transform':'perspective(40vh) translateY( 70vh) translateZ(90vh) rotateY('+(current_rotation+scrollpos+30)+'deg)'})
					$('.week_next2	').css({'transform':'perspective(40vh) translateY( 75vh) translateZ(90vh) rotateY('+(current_rotation+scrollpos+30)+'deg)'})

					$('.camera_wrapper').css({'transform':'rotate('+(current_rotation+scrollpos)+'deg)'})
					if((current_rotation+scrollpos)%360 < 180){
						$('.camera_wrapper').css({'margin-top':-0.5*spiral_unit + 'px'})
            			$('.camera_view').css({'height':(wholeweek_length - currentweek + center_width_r)*spiral_unit+0.5*spiral_unit  +'px'})
					}else{
						$('.camera_wrapper').css({'margin-top':'0px'})
            			$('.camera_view').css({'height':(wholeweek_length - currentweek + center_width_r)*spiral_unit +'px'})
					}
				});
            }

            function rotate_time(){

				currenttime_h = new Date().toISOString().split('T')[1].split(':')[0]
				currenttime_m = new Date().toISOString().split('T')[1].split(':')[1]
				currenttime_s = new Date().toISOString().split('T')[1].split(':')[2].split('.')[0]
				current_rotation = currenttime_h*(360/24) + currenttime_m*(360/24/60) + currenttime_s*(360/24/60/60)
				$('.week_pre3 	').css({'transform':'perspective(40vh) rotateX(0deg) translateY(-15vh) translateZ(90vh) rotateY('+(current_rotation+scrollpos+30)+'deg)'})
				$('.week_pre2 	').css({'transform':'perspective(40vh) rotateX(0deg) translateY(-10vh) translateZ(90vh) rotateY('+(current_rotation+scrollpos+30)+'deg)'})
				$('.week_pre1 	').css({'transform':'perspective(40vh) rotateX(0deg) translateY( -5vh) translateZ(90vh) rotateY('+(current_rotation+scrollpos+30)+'deg)'})
				$('.week_current').css({'transform':'perspective(40vh) rotateX(0deg) 				   translateZ(90vh) rotateY('+(current_rotation+scrollpos+30)+'deg)'})
				$('.week_next1	').css({'transform':'perspective(40vh) rotateX(0deg) translateY( 70vh) translateZ(90vh) rotateY('+(current_rotation+scrollpos+30)+'deg)'})
				$('.week_next2	').css({'transform':'perspective(40vh) rotateX(0deg) translateY( 75vh) translateZ(90vh) rotateY('+(current_rotation+scrollpos+30)+'deg)'})
					
				$('.camera_wrapper').css({'transform':'rotate('+(current_rotation+scrollpos)+'deg)'})
				if((current_rotation+scrollpos)%360 < 180){
					$('.camera_wrapper').css({'margin-top':-0.5*spiral_unit + 'px'})
				}else{
					$('.camera_wrapper').css({'margin-top':'0px'})
				}
				setTimeout(function(){
					rotate_time()
				},10000)
            }
            function popup(){
            	$('.week_wrapper').each(function(){
            		console.log($(this).attr('class'))
            		var value = $(this).attr('class').split('week_info_month_')[1].split(' ')[0]
            		$(this).append('<div class="info_popup_wrapper"><div class="info_popup">'+value+'</div></div>')
            	})
    			$('.week_current .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-130vh)'})
	            $('.week_pre1 .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-131vh)'})
	            $('.week_pre2 .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-132vh)'})
	            $('.week_pre3 .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-133vh)'})
	            $('.week_next1 .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-129vh)'})
	            $('.week_next2 .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-128vh)'})
            }
            function hovereffect(){

                        $('.board').mouseenter(function(){
                        	$('.week_current .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-130vh)'})
				            $('.week_pre1 .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-131vh)'})
				            $('.week_pre2 .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-132vh)'})
				            $('.week_pre3 .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-133vh)'})
				            $('.week_next1 .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-129vh)'})
				            $('.week_next2 .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-128vh)'})
                        	$(this).parent().find('.board').css({'background-color':'#dddddd'})
                        	$(this).parent().find('.info_popup').show()
                        })
                       
	                        $('.board').mouseleave(function(){
	                        	$(this).parent().find('.board').css({'background-color':'white'})
	                        	$(this).parent().find('.info_popup').hide()
	                        })
                    
                        $('.spiral').mouseenter(function(){
                        	noscroll = true
                        	var selected = $(this).parent().attr('class').split('spiral_wrapper_')[1].split('_')[0]
                        	$('.spiral_whole_wrapper .spiral_wrapper_' + selected + '_1 .spiral').css({'border-width':'7px'})
                        	$('.spiral_whole_wrapper .spiral_wrapper_' + selected + '_2 .spiral').css({'border-width':'7px'})
                        	$('.popupbox').html($(this).parent().attr('class').split('spiral_info_month_')[1].split(' ')[0])
                        })
                        
	                        $('.spiral').mouseleave(function(){
                        	noscroll = false
                        	var selected = $(this).parent().attr('class').split('spiral_wrapper_')[1].split('_')[0]
                        	$('.spiral_whole_wrapper .spiral_wrapper_' + selected + '_1 .spiral').css({'border-width':'1px'})
                        	$('.spiral_whole_wrapper .spiral_wrapper_' + selected + '_2 .spiral').css({'border-width':'1px'})
                        	$('.popupbox').html(' ')
	                        })
                    	
                        $('.mark').mouseenter(function(){
                        	noscroll = true
                        	var selected = $(this).attr('class').split('mark_info_')[1].split(' ')[0]
                        	$('.popupbox').html($('.mark_content.mark_info_'+selected+' .markcontent').html())
                        })
                        
	                        $('.mark').mouseleave(function(){
                        	noscroll = false
                        		var selected = $(this).attr('class').split('mark_info_')[1].split(' ')[0]
                        		$('.popupbox').html(' ')
	                        })
                    	
                    }
                    $('.spiral_view_button').click(function(){
                    	$('body').removeClass('week_view').addClass('spiral_view')
    					window.location.hash = 'spiral';
                    })
					$('.week_view_button').click(function(){
						$('body').removeClass('spiral_view').addClass('week_view')
    					window.location.hash = 'week';
					})
                    $(document).mousemove(function(e){
                    	$('.popupbox').css({'left':e.pageX+'px','top':(e.pageY-$(window).scrollTop())+'px'})
                    })

                    function create_spiral(data_array){
                    	var weekamount = data_array.length - 1
                    	console.log(weekamount)
                    	for (var i = weekamount - 1; i >= 0; i--) {
                    		$('.spiral_whole_wrapper').append('<div class="spiral_wrapper"><div class="spiral spiral_lt"></div><div class="spiral spiral_rt"></div><div class="spiral spiral_lb"></div><div class="spiral spiral_rb"></div></div>\
                    											<div class="spiral_wrapper"><div class="spiral spiral_lt"></div><div class="spiral spiral_rt"></div><div class="spiral spiral_lb"></div><div class="spiral spiral_rb"></div></div>')
                    		console.log(i)
                    		if(i == 0){
		                    	$('.spiral_wrapper').each(function(index){
		                    		console.log(spiral_unit)
		                    		if(index/2<wholeweek_length-currentweek){
		                    			$(this).addClass('notyet')
		                    		}
		                    		$(this).addClass('spiral_wrapper_'+Math.floor(($('.spiral_wrapper').length + 1 - index)/2)+'_'+(($('.spiral_wrapper').length + 1 - index)%2+1))
		                    		$(this).addClass('spiral_info_month_'+data_array[Math.floor(($('.spiral_wrapper').length + 1 - index)/2)][0]+'_week_'+data_array[Math.floor(($('.spiral_wrapper').length + 1 - index)/2)][1])
		                    		$(this).css({'z-index':Math.floor(($('.spiral_wrapper').length + 1 - index)/2)})
		                    		$(this).css({'width':spiral_unit * (index+center_width_r*2) + 'px'})
		                    		$(this).css({'height':spiral_unit * (index+center_width_r*2) + 'px'})
		                    		$(this).find('.spiral_rt').css({'margin-top':-0.5*spiral_unit + 'px'})
		                    		$(this).find('.spiral_rb').css({'margin-top':-0.5*spiral_unit + 'px'})
		                    		if(Math.floor(($('.spiral_wrapper').length + 1 - index)/2 == 1)){
		                    			$('.spiral_whole_wrapper_b').append($(this).clone())
		                    		}
		                    	})
                    		}
                    	}
                    	
                    }

                function analyze_data(data_array){
                	for (var i = 1; i < data_array.length; i++) {
	                	for (var j = 2; j < data_array[i].length; j++) {
	                		if(parseInt(data_array[i][j]) !== 0){
	                			mark_amount++
	                			$('.markcontent_wrapper').append('<div class="mark_content mark_info_month_'+data_array[i][0]+'_week_'+data_array[i][1]+'_time_'+j+' mark_'+mark_amount+'"><div class="markcontent">'+data_array[i][j]+'</div></div>')
	                			$('.spiral_whole_wrapper').append('<div class="mark mark_info_month_'+data_array[i][0]+'_week_'+data_array[i][1]+'_time_'+j+' mark_'+mark_amount+'"></div>')
	                			if(j-2<12){
	                				$('.spiral_whole_wrapper .mark_'+mark_amount).css({'transform':'translateY('+spiral_unit/-2+'px) rotate('+ ((j-2)/24 * 360) + 'deg) translateY('+(-1*$('.spiral_wrapper_'+(i)+'_2').outerWidth()/2+spiral_unit/-2) +'px'})
	                			}else{
	                				$('.spiral_whole_wrapper .mark_'+mark_amount).css({'transform':'rotate('+((j-2)/24 * 360) + 'deg) translateY('+(-1*($('.spiral_wrapper_'+(i)+'_1').outerWidth()/2)+spiral_unit/-2) +'px)'})
	                			}
	                		}
	                	}
                	}
                }
})