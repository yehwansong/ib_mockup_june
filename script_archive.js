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
	var lc_counter = 1
	var translatez = 130
	var number_of_board = 20
	var scroll_round = 0
	var week_array = [
	'week_pre2',
	'week_pre1',
	'week_current',
	'week_next1',
	'week_next2',
	'week_next3',
	'week_next4',
	'week_next5',
	'week_next6',
	'week_next7',
	'week_next8',
	'week_next9',
	'week_next10',
	'week_next11',
	'week_next12',
	'week_next13',
	'week_next14',
	'week_next15',
	'week_next16',
	'week_next17']
if(window.location.hash && window.location.hash.split('#')[1] === 'spiral') {
	$('body').addClass('spiral_view')
} else if(window.location.hash && window.location.hash.split('#')[1] === 'week'){
	$('body').addClass('week_view')
}else{
	$('body').addClass('spiral_view')
}



// 
// 24
// 27-4

			get_data_array()
            function get_data_array() {
                var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                        data_array = JSON.parse(this.responseText).values
                        wholeweek_length = (data_array.length-1)
                        spiral_unit = (w)/(wholeweek_length*2 + center_width_r*2)
	            		for (var i = 0; i < week_array.length; i++) {
	            			if(i == week_array.length-1){
								create_board(data_array, i-1, week_array[i],100,true)
	            			}else{
								create_board(data_array, i-1, week_array[i],100,false)
	            			}
	            		}
			                        // create_week_wrapper(currentweek)
			                        popup()
									create_spiral(data_array)
			                		analyze_data(data_array)
			                		set_spiral_position()
                    };
                }
                xhttp.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/1j4pOnmU4NTyM7XoeXHG67Uy7VMfT_bAp4Kt0JxokUag/values/Sheet1?key=AIzaSyAmcp44cOi9-6XM4EqjCjIQLbj_D__1YPE");
                xhttp.send();
            }





			function create_board(data_array, distancefromcurrent, classname, translatez, callback){
				var selectedweek = parseInt(currentweek)+parseInt(distancefromcurrent)
				console.log(data_array[selectedweek][0])
					$('.week_whole_wrapper').append('\
						<div class="week_wrapper week_wrapper_info_month_' + data_array[selectedweek][0] + '_week_' + data_array[selectedweek][1] + ' '+classname+'" \
						style="transform : translateY('+(selectedweek-3)*80+'vh)"\
						></div>')
				
            		for (var i = 0; i < (27-selectedweek); i++) {
						$('.'+classname).append('<div class="week board board_info_time_'+i+'" style="\
							width:'+get_width(translatez,27-selectedweek)+'vh;\
							transform:translateX(-50%) rotateY('+(-360/(27-selectedweek)*i)+'deg) translateZ(-'+translatez+'vh);\
							background-position:'+ (-1*$(this).outerWidth()*(i+24)) +'px top;\
							">'+i+'</div>')
						if(i == 27-selectedweek-1){
					            append_week(selectedweek,classname)
							if(callback){
					            rotate_time()
				            	week_scroll()
					            setTimeout(function(){hovereffect()},1000)
					        }
						}
					}
			}
			function get_width(translatez,number_of_board){
				return translatez*Math.sin((360/(number_of_board*2)) * Math.PI / 180)*2
			}
            function rot_to_pos(value){
            	return map_range(value, 0, 360, 0, -80)
            }
            function set_spiral_position(){
            	$('.camera_view').css({'height':(wholeweek_length - currentweek + center_width_r)*spiral_unit +'px'})
            }
            function append_week(selectedweek,selectedclass){
	            for (var i = 2; i < data_array[selectedweek].length; i++) {
	        		if(parseInt(data_array[selectedweek][i]) !== 0){
		        		if(data_array[selectedweek][i].split(':')[0] === '/BG'){
		        			return false
		        		}
	        			if(data_array[selectedweek][i] === '/LC'){
	        				lc_counter++
		        			$('.'+selectedclass+' .board_info_time_'+i).append(data_array[selectedweek][i-1])
		        			$('.'+selectedclass+' .board_info_time_'+i).find('.content').css({'left':(lc_counter-1)*-100+'%'})
		        		}else{
		        			if(lc_counter>1){
		        				for (var j = lc_counter; j >= 1; j--) {
		        					$('.'+selectedclass+' .board_info_time_'+(i-j)).find('.content').css({'width':lc_counter*100+'%'})
		        				}
		        			}
	        				lc_counter=1
	        				$('.'+selectedclass+' .board_info_time_'+i).append(data_array[selectedweek][i])
		        		}
	        		}
	            }
            }
            function week_scroll(){
	            $(window).on('scroll', function() {
				    scrollpos = (($(window).scrollTop()+$('.fake_scroll').outerHeight()*scroll_round)/30)

				  //   if(($(window).scrollTop()+window.innerHeight == $('.fake_scroll').outerHeight()) && (scroll_round < 24)){
				  //   	$(window).scrollTop(0)
				  //   	scroll_round = scroll_round + 1
				  //   	// week_array.push('week_next'+(2+scroll_round))
						// // create_board(data_array, 2+scroll_round, 'week_next'+(2+scroll_round), 100, true)
						// return false
				  //   }
				  //   if($(window).scrollTop() == 0 && scroll_round > 0){
				  //   	$(window).scrollTop($('.fake_scroll').outerHeight()-window.innerHeight)
				  //   	scroll_round = scroll_round - 1
				  //   	return false
				  //   }



            		for (var i =  0; i < week_array.length; i++) {
            			rotate_eachweek(week_array[i],i-1)
            		}

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
				console.log(current_rotation)
            		// week
            		for (var i =  0; i < week_array.length; i++) {
            			rotate_eachweek(week_array[i],i-1)
            		}
				
					// spiral
				$('.camera_wrapper').css({'transform':'rotate('+(current_rotation+scrollpos)+'deg)'})
				if((current_rotation+scrollpos)%360 < 180){
					$('.camera_wrapper').css({'margin-top':-0.5*spiral_unit + 'px'})
				}else{
					$('.camera_wrapper').css({'margin-top':'0px'})
				}
				setTimeout(function(){
					// rotate_time()
				},10000)
            }
            // 1.3
            // 0.9
            function rotate_eachweek(classname, distancefromcurrent){
            	$('.week_whole_wrapper').css({'transform':'perspective(20vh) rotateX(0deg) translateY( '+ (rot_to_pos(current_rotation+scrollpos)) +'vh) translateZ(90vh) rotateY('+(current_rotation+scrollpos+30)+'deg)'})
            }
			function map_range(value, low1, high1, low2, high2) {
			    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
			}




            function popup(){
            	$('.week_wrapper').each(function(){
            		console.log($(this).attr('class'))
            		var value = $(this).attr('class').split('week_info_month_')[1].split(' ')[0]
            		$(this).append('<div class="info_popup_wrapper"><div class="info_popup">'+value+'</div></div>')
            	})
	            // $('.week_pre1 .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-150vh)'})
    			// $('.week_current .info_popup_wrapper').css({'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-130vh)'})
	            // $('.week_next1 .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-110vh)'})
	        }
            function hovereffect(){
                        $('.board').mouseenter(function(){
	            			$('.week_pre1 .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-150vh)'})
    						$('.week_current .info_popup_wrapper').css({'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-130vh)'})
	            			$('.week_next1 .info_popup_wrapper').css({	'transform':'translateX(-50%) rotateY('+(-1*(current_rotation+scrollpos))+'deg) translateZ(-110vh)'})
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
            		if(i == 0){
                    	$('.spiral_wrapper').each(function(index){
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