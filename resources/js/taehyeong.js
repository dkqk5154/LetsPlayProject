var taehyeong = taehyeong || {};
var k = k || 0;
var y = y || 0;
taehyeong.main =(x=>{
	var init =x=>{
	$('#header').empty();
	$('#content').empty();
	
	let date = new Date();
	$('<div/>').addClass('date_selecter_contain').attr({id:'date_selecter_contain'}).appendTo($('#content'));
	$('<div/>').addClass('date_selecter').attr({id:'date_selecter'}).appendTo($('#date_selecter_contain'));
	
	let today = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate());
	$('<div/>').attr({id:'mainInput3',style:'display: inline-block'}).appendTo($('#date_selecter'));	
	$('<input/>')
				.attr({'readonly':'true'
							,'value':x.checkin_date.split('-')[0] 
							+"-" +x.checkin_date.split('-')[1] 
							+ "-" + x.checkin_date.split('-')[2]
							,'id':'start_date'}) // 체크인 날짜 번경
				.appendTo($('<div>').addClass(['th_check_middle','heetae_check_middle_con1']).appendTo('#mainInput3'))
	$('<i>').addClass('icono-rightArrow').attr({id:'icono-rightArrow'}).appendTo($('#date_selecter'));			
	$('<div/>').attr({id:'mainInput4',style:'display: inline-block'}).appendTo($('#date_selecter'));
	$('<input/>')
			.attr({'readonly':'true'
					,'value':x.checkout_date.split('-')[0] 
					+"-" +x.checkout_date.split('-')[1] 
					+ "-" + x.checkout_date.split('-')[2]
					,'id':'end_date'}) // 체크아웃 날짜 번경
			.appendTo($('<div>').addClass(['th_check_middle','heetae_check_middle_con1']).appendTo('#mainInput4'))
			$('#start_date')
		 .datepicker({
			 minDate: today,
	         maxDate: function () {
	               return $('#end').val();
	         }
		 });
	
		$('#end_date').datepicker({
			minDate: function () {
				return new Date($('#start_date').val().split('-')[0]
				,($('#start_date').val().split('-')[1]-1)
				,$('#start_date').val().split('-')[2]);
            }
		});	
		
		$('.gj-icon')
		.addClass('heetae_hide_ico')
					
		$('#start_date')
		.change(e=>{
			if($('#start_date').val().split('-')[2]>$('#end_date').val().split('-')[2] 
			|| $('#start_date').val().split('-')[1]>$('#end_date').val().split('-')[1]){
				$('#end_date').val($('#start_date').val())
			}
			$('.heetae_check_bottom_con2')
			.text($('#end_date').val().split('-')[2]
			-$('#start_date').val().split('-')[2]+1+'박')
		})
		
		$('#end_date')
		.change(e=>{
			$('.heetae_check_bottom_con2')
			.text($('#end_date').val().split('-')[2]
			-$('#start_date').val().split('-')[2]+1+'박')
		})
		category(x)
	}
		
	
	var category =x=>{
		$('<div/>').addClass('category_contain').attr({id:'category_contain'}).appendTo($('#content'));
		$('<div/>').addClass('category').attr({id:'category1'}).appendTo($('#category_contain'));
		let cate = ["모텔","#마이룸","#야놀자호텔","#신축/리모델링","#인기숙소","#파티룸","#무료영화"]; 
		$.each(cate,(i,j)=>{
			$('<p/>').addClass('category_font').html(j).appendTo($('#category1'));
		})
		list(x);
	}
	
	
	var list =x=>{
		$('<div/>').addClass('list_map').attr({id:'list_map'}).appendTo($('#content'));
		$('<div/>').addClass('list').attr({id:'list'}).appendTo($('#list_map'));
		$('<ul/>').addClass('list_ul').attr({id:'list_ul'}).appendTo($('#list'))
		
		let list_menu = ["기본순","숙소변경","숙소 특징"];
		$.each(list_menu,(i,j)=>{
			$('<div/>').addClass('list_li1_div').attr({id:'list_li1_div'+i}).appendTo($('#list_ul'))
			$('<li/>').addClass('list_li').attr({id:'list_li'+i}).appendTo($('#list_li1_div'+i))
			$('<p/>').addClass('list_font').html(j).appendTo($('#list_li'+i));
			$('<i/>').addClass('icono-caretDown').appendTo($('#list_li'+i));
		})
		
		$('<p/>').addClass('list_font cursor_pointer').attr({id:'font_'}).html('필터 초기화').appendTo($('#list_ul'));
		$('<i>').addClass('icono-reset').appendTo($('#font_'));
		
		$("#list_li1_div0").click(()=>{
			$('.radio__1').remove();
			$('<div/>').addClass('radio__1').attr({id:'radio__1'}).appendTo($('#list_li1_div0'));
			$.each(["기본순","가격순"],(i,j)=>{
				$('<div/>').addClass('radio1__input').attr({id:'radio1_input'+i}).appendTo($('#radio__1'))
				$('<p/>').addClass('radio1__input__font').attr({id:'radio1_writer'+i}).html(j).appendTo($('#radio1_input'+i));
			});
			taehyeong.outside.clear();
			imageSrc = taehyeong.change.marker_img(x.accom_type)
			$('#radio1_writer0').click(()=>{
				k = 0; y = 0;
				$.ajax({ 
                    url:$.ctx()+'taehyeong/search',
                    method:'post',
                    contentType : 'application/json',
                    data : JSON.stringify({
                    	accom_type:x.accom_type,
                        accom_addr:x.accom_addr,
                        checkin_date:x.checkin_date,
                        checkout_date:x.checkout_date,
                        imageSrc:imageSrc
                    }),
                        success:d=>{
                       	taehyeong.main.init(d);
                        },
                        error:()=>{
                            alert('에러')
                        }
                })
			});
			
			$('#radio1_writer1').click(()=>{
				k = 0; y = 0;
				$.ajax({
                    url:$.ctx()+'/taehyeong/lowPriceList',
                    method:'post',
                    contentType : 'application/json',
                    data : JSON.stringify({
                    	accom_type:x.accom_type,
                        accom_addr:x.accom_addr,
                        checkin_date:x.checkin_date,
                        checkout_date:x.checkout_date,
                        imageSrc:imageSrc
                    }),
                        success:d=>{
                        	taehyeong.main.init(d);
                        },
                        error:()=>{
                            alert('에러')
                        }
                })
					
				})
		}) 
		
		$('#list_li1').click(()=>{
			k = 0; y = 0;
			$('.radio__1').remove();
			$('<div/>').addClass('radio__1').attr({id:'radio2__'}).appendTo($('#list_li1_div1'));
			$('<p/>').addClass('radio1__input__font radio1__input').attr({id:'radio2_writer0'}).html('모텔').appendTo($('#radio2__'))
			.click(()=>{
				 $.ajax({
                     url:$.ctx()+'/taehyeong/search',
                     method:'post',
                     contentType : 'application/json',
                     data : JSON.stringify({
                     	accom_type:'motel',
                         accom_addr:x.accom_addr,
                         checkin_date:x.checkin_date,
                         checkout_date:x.checkout_date,
                         imageSrc:'https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-motel.svg'
                     }),
                         success:d=>{
                        	 taehyeong.main.init(d);
                         },
                         error:()=>{
                             alert('에러')
                         }
                 })
			})
				
				$('<p/>').addClass('radio1__input__font radio1__input').attr({id:'radio2_writer1'}).html('호텔').appendTo($('#radio2__'))
				.click(()=>{
					k = 0; y = 0;
					 $.ajax({
	                     url:$.ctx()+'/taehyeong/search',
	                     method:'post',
	                     contentType : 'application/json',
	                     data : JSON.stringify({
	                     	accom_type:'hotel',
	                         accom_addr:x.accom_addr,
	                         checkin_date:x.checkin_date,
	                         checkout_date:x.checkout_date,
	                         imageSrc:'https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-hotel.svg'
	                     }),
	                         success:d=>{
	                        	 taehyeong.main.init(d);
	                         },
	                         error:()=>{
	                             alert('에러')
	                         }
	                 })
				})
				taehyeong.outside.clear();
			});
		
		$('#list_li2').click(x=>{
			$('.radio__1').remove();
			$('<div/>').addClass('radio__1 radio__12').attr({id:'radio3__'}).appendTo($('#list_li1_div2'));
			let radio3___checkBox = [{id:'choi_ju_ga',name:"최저가보상"},
									{id:'molka',name:"몰카예방교육"},
									{id:'hunjang',name:"현장적립"},
									{id:'good_sukbak',name:"좋은숙박 TOP100"}]; 
			$.each(radio3___checkBox,(i,j)=>{
				$('<div/>').addClass('radio3__div').attr({id:'radio3__div'+i}).appendTo($('#radio3__'));
				$('<label>').addClass('cursor_pointer').attr({for:radio3___checkBox[i].id}).html(radio3___checkBox[i].name).appendTo($('#radio3__div'+i));
				$('<input/>').attr({type:'checkbox',id:radio3___checkBox[i].id}).appendTo($('#radio3__div'+i));
			})
			//<button type="button" class="btn btn-danger">Danger</button>
			$('<button/>').addClass('btn btn-danger').html('확인').appendTo($('#radio3__')).click(()=>{
				alert('미구현 기능입니다.')
			});
			$('#radio3_button').click(()=>{
				$('.radio__1').remove();
			})
			taehyeong.outside.clear();
		})
		$('<div/>').addClass('font_1 font_weight600').html('이 지역 추천').appendTo($('#list'));
		$('<div/>').addClass('first_list').attr({id:'first_list'}).appendTo($('#list'))
		let high_rank_img = [x.list[0],x.list[1],x.list[2],x.list[3]];
		k = 0;
		y = 0;
		$.each(high_rank_img,(i,j)=>{
			$('<div/>').addClass('first_list_one').attr({id:'first_list_one'+i}).appendTo($('#first_list'))
			$('<div>').addClass('image_Box10').attr({id:'image_Box10'+i}).appendTo($('#first_list_one'+i))
			$('<img/>').addClass('high_rank_img cursor_pointer').attr({id:'high_rank_img'+i,src:j.ACCOM_PHOTO1}).appendTo($('#image_Box10'+i));
			$('<p/>').addClass('ppp__').html(j.ACCOM_NAME).appendTo($('#image_Box10'+i));
			$('<span>').addClass('span_').attr({id:'span_'+i}).appendTo($('#image_Box10'+i))
			$('<p/>').addClass('p_span p_span0').html('대실').appendTo($('#span_'+i))
			$('<h5/>').addClass('p_span').html(taehyeong.add.comma(j.PRICE)).appendTo($('#span_'+i))
			$('<p/>').addClass('p_span p_won').html('원').appendTo($('#span_'+i))
			$('<p/>').addClass('p_span p_span0').html('숙박').appendTo($('#span_'+i))
			$('<h5/>').addClass('p_span').html(taehyeong.add.comma(j.PRICE+40000)).appendTo($('#span_'+i))
			$('<p/>').addClass('p_span p_won').html('원').appendTo($('#span_'+i))
			
			$('#high_rank_img'+i).click(()=>{
				$.getScript($.ctx()+'/resources/js/heetae.js',()=>{
                    let se = {'in_day':$('#start_date').val(),'out_day':$('#end_date').val(),'accom_seq':j.ACCOM_SEQ}
                    heetae.main.init(se);
                });
			})
		})
		$('<p/>').addClass('font_1 font_weight600 padding_top_30').html('프리미엄').appendTo($('#list'));
		$('<ul/>').addClass('premium_selecter').attr({id:'premium_selecter'}).appendTo($('#list'));
		
		taehyeong.second.list(x);
		
		map(x);
	}
	var map = x=>{
		$('<div/>').addClass('map').attr({id:'map'}).appendTo($('#list_map'));
		$('<div/>').addClass('map1').attr({id:'map1'}).appendTo($('#map'))
		$('<div/>').addClass('map_header').attr({id:'map_header'}).appendTo($('#map1'));
		let marker_guide = ["모텔","호텔","펜션","게스트하우스","비제휴"];
		let square_color = ["#00\e0d1","#722" +
				"c82","#ff6659","#97c91d","#ccc"];
		$.each(marker_guide,(i,j)=>{
			$('<div/>').addClass('map_header_writer').attr({id:'map_header_writer'+i}).appendTo($('#map_header'))
			$('<div/>').addClass('square').attr('style','background-color:'+square_color[i]).appendTo($('#map_header_writer'+i));
			$('<p/>').addClass('font_2').html(j).appendTo($('#map_header_writer'+i));
		})

	/*지도 api 로직*/
	var mapContainer = document.getElementById('map1'), // 지도를 표시할 div  
	mapOption = { 
	    center: new daum.maps.LatLng(37.566535,126.97796919999996), // 지도의 중심좌표
	    level: 9 // 지도의 확대 레벨
	};
	var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

	var positions = new Array();
	$.each(x.list,(i,j)=>{
		positions.push({'title' : j.ACCOM_NAME,
				'latlng': new daum.maps.LatLng(j.LONGITUDE, j.LATITUDE)})
	})
	var imageSrc = x.imageSrc;
	var imageSize = new daum.maps.Size(34, 60); 

	var position
	var bounds = new daum.maps.LatLngBounds();
	$.each(x.list,(i,j)=>{
		
	    // 마커 이미지를 생성합니다    
	    var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize); 
	    
	    // 마커를 생성합니다
	    var marker = new daum.maps.Marker({
	        map: map, // 마커를 표시할 지도
	        position: positions[i].latlng, // 마커를 표시할 위치
	        image : markerImage // 마커 이미지 
	    });
	    var content = '<div class="customoverlay">' +
	    '  <a href="http://map.daum.net/link/map/11394059" target="_blank">' +
	    '    <span class="title">'+x.list[i].ACCOM_NAME+'</span>' +
	    '  </a>' +
	    '</div>';
	    position = positions[i].latlng;
	    var customOverlay = new daum.maps.CustomOverlay({
	        position: position,
	        content: content,
	        yAnchor: 2.7
	    });
	    daum.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, customOverlay));
	    daum.maps.event.addListener(marker, 'mouseout', makeOutListener(customOverlay));
	    daum.maps.event.addListener(marker, 'click', function() {
	    	$.getScript($.ctx()+'/resources/js/heetae.js',()=>{
	            let se = {'in_day':$('#start_date').val(),'out_day':$('#end_date').val(),'accom_seq':j.ACCOM_SEQ}
	            heetae.main.init(se);
	        });
	  });
	   
	    
	    // LatLngBounds 객체에 좌표를 추가합니다
	    bounds.extend(positions[i].latlng);
	    map.setBounds(bounds);
	})

		  
	function makeOverListener(map, marker, customOverlay) {
	    return function() {
	    	customOverlay.setMap(map);
	    };
	}
	// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
	function makeOutListener(customOverlay) {
	    return function() {
	    	customOverlay.setMap(null);
	    };
	}
	
}
return {init:init,category:category, list:list, map:map};
})()

/*이하는 기능의 역할입니다.*/		
taehyeong.outside={
	clear : x=>{
		$(document).mouseup(function (e){
		var container = $(".radio__1");
		if( container.has(e.target).length === 0)
		container.hide();
		});	
	}
}

/*1,000단위의 콤마를 찍어주는 로직(숙소 가격 사용)*/
taehyeong.add={
	comma : num=>{
		var regexp = /\B(?=(\d{3})+(?!\d))/g;
		return num.toString().replace(regexp, ',');
	}
}

taehyeong.change={
	marker_img : x=>{
		if(x=='motel'){
			x='https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-motel.svg'
		}else{
			x='https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-hotel.svg'
		}
		return x;
	}
}

taehyeong.second={
	list: x=>{
			let list_count = new Array();
			for(let i =0; i<10; i++){
				list_count[i] = x.list[k]
				k++
			}
			$.each(list_count,(i,j)=>{
				$('<li/>').addClass('premium_selecter_li').attr({id:'premium_selecter_li'+y}).appendTo($('#premium_selecter'))
				$('<img/>').addClass('premium_selecter_img cursor_pointer').attr({id:'list_img'+y,src:j.ACCOM_PHOTO1}).appendTo($('#premium_selecter_li'+y))
				.click(()=>{
					$.getScript($.ctx()+'/resources/js/heetae.js',()=>{
	                    let se = {'in_day':$('#start_date').val(),'out_day':$('#end_date').val(),'accom_seq':j.ACCOM_SEQ}
	                    heetae.main.init(se);
	                });
				})
				$('<div/>').addClass('premium_selecter_writer').attr({id:'premium_selecter_writer'+y}).appendTo($('#premium_selecter_li'+y))
				.click(()=>{
					$.getScript($.ctx()+'/resources/js/heetae.js',()=>{
	                    let se = {'in_day':$('#start_date').val(),'out_day':$('#end_date').val(),'accom_seq':j.ACCOM_SEQ}
	                    heetae.main.init(se);
	                });
				})
				$('<h3/>').addClass('list_title').attr({id:'list_title'+y}).html(j.ACCOM_NAME).appendTo($('#premium_selecter_writer'+y));
				//별점이 들어갈 자리$('<span>').addClass('star__').attr({id:'star__'}).appendTo($('#premium_selecter_writer'+y))
				$('<div/>').addClass('premium_selecter_explanation').attr({id:'premium_selecter_explanation'+y}).appendTo($('#premium_selecter_writer'+y))
				$('<h6/>').addClass('p_span').html('대실').appendTo($('#premium_selecter_explanation'+y));
				$('<h6/>').addClass('p_span p_padding5').html('최대 4시간').appendTo($('#premium_selecter_explanation'+y));
				$('<h4/>').addClass('p_span p_padding20').html(taehyeong.add.comma(j.PRICE)).appendTo($('#premium_selecter_explanation'+y));
				$('<h6/>').addClass('p_span').html('원').appendTo($('#premium_selecter_explanation'+y));
				$('<div/>').addClass('premium_selecter_explanation').attr({id:'premium_selecter_explanation_'+y}).appendTo($('#premium_selecter_writer'+y))
				$('<h6/>').addClass('p_span').html('숙박').appendTo($('#premium_selecter_explanation_'+y));
				$('<h6/>').addClass('p_span p_padding5').html('20:00~').appendTo($('#premium_selecter_explanation_'+y));
				$('<h4/>').addClass('p_span p_padding30').html(taehyeong.add.comma(j.PRICE+40000)).appendTo($('#premium_selecter_explanation_'+y));
				$('<h6/>').addClass('p_span').html('원').appendTo($('#premium_selecter_explanation_'+y));
				let split_introduce = j.ACCOM_INTRODUCE.split('-');
				$('<h6/>').addClass('font_color11').html(split_introduce[0]).appendTo($('#premium_selecter_writer'+y));
				$('<h6/>').addClass('font_color11').html(split_introduce[1]).appendTo($('#premium_selecter_writer'+y));
				y++
			}) 
			taehyeong.infinite.scroll(x);
		}
	}

taehyeong.infinite= {
	scroll : x=>{
		$(window).scroll(function() {
	        if (x.list.length>k && $(window).scrollTop() >= $(document).height() - $(window).height()) {
	          taehyeong.second.list(x);
	        }else if(!$('#premium_selecter').length>0){
	        	$(window).unbind('scroll');
	        }
	    });
	}
}
$('#footer').empty();