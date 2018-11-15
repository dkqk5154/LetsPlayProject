"use strict";
var sanghoon = sanghoon || {};
var googleChart = googleChart || {};

sanghoon.main =(()=>{
	var init =()=>{
		onCreate();
	};
	var onCreate =()=>{
		setContentView(); 
	};
	var setContentView =()=>{
		$('#header').empty();
		$('#mylocation').remove();
		$('#hotelSearch').remove();
		$('#amdin').remove();
		
		$('#board').remove();
		$('<a/>').attr({id:'basic_btn', href:'#'}).html('기본정보')
		.addClass('ya_cusor')
		.appendTo($('.nav_right')).click(e=>{
			e.preventDefault();
			sanghoon.service.basic();
		});
		
		
		$('#amdin').remove();
		$('<a/>').attr({id:'sales_btn', href:'#'}).html('매출정보')
		.addClass('ya_cusor')
		.appendTo($('.nav_right')).click(e=>{
			e.preventDefault();
			sanghoon.service.sales();
		});
		
		$('#add_btn').remove();
		$('<a/>').attr({id:'accom_btn', href:'#'}).html('숙소정보')
		.addClass('ya_cusor')
		.appendTo($('.nav_right')).click(e=>{
			e.preventDefault();
			sanghoon.service.accom();
		});
		
		$('#login_btn').remove();
		$('<a/>').attr({id:'custo', href:'#'}).html('고객정보')
		.addClass('ya_cusor')
		.appendTo($('.nav_right')).click(e=>{
			e.preventDefault();
			sanghoon.service.custo();
		});
		
		$('<a/>').attr({id:'top_accom_btn', href:'#'}).html('매출순위')
		.addClass('ya_cusor')
		.appendTo($('.nav_right')).click(e=>{
			e.preventDefault();
			sanghoon.service.top_accom();
		});
		sanghoon.service.basic();
	};
	return {init:init};
		
})();

googleChart.service = {
		
	  basicInfo : () => {
		  $.getJSON($.ctx()+'/admin/basic',d=>{
			  google.charts.load("current", {packages:['corechart']});
			  google.charts.setOnLoadCallback(drawPay);

			  function drawPay(){
				  var data = new google.visualization.DataTable();
				  data.addColumn('string', '결제수단');
				  data.addColumn('number', 'count');
				  $.each(d.pay, (i,j)=>{
					  data.addRow([
						  j.payType,
						  (j.payTypeCount * 1)
					  ]);
				  });
				  var options = {'title':'결제타입',
		                       'width':400,
		                       'height':300};
		          // Instantiate and draw our chart, passing in some options.
		          var chart = new google.visualization.PieChart(document.getElementById('pay_type_div'));
		          chart.draw(data, options);
			  };// 결제타입별 차트
			  google.charts.load("current", {packages:["corechart"]});
		      google.charts.setOnLoadCallback(drawBooked);
		      function drawBooked(){
		    	  var data = new google.visualization.DataTable();
		    	  data.addColumn('string', '분기별 예약');
		    	  data.addColumn('number', 'count');
		    	  for(let i = 1; i < d.booked.length; i++){
		    		  data.addRow([d.booked[i].booked,(d.booked[i].bookCount * 1)]);
		    	  }
		    	  var options = {'title':'분기별 예약',
	                       'width':400,
	                       'height':300,
	                       'is3D':true,};
		    	  var chart = new google.visualization.PieChart(document.getElementById('booked_div'));
		    	  chart.draw(data, options);
		      };// 분기별 예약 차트
		      google.charts.load("current", {packages:["corechart"]});
			  google.charts.setOnLoadCallback(drawAccom);
			  function drawAccom(){
				  var data = new google.visualization.DataTable();
				  data.addColumn('string', '숙소 타입');
				  data.addColumn('number', 'count');
				  $.each(d.accom, (i,j)=>{
					  data.addRow([
						  j.accomType,
						  (j.accomCount * 1)
					  ]);
				  });
				  var view = new google.visualization.DataView(data);
				  view.setColumns([0, 1]);
				  var options = {
					        title: "숙소 타입",
					        width: 600,
					        height: 400,
					        bar: {groupWidth: "95%"},
					        legend: { position: "none" },
					};
				  var chart = new google.visualization.BarChart(document.getElementById("have_accom_div"));
			      chart.draw(view, options);
			  }; // 숙소별 보유수
			  google.charts.load("current", {packages:['corechart']});
			  google.charts.setOnLoadCallback(drawAge);
			  function drawAge(){
				  var data = new google.visualization.DataTable();
				  data.addColumn('string', '연령');
				  data.addColumn('number', 'count');
				  $.each(d.age, (i,j)=>{
					  data.addRow([
						  j.memberAge,
						  (j.totCount * 1)
					  ]);
				  });
				  var view = new google.visualization.DataView(data);
			      view.setColumns([0, 1]);
			      var options = {
					        title: "연령대별 회원수",
					        width: 600,
					        height: 400,
					        bar: {groupWidth: "95%"},
					        legend: {position: "none"},
					};
				  var chart = new google.visualization.ColumnChart(document.getElementById('age_member'));
				  chart.draw(view, options);
			  }; // 연령별 회원
			  google.charts.load("current", {packages:["corechart"]});
		      google.charts.setOnLoadCallback(drawGender);
		      function drawGender(){
		    	  var data = new google.visualization.DataTable();
		    	  data.addColumn('string', '성별');
				  data.addColumn('number', 'count');
				  for(let i = 1; i < d.gender.length; i++){
					  data.addRow([
						  d.gender[i].genderType,
						  (d.gender[i].genderCount * 1)
					  ]);
				  }

				  var options = {'title':'회원 성별',
	                       'width':400,
	                       'height':300,
	                       'pieHole':0.4,};
				  var chart = new google.visualization.PieChart(document.getElementById('member_gender_div'));
				  chart.draw(data, options);
		      }; // 성별 회원
		      google.charts.load('current', {'packages':['table']});
		      google.charts.setOnLoadCallback(drawTopLocal);
		      function drawTopLocal(){
		    	  var data = new google.visualization.DataTable();
	    	      data.addColumn('string', '지역');
	    	      data.addColumn('number', '예약 수');
	    	      $.each(d.topLoc, (i,j)=>{
	    	    	  data.addRow([
	    	    		  j.byAccom,
	    	    		  (j.accomCount * 1)
	    	    	  ]);
	    	      });
	    	      var table = new google.visualization.Table(document.getElementById('top_local_div'));
	    	      table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
		      }; //지역별 예약수 top 5
		      google.charts.load('current', {'packages':['table']});
		      google.charts.setOnLoadCallback(drawTopSales);
		      function drawTopSales(){
		    	  var data = new google.visualization.DataTable();
		    	  data.addColumn('string', '숙소명');
		    	  data.addColumn('number', '매출액');
		    	  $.each(d.topSales, (i,j)=>{
		    		 data.addRow([
		    			 j.accomName,
		    			 {v:(j.sumPay * 1), f:j.sumPay+'원'}
		    		 ]); 
		    	  });
		    	  var table = new google.visualization.Table(document.getElementById('top_sales_div'));
		    	  table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
		      }; //매출 top 5
		      google.charts.load('current', {'packages':['table']});
		      google.charts.setOnLoadCallback(drawTopMember);
		      function drawTopMember(){
		    	  var data = new google.visualization.DataTable();
		    	  data.addColumn('string', '회원 ID');
		    	  data.addColumn('number', '결제액');
		    	  $.each(d.topMember, (i,j)=>{
		    		 data.addRow([
		    			 j.memberID,
		    			 {v:(j.sumPay * 1), f:j.sumPay+'원'}
		    		 ]); 
		    	  });
		    	  var table = new google.visualization.Table(document.getElementById('top_member_div'));
		    	  table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
		      }; //매출 top 5
		  });
	  },
	  salesInfo : () => {
		  $.getJSON($.ctx()+'/admin/sales',d=>{
			  google.charts.load('current', {'packages':['corechart']});
		      google.charts.setOnLoadCallback(drawSales);
		      function drawSales(){
		    	  var data = new google.visualization.DataTable();
		    	  data.addColumn('string', 'Month');
		    	  data.addColumn('number', 'motel');
		    	  data.addColumn('number', 'hotel');
		    	  data.addColumn('number', 'revenue');
		    	  for(let i = 0; i < d.sumMotel.length-1; i++){
		    		  data.addRow([d.sumMotel[i].monthly, d.sumMotel[i].sales * 1, d.sumHotel[i].sales * 1, (d.sumMotel[i].sales * 1) + (d.sumHotel[i].sales * 1)])
		    	  }
		    	  var options = {
		    		      title : '숙소별 월별 매출 현황',
		    		      vAxis: {title: 'Sales'},
		    		      hAxis: {title: 'Month'},
		    		      seriesType: 'bars',
		    		      series: {2: {type: 'line'}}
		    		    };
		    	  var chart = new google.visualization.ComboChart(document.getElementById('sales_div'));
		    	    chart.draw(data, options);
		      }//매출 차트
		  });
	  },
	  accomInfo : x =>{

		  switch(x.start){
		  case 'all':

			  $.getJSON($.ctx()+'/admin/accom/'+x.local, d=>{
				  google.charts.load('current', {'packages':['corechart']});
			      google.charts.setOnLoadCallback(drawPrice);
			      function drawPrice(){
			    	  var data = new google.visualization.DataTable();
			    	  data.addColumn('string', 'price');
			    	  data.addColumn('number', 'count');
			    	  $.each(d.accomPrice, (i,j)=>{
			    		  data.addRow([
			    			  j.byPrice,
			    			  (j.reserCount * 1)
			    		  ]);
			    	  });
			    	  var options = {
			    	          title: '가격대별 예약수',
			    	          hAxis: {title: 'price', minValue: 0, maxValue: 15},
			    	          vAxis: {title: 'count', minValue: 0, maxValue: 15},
			    	          legend: 'none'
			    	        };
			    	  var chart = new google.visualization.ScatterChart(document.getElementById('price_reservation'));
			    	  chart.draw(data, options);
			      }// 가격대별 예약수 차트
			      var mapContainer = document.getElementById('location'),	// 지도를 표시할 div
				  mapOption = {
					  center: new daum.maps.LatLng(37.566535,126.97796919999996),	// 지도의 중심좌표
					  level: 9
				  };
				  var map = new daum.maps.Map(mapContainer, mapOption);	// 지도를 생성
				  var positions = [];
				  $.each(d.accomPosition, (i,j)=>{
					  positions.push({
						  'title' : j.accomName,
						  'latlng' : new daum.maps.LatLng(j.longitude,j.latitude)
					  });
				  });
				  var imageSrc = "https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-motel.svg";
				  var imageSize = new daum.maps.Size(34, 60);
				  
				  var position
				  for(var i = 0; i < positions.length; i++){
					  // 마커 이미지를 생성
					  var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);
					  var marker = new daum.maps.Marker({
						  map: map,	// 마커를 표시할 지도
						  position: positions[i].latlng,	// 마커를 표시할 위치
						  image: markerImage	// 마커 이미지
					  });
					  var content = '<div class="customoverlay">' +
					    '  <a href="http://map.daum.net/link/map/11394059" target="_blank">' +
					    '    <span class="title">'+d.accomPosition[i].accomName+'</span>' +
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
				  }
				  function makeOverListener(map, marker, customOverlay) {
				        return function() {
				        	customOverlay.setMap(map);
				        };
				    }
				  // 인포윈도우를 닫는 클로저를 만드는 함수
				  function makeOutListener(customOverlay) {
				        return function() {
				        	customOverlay.setMap(null);
				        };
				    }
				  var bounds = new daum.maps.LatLngBounds();	// 지도 재설정 범위정보 객체 생성
				  for(var k = 0; k < positions.length; k++){
					  marker = new daum.maps.Marker({points : positions[k].latlng});
					  marker.setMap(map);
					  bounds.extend(positions[k].latlng);
				  }
					  map.setBounds(bounds);	// 지도 재배치
			  });
			  break;
		  default:

			  $.getJSON($.ctx()+'/admin/accom/'+x.local+'/'+x.start+'/'+x.end, d=>{
				  google.charts.load('current', {'packages':['corechart']});
			      google.charts.setOnLoadCallback(drawPrice);
			      function drawPrice(){
			    	  var data = new google.visualization.DataTable();
			    	  data.addColumn('string', 'price');
			    	  data.addColumn('number', 'count');
			    	  $.each(d.accomPrice, (i,j)=>{
			    		  data.addRow([
			    			  j.byPrice,
			    			  (j.reserCount * 1)
			    		  ]);
			    	  });
			    	  var options = {
			    	          title: '가격대별 예약수',
			    	          hAxis: {title: 'price', minValue: 0, maxValue: 15},
			    	          vAxis: {title: 'count', minValue: 0, maxValue: 15},
			    	          legend: 'none'
			    	        };
			    	  var chart = new google.visualization.ScatterChart(document.getElementById('price_reservation'));
			    	  chart.draw(data, options);
			      }// 가격대별 예약수 차트
			      var mapContainer = document.getElementById('location'),	// 지도를 표시할 div
				  mapOption = {
					  center: new daum.maps.LatLng(37.566535,126.97796919999996),	// 지도의 중심좌표
					  level: 9
				  };
				  var map = new daum.maps.Map(mapContainer, mapOption);	// 지도를 생성
				  var positions = [];
				  $.each(d.accomPosition, (i,j)=>{
					  positions.push({
						  'title' : j.accomName,
						  'latlng' : new daum.maps.LatLng(j.longitude,j.latitude)
					  });
				  });
				  var imageSrc = "https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-motel.svg";
				  var imageSize = new daum.maps.Size(34, 60);
				  
				  var position
				  for(var i = 0; i < positions.length; i++){
					  // 마커 이미지를 생성
					  var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);
					  var marker = new daum.maps.Marker({
						  map: map,	// 마커를 표시할 지도
						  position: positions[i].latlng,	// 마커를 표시할 위치
						  image: markerImage	// 마커 이미지
					  });
					  var content = '<div class="customoverlay">' +
					    '  <a href="http://map.daum.net/link/map/11394059" target="_blank">' +
					    '    <span class="title">'+d.accomPosition[i].accomName+'</span>' +
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
				  }
				  function makeOverListener(map, marker, customOverlay) {
				        return function() {
				        	customOverlay.setMap(map);
				        };
				    }
				  // 인포윈도우를 닫는 클로저를 만드는 함수
				  function makeOutListener(customOverlay) {
				        return function() {
				        	customOverlay.setMap(null);
				        };
				    }
				  var bounds = new daum.maps.LatLngBounds();	// 지도 재설정 범위정보 객체 생성
				  for(var k = 0; k < positions.length; k++){
					  marker = new daum.maps.Marker({points : positions[k].latlng});
					  marker.setMap(map);
					  bounds.extend(positions[k].latlng);
				  }
					  map.setBounds(bounds);	// 지도 재배치
			  });
		  break;
		  }
		  
	  },	// accomInfo 완료
	  custoInfo : x=>{

		  var info = {};
		  var year = new Date().getFullYear();
		  if(x.type == 'MOTEL'){
			  switch(x.quarter){
			  case '1분기':
				  info = {
					  'type' : x.type,
					  'start' : year+'-01-01',
					  'end' : year+'-03-31'
			      }
				  googleChart.service.custoChart(info);
				  break;
			  case '2분기':
				  info = {
					  'type' : x.type,
					  'start' : year+'-04-01',
					  'end' : year+'-06-30'
			      }
				  googleChart.service.custoChart(info);
				  break;
			  case '3분기':
				  info = {
					  'type' : x.type,
					  'start' : year+'-07-01',
					  'end' : year+'-09-30'
			      }
				  googleChart.service.custoChart(info);
				  break;
			  default:
				  info = {
					  'type' : x.type,
					  'start' : year+'-10-01',
					  'end' : year+'-12-31'
			      }
			  googleChart.service.custoChart(info);
				  break;
			  }
		  }else{
			  switch(x.quarter){
			  case '1분기':
				  info = {
					  'type' : x.type,
					  'start' : year+'-01-01',
					  'end' : year+'-03-31'
			      }
				  googleChart.service.custoChart(info);
				  break;
			  case '2분기':
				  info = {
					  'type' : x.type,
					  'start' : year+'-04-01',
					  'end' : year+'-06-30'
			      }
				  googleChart.service.custoChart(info);
				  break;
			  case '3분기':
				  info = {
					  'type' : x.type,
					  'start' : year+'-07-01',
					  'end' : year+'-09-30'
			      }
				  googleChart.service.custoChart(info);
				  break;
			  default:
				  info = {
					  'type' : x.type,
					  'start' : year+'-10-01',
					  'end' : year+'-12-31'
			      }
			  		googleChart.service.custoChart(info);
				  break;
			  }
		  }
	  },//custoInfo()
	  custoChart : x=>{
		  $.getJSON($.ctx()+'/admin/custo/'+x.type+'/'+x.start+'/'+x.end, d=>{
			  var custoAccom = [];
			  for(var i = 0; i < d.custoAccom.length; i++){
				  custoAccom.push(d.custoAccom[i].payCount);
			  }
			  var options = {
						'legend':{
							names: [
								'20대',
								'30대',
								'40대',
								'50대',
								'60대 이상'
							],
							hrefs: [
								'#',
								'#',
								'#',
								'#',
								'#'
							]
						},
						'dataset': {
							title: 'Accommodation',
							values: [custoAccom],
							bgColor: '#f9f9f9',
							fgColor: '#30a1ce',
						},
						'chartDiv': 'accom_chart',
						'chartType': 'radar',
						'chartSize': { width: 1000, height: 1000 }
					};
			  Nwagon.chart(options);


			 
			  
			  google.charts.load('current', {'packages':['corechart']});
		      google.charts.setOnLoadCallback(drawCustoPop);
		      
		      function drawCustoPop(){
		    	  var data = new google.visualization.DataTable();
		    	  data.addColumn('string', 'local');
		    	  data.addColumn('number', 'reservationCnt');
		    	  data.addColumn('number', 'populationRate');
		    	  data.addColumn('number', 'populationCnt');
		    	 
		    	  
		    	  $.each(d.custoPop, (i,j)=>{
		    		 data.addRow([
		    			 j.byAddr,
		    			 (j.payCnt * 1),
		    			 (j.popRate * 1),
		    			 (j.population * 1)
		    		 ]); 
		    	  });
		    	  
		    	  var options = {
		    		        title: ' 지역별 고객 ',
		    		        hAxis: {title: 'Population'},
		    		        vAxis: {title: 'Population rate'},
		    		        bubble: {textStyle: {fontSize: 11}}
		    		      };
		    	  var chart = new google.visualization.BubbleChart(document.getElementById('pop_chart'));
		          chart.draw(data, options);
		      }// 버블차트
		      
		  });
	  },
	  
	  topChart : x=>{
		  var y = 0;
		  var k = 0;
		  var list = [];
		  var top_map = {};
		  $.getJSON($.ctx()+'/admin/top', d=>{

			  list_accom();
			  function list_accom(){
				  for(let i = 0; i < 10; i++){
					  list[i] = d.top[k];
					  k++;

					  top_map = {
							  'name' : list[0].accomName,
							  'longitude' : list[0].longitude,
							  'latitude' : list[0].latitude,
							  'accomSeq' :list[0].accomSeq,
					  }
				  }

				  $.each(list, (i,j)=>{
					  $('<ul/>').addClass('premium_selecter').attr({id:'premium_selecter'+y}).appendTo($('.accom_list'));
						$('<li/>').addClass('premium_selecter_sh_li').attr({id:'premium_selecter_li'+y}).appendTo($('#premium_selecter'+y))
							$('<img/>').addClass('premium_selecter_img cursor_pointer').attr({id:'list_img'+y,src:j.accomPhoto1}).appendTo($('#premium_selecter_li'+y))
							$('<div/>').addClass('premium_selecter_writer').attr({id:'premium_selecter_writer'+y}).appendTo($('#premium_selecter_li'+y));
								$('<h3/>').addClass('list_title').attr({id:'list_title'+y}).html(j.accomName).appendTo($('#premium_selecter_writer'+y))
								.click(e=>{
									top_map = {
											'name' : j.accomName,
											'longitude' : j.longitude,
											'latitude' : j.latitude,
											'accomSeq' : j.accomSeq,
									}
									googleChart.service.position(top_map);

								});
								$('<div/>').addClass('premium_selecter_explanation').attr({id:'premium_selecter_explanation_'+y}).appendTo($('#premium_selecter_writer'+y))
									$('<h6/>').addClass('p_span').html('숙박').appendTo($('#premium_selecter_explanation_'+y));
									$('<h6/>').addClass('p_span p_padding5').html('20:00~').appendTo($('#premium_selecter_explanation_'+y));
									$('<h4/>').addClass('p_span p_padding30').html(addComma(j.roomPrice)).appendTo($('#premium_selecter_explanation_'+y));
									$('<h6/>').addClass('p_span').html('원').appendTo($('#premium_selecter_explanation_'+y));
									y++;
				  });
				  googleChart.service.position(top_map);
			  }
			  
			  /*무한스크롤 로직*/
			    $(window).scroll(function() {
			        if (d.top.length>k && $(window).scrollTop() == $(document).height() - $(window).height()) {
			          list_accom();
			        }else if(!$('#premium_selecter0').length>0){
			        	$(window).unbind('scroll');
			        }
			    });
			  /*1,000단위의 콤마를 찍어주는 로직(숙소 가격 사용)*/
			    function addComma(num) {
					  var regexp = /\B(?=(\d{3})+(?!\d))/g;
					  return num.toString().replace(regexp, ',');
					}
			    
		  });
	  },
	  position : x=>{

		  var mapContainer = document.getElementById('accom_map'),	// 지도를 표시할 div
		  mapOption = {
			  center: new daum.maps.LatLng(37.566535,126.97796919999996),	// 지도의 중심좌표
			  level: 9
		  };
		  var map = new daum.maps.Map(mapContainer, mapOption);	// 지도를 생성
		  var addr = {};
		  	  addr = {
				  'title' : x.accomName,
				  'latlng' : new daum.maps.LatLng(x.longitude,x.latitude)
			  };
		  var imageSrc = "https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-motel.svg";
		  var imageSize = new daum.maps.Size(34, 60);
		  
		  var position
			  // 마커 이미지를 생성
			  var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);
			  var marker = new daum.maps.Marker({
				  map: map,	// 마커를 표시할 지도
				  position: addr.latlng,	// 마커를 표시할 위치
				  image: markerImage	// 마커 이미지
			  });
			  var content = '<div class="customoverlay">' +
			    '  <a href="http://map.daum.net/link/map/11394059" target="_blank">' +
			    '    <span class="title">'+x.name+'</span>' +
			    '  </a>' +
			    '</div>';
			  position = addr.latlng;
			  var customOverlay = new daum.maps.CustomOverlay({
			        position: position,
			        content: content,
			        yAnchor: 2.7
			    });
			  daum.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, customOverlay));
			  daum.maps.event.addListener(marker, 'mouseout', makeOutListener(customOverlay));
		  function makeOverListener(map, marker, customOverlay) {
		        return function() {
		        	customOverlay.setMap(map);
		        };
		    }
		  // 인포윈도우를 닫는 클로저를 만드는 함수
		  function makeOutListener(customOverlay) {
		        return function() {
		        	customOverlay.setMap(null);
		        };
		    }
		  var bounds = new daum.maps.LatLngBounds();	// 지도 재설정 범위정보 객체 생성
			  marker = new daum.maps.Marker({points : position.latlng});
			  marker.setMap(map);
			  bounds.extend(addr.latlng);
			  map.setBounds(bounds);	// 지도 재배치
		  
	  }
	
};

sanghoon.service = {
		basic : x=>{
            $('#content').empty();
            $('#footer').empty();
            $('<div/>').addClass('basic_wrapper').appendTo($('#content'));
            $('<div/>').addClass('basic_box_1').appendTo($('.basic_wrapper'));
            $('<div/>').attr({id:'member_gender_div'}).appendTo($('.basic_box_1'));
            $('<div/>').attr({id:'pay_type_div'}).appendTo($('.basic_box_1'));
            $('<div/>').attr({id:'booked_div'}).appendTo($('.basic_box_1'));
            $('<div/>').attr({id:'age_member'}).appendTo($('.basic_box_1'));
            $('<div/>').attr({id:'have_accom_div'}).appendTo($('.basic_box_1'));
            $('<div/>').attr({id:'top_local_div_title'}).html('TOP5 지역 예약현황').addClass('table_title').appendTo($('.basic_box_1'));
            $('<div/>').attr({id:'top_sales_div_title'}).html('TOP5 숙소 매출액').addClass('table_title').appendTo($('.basic_box_1'));
            $('<div/>').attr({id:'top_member_div_title'}).html('TOP5 회원별 결제액').addClass('table_title').appendTo($('.basic_box_1'));
            $('<div/>').attr({id:'top_local_div'}).appendTo($('.basic_box_1'));
            $('<div/>').attr({id:'top_sales_div'}).appendTo($('.basic_box_1'));
            $('<div/>').attr({id:'top_member_div'}).appendTo($('.basic_box_1'));
            
            googleChart.service.basicInfo();
            
        },
		sales : x=>{

			$('#content').empty();
			$('<div/>').attr({id:'page-wrapper'}).appendTo('#content');
			$('<div/>').attr({id:'sales_div'}).appendTo('#page-wrapper');
			
			
			googleChart.service.salesInfo();
			
			
		},
		accom : x=>{
			
			$('#content').empty();
			$('<div/>').addClass('accom_wrapper').appendTo($('#content'));
			$('<div/>').addClass('accom_box').appendTo($('.accom_wrapper'));
			

			$('<div/>').attr({id:'local_box'}).appendTo($('.accom_box'));
			$('<select/>').addClass('form-control').attr({id:'local_sel'}).appendTo($('#local_box'));
			$.each(['서울', '강원', '경기', '경상남도', '경상북도', '광주', '대구', '대전', '부산', '세종', '울산', '인천', '전라남도', '전라북도', '제주', '충청남도', '충청북도'], (i, j)=>{
				$('<option/>').attr({value:j}).html(j).appendTo($('#local_sel'));
			});
			$('<select/>').addClass('form-control').attr({id:'date'}).appendTo($('#local_box'));
			$.each(['전체기간', '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'], (i, j)=>{
				$('<option/>').attr({value:j}).html(j).appendTo($('#date'));
			});
			var accom_info = {};
			accom_info = {
					'local' : '서울',
					'start' : 'all',
					'end' : 'all'
			}
			$('<button/>').addClass('btn btn-light').attr({id:'accom_button', type: 'button'}).html('검색').appendTo($('#local_box'))
			.click(e=>{
				
				accom_info = {
					'local' : $('#local_sel').val(),
					'start' : $('#date').val(),
					'end' : ''
				};
				var year = new Date().getFullYear();
				switch(accom_info.start = accom_info.start.substring(0, accom_info.start.length-1)){
				case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
					accom_info.start = year+"-0"+accom_info.start+"-01 오전 00:00:00";
					accom_info.end = accom_info.start.substring(0, accom_info.start.length-14)+'31 오후 23:59:59';
					googleChart.service.accomInfo(accom_info);
				break;
				case '10': case '11': case '12':
					accom_info.start = year+'-'+accom_info.start+"-01 오전 00:00:00";
					accom_info.end = accom_info.start.substring(0, accom_info.start.length-14)+'31 오후 23:59:59';
					googleChart.service.accomInfo(accom_info);
				break;
				default:
					accom_info.start = 'all';
					accom_info.end = 'all';
					googleChart.service.accomInfo(accom_info);
				break;
				}
			});
			$('<div/>').attr({id:'location'}).appendTo($('.accom_box'));		
			$('<div/>').attr({id:'price_reservation'}).appendTo($('.accom_box'));
					googleChart.service.accomInfo(accom_info);
		},
		custo : x=>{
			
			$('#content').empty();
			$('<div/>').addClass('custo_wrapper').appendTo($('#content'));
			$('<div/>').addClass('custo_box_1').appendTo($('.custo_wrapper'));
			$('<div/>').attr({id:'select_box'}).appendTo($('.custo_box_1'));
			$('<select/>').addClass('form-control').attr({id:'reser_type'}).appendTo($('#select_box'));
			$.each(['MOTEL', 'HOTEL'], (i,j)=>{
				$('<option/>').attr({value:j}).html(j).appendTo($('#reser_type'));
			});
			$('<select/>').addClass('form-control').attr({id:'quarter_sel'}).appendTo($('#select_box'));
			$.each(['1분기', '2분기', '3분기', '4분기'], (i,j)=>{
				$('<option/>').attr({value:j}).html(j).appendTo($('#quarter_sel'));
			});
			var info = {};
			info = {
					'type' : 'MOTEL',
					'quarter' : '1분기'
			}
			$('<button/>').addClass('btn btn-light').attr({id:'custo_button', type: 'button'}).html('검색').appendTo($('#select_box'))
			.click(e=>{
				info = {
					'type' : $('#reser_type').val(),
					'quarter' : $('#quarter_sel').val()
				};
				$('#accom_chart').empty();
				googleChart.service.custoInfo(info);
			});
			$('<div/>').addClass('custo_box_2').appendTo($('.custo_wrapper'));
			$('<div/>').attr({id:'accom_chart'}).appendTo($('.custo_box_2'));
			$('<div/>').attr({id:'pop_chart'}).appendTo($('.custo_box_2'));
			googleChart.service.custoInfo(info);
			
			
		},
		top_accom : x=>{
			
			$('#content').empty();
			
			var top_info = {
					'type': '전체',
					'gender': '전체',
					'local': '전체'
			};
			$('<div/>').attr({id:'page-wrapper'}).appendTo($('#content'));
			$('<div/>').html('숙소 매출 순위').addClass('top10title').appendTo('#page-wrapper');
			$('<div/>').addClass('accom_list').appendTo('#page-wrapper');
			$('<div/>').attr({id:'accom_map'}).appendTo('#page-wrapper');
			googleChart.service.topChart();
		}
		
}