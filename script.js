$(document).ready(function(){
	var data_array
	var icon_array
	var weekoffset = 17
	var test = 1
	var current_scroll
	var currentweek = getWeekNumber(new Date()) - weekoffset + test;
	console.log(currentweek )
	var height_unit = 90
	var rotatetime_timeout
	// var last_height = 20
	var translatey = 70
	var currentrotation = 0
	var inittime_d = new Date().toString().split(' ')[0]
	if(new Date().toString().split(' ')[0]==='Mon'){var inittime_d = 0}
	if(new Date().toString().split(' ')[0]==='Tue'){var inittime_d = 1}
	if(new Date().toString().split(' ')[0]==='Wed'){var inittime_d = 2}
	if(new Date().toString().split(' ')[0]==='Thu'){var inittime_d = 3}
	if(new Date().toString().split(' ')[0]==='Fri'){var inittime_d = 4}
	if(new Date().toString().split(' ')[0]==='Sat'){var inittime_d = 5}
	if(new Date().toString().split(' ')[0]==='Sun'){var inittime_d = 6}

	var inittime_h = new Date().toString().split(' ')[4].split(':')[0]
	var inittime_m = new Date().toString().split(' ')[4].split(':')[1]
	var inittime_s = new Date().toString().split(' ')[4].split(':')[2].split('.')[0]
	
	var initrotation = inittime_d*(translatey/7) + inittime_h*(translatey/7/24) + inittime_m*(translatey/7/24/60) + inittime_s*(translatey/7/24/60/60)
	var scrollpos = 0

	var mark_amount = 0
	var noscroll = false
	var w = window.innerWidth
	var spiral_unit
	var center_width_r = 3
	var wholeweek_length
	var lc_counter = 1
	var wrapper_translatez = 10
	var ismobile = false
	var scrollinit = true
	if(window.innerHeight > window.innerWidth){
		ismobile = true
	}
	if(ismobile){wrapper_translatez = 50;
		console.log('1')}
	var translatez = 28
	if(ismobile){translatez = 50;
		console.log('2')}
	var number_of_board = 20
	var week_lastpage = 0

	var scrollspeed = 0.1
	if(ismobile){scrollspeed = 0.5}

	var scrolldirection = 'down'
	var scrolldirection_value = 0
	var week_array = [
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'11',
		'12',
		'13',
		'14',
		'15',
		'16',
		'17',
		'18'
	]
if(window.location.hash && window.location.hash.split('#')[1] === 'spiral') {
	$('body').addClass('spiral_view')
} else if(window.location.hash && window.location.hash.split('#')[1] === 'week'){
	$('body').addClass('week_view')
}else if(window.location.hash && window.location.hash.split('#')[1] === 'spiralhidden') {
	$('body').addClass('spiral_view hidden')
} else if(window.location.hash && window.location.hash.split('#')[1] === 'weekhidden'){
	$('body').addClass('week_view hidden')
} else{
	$('body').addClass('spiral_view')
}

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo
}

get_data_array()
function get_data_array() {
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            icon_array = JSON.parse(this.responseText).values
        }
    }
    xhttp.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/1j4pOnmU4NTyM7XoeXHG67Uy7VMfT_bAp4Kt0JxokUag/values/Items?key=AIzaSyAmcp44cOi9-6XM4EqjCjIQLbj_D__1YPE");
    xhttp.send();
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            data_array = JSON.parse(this.responseText).values
            console.log(data_array)
            wholeweek_length = (data_array.length-1)
            spiral_unit = (w)/(wholeweek_length*2 + center_width_r*2)

    		for (var i = 0; i < week_array.length; i++) {
    			if(i == week_array.length-1){
					create_board(data_array, i, (week_array.length-i+1)*0 + translatez, true)
    			}else{
					create_board(data_array, i, (week_array.length-i+1)*0 + translatez, false)
    			}
    		}
    		for (var i = 0; i < week_array.length; i++) {
				create_spiral(data_array, i, (week_array.length-i)*(50/(week_array.length+1)), false)
    		}
            		popup()
    				// analyze_data(data_array)
    				set_spiral_position()
    				week_lastpage_swipe()
        };
    }
    xhttp.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/1j4pOnmU4NTyM7XoeXHG67Uy7VMfT_bAp4Kt0JxokUag/values/Info?key=AIzaSyAmcp44cOi9-6XM4EqjCjIQLbj_D__1YPE");
    xhttp.send();
}



			function create_board(data_array, k, translatez, callback){
            		var number_of_board = week_array.length-k + 2
            		var classname = 'weekwrapper_'+week_array[k]

					$('.week_whole_wrapper').append('\
						<div class="weekwrapper weekwrapper_info_month_' + data_array[k+1][0] + '_week_' + data_array[k+1][1] + ' '+classname+'" \
						style="transform:translateY('+(k)*translatey+'vh)"\
						></div>')

            		for (var i = 0; i < number_of_board; i++) {
						$('.'+classname).append('<div class="week board board_info_time_'+i+'" style="\
							width:'+(get_width(translatez,number_of_board))+'vw;\
							transform:translateX(-50%) rotateY('+((-360/number_of_board)*i)+'deg) translateZ(-'+translatez+'vw);\
							background-position:'+ (-1*get_width(translatez,number_of_board)*(i)) +'vw top;\
							"></div>')
						    append_weekinfo(i,k,classname)
						    append_weekitems(i,k,classname)
							if(i == number_of_board-1){
								if(callback){
									$('.fake_scroll').css({'height':((week_array.length-1)*translatey/scrollspeed) + 'vh'})
									$('.board').css({'height':height_unit+'vh'})
									$('.fake_scroll_wrapper').scrollTop((translatey*currentweek + initrotation)/scrollspeed*window.innerHeight/100)

									scrollpos = translatey*currentweek + initrotation
						            rotate_time()
					            	week_scroll()
				    				move_wrapper(true)
					            	show_week()
					            	settingup_lastpage()
						            setTimeout(function(){hovereffect()},1000)
						        }
							}
					}
			}
            function create_spiral(data_array, k, translatez, callback){
            		var number_of_board = week_array.length-k + 2
            		var classname = 'spiralwrapper_' + week_array[k]
            		if(parseInt(week_array[k])<currentweek+1){
	            		$('.spiral_whole_wrapper').append('\
							<div class="spiralwrapper spiralwrapper_info_month_' + data_array[k+1][0] + '_week_' + data_array[k+1][1] + ' '+classname+'" \
								style="transform:translateX(-50%) translateY(-50%) rotateX(-30deg) rotateY(180deg);\
								margin-top:'+k*0+'vh"\
							></div>')
	            	}else{
	            		$('.spiral_whole_wrapper').append('\
							<div class="spiralwrapper spiralwrapper_info_month_' + data_array[k+1][0] + '_week_' + data_array[k+1][1] + ' '+classname+'" \
								style="transform:translateX(-50%) translateY(-50%) rotateX(-30deg) rotateY(180deg) translateY(100%);\
								margin-top:'+k*0+'vh"\
							></div>')
	            	}

            		for (var i = 0; i < number_of_board; i++) {
						$('.'+classname).append('<div class="spiral board board_info_time_'+i+'" style="\
							width:'+(get_width(translatez,number_of_board))+'vw;\
							transform:translateX(-50%) rotateY('+((-360/number_of_board)*i)+'deg) translateZ(-'+translatez+'vw);\
							background-position:'+ (-1*get_width(translatez,number_of_board)*(i)) +'vw top;\
							background-size:'+ (get_width(translatez,number_of_board)*number_of_board) +'vw 100%;\
							"></div>')
					}     	
            }

			function get_width(translatez,number_of_board){
				return translatez*Math.tan((360/(number_of_board*2)) * Math.PI / 180)	*2
			}
            function pos_to_rot(value){
            	return parseInt(map_range(value, 0, translatey, 0, 360))
            }
            function set_spiral_position(){
            	$('.camera_view').css({'height':(week_array.length - currentweek + center_width_r)*spiral_unit +'px'})
            }
            function append_weekinfo(selectedboard,selectedweek,selectedclass){
	        		if(parseInt(data_array[selectedweek+1][selectedboard+2]) !== 0){
	        				$('.'+selectedclass+' .board_info_time_'+selectedboard).append('<div class="popups popups_info">'+data_array[selectedweek+1][selectedboard+2]+'</div>')
	        				$('.'+selectedclass+' .board_info_time_'+selectedboard+' .popups').addClass('popup_original').prepend('<div class="popups_tab"><div class="close"></div></div>')
	        				$('.'+selectedclass+' .board_info_time_'+selectedboard+' .popups').clone().removeClass('popup_original').addClass('popup_shadow').insertBefore($('.'+selectedclass+' .board_info_time_'+selectedboard+' .popup_original'))
	        		}
            }

            function append_weekitems(selectedboard,selectedweek,selectedclass){
            	if(typeof icon_array == 'undefined'){
            		setTimeout(function(){append_weekitems(selectedboard,selectedweek,selectedclass)},500)
            	}else{
	        		if(icon_array[selectedweek+1][selectedboard+2] === 'clock'){
	        				$('.'+selectedclass+' .board_info_time_'+selectedboard).append('<div class="popups popups_icon popups_icon_clock"></div>')
	        				$('.'+selectedclass+' .board_info_time_'+selectedboard+' .popups').addClass('popup_original').prepend('<div class="popups_tab"><div class="close"></div></div>')
	        				$('.'+selectedclass+' .board_info_time_'+selectedboard+' .popups').clone().removeClass('popup_original').addClass('popup_shadow').insertBefore($('.'+selectedclass+' .board_info_time_'+selectedboard+' .popup_original'))
	        		}
	        		if(icon_array[selectedweek+1][selectedboard+2] === 'podcast'){
	        				$('.'+selectedclass+' .board_info_time_'+selectedboard).append('<div class="popups popups_icon popups_icon_podcast"></div>')
	        				$('.'+selectedclass+' .board_info_time_'+selectedboard+' .popups').addClass('popup_original').prepend('<div class="popups_tab"><div class="close"></div></div>')
	        				$('.'+selectedclass+' .board_info_time_'+selectedboard+' .popups').clone().removeClass('popup_original').addClass('popup_shadow').insertBefore($('.'+selectedclass+' .board_info_time_'+selectedboard+' .popup_original'))
	        		}
	        		if(icon_array[selectedweek+1][selectedboard+2] === 'weather'){
	        				$('.'+selectedclass+' .board_info_time_'+selectedboard).append('<div class="popups popups_icon popups_icon_weather"></div>')
	        				$('.'+selectedclass+' .board_info_time_'+selectedboard+' .popups').addClass('popup_original').prepend('<div class="popups_tab"><div class="close"></div></div>')
	        				$('.'+selectedclass+' .board_info_time_'+selectedboard+' .popups').clone().removeClass('popup_original').addClass('popup_shadow').insertBefore($('.'+selectedclass+' .board_info_time_'+selectedboard+' .popup_original'))
	        		}
            	}
            }


            function week_scroll(){
	            $('.fake_scroll_wrapper').on('scroll', function() {
	            	if(scrollinit){
	            		scrollinit = false
	            	}else{
	            		$('.followcursor').css({'opacity':0})
	            	}
				    scrollpos = $('.fake_scroll_wrapper').scrollTop()/(window.innerHeight/100) * scrollspeed
				    move_wrapper(false)

					$('.camera_wrapper').css({'transform':'rotate('+(pos_to_rot(scrollpos+currentrotation)+90)+'deg)'})
					if(pos_to_rot(scrollpos+currentrotation)%360 < 180){
						$('.camera_wrapper').css({'margin-top':-0.5*spiral_unit + 'px'})
            			$('.camera_view').css({'height':(wholeweek_length - currentweek + center_width_r)*spiral_unit+0.5*spiral_unit  +'px'})
					}else{
						$('.camera_wrapper').css({'margin-top':'0px'})
            			$('.camera_view').css({'height':(wholeweek_length - currentweek + center_width_r)*spiral_unit +'px'})
					}
				});
            }
            function rotate_time(){
            	currentrotation = currentrotation + 360/(24*60*7)
				move_wrapper(false)
				$('.camera_wrapper').css({'transform':'rotate('+(pos_to_rot(scrollpos+currentrotation)+90)+'deg)'})
				if(pos_to_rot(scrollpos+currentrotation)%360 < 180){
					$('.camera_wrapper').css({'margin-top':-0.5*spiral_unit + 'px'})
				}else{
					$('.camera_wrapper').css({'margin-top':'0px'})
				}
				rotatetime_timeout = setTimeout(function(){
					rotate_time()
				},60*1000)
            }
            function move_wrapper(init){
            	if(scrollpos > scrolldirection_value){
            		scrolldirection = 'down'
            	}else{
            		scrolldirection = 'up'
            	}
            	scrolldirection_value = scrollpos


            	var transition = 0
            	var transition_unit = 0
            	if(scrollpos%translatey > (translatey - 20)){
            		transition_unit = (20-(translatey-scrollpos%translatey))/2
            		transition = (translatey-scrollpos%translatey) * translatey/20
            	}
            	var k = Math.floor(scrollpos/translatey)

   				if($('.fake_scroll_wrapper').scrollTop() + $(window).height() > $('.fake_scroll').height()-100) {
            		current_scroll = k
   					$('.week_lastpage_arrowl').show()
					$('.week_lastpage_arrowr').show()
					// clearTimeout(rotatetime_timeout)
   					$('.week_whole_wrapper').addClass('week_whole_wrapper_animate')
            		if(week_lastpage == 0){$('.week_whole_wrapper').css({'transform':'perspective(40vh) rotateX(0deg) translateY( '+ -1*((week_array.length-1)*translatey) +'vh) translateZ('+wrapper_translatez+'vw)  rotateY('+(0+pos_to_rot(Math.floor(scrollpos/translatey+1)*translatey))+'deg)'})}
            		if(week_lastpage == 1){$('.week_whole_wrapper').css({'transform':'perspective(40vh) rotateX(0deg) translateY( '+ -1*((week_array.length-1)*translatey) +'vh) translateZ('+wrapper_translatez+'vw)  rotateY('+(120+pos_to_rot(Math.floor(scrollpos/translatey+1)*translatey))+'deg)'})}
            		if(week_lastpage == 2){$('.week_whole_wrapper').css({'transform':'perspective(40vh) rotateX(0deg) translateY( '+ -1*((week_array.length-1)*translatey) +'vh) translateZ('+wrapper_translatez+'vw)  rotateY('+(240+pos_to_rot(Math.floor(scrollpos/translatey+1)*translatey))+'deg)'})}
            	}else{
            		$('.week_lastpage_arrowl').hide()
					$('.week_lastpage_arrowr').hide()
					$('.lastpage_popupbox').hide()
            		$('.week_whole_wrapper').removeClass('week_whole_wrapper_animate')

	            	if(scrolldirection === 'down' && transition_unit!==10 && transition_unit!==0){
	            		$('.weekwrapper_'+ Math.floor(k-2)).css({transform : 'translateY('+((k-2)*translatey)+'vh) translateY('+map_range(transition_unit, 0, 10, -50, -20 )+'vh) scaleX('+map_range(transition_unit, 0, 10, 5.0, 7.0)+') scaleZ('+map_range(transition_unit, 0, 10, 5.0, 7.0)+')'})
	            		$('.weekwrapper_'+ Math.floor(k-1)).css({transform : 'translateY('+((k-1)*translatey)+'vh) translateY('+map_range(transition_unit, 0, 10, -20, -50 )+'vh) scaleX('+map_range(transition_unit, 0, 10, 3, 5.0)+') scaleZ('+map_range(transition_unit, 0, 10, 3, 5.0)+')'})
	            		
	            		$('.weekwrapper_'+ Math.floor(k-0)).css({transform : 'translateY('+((k-0)*translatey)+'vh) translateY('+map_range(transition_unit, 0, 10,  0, -20  )+'vh) scaleX('+map_range(transition_unit, 0, 10, 1, 3)+') scaleZ('+map_range(transition_unit, 0, 10, 1, 3)+')'})
	            		$('.weekwrapper_'+ Math.floor(k+1)).css({transform : 'translateY('+((k+1)*translatey)+'vh) translateY('+map_range(transition_unit, 0, 10,  -13, 0 )+'vh) scaleX('+map_range(transition_unit, 0, 10, .50, 1)+') scaleZ('+map_range(transition_unit, 0, 10, .50, 1)+')'})
	            		$('.weekwrapper_'+ Math.floor(k+2)).css({transform : 'translateY('+((k+2)*translatey)+'vh) translateY('+map_range(transition_unit, 0, 10, -86, -13)+'vh) scaleX('+map_range(transition_unit, 0, 10, .25, .50)+') scaleZ('+map_range(transition_unit, 0, 10, .25, .50)+')'})
	            		$('.weekwrapper_'+ Math.floor(k+3)).css({transform : 'translateY('+((k+3)*translatey)+'vh) translateY('+map_range(transition_unit, 0, 10, -156, -86)+'vh) scaleX('+map_range(transition_unit, 0, 10, .2, .25)+') scaleZ('+map_range(transition_unit, 0, 10, .2, .25)+')'})
	            		$('.weekwrapper_'+ Math.floor(k+4)).css({transform : 'translateY('+((k+4)*translatey)+'vh) translateY('+map_range(transition_unit, 0, 10, -0, -156)+'vh) scaleX('+map_range(transition_unit, 0, 10, .0, .2)+') scaleZ('+map_range(transition_unit, 0, 10, .0, .2)+')'})

 	             		$('.spiralwrapper_'+ Math.floor(k+1)).css({transform:'translateX(-50%) translateY(-50%) rotateX(-30deg) rotateY(180deg) translateY('+(10-transition_unit)*10+'%)'})
 
	            		transition_unit = 0
	            	}else if(scrolldirection === 'up' && transition_unit!==10 && transition_unit!==0){
	            		// console.log('2')
	            		$('.weekwrapper_'+ Math.floor(k-2)).css({transform : 'translateY('+((k-2)*translatey)+'vh) translateY('+map_range(transition_unit, 10, 0, -20  ,-50)+'vh) scaleX('+map_range(transition_unit, 10, 0, 7.0, 5.0)+') scaleZ('+map_range(transition_unit, 10, 0, 7.0, 5.0)+')'})
	            		$('.weekwrapper_'+ Math.floor(k-1)).css({transform : 'translateY('+((k-1)*translatey)+'vh) translateY('+map_range(transition_unit, 10, 0, -50, -20 )+'vh) scaleX('+map_range(transition_unit, 10, 0, 5.0, 3)+') scaleZ('+map_range(transition_unit, 10, 0, 5.0, 3)+')'})
	            		
	            		$('.weekwrapper_'+ Math.floor(k-0)).css({transform : 'translateY('+((k-0)*translatey)+'vh) translateY('+map_range(transition_unit, 10, 0,  -20,  0 )+'vh) scaleX('+map_range(transition_unit, 10, 0, 3, 1)+') scaleZ('+map_range(transition_unit, 10, 0, 3, 1)+')'})
	            		$('.weekwrapper_'+ Math.floor(k+1)).css({transform : 'translateY('+((k+1)*translatey)+'vh) translateY('+map_range(transition_unit, 10, 0,  0 , -13)+'vh) scaleX('+map_range(transition_unit, 10, 0, 1, .50)+') scaleZ('+map_range(transition_unit, 10, 0, 1, .50)+')'})
	            		$('.weekwrapper_'+ Math.floor(k+2)).css({transform : 'translateY('+((k+2)*translatey)+'vh) translateY('+map_range(transition_unit, 10, 0, -13, -86)+'vh) scaleX('+map_range(transition_unit, 10, 0, .50, .25)+') scaleZ('+map_range(transition_unit, 10, 0, .50, .25)+')'})
	            		$('.weekwrapper_'+ Math.floor(k+3)).css({transform : 'translateY('+((k+3)*translatey)+'vh) translateY('+map_range(transition_unit, 10, 0, -86, -156)+'vh) scaleX('+map_range(transition_unit, 10, 0, .50, .2)+') scaleZ('+map_range(transition_unit, 10, 0, .50, .2)+')'})

 	             		$('.spiralwrapper_'+ Math.floor(k+1)).css({transform:'translateX(-50%) translateY(-50%) rotateX(-30deg) rotateY(180deg) translateY('+(10-transition_unit)*10+'%)'})
 
	            		transition_unit = 0
	            	}else{
            			if(current_scroll !== k){

				    	currentweek = k
				    	// show_week()
            				current_scroll = k
            				$('.weekwarpper_prev2').removeClass('weekwarpper_prev2')
							$('.weekwarpper_prev1').removeClass('weekwarpper_prev1')
							$('.weekwarpper_current').removeClass('weekwarpper_current')
							$('.weekwarpper_next1').removeClass('weekwarpper_next1')
							$('.weekwarpper_next2').removeClass('weekwarpper_next2')
							$('.weekwarpper_next3').removeClass('weekwarpper_next3')
            				$('.weekwrapper_'+ Math.floor(k-2)).addClass('weekwarpper_prev2')
							$('.weekwrapper_'+ Math.floor(k-1)).addClass('weekwarpper_prev1')
							$('.weekwrapper_'+ Math.floor(k-0)).addClass('weekwarpper_current')
							$('.weekwrapper_'+ Math.floor(k+1)).addClass('weekwarpper_next1')
							$('.weekwrapper_'+ Math.floor(k+2)).addClass('weekwarpper_next2')
							$('.weekwrapper_'+ Math.floor(k+3)).addClass('weekwarpper_next3')
		            		$('.weekwrapper_'+ Math.floor(k-2)).css({transform : 'translateY('+((k-2)*translatey)+'vh) translateY(-20vh) scaleX(4.0) scaleZ(4.0)'})
		            		$('.weekwrapper_'+ Math.floor(k-1)).css({transform : 'translateY('+((k-1)*translatey)+'vh) translateY(-5vh)  scaleX(2.5) scaleZ(2.5)'})
		            		$('.weekwrapper_'+ Math.floor(k-0)).css({transform : 'translateY('+((k-0)*translatey)+'vh)'})
		            		$('.weekwrapper_'+ Math.floor(k+1)).css({transform : 'translateY('+((k+1)*translatey)+'vh) translateY(-13vh) scaleX(.50) scaleZ(.50)'})
		            		$('.weekwrapper_'+ Math.floor(k+2)).css({transform : 'translateY('+((k+2)*translatey)+'vh) translateY(-86vh) scaleX(.25) scaleZ(.25)'})
		            		$('.weekwrapper_'+ Math.floor(k+3)).css({transform : 'translateY('+((k+3)*translatey)+'vh) translateY(-156vh) scaleX(.2) scaleZ(.2)'})
		            		$('.spiralwrapper').each(function(index){
			            		if(index<k+1){
			            			$(this).css({transform:'translateX(-50%) translateY(-50%) rotateX(-30deg) rotateY(180deg) translateY(0%)'})
				            	}else{
			            			$(this).css({transform:'translateX(-50%) translateY(-50%) rotateX(-30deg) rotateY(180deg) translateY(100%)'})
				            	}
		            		})
            			}
	            	}

	            	if(init){
	            		$('.weekwarpper_next1').addClass('next_comingsoon')
	            		$('.weekwarpper_next1').nextAll().addClass('comingsoon')
	            	}

            		if(scrolldirection === 'down' && transition>0){
						$('.week_whole_wrapper').css({'transform':'perspective(40vh) rotateX(0deg) translateY( '+ (-1*(Math.floor(scrollpos/translatey)*translatey)-(translatey-transition)) +'vh) translateZ('+wrapper_translatez+'vw)  rotateY('+pos_to_rot(scrollpos+currentrotation)+'deg)'})
					}else if(scrolldirection === 'up' && transition>0){
						$('.week_whole_wrapper').css({'transform':'perspective(40vh) rotateX(0deg) translateY( '+ (-1*(Math.floor(scrollpos/translatey)*translatey-transition+translatey)) +'vh) translateZ('+wrapper_translatez+'vw)  rotateY('+pos_to_rot(scrollpos+currentrotation)+'deg)'})
					}else{
						$('.week_whole_wrapper').css({'transform':'perspective(40vh) rotateX(0deg) translateY( '+ (-1*(Math.floor(scrollpos/translatey)*translatey)) +'vh) translateZ('+wrapper_translatez+'vw)  rotateY('+pos_to_rot(scrollpos+currentrotation)+'deg)'})
					}
            	}
				    // if(Math.floor(($('.fake_scroll_wrapper').scrollTop()/(window.innerHeight/100))/translatey*scrollspeed) !== currentweek){
				    // 	currentweek = k
				    // 	show_week()
				    // }
            }
            function show_week(){
            	$('.weekwrapper').hide()
            	if(!ismobile){
            	            	$('.weekwrapper_'+(currentweek-3)).show()
            	            	$('.weekwrapper_'+(currentweek-2)).show()
            	            	$('.weekwrapper_'+(currentweek-1)).show()
            	            }
            	$('.weekwrapper_'+(currentweek+0)).show()
            	$('.weekwrapper_'+(currentweek+1)).show()
            	$('.weekwrapper_'+(currentweek+2)).show()
            	$('.weekwrapper_'+(currentweek+3)).show()
            }


            function week_lastpage_swipe(){
            	$('.week_lastpage_arrowl').click(function(){
            		if(week_lastpage==0){week_lastpage = 3}
            		week_lastpage--
            		week_lastpage = week_lastpage%3
            		if(week_lastpage == 0){$('.week_whole_wrapper').css({'transform':'perspective(40vh) rotateX(0deg) translateY( '+ -1*((week_array.length-1)*translatey) +'vh) translateZ('+wrapper_translatez+'vw)  rotateY('+(pos_to_rot(Math.floor(scrollpos/translatey)*translatey))+'deg)'})}
            		if(week_lastpage == 1){$('.week_whole_wrapper').css({'transform':'perspective(40vh) rotateX(0deg) translateY( '+ -1*((week_array.length-1)*translatey) +'vh) translateZ('+wrapper_translatez+'vw)  rotateY('+(120+pos_to_rot(Math.floor(scrollpos/translatey)*translatey))+'deg)'})}
            		if(week_lastpage == 2){$('.week_whole_wrapper').css({'transform':'perspective(40vh) rotateX(0deg) translateY( '+ -1*((week_array.length-1)*translatey) +'vh) translateZ('+wrapper_translatez+'vw)  rotateY('+(240+pos_to_rot(Math.floor(scrollpos/translatey)*translatey))+'deg)'})}
            	})
            	$('.week_lastpage_arrowr').click(function(){
            		week_lastpage++
            		week_lastpage = week_lastpage%3
            		if(week_lastpage == 0){$('.week_whole_wrapper').css({'transform':'perspective(40vh) rotateX(0deg) translateY( '+ -1*((week_array.length-1)*translatey) +'vh) translateZ('+wrapper_translatez+'vw)  rotateY('+(pos_to_rot(Math.floor(scrollpos/translatey)*translatey))+'deg)'})}
            		if(week_lastpage == 1){$('.week_whole_wrapper').css({'transform':'perspective(40vh) rotateX(0deg) translateY( '+ -1*((week_array.length-1)*translatey) +'vh) translateZ('+wrapper_translatez+'vw)  rotateY('+(120+pos_to_rot(Math.floor(scrollpos/translatey)*translatey))+'deg)'})}
            		if(week_lastpage == 2){$('.week_whole_wrapper').css({'transform':'perspective(40vh) rotateX(0deg) translateY( '+ -1*((week_array.length-1)*translatey) +'vh) translateZ('+wrapper_translatez+'vw)  rotateY('+(240+pos_to_rot(Math.floor(scrollpos/translatey)*translatey))+'deg)'})}
            	})
            }

			function map_range(value, low1, high1, low2, high2) {
			    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
			}




            function popup(){
            	$('.weekwrapper').each(function(index){
            		var value = $(this).attr('class').split('weekwrapper_info_month_')[1].split('_')[0]
            		$(this).append('<div class="info_popup_wrapper info_popup_wrapper_1" style="transform: translateX(-50%) rotateY('+(360/7 * 0)+'deg) translateZ('+(-1*(translatez-1))+'vw)"><div class="info_popup">'+value+'1</div></div>')
            		$(this).append('<div class="info_popup_wrapper info_popup_wrapper_2" style="transform: translateX(-50%) rotateY('+(360/7 * 1)+'deg) translateZ('+(-1*(translatez-1))+'vw)"><div class="info_popup">'+value+'2</div></div>')
            		$(this).append('<div class="info_popup_wrapper info_popup_wrapper_3" style="transform: translateX(-50%) rotateY('+(360/7 * 2)+'deg) translateZ('+(-1*(translatez-1))+'vw)"><div class="info_popup">'+value+'3</div></div>')
            		$(this).append('<div class="info_popup_wrapper info_popup_wrapper_4" style="transform: translateX(-50%) rotateY('+(360/7 * 3)+'deg) translateZ('+(-1*(translatez-1))+'vw)"><div class="info_popup">'+value+'4</div></div>')
            		$(this).append('<div class="info_popup_wrapper info_popup_wrapper_5" style="transform: translateX(-50%) rotateY('+(360/7 * 4)+'deg) translateZ('+(-1*(translatez-1))+'vw)"><div class="info_popup">'+value+'5</div></div>')
            		$(this).append('<div class="info_popup_wrapper info_popup_wrapper_6" style="transform: translateX(-50%) rotateY('+(360/7 * 5)+'deg) translateZ('+(-1*(translatez-1))+'vw)"><div class="info_popup">'+value+'6</div></div>')
            		$(this).append('<div class="info_popup_wrapper info_popup_wrapper_7" style="transform: translateX(-50%) rotateY('+(360/7 * 6)+'deg) translateZ('+(-1*(translatez-1))+'vw)"><div class="info_popup">'+value+'7</div></div>')
            		if(index == $('.weekwrapper').length-1){
	            		$('.next_comingsoon').find('.info_popup_wrapper').each(function(index){
	            			console.log('1')
	            			$(this).find('.info_popup').html('D-'+(index+1))
	            		})
	            		$('.comingsoon').find('.info_popup_wrapper').each(function(index){
	            			console.log('2')
	            			$(this).find('.info_popup').html('D-'+(index+8))
	            		})
	            	}
            	})
	        }
            function hovereffect(){
                        $('.board').mouseenter(function(){
				            // $(this).parent().find('.board').css({'background-color':'#dddddd'})
                        	$(this).parent().find('.info_popup').show()
                        })
                       
                        $('.board').mouseleave(function(){
                        	// $(this).parent().find('.board').css({'background-color':'white'})
                        	$(this).parent().find('.info_popup').hide()
                        })
                    
                        $('.spiral').mouseenter(function(){
                        	noscroll = true
                        	var selected = $(this).parent().attr('class').split('spiralwrapper_')[1].split('_')[0]
                        	$('.spiral_whole_wrapper .spiralwrapper_' + selected + '_1 .spiral').css({'border-width':'7px'})
                        	$('.spiral_whole_wrapper .spiralwrapper_' + selected + '_2 .spiral').css({'border-width':'7px'})
                        	$('.popupbox').html($(this).parent().attr('class').split('spiralwrapper_info_month_')[1].split(' ')[0])
                        })
                        
	                    $('.spiral').mouseleave(function(){
                        	noscroll = false
                        	var selected = $(this).parent().attr('class').split('spiralwrapper_')[1].split('_')[0]
                        	$('.spiral_whole_wrapper .spiralwrapper_' + selected + '_1 .spiral').css({'border-width':'1px'})
                        	$('.spiral_whole_wrapper .spiralwrapper_' + selected + '_2 .spiral').css({'border-width':'1px'})
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
            $('.spiral_whole_wrapper_wrapper').click(function(){
				if(window.location.hash && window.location.hash.split('#')[1] === 'week') {
	            	$('body').removeClass('week_view').addClass('spiral_view')
					window.location.hash = 'spiral';
				}
            })
			$('.week_whole_wrapper_wrapper').click(function(){
				if(window.location.hash && window.location.hash.split('#')[1] === 'spiral') {
					$('body').removeClass('spiral_view').addClass('week_view')
					window.location.hash = 'week';
				}
			})
            $(document).mousemove(function(e){
            	$('.followcursor').css({'left':e.pageX+'px','top':(e.pageY)+'px'})
            })
            function settingup_lastpage(){
            	$('.weekwrapper_'+(week_array.length-1)+' .board_info_time_0').append('\
            		<div class="title">Artists</div>\
            		<div class="list_wrapper artist_list_wrapper">\
            			<div class="list artist_list artist_list_0">BREAD AND PUPPET THEATRE</div>\
            			<div class="list artist_list artist_list_0">BLUE PERIL, INTERPRT</div>\
            			<div class="list artist_list artist_list_0">DONKEY LIBRARY, NIRWAN AHMAD ARSUKA</div>\
            			<div class="list artist_list artist_list_0">CRIP MAGAZINE, EVA EGERMANN</div>\
            			<div class="list artist_list artist_list_0">FERNANDO GARCÍA-DORY</div>\
            			<div class="list artist_list artist_list_0">FISHERFOLKS DAY by MARTHA ATIENZA</div>\
            			<div class="list artist_list artist_list_0">I/E by TAREK ATOUI</div>\
            			<div class="list artist_list artist_list_0">SYNTHESIS by Pathsala South Asian Media Institute</div>\
            			<div class="list artist_list artist_list_0">ISTANBUL BUFFALOES PROJECT by COOKING SECTIONS</div>\
            			<div class="list artist_list artist_list_0">NEPAL FEMINIST MEMORY by the NEPAL PICTURE LIBRARY</div>\
            			<div class="list artist_list artist_list_0">JOHN BELL</div>\
            			<div class="list artist_list artist_list_0">INDIGENOUS UNIVERSITY, URSULA BIEMANN</div>\
            			<div class="list artist_list artist_list_0">A PROJECT ON BRUNO TAUT, NAKAMURA YUTA</div>\
            			<div class="list artist_list artist_list_0">GREEN PAPAYA</div>\
            			<div class="list artist_list artist_list_0">YEHWAN SONG</div>\
            		</div>\
            		\
            	')
            	$('.artist_list').click(function(){
	            	$('.lastpage_popupbox').empty()
	            	$('.lastpage_popupbox').append('\
	            		<div class="popups_tab"><div class="close"></div></div>\
						<div class="artist_content_0 artist_content_0_1">\
						“The traveling puppet shows range from tightly composed theater pieces presented by members of the company to extensive outdoor pageants which require the 		participation of many volunteers.”\
						TDR: Why did you name your theatre Bread & Puppet? SCHUMANN: Bread means bread. Something basic. We give it out during or after the show. \
						TDR: Why? \
						SCHUMANN: We would like to be able to feed people.\
						</div>\
						\
					')
					$('.lastpage_popupbox').show()
		            $('.close').click(function(){
		            	$(this).parent().parent().hide()
		            })
            	})







            	$('.weekwrapper_'+(week_array.length-1)+' .board_info_time_1').append('\
            		<div class="title visible">About</div>\
            		<div class="about_wrapper bottom_about_wrapper">\
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porttitor sed mi quis gravida. Cras fringilla dictum bibendum. Nam eleifend consectetur nisi, id interdum nulla faucibus dignissim. Aenean id lorem egestas, faucibus orci ac, elementum diam. Vestibulum interdum auctor nisl id pulvinar. Vivamus bibendum porta porta. Ut scelerisque id risus vel tincidunt. Ut eu elementum ante, sed dictum tortor. Donec porta viverra eros at volutpat. Proin consequat diam quis nulla rutrum sollicitudin. Aenean varius non nulla eu lacinia. Pellentesque in mauris id lacus rhoncus fringilla. Vivamus condimentum pretium sapien, sed dapibus dolor suscipit vel. Sed ut sodales massa, ac pharetra dolor. Integer egestas metus non nunc venenatis dignissim. Vivamus rutrum ornare interdum\
            		</div>\
            		<div class="title visible">Archive</div>\
            		<div class="list_wrapper bottom_list_wrapper_button"> Select Week </div>\
            		<div class="list_wrapper bottom_list_wrapper">\
            		</div>\
            	')
            	var bottom_list_wrapper_visible = false
            	$('.bottom_list_wrapper_button').click(function(){
            		if(bottom_list_wrapper_visible){
	            		bottom_list_wrapper_visible = false
	            		$('.bottom_list_wrapper').hide()
	            	}else{
	            		bottom_list_wrapper_visible = true
	            		$('.bottom_list_wrapper').show()
            		}
            	})
    			for (var i = 0; i < week_array.length; i++) {
    				$('.bottom_list_wrapper').append('\
            			<div class="list bottom_list bottom_list_'+i+' bottom_list_info_month_' + data_array[i+1][0] + '_week_' + data_array[i+1][1] + '"> month_' + data_array[i+1][0] + '_week_' + data_array[i+1][1] + '</div>\
            			')
    			}
            	$('.bottom_list').click(function(){
            		$('.bottom_list_wrapper').hide()
            		$('.fake_scroll_wrapper').scrollTop((height_unit*parseInt($(this).attr('class').split('button_list_')[1].split(' ')[0]))/scrollspeed*window.innerHeight/100)
            	})


            	$('.weekwrapper_'+(week_array.length-1)+' .board_info_time_2').append('<div class="img_list_wrapper"></div>')



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