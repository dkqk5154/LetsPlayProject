"use strict"
var heetae = heetae || {}

heetae=(()=>{
	var init =x=>{
		heetae.router.init(x) 
	}
	return {init : init}
})()

heetae.main =(x=>{
	var init =x=>{
		onCreate(x)
	}
	var onCreate =x=>{
		setContentView(x)
	}
	var setContentView =x=>{
		let img, w ,nav ,header ,content , footer
		,accom,accom2,input_accom_seq,checkin_day,checkout_day,today,rating_grade,button_check
		,save_start,save_end,save_acom_start,save_acom_end,checking_day,save_end_max_date,save_form_data,save_form_check
		,review_count,save_review_count,buy_check;
		var save_checkdate
		button_check = "accom"
		save_checkdate = new Array()
		img = $.img()
		w = $('#wrapper');
		nav = $('#nav')
		header = $('#header');
		content = $('#content');
		footer = $('#footer');
		today = new Date(new Date().getFullYear(),
				new Date().getMonth(), (new Date().getDate()));
		save_end_max_date = new Date();
		save_end_max_date = today
		rating_grade=5;
		review_count = 1;
		save_form_data = new FormData();
		save_form_check = false;
		if(x.accom_seq==null){
			input_accom_seq = 3;
		}else{
			input_accom_seq = x.accom_seq;
		}
		
		if(x.in_day==null && x.out_day==null){
			checkin_day = new Date(new Date().getFullYear(),
					new Date().getMonth(), new Date().getDate());	
			checkout_day = new Date(new Date().getFullYear(),
					new Date().getMonth(), new Date().getDate()+1);
		}else{ 
			checkin_day = new Date(x.in_day.split('-')[0]
			,(x.in_day.split('-')[1]-1)
			,x.in_day.split('-')[2])
			
			checkout_day = new Date(x.out_day.split('-')[0]
			,(x.out_day.split('-')[1]-1)
			,x.out_day.split('-')[2])
		}
		let mathes = (checkout_day-checkin_day)/(24 * 60 * 60 * 1000);
		checking_day = mathes+'박'+(mathes+1)+'일'
		
		
		
		header.empty()
		content.empty()
		
		$.getJSON($.ctx()+'/accom/detail/'+input_accom_seq+'/',d=>{
			$('<div/>')
			.attr({'id':'carouselExampleControls'
				,'data-ride':'carousel'})
			.addClass('carousel slide')
			.carousel('pause')
			.appendTo(header)
			
			
			$('<div/>')
			.addClass('heetae_header_controller')
			.appendTo('#carouselExampleControls')
			$('<div/>')
			.addClass('carousel-inner')
			.appendTo('.heetae_header_controller')
			
			$('<div/>')
			.addClass('heetae_current')
			.appendTo('.heetae_header_controller')
			$('<p/>')
			.attr('id','em') // 사진 갯수
			.text('1/3') //사진갯수 값번경
			.appendTo('.heetae_current')
			
			
			let arr = ['//yaimg.yanolja.com/resize/place/v4/2017/08/18/17/1280/5996a4ab2701f1.04281148.jpg'
					  ,'//yaimg.yanolja.com/resize/place/v4/2017/08/18/17/1280/5996a4ab6a6c46.53211259.jpg'
				,'//yaimg.yanolja.com/resize/place/v4/2017/08/18/17/1280/5996a4a7beeb49.67142626.jpg']
			
			$.each(arr,(i,j)=>{
				let clazz = 'carousel-item'
				if(i===0){
					clazz = 'carousel-item active'
				}
				$('<img>')
				.attr('src',j)
				.addClass('heetae_header')
				.appendTo($('<div/>')
						.attr('id','select_'+(i+1))
						.addClass(clazz)
						.appendTo('.carousel-inner'))
			})
			$('<a>')
			.attr({'href':'#carouselExampleControls'
				,'role':'button'
				,'data-slide':'prev'})
			.addClass('carousel-control-prev')
			.appendTo('.carousel-inner')
			.click(e=>{
				setTimeout(() => {
					$('#em')
					.text($('.active').attr('id').split('_')[1]+'/3')	//사진갯수 값번경
				}, 700);
			})
			
			$('<span>')
			.attr({'href':'#carouselExampleControls'
				,'aria-hidden':'true'})
			.addClass('heetae_previco')
			.appendTo('.carousel-control-prev')
			$('<span>')
			.addClass('sr-only')
			.text('Next')
			.appendTo('.carousel-control-prev')
			
			
			$('<a>')
			.attr({'href':'#carouselExampleControls'
				,'role':'button'
				,'data-slide':'next'})
			.addClass('carousel-control-next')
			.appendTo('.carousel-inner')
			.click(e=>{
				setTimeout(() => {
					$('#em')
					.text($('.active').attr('id').split('_')[1]+'/3') //사진갯수 값번경	
				}, 700);
			})
			
			$('<span>')
			.attr({'href':'#carouselExampleControls'
				,'aria-hidden':'true'})
			.addClass('heetae_nextico')
			.appendTo('.carousel-control-next')
			$('<span>')
			.addClass('sr-only')
			.text('Next')
			.appendTo('.carousel-control-next')
			
			
			
			
			$('<div>')
			.addClass('heetae_content_controller')
			.appendTo(content)
			
			$('<div/>')
			.addClass('heetae_content_form')
			.appendTo('.heetae_content_controller')
			
			$('<div/>')
			.addClass('heetae_section_form')
			.appendTo('.heetae_content_form')
			
			
			$('<section/>')
			.addClass('heetae_section1')
			.appendTo('.heetae_section_form')
			
			$('<div/>')
			.addClass('heetae_content_info')
			.appendTo('.heetae_section1')
			
			
			$('<p/>')
			.addClass('heetae_info_title')
			.text(d.accom_name) // 숙소명 번경
			.appendTo('.heetae_content_info')
			$('<p/>')
			.addClass('heetae_info_address')
			.text(d.accom_addr) // 주소 번경
			.appendTo('.heetae_content_info')
			$('<p/>')
			.addClass('heetae_info_phone')
			.text(d.accom_phone) // 폰번호 번경
			.appendTo('.heetae_content_info')
			
			$('<div/>')
			.addClass('heetae_info_score')
			.appendTo('.heetae_content_info')
			$('<span/>')
			.addClass('heetae_score_detail')
			.appendTo('.heetae_info_score')
			
			
			var sp={'score':3.5
					,'id':'heetae_score'
					,'append':'.heetae_score_detail'}
			var score_em = 1272
			$('<em/>')
			.addClass('heetae_score_em')
			.text('후기'+score_em+'개') //후기 갯수 번경
			.appendTo('.heetae_info_score')
			
			heetae.detail.rating(sp)
			
			$('<div>')
			.addClass('heetae_info_tag')
			.appendTo('.heetae_content_info')
			$('<i/>')
			.addClass('heetae_tag_primary') 
			.text('쿠폰혜택(구현X)') //쿠폰혜택 번경
			.appendTo('.heetae_info_tag')
			
			$('<ul/>')
			.addClass('heetae_info_tip') 
			.appendTo('.heetae_content_info')
			$('<li/>')
			.text('팁표시(구현x)') //할인 팁 번경
			.appendTo('.heetae_info_tip')
			
			$('<div>')
			.addClass('heetae_content_theme_controller')
			.appendTo('.heetae_section1')
			
			$('<ul/>')
			.addClass('heetae_content_theme')
			.appendTo('.heetae_content_theme_controller')
			
			var theme = ['주차가능','VOD','커플PC']
			$.each(theme,(i,j)=>{
				$('<li/>')
				.addClass('heetae_theme_item'+i)
				.appendTo('.heetae_content_theme')
				let img = '';
				if(j==='주차가능'){
					img='//yaimg.yanolja.com/files/2016/0531/2016053116003268e408ba-4e47-47b8-abc0-d193316c483b.png'
				}else if(j==='VOD'){
					img='//yaimg.yanolja.com/files/2016/0531/20160531160644a30c0aa6-1d57-48e2-ad85-c97600e109ff.png'
				}else if(j==='커플PC'){
					img='//yaimg.yanolja.com/files/2016/0531/20160531160802f4fe6a0d-1bfe-49b1-a547-c5a6bfa214f2.png'
				}
				$('<img/>')
				.attr('src',img)
				.appendTo('.heetae_theme_item'+i)
				$('<span/>')
				.text(j)
				.appendTo('.heetae_theme_item'+i)
			})
			
			
			$('<section/>')
			.addClass('heetae_section3')
			.appendTo('.heetae_content_form')
			
			$('<div/>')
			.addClass('heetae_tab_head')
			.appendTo('.heetae_section3')
			
			$('<div/>')
			.addClass('heetae_tab_content')
			.appendTo('.heetae_section3')
			$.getJSON($.ctx()+'/accom/room/'+d.accom_seq+'/',s=>{
				$('<button/>')
				.attr({'type':'button',
					'id' : 'tab_button1'})
				.text('객실정보')
				.addClass('heetae_tab_button_active')
				.click(e=>{
					e.preventDefault()
					review_count = 0;
					if(button_check!="accom"){
						button_check = "accom"
						if($('#start_date').val()!=save_acom_start
								||$('#end_date').val()!=save_acom_end)
						{
							save_acom_start = $('#start_date').val()
							save_acom_end = $('#end_date').val()
							let t = {'accom_seq':input_accom_seq,'list':s.list,'button_check':button_check}
							heetae.detail.accom_controller(t);
						}else{
							$('#tab_button1')
							.removeClass()
							.addClass('heetae_tab_button_active')
							
							$('#tab_button2')
							.removeClass()
							.addClass('heetae_tab_button')
							
							$('.heetae_tab_content')
							.empty()
							$.each(s.list,(i,j)=>{
								let t = ({'list':j,'num':i,'checkdate':save_checkdate[i]})
								heetae.detail.accom(t);
							})
						}
					}
				})
				.appendTo('.heetae_tab_head')
					
				
				$('<button/>')
				.attr({'type':'button',
						'id' : 'tab_button2'})
				.text('후기')
				.addClass('heetae_tab_button')
				.appendTo('.heetae_tab_head')
				.click(e=>{
					e.preventDefault()
					if(button_check!="review"){
						button_check = "review"
						$('#tab_button1')
						.removeClass()
						.addClass('heetae_tab_button')
						$('#tab_button2')
						.removeClass()
						.addClass('heetae_tab_button_active')
						
						$('.heetae_tab_content')
						.empty()
						
						let chk = false;
						
						$.ajax({
							url:$.ctx()+'/accom/myreview/',
							method:'post',
							contentType:'application/json',
							data:JSON.stringify({
								member_id:sessionStorage.getItem("login")
								,accom_seq:input_accom_seq}),
							success:d=>{
								$.each(d.list,(i,j)=>{
									if(j.room_seq==''){
										buy_check = false
									}else{
										buy_check = true
									}
								})
									
							},
							error:(m1,m2,m3)=>{
								alert('에러');
							},
							complete:()=>{
								if(sessionStorage.getItem("login")!=null && buy_check==true){
									$('<div/>')
									.addClass('heetae_tab_review_write')
									.appendTo('.heetae_tab_content')
									$('<button/>')
									.attr({'id':"heetae_write_button"
										,'type':"button"
										,'data-toggle':"collapse"
										, 'href':"#heetae_review_collapse"
										, 'data-target':"#heetae_review_collapse"
										, 'aria-expanded':"false"
										, 'aria-controls':"heetae_review_collapse"})
									.text('리뷰 작성')
									.addClass('heetae_write_button')
									.appendTo('.heetae_tab_review_write')
									.click(e=>{
											if(chk==false){
												$('.heetae_write_button')
												.text('취 소')
												setTimeout(() => {	
													chk=true;
												}, 400);
											}else{
												$('.heetae_write_button')
												.text('리뷰 작성')
												setTimeout(() => {	
													chk=false;
												}, 400);
											}
									})
								}
						
						
						$('<div/>')
						.attr('id',"heetae_review_collapse")
						.addClass('collapse')
						.appendTo('.heetae_tab_review_write')
						
						$('<div/>')
						.addClass('heetae_review_select_contorller')
						.appendTo('#heetae_review_collapse')
						
						$('<button/>')
						.text('사진 등록')
						.attr({'id':'heetae_review_fileupload',
								'type':'button'
								,'data-target':"#layerpop"
								,'data-toggle':"modal"})
						.addClass(['heetae_fileupload_inputbox_input','btn', 'btn-outline-danger'])
						.appendTo('.heetae_review_select_contorller')
						.click(e=>{
							e.preventDefault()
							heetae.detail.modal_util();
							//드롭박스 필요
							$('.modal-footer').remove();
								$('<h4/>').html('사진 변경하기').appendTo('#modalTitle');
									$('<div/>').addClass('fileDrop').appendTo('.modal-body');
									$('<form/>').attr({name:"uploadForm", id:"uploadForm", enctype:"multipart/form-data", method:"post"}).appendTo('.modal-body');
										$('<table width="400px" height="200px" border="1px" style="border:1px dotted blue"/>').addClass('photoUploadtable').appendTo('#uploadForm');
											$('<tbody>').attr({id:'fileTableTbody'}).appendTo('.photoUploadtable');
												$('<tr/>').attr({id:'fileTableTbodyTr'}).appendTo('#fileTableTbody');
													$('<td/>').attr({id:'dropZone', style:'text-align: center; color: #007bff80; font-size: 20px;'}).html('여기로 사진을 넣어주세요').appendTo('#fileTableTbodyTr');
													
									$('<a/>').attr({href:'#', id:'fileUploadBtn'}).addClass('btn bg_01').addClass('btn btn-light').text('파일 업로드').appendTo('#uploadForm').click(e=>{
								        // 등록할 파일 리스트
								        var uploadFileList = Object.keys(fileList);
								        // 파일이 있는지 체크
								        if(uploadFileList.length == 0){
								            alert("파일이 없습니다.");
								            return; 
								        }
								        // 용량을 500MB를 넘을 경우 업로드 불가
								        if(totalFileSize > maxUploadSize){
								            alert("총 용량 초과\n총 업로드 가능 용량 : " + maxUploadSize + " MB");
								            return;
								        }
								        if(confirm("등록 하시겠습니까?")){
								            // 등록할 파일 리스트를 formData로 데이터 입력
								            var form = $('#uploadForm');
								            var formData = new FormData(form);
								            for(var i = 0; i < uploadFileList.length; i++){
								                formData.append('files', fileList[uploadFileList[i]]);
								            }
								            save_form_data = formData
								            save_form_check = true
								            $('#layerpop').modal('hide')
								        }
									});
							
					/* file upload 시작 */
						    // 파일 리스트 번호
						    var fileIndex = 0;
						    // 등록할 전체 파일 사이즈
						    var totalFileSize = 0;
						    // 파일 리스트
						    var fileList = new Array();
						    // 파일 사이즈 리스트
						    var fileSizeList = new Array();
						    // 등록 가능한 파일 사이즈 MB
						    var uploadSize = 1;
						    // 등록 가능한 총 파일 사이즈 MB
						    var maxUploadSize = 5;
						 
						    $(function (){
						        fileDropDown();
						    });
						 
						    // 파일 드롭 다운
						    function fileDropDown(){
						        var dropZone = $("#dropZone");
						        // Drag기능
						        dropZone.on('dragenter',function(e){
						            e.stopPropagation();
						            e.preventDefault();
						            // 드롭다운 영역 css
						            dropZone.css('background-color','#E3F2FC');
						        });
						        dropZone.on('dragleave',function(e){
						            e.stopPropagation();
						            e.preventDefault();
						            // 드롭다운 영역 css
						            dropZone.css('background-color','#FFFFFF');
						        });
						        dropZone.on('dragover',function(e){
						            e.stopPropagation();
						            e.preventDefault();
						            // 드롭다운 영역 css
						            dropZone.css('background-color','#E3F2FC');
						        });
						        dropZone.on('drop',function(e){
						            e.preventDefault();
						            // 드롭다운 영역 css
						            dropZone.css('background-color','#FFFFFF');
						            var files = e.originalEvent.dataTransfer.files;
						            if(files != null){
						                if(files.length < 1){
						                    alert("폴더 업로드 불가");
						                    return;
						                }
						                selectFile(files)
						            }else{
						                alert("ERROR");
						            }
						        });
						    }
						 
						    // 파일 선택시
						    function selectFile(fileObject){
						        var files = null;
						        if(fileObject != null){
						            // 파일 Drag 이용하여 등록시
						            files = fileObject;
						        }else{
						            // 직접 파일 등록시
						            files = $('#multipaartFileList_' + fileIndex)[0].files;
						        }
						        
						        // 다중파일 등록
						        if(files != null){
						            for(var i = 0; i < 1; i++){
						                // 파일 이름
						                var fileName = files[i].name;
						                var fileNameArr = fileName.split("\.");
						                // 확장자
						                var ext = fileNameArr[fileNameArr.length - 1];
						                // 파일 사이즈(단위 :MB)
						                var fileSize = files[i].size / 1024 / 1024;
						                
						                if($.inArray(ext, ['exe', 'bat', 'sh', 'java', 'jsp', 'html', 'js', 'css', 'xml']) >= 0){
						                    // 확장자 체크
						                    alert("등록 불가 확장자");
						                    break;
						                }else if(fileSize > uploadSize){
						                    // 파일 사이즈 체크
						                    alert("용량 초과\n업로드 가능 용량 : " + uploadSize + " MB");
						                    break;
						                }else{
						                    // 전체 파일 사이즈
						                    totalFileSize += fileSize;
						                    // 파일 배열에 넣기
						                    fileList[fileIndex] = files[i];
						                    // 파일 사이즈 배열에 넣기
						                    fileSizeList[fileIndex] = fileSize;
						                    // 업로드 파일 목록 생성
						                    addFileList(fileIndex, fileName, fileSize);
						                    // 파일 번호 증가
						                    fileIndex;
						                }
						            }
						        }else{
						            alert("ERROR");
						        }
						    }
						 
						    // 업로드 파일 목록 생성
						    function addFileList(fIndex, fileName, fileSize){
						    	$('#fileTr_0').remove()
						        var html = "";
						        html += "<tr id='fileTr_" + fIndex + "'>";
						        html += "    <td class='center' id='fileNameLocation'>";
						        html +=         fileName
						        html += "    </td>"
						        html += "</tr>"
						        $('#fileTableTbody').append(html);
						    }
						 
						    // 업로드 파일 삭제
						    function deleteFile(fIndex){
						        // 전체 파일 사이즈 수정
						        totalFileSize -= fileSizeList[fIndex];
						        
						        // 파일 배열에서 삭제
						        delete fileList[fIndex];
						        
						        // 파일 사이즈 배열 삭제
						        delete fileSizeList[fIndex];
						        
						        // 업로드 파일 테이블 목록에서 삭제
						        $("#fileTr_" + fIndex).remove();
						    }
							
					/* file upload 끝 */
						})
						
						
						$('<select/>')
						.addClass(['heetae_review_select_box','custom-select','custom-select-lg','mb-3'])
						.appendTo('.heetae_review_select_contorller')
						
						//여기부터 시작
						if(sessionStorage.getItem("login")!=null){
							$.ajax({
								url:$.ctx()+'/accom/myreview/',
								method:'post',
								contentType:'application/json',
								data:JSON.stringify({
									member_id:sessionStorage.getItem("login")
									,accom_seq:input_accom_seq}),
								success:d=>{
									$('.heetae_review_select_box').empty()
									$.each(d.list,(i,j)=>{
										$('<option/>')
										.attr('value',j.room_seq)
										.text(j.room_name)
										.appendTo('.heetae_review_select_box')
									})
								},
								error:(m1,m2,m3)=>{
									alert('에러');
								}	
							})
						}
						
						$('<div/>')
						.addClass('heetae_support_header')
						.appendTo('#heetae_review_collapse')
						
						$('<div/>')
						.addClass('heetae_review_titlebox')
						.appendTo('.heetae_support_header')
						$('<input/>')
						.attr({'type':'text'
							,'maxlength':"30"
							,'placeholder':'타이틀 입력'})
						.addClass('heetae_review_input_title')
						.appendTo('.heetae_review_titlebox')
						
						$('<div/>')
						.addClass('heetae_fileupload_inputbox')
						.appendTo('.heetae_support_header')
						
						
						
						
						$('<textarea/>')
						.attr({'id':'heetae_card_textarea','cols':"43",'rows':'3','maxlength':"137"})
						.addClass(['heetae_card','card','card-body'])
						.appendTo('#heetae_review_collapse')
						$('<div/>')
						.addClass('heetae_textarea_support')
						.appendTo('#heetae_review_collapse')
						$('<div/>')
						.attr('id','heetae_textarea_counter')
						.addClass('heetae_textarea_counter')
						.text('0/139')
						.appendTo('.heetae_textarea_support')
							
						$('<button/>')
						.attr({'type':"button"
							,'data-toggle':"collapse"
							, 'href':"#heetae_review_collapse"
							, 'data-target':"#heetae_review_collapse"
							, 'aria-expanded':"false"
							, 'aria-controls':"heetae_review_collapse"})
						.text('등 록')
						.addClass('heetae_textarea_submit')
						.appendTo('.heetae_textarea_support')
						.click(e=>{
							let reco = 2
							if($('#heetae_chekcbox_good').prop("checked")==true){
								reco = 1
							}
							
							let dum = {
								'msg_title':$('.heetae_review_input_title').val(),
								'msg_content':$('#heetae_card_textarea').val(),
								'member_id':sessionStorage.getItem("login"),
								'accom_seq':$(".heetae_review_select_box option:selected").val(),
								'accom_reco':reco,
								'accom_grade':rating_grade,
							}
							
							if(save_form_check==false){
								$.ajax({
									url:$.ctx()+'/accom/review/add/',
									method:'post',
									contentType:'application/json',
									data:JSON.stringify({
										msg_title:$('.heetae_review_input_title').val(),
										msg_content:$('#heetae_card_textarea').val(),
										member_id:sessionStorage.getItem("login"),
										room_seq:$(".heetae_review_select_box option:selected").val(),
										msg_photo:null,
										accom_reco:reco,
										room_grade:rating_grade,
									}),
									success:d=>{
									},
									error:(m1,m2,m3)=>{
										alert('에러');
									},
									complete: ()=>{
										let se = {'in_day':null,'out_day':null,'accom_seq':input_accom_seq}
										save_form_data = new FormData();
	                                    heetae.main.init(se);
									}
								
								})
							}else{
								let m = $('.heetae_review_input_title').val()
								let c = $('#heetae_card_textarea').val()
								$.ajax({
									url:$.ctx()+'/accom/review/image/'+sessionStorage.getItem("login")+'/',
									method:'post',
									contentType:'application/json',
									data:save_form_data,
									processData: false,
					                contentType: false,
									success:d=>{
										$.ajax({
											url:$.ctx()+'/accom/review/add/',
											method:'post',
											contentType:'application/json',
											data:JSON.stringify({
												msg_title:m,
												msg_content:c,
												member_id:sessionStorage.getItem("login"),
												room_seq:$(".heetae_review_select_box option:selected").val(),
												msg_photo:d,
												accom_reco:reco,
												room_grade:rating_grade,
											}),
											success:d=>{
											},
											error:(m1,m2,m3)=>{
												alert('에러');
											},
											complete: ()=>{
												let se = {'in_day':null,'out_day':null,'accom_seq':input_accom_seq}
												save_form_data = new FormData();
			                                    heetae.main.init(se);
											}
										
										})
										
									},
									error:(m1,m2,m3)=>{
										alert('에러');
									},
								})
							}
							
							
							
							$('.heetae_review_input_title').val('')
							$('#heetae_card_textarea').val('')
							$('.heetae_textarea_counter').text('0/138')
							$('#heetae_chekcbox_good').attr("checked", false); 
							rating_grade=5;
							$('.heetae_textarea_support_rating').empty()
							heetae.detail.rating(
									{'id':'heetae_textarea_rating'
									,'score':rating_grade
									,'append':'.heetae_textarea_support_rating'}
							)
							if(chk==false){
								$('.heetae_write_button')
								.text('취 소')
								setTimeout(() => {	
									chk=true;
								}, 400);
							}else{
								$('.heetae_write_button')
								.text('리뷰 작성')
								setTimeout(() => {	
									chk=false;
								}, 400);
							}
						})
						$('<div/>')
							.addClass('heetae_write_check')
							.appendTo('.heetae_textarea_support')
							$('<input/>')
							.attr({'type':'checkbox'
								,'id':'heetae_chekcbox_good'})
							.addClass('heetae_write_check_reco')
							.appendTo('.heetae_write_check')
							$('<label/>')
							.attr('for','heetae_chekcbox_good')
							.text('좋아요')
							.appendTo('.heetae_write_check')
						
							
						$('<div/>')
						.addClass('heetae_textarea_support_ratingcontroller')
						.appendTo('.heetae_textarea_support')
						
						$('<button/>')
						.text('-')
						.attr('type','button')
						.addClass('heetae_textarea_support_rating_button')
						.appendTo('.heetae_textarea_support_ratingcontroller')
						.click(e=>{
							$('.heetae_textarea_support_rating')
							.empty()
							if(rating_grade==0){
								rating_grade=0
							}else{
								rating_grade-=0.5
							}
						heetae.detail.rating(
							{'id':'heetae_textarea_rating'
							,'score':rating_grade
							,'append':'.heetae_textarea_support_rating'}
							)
						})
						
						$('<div/>')
						.addClass('heetae_textarea_support_rating')
						.appendTo('.heetae_textarea_support_ratingcontroller')
						heetae.detail.rating(
							{'id':'heetae_textarea_rating'
							,'score':rating_grade
							,'append':'.heetae_textarea_support_rating'}
						)
						
						$('<button/>')
						.text('+')
						.attr('type','button')
						.addClass('heetae_textarea_support_rating_button')
						.appendTo('.heetae_textarea_support_ratingcontroller')
						.click(e=>{
							$('.heetae_textarea_support_rating')
							.empty()
							if(rating_grade==5){
								rating_grade=5
							}else{
								rating_grade+=0.5
							}
							heetae.detail.rating(
								{'id':'heetae_textarea_rating'
								,'score':rating_grade
								,'append':'.heetae_textarea_support_rating'}
							)
						})
							
						$('#heetae_card_textarea').keyup(e=>{
							let v = $('#heetae_card_textarea').val();
							$('#heetae_textarea_counter')
							.text(v.length + '/139');
						});
						
						$('<div/>')
						.addClass('heetae_tab_review')
						.appendTo('.heetae_tab_content')
						
						
						$('<div/>')
						.addClass('heetae_review_message')
						.appendTo('.heetae_tab_review')
						
						$('<i/>')
						.text('바른후기')
						.appendTo('.heetae_review_message')
						$('<p/>')
						.text('는 숙소에 직접 방문한 회원만 작성할 수 있습니다.')
						.appendTo('.heetae_review_message')
						$.getJSON($.ctx()+"/accom/review/list/"+d.accom_seq+'/'+review_count+'/',r=>{
							$.each(r.list,(i,j)=>{
								let review_temp = {
										'id':'review_'+review_count,
										'list':j
										,'append':'.heetae_tab_review'}
								heetae.detail.review(review_temp)
								review_count++;
							})
							$('<button/>')
								.text('더보기')
								.attr('type','button')
								.addClass('heetae_review_more')
								.appendTo('.heetae_tab_content')
								.click(e=>{
									e.preventDefault()
									testd()
								})
								let testd =()=>{
									if(save_review_count!=review_count){
										$('.heetae_review_more').remove()
										$.getJSON($.ctx()+"/accom/review/list/"+d.accom_seq+'/'+review_count+'/',g=>{
											$.each(g.list,(i,j)=>{
												let review_temp = {
														'id':'review_'+review_count,
														'list':j
														,'append':'.heetae_tab_review'}
												heetae.detail.review(review_temp)
												review_count++;
											})
											save_review_count = review_count
											$('<button/>')
											.text('더보기')
											.attr('type','button')
											.addClass('heetae_review_more')
											.appendTo('.heetae_tab_content')
											.click(e=>{
												e.preventDefault()
												testd()
											})
										})
									}
								}
						})
					}
							
				})
			}
		})
			
			
			
				$('<section/>')
				.addClass('heetae_section2')
				.appendTo('.heetae_section_form')
				
				$('<div/>')
				.addClass('heetae_check_box')
				.appendTo('.heetae_section2')
				
				
				$('<div/>')
				.addClass('heetae_check_top')
				.appendTo('.heetae_check_box')
				$('<p/>')
				.text('체크인')
				.addClass('heetae_check_top_con1')
				.appendTo('.heetae_check_top')
				$('<p/>')
				.text('체크아웃')
				.addClass('heetae_check_top_con2')
				.appendTo('.heetae_check_top')
				
				$('<div/>')
				.addClass('heetae_check_middle')
				.appendTo('.heetae_check_box')

				$('<input/>')
				.attr({'readonly':'true'
						,'value':heetae.detail.date_format(checkin_day)
						,'id':'start_date'})
				.appendTo($('<div>')
							.addClass('heetae_check_middle_con1')
							.appendTo('.heetae_check_middle'))
							
						
				$('<div>')
				.addClass('heetae_check_middle_con2')
				.appendTo('.heetae_check_middle')
				$('<input/>')
				.attr({'readonly':'true'
					,'value':heetae.detail.date_format(checkout_day)
					,'id':'end_date'}) 
				.appendTo($('<div>')
						.addClass('heetae_check_middle_con3')
						.appendTo('.heetae_check_middle'))
				
				
				$('#start_date')
				.datepicker({
				 minDate: ()=> {
					 return today;
		         },
		         maxDate: ()=> {
		               return $('#end').val();
		         }
				 });
				$('#end_date').datepicker({
					minDate: ()=>{
						let end_min_date = new Date($('#start_date').val().split('-')[0]
						,(Number($('#start_date').val().split('-')[1])-1)
						,Number($('#start_date').val().split('-')[2])+1);
						return end_min_date
					},
		            maxDate: ()=>{
		            	let end_max_date = new Date($('#start_date').val().split('-')[0]
						,($('#start_date').val().split('-')[1])
						,$('#start_date').val().split('-')[2]-1);
		            	end_max_date.setMonth(end_max_date.getMonth()-1)
						end_max_date.setDate(end_max_date.getDate()+8)
						save_end_max_date = new Date()
						save_end_max_date = end_max_date	
						return end_max_date
		            }
				});		
						
				//찾기
				save_start = $('#start_date').val()
				save_end = $('#end_date').val()
				let ar = []
				
				
				$('.gj-icon')
				.addClass('heetae_hide_ico')
				
						
						
				$('<div/>')
				.addClass('heetae_check_bottom')
				.appendTo('.heetae_check_box')
				$('<span/>')
				.text('연박(2박 이상)을 제공하는 숙소 입니다.')
				.addClass('heetae_check_bottom_con1')
				.appendTo('.heetae_check_bottom')
				
				$('<span/>')
				.text(checking_day)
				.addClass('heetae_check_bottom_con2')
				.appendTo('.heetae_check_bottom')
				
				$('#start_date')
				.change(e=>{
						if($('#start_date').val()!=save_start){
							save_start = $('#start_date').val()
							let sd = new Date($('#start_date').val().split('-')[0]
							,(($('#start_date').val().split('-')[1])-1)
							,$('#start_date').val().split('-')[2])
							
							let ed = new Date($('#end_date').val().split('-')[0]
							,(($('#end_date').val().split('-')[1])-1)
							,$('#end_date').val().split('-')[2])
							
							
							if(sd.getTime()>=ed.getTime()){
								let tsd = sd
								tsd.setDate(tsd.getDate()+1)
								$('#end_date').val(heetae.detail.date_format(tsd))
								save_end = $('#start_date').val()
								
								ed = new Date($('#end_date').val().split('-')[0]
								,(Number($('#end_date').val().split('-')[1])-1)
								,(Number($('#end_date').val().split('-')[2])+1))
								
								}
							
								let ts = (ed-sd)/(24 * 60 * 60 * 1000);
								if(ts>8){
									let tsd = sd
									tsd.setDate(tsd.getDate()+7)
									$('#end_date').val(heetae.detail.date_format(tsd))
									ed = new Date($('#end_date').val().split('-')[0]
									,(Number($('#end_date').val().split('-')[1])-1)
									,(Number($('#end_date').val().split('-')[2])+7))
									ts = (ed-sd)/(24 * 60 * 60 * 1000);
								}
								$('.heetae_check_bottom_con2')
								.text(ts+'박'+(ts+1)+'일')
						let t = {'accom_seq':input_accom_seq
								,'list':s.list
								,'button_check':button_check}
						heetae.detail.accom_controller(t);
					}
				})
				$('#end_date')
				.change(e=>{
							if($('#end_date').val()!=save_end){
								save_end = $('#end_date').val()
								let sd = new Date($('#start_date').val().split('-')[0]
								,(($('#start_date').val().split('-')[1])-1)
								,$('#start_date').val().split('-')[2])
							
								let ed = new Date($('#end_date').val().split('-')[0]
								,(($('#end_date').val().split('-')[1])-1)
								,$('#end_date').val().split('-')[2])
								
								
								let ts = (ed-sd)/(24 * 60 * 60 * 1000);
								$('.heetae_check_bottom_con2')
								.text((ts)+'박'+(ts+1)+'일')
								let t = {'accom_seq':input_accom_seq
										,'list':s.list
										,'button_check':button_check}
								heetae.detail.accom_controller(t);
							}
				})
				$.ajax({
					url:$.ctx()+'/accom/reservation/',
					method:'post',
					contentType:'application/json',
					data:JSON.stringify({
						checkin_date:$('#start_date').val()
						,checkout_date:$('#end_date').val()
						,accom_seq:input_accom_seq}),
					success:d=>{
						$.each(d.list,(i,j)=>{
							save_checkdate.push(j.checkdate)
						})
						$.each(s.list,(i,j)=>{
							let t = ({'list':j,'num':i,'checkdate':save_checkdate[i]})
							heetae.detail.accom(t);
						})
					},
					error:(m1,m2,m3)=>{
						alert('에러');
					}	
				})
				
			
				$('<div/>') //지도
				.attr({id:'heetae_location'})
				.addClass('heetae_check_map')
				.appendTo('.heetae_section2')
				var mapContainer = document.getElementById('heetae_location'),	// 지도를 표시할 div
				mapOption = {
					  center: new daum.maps.LatLng(37.566535,126.97796919999996),	// 지도의 중심좌표
					  level: 9
				  };
				var map = new daum.maps.Map(mapContainer, mapOption);	// 지도를 생성
				var position = {};
				position = {
					'title' : d.accom_name,
					'latlng' : new daum.maps.LatLng(d.longitude,d.latitude)
				};
				var imageSrc = "https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-motel.svg";
				var imageSize = new daum.maps.Size(34, 60);
				
				 var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize);
				 var marker = new daum.maps.Marker({
					  map: map,	// 마커를 표시할 지도
					  position: position.latlng,	// 마커를 표시할 위치
					  image: markerImage	// 마커 이미지
				  });
				 var content = '<div class="customoverlay">' +
				    '  <a href="http://map.daum.net/link/map/11394059" target="_blank">' +
				    '    <span class="title">'+position.title+'</span>' +
				    '  </a>' +
				    '</div>';
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
			  bounds.extend(position.latlng);
			  map.setBounds(bounds);	// 지도 재배치
				
				
				
				$('<div/>')
				.addClass('heetae_cupon_list')
				.appendTo('.heetae_section2')
				
				$('<div/>')
				.addClass('heetae_cupon_title')
				.appendTo('.heetae_cupon_list')
				
				$('<em/>')
				.text('할인 쿠폰 정보')
				.appendTo('.heetae_cupon_title')
				
				$('<i/>')
				.attr({'id':'example'
					,'data-toggle':"tooltip" 
					,'data-placement':"bottom" 
				    ,'title':"이번 프로젝트에서 쿠폰은 구현되지 않았습니다."})
				.appendTo('.heetae_cupon_title')
				$('#example').tooltip()
				
				$('<div/>')
				.addClass('heetae_cupon_content')
				.appendTo('.heetae_cupon_list')
				
				$('<li/>')
				.addClass('heetae_cupon_content_item')
				.appendTo('.heetae_cupon_content')
				
				$('<div/>')
				.addClass('heetae_cupon_content_item_info')
				.appendTo('.heetae_cupon_content_item')
				
				$('<span/>')
				.addClass('heetae_cupon_item_title')
				.appendTo('.heetae_cupon_content_item_info')
				
				$('<em/>')
				.text('1,000 원')
				.appendTo('.heetae_cupon_item_title')
				
				$('<p/>')
				.text('할인')
				.appendTo('.heetae_cupon_item_title')
				
				$('<span/>')
				.addClass('heetae_cupon_item_name')
				.text('[요일 항목]')
				.appendTo('.heetae_cupon_content_item_info')
				$('<span/>')
				.addClass('heetae_cupon_item_subtitle')
				.text('숙실, 대실, 연박등..')
				.appendTo('.heetae_cupon_content_item_info')
				
				$('<button/>')
				.addClass('heetae_cupon_item_button')
				.appendTo('.heetae_cupon_content_item')
				
				$('<i/>')
				.appendTo('.heetae_cupon_item_button')
				
				$('<span/>')
				.text('미구현')
				.appendTo('.heetae_cupon_item_button')
			})
		})	
	}
	return{init : init}
})()

heetae.detail = {
	rating : x=>{
		$('<span/>')
		.attr('id',x.id)
		.addClass('heetae_score_info')
		.appendTo(x.append)
		
		for(var i = 0; i<5; i++){
			if(x.score==0){
				$('<i/>')
				.addClass('heetae_score_0')
				.appendTo('#'+x.id)
			}else if(x.score==0.5){
				$('<i/>')
				.addClass('heetae_score_5')
				.appendTo('#'+x.id)
				x.score-=0.5;
			}else{
				$('<i/>')
				.addClass('heetae_score_10')
				.appendTo('#'+x.id)
				x.score-=1;
			}
		}
	},
	accom : x=>{
		let pay_types
		let room_images = ['//yaimg.yanolja.com/resize/place/v4/2017/08/18/17/640/5996a4a50b97e0.42514041.jpg'
			,'//yaimg.yanolja.com/resize/place/v4/2017/08/18/17/640/5996a4a5547721.64570908.jpg'
			,'//yaimg.yanolja.com/resize/place/v4/2017/08/18/17/640/5996a4a5957530.55534901.jpg']
		$('<div/>')
		.attr('id',x.num+'_content_room')
		.addClass('heetae_tab_content_room')
		.appendTo('.heetae_tab_content')
		
		
	    $('<div/>') //이미지 슬라이더 시작
	    .attr({'id':x.num+'_carousel'
	      ,'data-ride':'carousel'})
	    .addClass(['carousel slide','heetae_tab_slider'])
	    .carousel('pause')
	    .appendTo('#'+x.num+'_content_room')
	    
	    
	    $('<div/>')
	    .attr('id',x.num+'_item')
	    .addClass('heetae_tab_room_item')
	    .appendTo('#'+x.num+'_carousel')
	    $('<div/>')
	    .attr('id',x.num+'_inner')
	    .addClass(['carousel-inner','heetae_tab_inner'])
	    .appendTo('#'+x.num+'_item')
	    
	    
	    $.each(room_images,(i,j)=>{
	      let clazz = 'carousel-item'
	      if(i===0){
	        clazz = 'carousel-item active'
	      }
	      $('<img>')
	      .attr('src',j)
	      .addClass('heetae_header')
	      .appendTo($('<div/>')
	          .attr('id','tab_select_'+(i+1))
	          .addClass(clazz)
	          .appendTo('#'+x.num+'_inner'))
	    })
	    $('<a>')
	    .attr({
	    	'id':x.num+'_prev'
	      ,'href':'#'+x.num+'_carousel'
	      ,'role':'button'
	      ,'data-slide':'prev'})
	    .addClass('carousel-control-prev')
	    .appendTo('#'+x.num+'_inner')
	    
	    $('<span>')
	    .attr({'href':'#'+x.num+'_carousel'
	      ,'aria-hidden':'true'})
	    .addClass('heetae_previco')
	    .appendTo('#'+x.num+'_prev')
	    $('<span>')
	    .addClass('sr-only')
	    .text('Next')
	    .appendTo('#'+x.num+'_prev')
	    
	    
	    $('<a>')
	    .attr({
	    	'id':x.num+'_next'
	      ,'href':'#'+x.num+'_carousel'
	      ,'role':'button'
	      ,'data-slide':'next'})
	    .addClass('carousel-control-next')
	    .appendTo('#'+x.num+'_inner')
	    
	    $('<span>')
	    .attr({'href':'#'+x.num+'_carousel'
	      ,'aria-hidden':'true'})
	    .addClass('heetae_nextico')
	    .appendTo('#'+x.num+'_next')
	    $('<span>')
	    .addClass('sr-only')
	    .text('Next')
	    .appendTo('#'+x.num+'_next')
		//이미지 슬라이드
	    
	    $('<div/>')
	    .attr('id',x.num+'_room_info')
	    .addClass('heetae_tab_room_info')
	    .appendTo('#'+x.num+'_content_room')
	    
	    $('<div/>')
		.attr('id',x.num+'_info_title')
		.addClass('heetae_tab_info_title')
		.appendTo('#'+x.num+'_room_info')
		    
	    $('<em/>')
	    .text(x.list.room_name)
	    .appendTo('#'+x.num+'_info_title')
	    
	    $('<div/>')
	    .attr('id',x.num+'_info_tip')
	    .addClass('heetae_tab_info_tip')
	    .appendTo('#'+x.num+'_room_info')
	    
	    $('<span/>')
	    .text('기준 2명 (최대 2명)')
	    .appendTo('#'+x.num+'_info_tip')
	    
	    
	    $('<div/>')
	    .attr('id',x.num+'_info_price')
	    .addClass('heetae_tab_info_price')
	    .appendTo('#'+x.num+'_room_info')
	    
	    $('<span/>')
	    .attr('id',x.num+'price_right')
	    .addClass('heetae_info_price_right')
	    .appendTo('#'+x.num+'_info_price')
	    
	    $('<em/>')
	    .text(heetae.detail.money_format(x.list.room_price))
	    .appendTo('#'+x.num+'price_right')
	    $('<i/>')
	    .text('원')
	    .appendTo('#'+x.num+'price_right')
	    
	    $('<span/>')
	    .attr('id',x.num+'_price_left')
	    .addClass('heetae_info_price_left')
	    .appendTo('#'+x.num+'_info_price')
	    
	    $('<i/>')
	    .text('숙박')
	    .appendTo('#'+x.num+'_price_left')
	    $('<small/>')
	    .text('18:00입실')
	    .appendTo('#'+x.num+'_price_left')
	    
	    if(x.checkdate=='true'){
	    	$('<a/>')
		    .attr({'id':x.num+'_info_reserve_btn','href':'#'})
		    .text('예약 하기')
		    .addClass('heetae_tab_info_reserve_btn')
		    .appendTo('#'+x.num+'_room_info')
		    
		    	if(sessionStorage.getItem("login")==null){
		    		$('#'+x.num+'_info_reserve_btn')
		    		.click(e=>{
		    			alert('비회원은 예약할 수 없습니다')
		    		})
		    	}else{
		    		$('#'+x.num+'_info_reserve_btn')
		    		.attr({'data-target':"#layerpop",'data-toggle':"modal"})
		    		.click(e=>{
		    			e.preventDefault()
		    				heetae.detail.modal_util();
		    				$('<h4/>')
							.html('결제하기')
							.appendTo('#modalTitle');
							$('<div/>')
							.html('결제 방법')
							.attr({style:'padding-bottom:15px; font-weight: bold'})
							.appendTo('.modal-body');
							
							
							$('<div/>')
							.attr({'id':'heetae_select_paytype','data-toggle':'buttons'})
							.addClass(['heetae_select_paytype_box','btn-group','btn-group-toggle'])
							.appendTo('.modal-body');
							
							$('<label/>')
							.text('카드 결제')
							.addClass(['btn','btn-outline-danger'])
							.appendTo($('#heetae_select_paytype'))
							.append($('<input/>')
									.attr({
										'type':'radio'
									   ,'name':'options'
									   ,'id':'option1'
									   ,'autocomplete' : 'off'})
									  ).click(e=>{
										  pay_types = 'CARD'
									  })
							$('<label/>')
							.text('계좌 이체')
							.addClass(['btn','btn-outline-danger'])
							.appendTo($('#heetae_select_paytype'))
							.append($('<input/>')
									.attr({
										'type':'radio'
									   ,'name':'options'
									   ,'id':'option2'
									   ,'autocomplete' : 'off'})
									   ).click(e=>{
											  pay_types = 'ACCOUNT'
										  })
							$('<label/>')
							.text('비트 코인')
							.addClass(['btn','btn-outline-danger'])
							.appendTo($('#heetae_select_paytype'))
							.append($('<input/>')
									.attr({
										'type':'radio'
									   ,'name':'options'
									   ,'id':'option3'
									   ,'autocomplete' : 'off'})
									   ).click(e=>{
											  pay_types = 'BITCOIN'
										  })
							$('<label/>')
							.text('PAYPAL')
							.addClass(['btn','btn-outline-danger'])
							.appendTo($('#heetae_select_paytype'))
							.append($('<input/>')
									.attr({
										'type':'radio'
									   ,'name':'options'
									   ,'id':'option3'
									   ,'autocomplete' : 'off'})
									   ).click(e=>{
											  pay_types = 'PAYPAL'
										  })
							$('<label/>')
							.text('현금 결제')
							.addClass(['btn','btn-outline-danger'])
							.appendTo($('#heetae_select_paytype'))
							.append($('<input/>')
									.attr({
										'type':'radio'
									   ,'name':'options'
									   ,'id':'option3'
									   ,'autocomplete' : 'off'})
									   ).click(e=>{
											  pay_types = 'CASH'
										  })
							
							$('<div/>')
							.html('총 결제 금액')
							.attr({style:'padding-bottom:15px;font-weight: bold; font-size:16px;'})
							.appendTo('.modal-body');
							$('<div/>')
							.addClass('heetae_paybox')
							.appendTo('.modal-body');
							
							$('<div/>')
							.addClass('heetae_paybox_con1')
							.appendTo('.heetae_paybox')
							
							$('<div/>')
							.attr('style','float:left;')
							.text('1박 기준 가격')
							.appendTo('.heetae_paybox_con1')
							
							$('<div/>')
							.attr('style','float:right;')
							.text(heetae.detail.money_format(x.list.room_price)+'원')
							.appendTo('.heetae_paybox_con1')
							
							$('<div/>')
							.addClass('heetae_paybox_con2')
							.appendTo('.heetae_paybox')
							
							let sd = new Date($('#start_date').val().split('-')[0]
								,(($('#start_date').val().split('-')[1])-1)
								,$('#start_date').val().split('-')[2])
							
							let ed = new Date($('#end_date').val().split('-')[0]
								,(($('#end_date').val().split('-')[1])-1)
								,$('#end_date').val().split('-')[2])
								
							let ts = (ed-sd)/(24 * 60 * 60 * 1000);
							
							$('<div/>')
							.attr('style','float:left;')
							.text('총 묵을 일수 ('+$('#start_date').val()+'~'+$('#end_date').val()+') '+ts+'일')
							.appendTo('.heetae_paybox_con2')
							
							$('<div/>')
							.attr('style','float:right;')
							.text(heetae.detail.money_format(x.list.room_price)+' * '+ts)
							.appendTo('.heetae_paybox_con2')
							
							$('<div/>')
							.addClass('heetae_paybox_con3')
							.appendTo('.heetae_paybox')
							
							$('<div/>')
							.attr('style','float:right;')
							.addClass('heetae_paybox_con3-2')
							.text(' '+heetae.detail.money_format(x.list.room_price*ts)+'원 ')
							.appendTo('.heetae_paybox_con3')
							
							$('<div/>')
							.attr('style','float:right;')
							.addClass('heetae_paybox_con3-1')
							.text('총 결제금액 ')
							.appendTo('.heetae_paybox_con3')
							
							
							$('<button/>')
							.addClass('heetae_info_modal_btn')
							.attr({'id':'heetae_payment_agree','data-dismiss':"modal",'style':"margin-right:5px"})
							.text('결제 하기')
							.appendTo('.modal-body')
							.click(e=>{
								$.ajax({
									url:$.ctx()+'/accom/reservation/room/',
									method:'post',
									contentType:'application/json',
									data:JSON.stringify({
										checkin_date:$('#start_date').val()
										,checkout_date:$('#end_date').val()
										,room_seq:x.list.room_seq}),
									success:d=>{
										$('#layerpop').on('hidden.bs.modal',()=>{
												if(d.checkdate){
													$.ajax({
														url:$.ctx()+'/accom/payment/',
														method:'post',
														contentType:'application/json',
														data:JSON.stringify({
															member_id:sessionStorage.getItem("login")
															,room_seq:x.list.room_seq
															,pay_price:x.list.room_price*ts
															,pay_type:pay_types
															,checkin_date:$('#start_date').val()
															,checkout_date:$('#end_date').val()
															}),
														success:d=>{
															alert('예약완료')
															/*let se = {'in_day':null
																,'out_day':null
																,'accom_seq':x.list.accom_seq}
															heetae.main.init(se);*///메인페이지 이동
															$.getScript($.ctx()+'/resources/js/hyungjun.js',e=>{
																hyungjun.permision.reservationList();
															})
														},
														error:(m1,m2,m3)=>{
															alert('오류')
														}
													})	
												}else{
													alert('이미 예약된 자리입니다')
												}
	                                    }) 
									},
									error:(m1,m2,m3)=>{
										alert('에러');
									}	
								})
							})
							$('<button/>')
							.addClass('heetae_info_modal_btn')
							.attr({'id':'heetae_payment_cancel','data-dismiss':"modal",'style':"margin-left:5px"})
							.text('결제 취소')
							.appendTo('.modal-body')
		    			});
		    	}
	    }else{
	    	$('<a/>')
		    .attr('href','#')
		    .text('예약 불가')
		    .addClass('heetae_tab_info_reserve_not_btn')
		    .appendTo('#'+x.num+'_room_info')
		    .click(e=>{
		    	e.preventDefault()
		    })
	    }
	    
	},
	modal_util : x=>{
		$('#modalTitle').empty();
		$('.modal-body').empty();
		$('<div class="modal fade" id="layerpop">'
				+'  <div class="modal-dialog">'
				+'    <div class="modal-content">'
				+'      <div class="modal-header">'
				+'        <h4 class="modal-title" id="modalTitle"></h4>'
				+'        <button type="button" class="close" data-dismiss="modal">×</button>'
				+'      </div>'
				+'      <div class="modal-body">'
				+'      </div>'
				+'    </div>'
				+'  </div>'
				+'</div>').appendTo('#content');
	},
	accom_controller : x=>{
		$.ajax({
			url:$.ctx()+'/accom/reservation/',
			method:'post',
			contentType:'application/json',
			data:JSON.stringify({checkin_date:$('#start_date').val()
				,checkout_date:$('#end_date').val(),accom_seq:x.accom_seq}),
			success:d=>{
				let sw = true;
				$.each(x.list,(i,j)=>{
					if(x.button_check==="accom"){
						if(sw){
							$('#tab_button1')
							.removeClass()
							.addClass('heetae_tab_button_active')
							
							$('#tab_button2')
							.removeClass()
							.addClass('heetae_tab_button')
							
							$('.heetae_tab_content')
							.empty()
							sw=false
						}
						let t = ({'list':j,'num':i,'checkdate':d.list[i].checkdate})
						heetae.detail.accom(t);
					}
				})
			},
			error:(m1,m2,m3)=>{
				alert('에러');
			}	
		})
	},
	review : x=>{
		let t = true
		if(x.list.accom_reco!='1'){
			t = false
		}
		let dates = new Date(x.list.msg_date)
		let dt = dates.getFullYear()+ 
		"-" +(dates.getMonth()+1) 
		+ "-" + dates.getDate()
		
		
		$('<li/>')
		.attr('id',x.id+'_review_item')
		.addClass('heetae_review_item')
		.appendTo(x.append)
		
		if(x.list.msg_photo!=null){
			$('<div/>')
			.attr('id',x.id+'_review_info')
			.addClass('heetae_review_info_imgform')
			.appendTo('#'+x.id+'_review_item')
			
			$('<img/>')
			.attr('src',$.img()+"/accom_review/"+x.list.msg_photo)
			.appendTo('#'+x.id+'_review_item')
			
		}else{
			$('<div/>')
			.attr('id',x.id+'_review_info')
			.addClass('heetae_review_info')
			.appendTo('#'+x.id+'_review_item')
		}
		
		if(x.list.msg_title!=null){
			$('<div/>')
			.attr('id',x.id+'_review_info_title')
			.addClass('heetae_review_info_title')
			.appendTo('#'+x.id+'_review_info')	
			
			if(t==true){ 
				$('<span/>')
				.attr('id',x.id+'_review_info_title_tag')
				.addClass('heetae_review_info_title_tag')
				.appendTo('#'+x.id+'_review_info_title')
				
				$('<em/>')
				.text('추천')
				.appendTo(
					$('<i/>')
					.appendTo('#'+x.id+'_review_info_title_tag')
				)
			}
			
			$('<strong/>')
			.text(x.list.msg_title)
			.appendTo('#'+x.id+'_review_info_title')
			
	    }else{	    	
	    	$('<div/>')
			.attr('id',x.id+'_review_info_title')
			.addClass('heetae_review_info_title')
			.appendTo('#'+x.id+'_review_info')
			
			if(t==true){ // 위쪽 strong 보다 먼저 선언되기 위함
				$('<span/>')
				.attr('id',x.id+'_review_info_title_tag')
				.addClass('heetae_review_info_title_tag')
				.appendTo('#'+x.id+'_review_info_title')
				
				$('<em/>')
				.text('추천')
				.appendTo($('<i/>')
						.appendTo('#'+x.id+'_review_info_title_tag'))
			}
	    }
		
		$('<p/>')
		.text(x.list.msg_content)
		.addClass('review_info_content')
		.appendTo('#'+x.id+'_review_info')
		
		$('<div/>')
		.attr('id',x.id+'_review_info_user')
		.addClass('heetae_review_info_user')
		.appendTo('#'+x.id+'_review_info')
		
		$('<span/>')
		.text(x.list.member_id)
		.appendTo('#'+x.id+'_review_info_user')
		$('<i/>')
		.appendTo('#'+x.id+'_review_info_user')
		$('<span/>')
		.text(x.list.room_name)
		.appendTo('#'+x.id+'_review_info_user')
		$('<i/>')
		.appendTo('#'+x.id+'_review_info_user')
		$('<span/>')
		.text(dt)
		.appendTo('#'+x.id+'_review_info_user')
		
		$('<div/>')
		.attr('id',x.id+'_review_info_score')
		.addClass('review_info_score')
		.appendTo('#'+x.id+'_review_info')
		
		
		heetae.detail.rating({'id':x.id+'_review_info_score_em'
			,'score':x.list.room_grade
			,'append':'#'+x.id+'_review_info_score'})
	},
	date_format : x=>{
		let yyyy = x.getFullYear().toString();
	    let mm = (x.getMonth() + 1).toString();
	    let dd = x.getDate().toString();
	    return yyyy + '-' +(mm[1] ? mm : '0'+mm[0]) +'-'+ (dd[1] ? dd : '0'+dd[0]);
	},
	money_format : x=>{
		var regexp = /\B(?=(\d{3})+(?!\d))/g;
		  return x.toString().replace(regexp, ',');
	}
}

heetae.router = {
	init : x=>{
		$.getScript(x+'/resources/js/router.js',
				()=>{
					$.extend(new Session(x))
					heetae.main.init()
				}
		)
	}
	
}