"use strict";
var hyungjun = hyungjun || {};
hyungjun =(()=>{
	var init =x=>{
		hyungjun.router.init(x);
	};
	return {init : init};
})();


hyungjun.main =(()=>{
	var init =()=>{
		onCreate();
		Kakao.init('e4161fed935b15aca64e4c9ae736d73f');
	};
	var onCreate =()=>{
		setContentView();
	};
	var setContentView =()=>{
		hyungjun.router.home();
	};
	return {init:init};
})();

hyungjun.permision = (()=>{
	var login = ()=>{
		let validate ="";
		$('#header').empty();
		$('#content').empty();
			$('<div/>').addClass('loginBox').appendTo('#content');
				$('<div/>').addClass('loginHead').html('로그인하고, 혜택받으세요!').appendTo('.loginBox');
				$('<div/>').addClass('inputBox').appendTo('.loginBox');
					$('<input/>').attr({type:'text', id:'member_id', placeholder:'아이디',autofocus:'autofocus'}).addClass('inputData').appendTo('.inputBox');
					$('<input/>').attr({type:'password', id:'password', placeholder:'비밀번호'}).addClass('inputData').appendTo('.inputBox');
					$('<div/>').attr({id:'loginAlert'}).addClass('validAlert').appendTo('.inputBox');
					$('<div/>').addClass('hjButton').text('로그인').attr({id:'loginButton'}).appendTo('.inputBox')
					.click(e=>{
						let pw = $('#password').val();
						let id = $('#member_id').val();
						if(!id && !pw) {	
							$('#loginAlert').empty();
							validate ="아이디와 비밀번호를 입력해주세요.";
							$('<div/>').text(validate).appendTo('#loginAlert');
						}else if(!id) {	
							$('#loginAlert').empty();
							validate ="아이디를 입력해주세요.";
							$('<div/>').text(validate).appendTo('#loginAlert');
						}else if(!pw){	
							$('#loginAlert').empty();
							validate ="비밀번호를 입력해주세요.";
							$('<div/>').text(validate).appendTo('#loginAlert');
						}else{
							$.ajax({
								url:$.ctx()+'/member/login',
								method:'post',
								contentType:'application/json',
								data:JSON.stringify({member_id:id,password:pw}),
								success:d=>{
									let validate ="";
									if(d.id_valid==='WRONG'){
										$('#loginAlert').empty();
										validate ="존재하지 않는 아이디 입니다.";
										$('<div/>').text(validate).appendTo('#loginAlert');
									}else if(d.pw_valid==='WRONG'){
										$('#loginAlert').empty();
										validate ="비밀번호가 틀렸습니다.";	
										$('<div/>').text(validate).appendTo('#loginAlert');
									}else{
										sessionStorage.setItem("login", d.mbr.member_id);
										sessionStorage.setItem("profileimg", d.mbr.profileimg);
										sessionStorage.setItem("nickname", d.mbr.nickname);
										hyungjun.router.home()
										hyungjun.service.authNav();
									}
									$('#validate').html(validate);
								},
								error:(m1,m2,m3)=>{
									alert('에러발생'+m3);
								}
						});
					}
		});
					/*------------카카오톡 기능 시작 ------------*/
					$('<a/>').attr({id:'custom-login-btn'}).append(
							$('<img/>').addClass('custom-login-btn').attr({src:$.ctx()+'/resources/img/icon/kakao.png'})
					).appendTo('.loginBox').click(e=>{
						Kakao.Auth.login({
						      success: function(authObj) {
						        Kakao.API.request({
						            url: '/v2/user/me',
						            success: function(res) {
						                let gender;
						                if(res.kakao_account['gender']=='male'){
						                	gender = '남'
						                } else if (res.kakao_account['gender']=='female') {
						                	gender = '여'
						                } else {
						                	gender = ''
						                }
						                
						            	$.ajax({
											url:$.ctx()+'/member/login',
											method:'post',
											contentType:'application/json',
											data:JSON.stringify({member_id:res.id,password:res.uuid}),
											success:d=>{
												let validate ="";
												if(d.id_valid==='WRONG'){
									                  $.ajax({
															url:$.ctx()+'/member/join',
															method:'post',
															contentType:'application/json',
															data:JSON.stringify({
																member_id:res.id,
																password:'yanolja1234',
																name:res.properties['nickname'],
																nickname:res.properties['nickname'],
																profileimg :res.properties['profile_image'],
																profileimg :'default.jpg',
																gender : gender,
																kakao: '2'
															}),
															success:d=>{
																alert('\n 카카오톡으로 가입이 성공하였습니다. \n\n  로그인 하시면 야놀자 서비스를 이용가능합니다.\n');
																login(); 
																/*카톡 불러온 사진 서버 저장
												                  $.ajax({
																		url:$.ctx()+'/image/kakaoProfile/',
																		method:'post',
																		contentType:'application/json',
																		data:JSON.stringify({
																			member_id:res.id,
																			profileimg :res.properties['profile_image']
																		}),
																		success:d=>{
																			sessionStorage.setItem("login", res.id);
																			sessionStorage.setItem("profileimg", d);
																			sessionStorage.setItem("nickname", res.properties['nickname']);
																		},
																		error:(m1,m2,m3)=>{alert(m3);}
																	});*/
													            /*카톡 불러온 사진 서버 저장*/
															},
															error:(m1,m2,m3)=>{alert(m3);}
														});
												}else{
													sessionStorage.setItem("login", d.mbr.member_id);
													sessionStorage.setItem("profileimg", d.mbr.profileimg);
													sessionStorage.setItem("nickname", d.mbr.nickname);
													hyungjun.router.home()
													hyungjun.service.authNav();
															
												}
												$('#validate').html(validate);
											},
											error:(m1,m2,m3)=>{
												alert('에러발생'+m3);
											}
									});
						            }
			                  })			        
						      },
						      fail: function(err) {
						         alert(JSON.stringify(err));
						      }
					    });
					    /*------------카카오톡 기능 끝 ------------*/   

					});
					    // 카카오 로그인 버튼을 생성합니다.
	}
	var join =()=>{
		$('#header').empty();
		$('#content').empty();
			$('<div/>').addClass('joinBox').appendTo('#content');
				$('<div/>').addClass('loginHead').html('회원가입').appendTo('.joinBox');
				$('<div/>').addClass('inputBox').appendTo('.joinBox');
				$('<input/>').attr({type:'text', id:'member_id', placeholder:'아이디를 입력하세요',autofocus:'autofocus'}).addClass('inputData').appendTo('.inputBox');
				$('<input/>').attr({type:'text', id:'name', placeholder:'성명(이름)을 입력하세요'}).addClass('inputData').appendTo('.inputBox');
				$('<input/>').attr({type:'text', id:'nickname', placeholder:'닉네임을 입력하세요'}).addClass('inputData').appendTo('.inputBox');
				$('<input/>').attr({type:'text', id:'password', placeholder:'비밀번호를 입력하세요'}).addClass('inputData').appendTo('.inputBox');
				$('<input/>').attr({type:'text', id:'birthdate', placeholder:'생년원일(ex 890505-1)를 입력하세요'}).addClass('inputData').appendTo('.inputBox');
				$('<input/>').attr({type:'text', id:'phone', placeholder:'휴대폰 번호(ex 010-9000-5000)를 입력하세요'}).addClass('inputData').appendTo('.inputBox');
				$('<input/>').attr({type:'text', id:'address', placeholder:'주소를 입력하세요'}).addClass('inputData').appendTo('.inputBox');
				$('<div/>').attr({id:'joinIdAlert'}).addClass('validAlert').appendTo('.inputBox');
				$('<div/>').addClass(['hjButton','joinButton']).text('가입하기').attr({id:'joinButton'}).appendTo('.inputBox')
					.click(e=>{
						e.preventDefault();
						let validate ="";
						let member_id = $('#member_id').val();
						let name = $('#name').val();
						let nickname = $('#nickname').val();
						let password = $('#password').val();
						let birthdate = $('#birthdate').val();
						let phone = $('#phone').val();
						let address = $('#address').val();
						if(!member_id || !name || !nickname || !password || !birthdate || !phone || !address){	
							$('#joinIdAlert').empty();
							validate ="입력되지 않은 항목이 있습니다.";
							$('<div/>').text(validate).appendTo('#joinIdAlert');
						} else if(birthdate.length!=8 || !birthdate){
							$('#joinIdAlert').empty();
							validate ="생년월일을 ex)890505-1 형식으로 입력해주세요.";
							$('<div/>').text(validate).appendTo('#joinIdAlert');
						} else {
							$.ajax({
								url:$.ctx()+'/member/login',
								method:'post',
								contentType:'application/json',
								data:JSON.stringify({member_id:member_id}),
								success:d=>{
									if(d.id_valid==='CORRECT'){
										$('#joinIdAlert').empty();
										validate ="아이디가 중복입니다. 다른 아이디를 입력해주세요";
										$('<div/>').text(validate).appendTo('#joinIdAlert');
									} else {
										$.ajax({
											url:$.ctx()+'/member/join',
											method:'post',
											contentType:'application/json',
											data:JSON.stringify({
												member_id:$('#member_id').val(),
												name:$('#name').val(),
												nickname:$('#nickname').val(),
												password:$('#password').val(),
												birthdate:$('#birthdate').val(),
												phone:$('#phone').val(),
												address:$('#address').val(),
												zipcode:$('#zipcode').val(),
												profileimg:'default.jpg',
												kakao: '1'
											}),
											success:d=>{
												alert('\n 성공적으로 가입되었습니다. \n\n  로그인 하시면 야놀자 서비스를 이용가능합니다.\n');
												login();
											},
											error:(m1,m2,m3)=>{alert(m3);}
										});
									}
								}
						})
					}
				})
	}
	var mypage =()=>{
		hyungjun.service.authNav();
		$('#content').attr({style:'background: #f5f5f5'});
		$.ajax({
			url:$.ctx()+'/member/auth',
			method:'post',
			contentType:'application/json',
			data:JSON.stringify({
				member_id:sessionStorage.getItem("login"),
				}),
			success:d=>{
				$('#header').empty();
				$('#content').empty();
				$('<div/>').addClass('mypageTableDiv').appendTo('#content');
				$('<div/>').addClass('mypageBottomNav').appendTo('#content');
					hyungjun.service.myBenefit(d);
							$('<a/>').addClass('nav-link active').attr({href:'#',id:'myBenefit'}).html('나의혜택').appendTo('#nav-item1').click(e=>{
								hyungjun.service.myBenefit(d);
							});
						$('<li/>').addClass('nav-item').attr({id:'nav-item2'}).appendTo('#nav-tabs');
							$('<a/>').addClass('nav-link active').attr({href:'#',id:'modifyDelete'}).html('개인정보수정/탈퇴').appendTo('#nav-item2').click(e=>{
								$('.nav-tabsHeadMain').remove();
								$('.nav-tabsHead').remove();
							$('<div/>').addClass('nav-tabsHeadMain').attr({id:'nav-tabsHeadMain1'}).appendTo('#content');
									$('<div/>').addClass('nav-tabsHead').html('개인정보 수정').attr({id:'nav-tabsHead1'}).appendTo('#nav-tabsHeadMain1');
										$('<ul/>').addClass('info_lists').attr({style:'padding-left:130px'}).appendTo('#nav-tabsHead1');
											$('<li/>').appendTo('.info_lists').attr({id:'modifyNickname'}).html('<b>닉네임</b>');
												$('<span/>').html(d.mbr.nickname).attr({style:"margin-left: 205px; font-weight normal;"}).appendTo('#modifyNickname')
												$('<button/>').addClass('btn btn-light').attr({'data-target':"#layerpop",'data-toggle':"modal"}).text('변경').appendTo('#modifyNickname').click(e=>{
													hyungjun.service.myModal();
													$('<h4/>').html('닉네임 변경하기').appendTo('#modalTitle');
													$('<div/>').html('현재 닉네임').attr({style:'padding-bottom:15px; font-weight: bold'}).appendTo('.modal-body');
													$('<div/>').html(d.mbr.nickname).attr({style:'padding-bottom:15px'}).appendTo('.modal-body');
													$('<div/>').html('변경 닉네임').attr({style:'padding-bottom:15px;font-weight: bold'}).appendTo('.modal-body');
													$('<input/>').attr({type:'text', id:'changeNickname', placeholder:'변경하려는 닉네임을 입력해주세요'}).addClass('inputData').appendTo('.modal-body');
													$('<button/>').addClass('radi_button btn_save').attr({id:'update_password'}).text('수정완료').appendTo('.modal-body').click(e=>{
														$.ajax({
															url :$.ctx()+'/member/update',
															method:'post',
															contentType:'application/json',
															data:JSON.stringify({
																member_id:sessionStorage.getItem("login"),
																nickname:$('#changeNickname').val()
															}),
															success:s=>{
																$('#layerpop').modal('hide')
																$('#layerpop').on('hidden.bs.modal',()=>{
																	hyungjun.permision.mypage();
																	sessionStorage.setItem("nickname", $('#changeNickname').val());
																	$('#mypage').html($('#changeNickname').val());
								                                })
															},
															error:(m1,m2,m3)=>{alert(m3);}
														});
													});
												});
											
										$('<li/>').appendTo('.info_lists').attr({id:'modifyPhone'}).html('<b>휴대폰번호</b>');
											$('<span/>').html(d.mbr.phone).attr({style:"margin-left: 170px; font-weight normal;"}).appendTo('#modifyPhone')
											$('<button/>').addClass('btn btn-light').attr({'data-target':"#layerpop",'data-toggle':"modal"}).text('변경').appendTo('#modifyPhone').click(e=>{
												hyungjun.service.myModal();
												$('<h4/>').html('휴대폰 번호 변경하기').appendTo('#modalTitle');
												$('<div/>').html('현재 휴대폰번호').attr({style:'padding-bottom:15px; font-weight: bold'}).appendTo('.modal-body');
												$('<div/>').html(d.mbr.phone).attr({style:'padding-bottom:15px'}).appendTo('.modal-body');
												$('<div/>').html('변경 휴대폰번호').attr({style:'padding-bottom:15px;font-weight: bold'}).appendTo('.modal-body');
												$('<input/>').attr({type:'text', id:'changePhone', placeholder:'변경하려는 핸드폰 번호를 입력해주세요.'}).addClass('inputData').appendTo('.modal-body');
												$('<button/>').addClass('radi_button btn_save').attr({id:'update_phone'}).text('수정완료').appendTo('.modal-body').click(e=>{
													$.ajax({
														url :$.ctx()+'/member/update',
														method:'post',
														contentType:'application/json',
														data:JSON.stringify({
															member_id:sessionStorage.getItem("login"),
															phone:$('#changePhone').val()
														}),
														success:d=>{
															$('#layerpop').modal('hide')
															$('#layerpop').on('hidden.bs.modal',()=>{
																hyungjun.permision.mypage();
							                                })
														},
														error:(m1,m2,m3)=>{alert(m3);}
													});
												});
											});
											
											$('<li/>').appendTo('.info_lists').attr({id:'modifyComment'}).html('<b>한줄소개</b>');
											$('<span/>').html(d.mbr.comment).attr({style:"margin-left: 187px; font-weight normal;"}).appendTo('#modifyComment')
											$('<button/>').addClass('btn btn-light').attr({'data-target':"#layerpop",'data-toggle':"modal"}).text('변경').appendTo('#modifyComment').click(e=>{
												hyungjun.service.myModal();
												$('<h4/>').html('한줄소개 변경하기').appendTo('#modalTitle');
												$('<div/>').html('현재 한줄소개 ').attr({style:'padding-bottom:15px; font-weight: bold'}).appendTo('.modal-body');
												$('<div/>').html(d.mbr.comment).attr({style:'padding-bottom:15px'}).appendTo('.modal-body');
												$('<div/>').html('변경 한줄소개 ').attr({style:'padding-bottom:15px;font-weight: bold'}).appendTo('.modal-body');
												$('<input/>').attr({type:'text', id:'changeComment', placeholder:'변경하려는 한줄 소개를 입력해주세요.'}).addClass('inputData').appendTo('.modal-body');
												$('<button/>').addClass('radi_button btn_save').attr({id:'update_comment'}).text('수정완료').appendTo('.modal-body').click(e=>{
													$.ajax({
														url :$.ctx()+'/member/update',
														method:'post',
														contentType:'application/json',
														data:JSON.stringify({
															member_id:sessionStorage.getItem("login"),
															comment:$('#changeComment').val()
														}),
														success:d=>{
															$('#layerpop').modal('hide')
															$('#layerpop').on('hidden.bs.modal',()=>{
																hyungjun.permision.mypage();
															})
														},
														error:(m1,m2,m3)=>{alert(m3);}
													});
												});
											});
											
										$('<li/>').appendTo('.info_lists').attr({id:'modifyPassword'}).html('<b>비밀번호</b>');
											$('<button/>').addClass('btn btn-light').attr({'data-target':"#layerpop",'data-toggle':"modal"}).text('변경').appendTo('#modifyPassword').click(e=>{
												hyungjun.service.myModal();
												$('<h4/>').html('비밀번호 변경하기').appendTo('#modalTitle');
												$('<input/>').attr({type:'password', id:'currentPassword', placeholder:'현재 비밀번호를 입력하세요.'}).addClass('inputData').appendTo('.modal-body');
												$('<input/>').attr({type:'password', id:'changePassword1', placeholder:'변경하려는 비밀번호를 입력하세요.'}).addClass('inputData').appendTo('.modal-body');
												$('<input/>').attr({type:'password', id:'changePassword2', placeholder:'변경하려는 비밀번호를 한번 더 입력하세요.'}).addClass('inputData').appendTo('.modal-body');
												$('<button/>').addClass('radi_button btn_save').attr({id:'update_password'}).text('수정완료').appendTo('.modal-body').click(e=>{
													let cpw = $('#currentPassword').val();
													let pw1 = $('#changePassword1').val();
													let pw2 = $('#changePassword2').val();
													if(!cpw || !pw1 || !pw2 ){	
														$('#modifyAlert').remove();
														$('<div/>').html('입력되지 않은 항목이 있습니다.').addClass('validAlert').attr({id:'modifyAlert'}).appendTo('.modal-body');
													} else {
														$.ajax({
															url :$.ctx()+'/member/login',
															method:'post',
															contentType:'application/json',
															data:JSON.stringify({
																member_id:sessionStorage.getItem("login"),
																password:cpw
															}),
															success:d=>{
																if(d.pw_valid==='WRONG'){
																	$('#modifyAlert').remove();
																	$('<div/>').html('현재 비밀번호가 틀렸습니다.').addClass('validAlert').attr({id:'modifyAlert'}).appendTo('.modal-body');
																}else if(cpw==pw1){
																	$('#modifyAlert').remove();
																	$('<div/>').html('변경하려는 비밀번호가 현재 비밀번호와 동일합니다.').addClass('validAlert').attr({id:'modifyAlert'}).appendTo('.modal-body');
																}else if(pw1!=pw2){
																	$('#modifyAlert').remove();
																	$('<div/>').html('변경하려는 비밀번호와 한번 더 입력한 비밀번호가 불일치 합니다.').addClass('validAlert').attr({id:'modifyAlert'}).appendTo('.modal-body');
																} else {
																	$.ajax({
																		url :$.ctx()+'/member/update',
																		method:'post',
																		contentType:'application/json',
																		data:JSON.stringify({
																			member_id:sessionStorage.getItem("login"),
																			password:pw1
																		}),
																		success:d=>{
																			$('#layerpop').modal('hide')
																			$('#layerpop').on('hidden.bs.modal',()=>{
																				hyungjun.permision.mypage();
											                                })
																		},
																		error:(m1,m2,m3)=>{alert(m3);}
																	});
																}
															},
															error:(m1,m2,m3)=>{alert(m3);}
														});
													}
												});
											});	
							$('<div/>').addClass('nav-tabsHeadMain').attr({id:'nav-tabsHeadMain2'}).appendTo('#content');		
								$('<div/>').addClass('nav-tabsHead').html('간편로그인 연결 계정').attr({id:'nav-tabsHead2'}).appendTo('#nav-tabsHeadMain2');
									$('<li/>').addClass('info_lists').attr({style:'padding-left:130px',id:'modifyExternalService'}).appendTo('#nav-tabsHead2');
									if(d.mbr.kakao == '1'){
										$('<a/>').attr({id:'custom-login-btn2'}).append(
												$('<img/>').addClass('custom-login-btn').attr({src:$.ctx()+'/resources/img/icon/kakao_disconnect_not.png',style:'margin-left: 0px; width:30%'})
										).appendTo('#modifyExternalService');									
									} else {
										$('<a/>').attr({id:'custom-login-btn1'}).append(
												$('<img/>').addClass('custom-login-btn').attr({src:$.ctx()+'/resources/img/icon/kakao_disconnect.png',style:'margin-left: 0px; width:30%'})
										).appendTo('#modifyExternalService')
											.click(e=>{
												$.ajax({
													url:$.ctx()+'/member/delete',
													method:'post',
													contentType:'application/json',
													data:JSON.stringify({
														member_id:sessionStorage.getItem("login"),
														password:d.mbr.password
													}),
													success:d=>{
														$('#deleteAlert').remove();
														alert('\n탈퇴가 처리되었습니다. \n\n이용해주셔서 감사드립니다. \n');
														hyungjun.router.home();
														
													},
													error:(m1,m2,m3)=>{alert(m3);}
												});
											});
									}
							$('<div/>').addClass('nav-tabsHeadMain').attr({id:'nav-tabsHeadMain3'}).appendTo('#content');							
								$('<div/>').addClass('nav-tabsHead').html('회원탈퇴').attr({id:'nav-tabsHead3', style:'padding-bottom:50px'}).appendTo('#nav-tabsHeadMain3');	
									$('<li/>').addClass('info_lists').attr({style:'padding-left:130px',id:'memberWithdrawal'}).appendTo('#nav-tabsHead3');
										$('<div/>').html('탈퇴를 하시려면 안내 및 동의를 받아야합니다. 정말 탈퇴하시겠습니까?').appendTo('#memberWithdrawal');
										$('<button/>').addClass('btn btn-light').attr({'data-target':"#layerpop",'data-toggle':"modal"}).text('탈퇴하기').appendTo('#memberWithdrawal').click(e=>{
											hyungjun.service.myModal();
											$('<h4/>').html('회원 탈퇴하기').appendTo('#modalTitle');
											$('<div/>').html('탈퇴진행을 위해 비밀번호를 한 번 더 입력해주세요.').attr({style:'padding-bottom:15px;font-weight: bold'}).appendTo('.modal-body');
											$('<input/>').attr({type:'text', id:'withdrawlPassword', placeholder:'비밀번호를 입력하세요.'}).addClass('inputData').appendTo('.modal-body');
											$('<button/>').addClass('radi_button btn_save').attr({id:'withdrawal_password'}).text('확인').appendTo('.modal-body').click(e=>{
												if($('#withdrawlPassword').val()==d.mbr.password){
													$.ajax({
														url:$.ctx()+'/member/delete',
														method:'post',
														contentType:'application/json',
														data:JSON.stringify({
															member_id:sessionStorage.getItem("login"),
															password:$('#withdrawlPassword').val()
														}),
														success:d=>{
															$('#deleteAlert').remove();
															$('<div/>').html('탈퇴가 처리되었습니다. 이용해주셔서 감사드립니다.').addClass('validAlert').attr({id:'deleteAlert',style:'padding-bottom:15px;'}).appendTo('.modal-body');
														},
														error:(m1,m2,m3)=>{alert(m3);}
													});
												}else{
													$('#deleteAlert').remove();
													$('<div/>').html('비밀번호가 틀렸습니다. 다시 확인해주세요.').addClass('validSuccessAlert').attr({id:'deleteAlert',style:'padding-bottom:15px;font-weight: bold'}).appendTo('.modal-body');
												}
											});
										});
							});
					$('<table width="1000px" height="450px"/>').addClass('mypageTable').appendTo('.mypageTableDiv');
						$('<tr/>').attr({id:'tr1'}).appendTo('.mypageTable');
							$('<td  width="40%"/>').attr({rowspan:"3"}).appendTo('#tr1').
							append($('<img>').attr({src:$.img()+'/profile/'+d.mbr.profileimg}).addClass('bigAvatar'));
							$('<td  width="30%"/>').html('○ 이름').appendTo('#tr1');
							$('<td  width="30%"/>').html(d.mbr.name).appendTo('#tr1');
						$('<tr/>').attr({id:'tr2'}).appendTo('.mypageTable');
							$('<td/>').html('○ 나이').appendTo('#tr2');
							$('<td/>').html(d.mbr.age).appendTo('#tr2');
						$('<tr/>').attr({id:'tr3'}).appendTo('.mypageTable');
							$('<td/>').html('○ 성별').appendTo('#tr3');
							$('<td/>').html(d.mbr.gender).appendTo('#tr3');
						$('<tr/>').attr({id:'tr4'}).appendTo('.mypageTable');
								/* 모달 끝 */
							$('<td/>').attr({id:'photoChangeBtn'}).appendTo('#tr4');
							$('<td/>').html('○ 주소').appendTo('#tr4');
							$('<td/>').html(d.mbr.address).appendTo('#tr4');
							
						$('<tr/>').attr({id:'tr5'}).appendTo('.mypageTable');
							$('<td/>').html(d.mbr.comment).attr({style:'text-align: center;'}).appendTo('#tr5');
							$('<td/>').html('○ 휴대폰번호').appendTo('#tr5');
							$('<td/>').html(d.mbr.phone).appendTo('#tr5');
							$('<button/>').addClass('btn btn-primary').attr({'data-target':"#layerpop",'data-toggle':"modal", id:'modal1'}).appendTo('#photoChangeBtn').html('사진변경').click(e=>{
								e.preventDefault();
								hyungjun.service.myModal();
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
									            
									            $.ajax({
									            	url:$.ctx()+'/image/profile/'+sessionStorage.getItem("login"),
									            	dataType:'text',
									            	type:'post',
									            	data:formData,
									            	processData:false,
									            	contentType:false,
									                success: d=>{
									                        $('#layerpop').modal('hide')
									                        $('#layerpop').on('hidden.bs.modal',()=>{
																sessionStorage.setItem("profileimg",d);
																hyungjun.permision.mypage();
							                                })
									                },
									                error : e=>{
									                	alert("ERROR");
									                }
									            });
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
							        
							        /*/ 다중파일 등록
*/	                                if(files != null){
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
				});
			},
			error:(m1,m2,m3)=>{alert(m3);}
		});
	}
	var reservationList = d=>{
		$('#header').empty();
		$('#content').empty();
		var top_map = {};
		$.getJSON($.ctx()+'/member/list/'+sessionStorage.getItem("login"), d=>{
			$('<div/>').addClass('reserve-main-content').appendTo('#content');
			$('<div/>').addClass('article-title').html('<h2>숙소예약</h2>').append($('<span/>').html('예약 완료 후, 최근 60일간 내역이 보여집니다.')).appendTo('.reserve-main-content');
				$('<div/>').addClass('reserve-content').appendTo('.reserve-main-content');
					$('<section/>').addClass('history-cont').appendTo('.reserve-content');
						$('<div/>').addClass('history-item-ready-reserve').appendTo('.history-cont');
							$('<div/>').addClass('info').appendTo('.history-item-ready-reserve');
						$.each(d.rlist,(i,j)=>{
							var tday = new Date(j.pay_date);
						    
							$('.info').addClass('info_reservelist_'+i).append(
								$('<div/>').append(
													$('<a/>').html('<h4>'+ j.accom_name+'</h4>').attr({style:'cursor:pointer;'}).click(e=>{
														$.getScript($.ctx()+'/resources/js/heetae.js',()=>{
															let se = {'in_day':null,'out_day':null,'accom_seq':j.accom_seq}
		                                                    heetae.main.init(se);
														});
													}),
													$('<span/>').html(j.room_no)),
								$('<div/>').addClass('txt-address').html(j.accom_addr),
								$('<ul/>').addClass('reserveinfo-list')
									.append(
											$('<li/>').addClass('reserveinfo-item')
												.append(
														$('<span/>').html('예약번호'),
														$('<b/>').html(j.pay_no).attr({style:'padding-left: 30px'})),
											$('<li/>').addClass('reserveinfo-item')
												.append(
														$('<span/>').html('입실'),
														$('<b/>').html(j.checkin_date).attr({style:'padding-left: 60px'})),
											$('<li/>').addClass('reserveinfo-item')
												.append(
														$('<span/>').html('퇴실'),
														$('<b/>').html(j.checkout_date).attr({style:'padding-left: 60px'})),
											$('<li/>').addClass('reserveinfo-item')
												.append(
														$('<span/>').html('예약일'),
														$('<b/>').html(tday).attr({style:'padding-left: 43px'})),
											$('<li/>').addClass('reserveinfo-item')
												.append(
														$('<span/>').html('판매가'),
														$('<b/>').html(j.pay_price).attr({style:'padding-left: 43px'}))
									)
								);
								$('<div/>').addClass('btnReserveMain').attr({id:'btnReserveMain_'+i}).appendTo('.info_reservelist_'+i);
									$('<div/>').addClass('btn-primary-btn-btn-cancel').attr({id:'reserveCancelBtn_'+i}).appendTo('#btnReserveMain_'+i);
									var diff = hyungjun.service.dayDiffCalc(j.checkin_date)
									if(diff<0 && j.res_check==1){
										$('<button/>').addClass('btns').attr({'data-target':"#layerpop",'data-toggle':"modal", id:'btns'}).text('예약취소').appendTo('#reserveCancelBtn_'+i)
										.click(e=>{
											hyungjun.service.myModal();
											$('<h4/>').html('예약 취소하기').appendTo('#modalTitle');
											$('<div/>').html('취소 규정 및 환불규정에 동의합니다.').attr({style:'padding-bottom:15px; font-weight: bold'}).appendTo('.modal-body');
											$('<div/>').html('개인정보 수집/이용 약관, 개인정보 제 3자 제공 약관을 확인하였으며 이에 동의합니다.').attr({style:'padding-bottom:15px; font-weight: bold'}).appendTo('.modal-body');
											$('<div/>').addClass('guide-box').appendTo('.modal-body');
											$('<table/>').addClass('guide-table').appendTo('.guide-box');
											$('<colgroup/>').addClass('cancelColgroup').append($('<col/>').attr({style:'width:50%'}),$('<col/>').attr({style:'width:50%'})).appendTo('.guide-table');
											$('<thead/>').append($('<tr/>').append($('<th/>').html('취소기준일'),$('<th/>').html('취소수수료'))).appendTo('.guide-table');
											$('<tbody/>').append($('<tr/>').append($('<td/>').html('입실 1일전 까지'),$('<th/>').html('없음'))).appendTo('.guide-table');
											$('<tbody/>').append($('<tr/>').append($('<td/>').html('입실일 및 No-Show'),$('<th/>').html('환불불가'))).appendTo('.guide-table');
											$('<button/>').addClass('radi_button btn_save').attr({id:'reserve_cancel'}).text('예약 취소하기').appendTo('.modal-body')
												.click(e=>{
													$.getJSON($.ctx()+'/member/cancel/'+j.pay_no+'/'+sessionStorage.getItem("login"));
													$('#layerpop').modal('hide');
													$('#layerpop').on('hidden.bs.modal',()=>{
														hyungjun.permision.reservationList();
					                                })
												});
										});
									} else if(diff >= 0 && j.res_check==1){
										$('<button/>').addClass('btns-deny').text('사용 완료').appendTo('#reserveCancelBtn_'+i);		
									} else {
										$('<button/>').addClass('btns-cancel').text('취소 완료').appendTo('#reserveCancelBtn_'+i);
									}
						}); /*예약 현황 each 끝*/
		})
	};
	return {login : login, join : join, mypage:mypage, reservationList:reservationList}
})();

hyungjun.service = {
		header :x=>{
			$('#header').empty();
			/* header 시작 */
			$('<div/>').attr({id:'header'}).appendTo('#wrapper');
			$('<div/>').addClass('mainheader').appendTo('#header');		
			/* banner 시작 */
			$('<div/>').attr({id:'div_banner0',style:'margin-bottom:5%'}).appendTo($('.mainheader'));
			$('<div/>').attr({id:'carousel0','data-ride':'carousel'}).addClass('carousel slide').appendTo($('#div_banner0'));
			$('<ol/>').addClass('carousel-indicators').attr({id:'carousel-indicators0'}).appendTo($('#carousel0'));
			$('<div/>').addClass('carousel-inner').attr({id:'carousel-inner0'}).appendTo($('#carousel0'));
			let k;
			let clazz=['active'];
			for(k=1;k<=3;k++){
				$('<li/>').attr({'data-target':'#carousel', 'data-slide-to':k}).appendTo($('#carousel-indicators0'));	
				$('<div/>').addClass('carousel-item '+clazz[k-1]).attr({id:'item'+k}).append($("<img/>").attr({src:$.img()+'/banner/banner_main'+k+'.jpg',style:'width:100%;height:500px'}),
				$('<h3/>').addClass('carousel-caption center').append($('<p></p>'))).appendTo($('#carousel-inner0'));
			}
			$('<a/>').addClass('carousel-control-prev').attr({href:'#carousel0',role:'button','data-slide':'prev', id:'carousel-control-prev0'}).appendTo($('#carousel0'));
			$('<span/>').addClass('carousel-control-prev-icon').attr({'aria-hidden':'true'}).appendTo($('#carousel-control-prev0'));
			$('<span/>').addClass('sr-only').html('이전').appendTo($('#carousel-control-prev0')).appendTo($('#carousel-control-prev0'));

			$('<a/>').addClass('carousel-control-next').attr({href:'#carousel0',role:'button','data-slide':'next', id:'carousel-control-next0'}).appendTo($('#carousel0'));
			$('<span/>').addClass('carousel-control-next-icon').attr({'aria-hidden':'true'}).appendTo($('#carousel-control-next0'));
			$('<span/>').addClass('sr-only').html('다음').appendTo($('#carousel-control-next0')).appendTo($('#carousel-control-next0'));
			$('.carousel').carousel();
			/* banner 시작 */	
			$('<div/>').addClass('centered-left1').html('야놀자와 함께').appendTo('.mainheader');
			$('<div/>').addClass('centered-left2').html('여행을 떠나볼까요?').appendTo('.mainheader');
			$('<div/>').addClass('centered-left3').attr({id:'mainInput'}).appendTo('.mainheader');
				$('<div/>').attr({id:'accom_type'}).html('숙박유형').appendTo('#mainInput');
					$('<div/>').attr({id:'mainInput1'}).appendTo('#accom_type');
						$('<select/>').attr({id:'accomSelect'}).appendTo('#mainInput1');
						$.each(["모텔","호텔"],(i,j)=>{
							$('<option/>').attr({value:j,id:'accomSelect1'}).html(j).appendTo('#accomSelect');
						});
				$('<div/>').attr({id:'accom_addr'}).html('지역').appendTo('#mainInput');
					$('<div/>').attr({id:'mainInput2'}).appendTo('#accom_addr');
						$('<select/>').attr({id:'accomAddr'}).appendTo('#mainInput2');
						$.each(["서울","경기","인천","강원","제주","대전","충청북도","충청남도","세종","부산","울산","경상남도","대구","경상북도","광주","전남","전주","전북"],(i,j)=>{
							$('<option/>').attr({value:j}).html(j).appendTo('#accomAddr');
						})
						let today = new Date(new Date().getFullYear(),
								new Date().getMonth(), (new Date().getDate()));
						let save_end_max_date = new Date();
						save_end_max_date = today
						let save_start,save_end ; 
						let rs=5;
						let checkin_day = new Date(new Date().getFullYear(),
								new Date().getMonth(), new Date().getDate());	
						let checkout_day = new Date(new Date().getFullYear(),
								new Date().getMonth(), new Date().getDate()+1);
						
						$('<div/>').attr({id:'checkinDate'}).html('체크인').appendTo('#mainInput');
						$('<div/>').attr({id:'mainInput3'}).addClass('mainInput3_4').appendTo('#checkinDate');	
						$('<input/>')
						.attr({'readonly':'true'
								,'value':hyungjun.service.date_format(today)
								,'id':'start_date'}) //체크인 날짜 번경
						.appendTo($('<div>')
									.addClass(['hj_check_middle','heetae_check_middle_con1'])
									.appendTo('#mainInput3'))
									
						$('<div/>').attr({id:'checkoutDate'}).html('체크아웃').appendTo('#mainInput');
						$('<div/>').attr({id:'mainInput4'}).addClass('mainInput3_4').appendTo('#checkoutDate');			
						$('<input/>')
						.attr({'readonly':'true'
							,'value':hyungjun.service.date_format(checkout_day)
							,'id':'end_date'}) //체크아웃 날짜 번경
						.appendTo($('<div>')
								.addClass(['hj_check_middle','heetae_check_middle_con1'])
								.appendTo('#mainInput4'))
						
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
								$('#end_date').val(hyungjun.service.date_format(tsd))
								save_end = $('#start_date').val()
								
								ed = new Date($('#end_date').val().split('-')[0]
								,(Number($('#end_date').val().split('-')[1])-1)
								,(Number($('#end_date').val().split('-')[2])+1))
								
								}
							
								let ts = (ed-sd)/(24 * 60 * 60 * 1000);
								if(ts>8){
									let tsd = sd
									tsd.setDate(tsd.getDate()+7)
									$('#end_date').val(hyungjun.service.date_format(tsd))
									ed = new Date($('#end_date').val().split('-')[0]
									,(Number($('#end_date').val().split('-')[1])-1)
									,(Number($('#end_date').val().split('-')[2])+7))
									ts = (ed-sd)/(24 * 60 * 60 * 1000);
								}
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
								
								
							}
				})
					$('<button/>').attr({type:'button'}).addClass('btn-search-stay color-gradation').html('숙소검색').appendTo('#mainInput')
					.click(e=>{
                        let imageSrc;
                       let accom_type_eng = $('#accomSelect').val();
                       if(accom_type_eng=="모텔"){
                           accom_type_eng = "motel"
                           imageSrc='https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-motel.svg'
                       }else{
                           accom_type_eng = "hotel"
                               imageSrc='https://yaimg.yanolja.com/joy/pw/icon/marker/map-marker-hotel.svg'
                       }
                       $.ajax({
                           url:$.ctx()+'/taehyeong/search',
                           method:'post',
                           contentType : 'application/json',
                           data : JSON.stringify({accom_type:accom_type_eng,
                               accom_addr:$('#accomAddr').val(),
                               checkin_date:$('#start_date').val(),
                               checkout_date:$('#end_date').val(),
                               imageSrc : imageSrc}),
                               success:d=>{
                                   $.getScript($.ctx()+'/resources/js/taehyeong.js',()=>{
                                       taehyeong.main.init(d);
                                   });
                               },
                               error:()=>{
                                   alert('에러')
                               }
                       })
                   });
        },
		content :x=>{
			$('#content').remove();
			$('<div/>').attr({id:'content'}).appendTo('#wrapper');
				$('<div/>').addClass('mainContent').appendTo('#content');
				/* banner 시작 */
				$('<div/>').attr({id:'div_banner1',style:'margin-top:5%;margin-bottom:5%'}).appendTo($('.mainContent'));
				$('<div/>').attr({id:'carousel1','data-ride':'carousel'}).addClass('carousel slide').appendTo($('#div_banner1'));
				$('<ol/>').addClass('carousel-indicators').attr({id:'carousel-indicators1'}).appendTo($('#carousel1'));
				$('<div/>').addClass('carousel-inner').attr({id:'carousel-inner1'}).appendTo($('#carousel1'));
				let k;
				let clazz=['active'];
				for(k=1;k<=2;k++){
					$('<li/>').attr({'data-target':'#carousel', 'data-slide-to':k}).appendTo($('#carousel-indicators1'));	
					$('<div/>').addClass('carousel-item '+clazz[k-1]).attr({id:'item'+k}).append($("<img/>").attr({src:$.img()+'/banner/mainBanner'+k+'.JPG',style:'width:100%'}),
					$('<h3/>').addClass('carousel-caption center').append($('<p></p>'))).appendTo($('#carousel-inner1'));
				}
				$('<a/>').addClass('carousel-control-prev').attr({href:'#carousel1',role:'button','data-slide':'prev', id:'carousel-control-prev1'}).appendTo($('#carousel1'));
				$('<span/>').addClass('carousel-control-prev-icon').attr({'aria-hidden':'true'}).appendTo($('#carousel-control-prev1'));
				$('<span/>').addClass('sr-only').html('이전').appendTo($('#carousel-control-prev1')).appendTo($('#carousel-control-prev1'));

				$('<a/>').addClass('carousel-control-next').attr({href:'#carousel1',role:'button','data-slide':'next', id:'carousel-control-next1'}).appendTo($('#carousel1'));
				$('<span/>').addClass('carousel-control-next-icon').attr({'aria-hidden':'true'}).appendTo($('#carousel-control-next1'));
				$('<span/>').addClass('sr-only').html('다음').appendTo($('#carousel-control-next1')).appendTo($('#carousel-control-next1'));
				$('.carousel').carousel();
				/* banner 시작 */		
		},
		myBenefit : d=>{
			$('<ul/>').addClass('nav nav-tabs').attr({id:'nav-tabs'}).appendTo('.mypageBottomNav');
			$('<li/>').addClass('nav-item').attr({id:'nav-item1'}).appendTo('#nav-tabs');
				$('.nav-tabsHeadMain').remove();
				$('.nav-tabsHead').remove();
				$('<div/>').addClass('nav-tabsHeadMain').attr({id:'nav-tabsHeadMain2'}).appendTo('#content');
				$('<div/>').addClass('nav-tabsHead').html('<b>포인트</b>').attr({id:'nav-tabsHead2',style:'padding-bottom:50px;'}).appendTo('#nav-tabsHeadMain2');
					$('<ul/>').addClass('info_lists1').attr({id:'info_lists1',style:'padding-left:130px'}).appendTo('#nav-tabsHead2');
						$('<li/>').appendTo('#info_lists1').attr({id:'pointHead'}).html('<b>예약포인트</b>');
					$('<ul/>').addClass('info_lists').attr({id:'info_lists2',style:'padding-left:130px;margin-bottom: unset;padding-top: 15px;padding-bottom: 15px;'}).appendTo('#nav-tabsHead2');	
						$('<li/>').appendTo('#info_lists2').html(d.mbr.point);
		},
		footer : d=>{
			$('#footer').remove()
			$('<div/>').attr({id:'footer'}).addClass('footer').appendTo('#wrapper');
			$('<section/>').addClass(['footer-inner', 'column1']).append(
					$('<h2/>').addClass(['icon-comm','icon-logo-footer']).append($('<span/>').addClass('sc-out').html('Yanolja')),
					$('<ul/>').addClass('foot-menu').append(
							$('<li/>').addClass('foot-menu__item').append(
									$('<a/>').attr({href:'#',title:'회사소개로 이동'}).addClass('foot-menu__link').html('회사소개')),
							$('<li/>').addClass('foot-menu__item').append(
									$('<a/>').attr({href:'#',title:'제휴광고문의로 이동'}).addClass('foot-menu__link').html('제휴광고문의')),
							$('<li/>').addClass('foot-menu__item').append(
									$('<a/>').attr({href:'#',title:'인재채용으로 이동'}).addClass('foot-menu__link').html('인재채용')),
							$('<li/>').addClass('foot-menu__item').append(
									$('<a/>').attr({href:'#',title:'이용약관으로 이동'}).addClass('foot-menu__link').html('이용약관')),
							$('<li/>').addClass('foot-menu__item').append(
									$('<a/>').attr({href:'#',title:'개인정보처리방침으로 이동'}).addClass(['foot-menu__link']).html('개인정보처리방침'))
					),
					$('<div/>').addClass('familysite').append(
							$('<div/>').addClass('familysite__select').append(
									$('<select/>').addClass('sel-block').append(
											$('<option/>').attr({value:""}).html('야놀자 프로젝트 멤버'),
											$('<option/>').attr({value:"https://github.com/cseini"}).html('최세인'),
											$('<option/>').attr({value:"https://github.com/kingofahn"}).html('안형준'),
											$('<option/>').attr({value:"https://github.com/walker1232"}).html('김상훈'),
											$('<option/>').attr({value:"https://github.com/TaeHyeong111"}).html('김태형'),
											$('<option/>').attr({value:"https://github.com/dkqk5154"}).html('한희태')
									)
							)
					),
					$('<div/>').addClass('foot-address').append(
							$('<address/>').html('(주)비트캠프').append(
									$('<i/>').html('강사 : 박정관'),
									$('<i/>').html('주소: 서울 마포구 백범로 23 구프라자 3층'),
									$('<i/>').html('메일:'),
									$('<i/>').html('pakjkwan@gmail.com'),
									$('<br/>').html('사업자 등록번호: 220-01-12345'),
									$('<i/>').html('통신판매업신고: 신촌-10001호').attr({style:'margin: -0.5px;'}),
									$('<i/>').html('관광사업자 등록번호: 제2018-11/26호'),
									$('<i/>').html('호스팅 서비스 제공자: 비트캠프 LETS PLAY 프로젝트팀')
							),
							$('<p/>').html('(주) 비트캠프 LETS PLAY팀은 통신판매의 당사자가 아니라는 사실을 고지하며  상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.')
					),
					$('<div/>').addClass('award').append(
							$('<div/>').addClass(['award__item','item-01']).append(
									$('<span/>').addClass('award__image').append(
											$('<img/>').attr({src:'https://yaimg.yanolja.com/joy/pw/common/img-award-01.png',alt:""})
									),
									$('<em/>').addClass('award__title').html('2017'),
									$('<br/>').html('하이서울 브랜드 선정')
							),
							$('<div/>').addClass(['award__item','item-02']).append(
									$('<span/>').addClass('award__image').append(
											$('<img/>').attr({src:'https://yaimg.yanolja.com/joy/pw/common/img-award-02.png',alt:""})
									),
									$('<em/>').addClass('award__title').html('2017 브랜드 스타'),
									$('<br/>').html('숙박앱 부문 1위')
							),
							$('<div/>').addClass(['award__item','item-03']).append(
									$('<span/>').addClass('award__image').append(
											$('<img/>').attr({src:'https://yaimg.yanolja.com/joy/pw/common/img-award-03.png',alt:""})
									),
									$('<em/>').addClass('award__title').html('2016 모바일 어워드 코리아'),
									$('<br/>').html('숙박정보 부문 대상')
							),
							$('<div/>').addClass(['award__item','item-04']).append(
									$('<span/>').addClass('award__image').append(
											$('<img/>').attr({src:'https://yaimg.yanolja.com/joy/pw/common/img-award-04.png',alt:""})
									),
									$('<em/>').addClass('award__title').html('2015앱 어워드'),
									$('<br/>').html('숙박정보 부문 대상')
							),
							$('<div/>').addClass(['award__item','item-05']).append(
									$('<span/>').addClass('award__image').append(
											$('<img/>').attr({src:'https://yaimg.yanolja.com/joy/pw/common/img-award-05.png',alt:""})
									),
									$('<em/>').addClass('award__title').html('2015 마케팅 대상'),
									$('<br/>').html('최우수상')
							),
							$('<div/>').addClass(['award__item','item-06']).append(
									$('<span/>').addClass('award__image').append(
											$('<img/>').attr({src:'https://yaimg.yanolja.com/joy/pw/common/img-award-06.png',alt:""})
									),
									$('<em/>').addClass('award__title').html('정보보호관리체계인증'),
									$('<br/>').html('ISMS')
							)
					),
					$('<div/>').addClass('foot-family').append(
							$('<div/>').addClass('cs-center').append(
									$('<a/>').attr({href:'#', title:'야놀자 고객센터로 이동'}).append(
											$('<em/>').html('고객센터'),
											$('<div/>').html('1644-1346(오전 9시 ~ 익일 새벽 3시)')
									)
							),
							$('<div/>').addClass('snslink').append(
									$('<a/>').attr({rel:['noopener', 'noreferrer'],href:'#', target:'_blank'
										,title:'야놀자 페이스북으로 이동'}).append($('<i/>').addClass(['icon-sns-facebook','icon-comm']).attr({style:'background-position: 0 -202px;'})),
									$('<a/>').attr({rel:['noopener', 'noreferrer'],href:'#', target:'_blank'
										,title:'야놀자 인스타그램으로 이동'}).append($('<i/>').addClass(['icon-comm', 'icon-sns-instargram']).attr({style:'background-position: -25px -202px;'})),
									$('<a/>').attr({rel:['noopener', 'noreferrer'],href:'#', target:'_blank'
										,title:'야놀자 유튜브으로 이동'}).append($('<i/>').addClass(['icon-comm', 'icon-sns-youtube']).attr({style:'background-position: -50px -202px;'})),
									$('<a/>').attr({rel:['noopener', 'noreferrer'],href:'#', target:'_blank'
										,title:'야놀자 네이버TV로 이동'}).append($('<i/>').addClass(['icon-comm', 'icon-comm icon-sns-navertv']).attr({style:'background-position: -300px -202px;'})),
									$('<a/>').attr({rel:['noopener', 'noreferrer'],href:'#', target:'_blank'
										,title:'야놀자 네이버 포스트로 이동'}).append($('<i/>').addClass(['icon-comm', 'icon-naverpos'])),
									$('<a/>').attr({rel:['noopener', 'noreferrer'],href:'#', target:'_blank'
										,title:'야놀자 네이버블로그로 이동'}).append($('<i/>').addClass(['icon-comm', 'icon-sns-naverblog']))
							)
					)
			).appendTo('#footer');
		},
		myModal : d=>{
			$('.modal fade').empty();
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
					+'      <div class="modal-footer">'
					+'        	<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>'
					+'      </div>'
					+'    </div>'
					+'  </div>'
					+'</div>').appendTo('#content');
		},
		nav : d =>{
			$('#nav').remove()
			$('<div/>').attr({id:'nav'}).appendTo($('#wrapper'));
				$('<div/>').addClass('mainNav').appendTo($('#nav'));
					$('<a/>').addClass('yanoljaMainLogo').attr({id:'logo_btn'}).appendTo('.mainNav');
					$('<div/>').addClass('nav_left').appendTo('.mainNav');
						$('<a/>').attr({href:'#', id:'board'}).html('캐스트').appendTo('.nav_left');
					$('<div/>').addClass('nav_right').appendTo('.mainNav');
						$('<a/>').attr({href:'#', id:'amdin'}).html('관리자').appendTo('.nav_right');
						$('<a/>').attr({href:'#', id:'add_btn'}).html('회원가입').appendTo('.nav_right');
						$('<a/>').attr({href:'#', id:'login_btn'}).html('로그인').appendTo('.nav_right');

		      $( document ).ready( function() {
		          var jbOffset = $('.mainNav').offset();
		          $( window ).scroll( function() {
			            if ( $(this).scrollTop() > jbOffset.top ) {
			              $('.mainNav').addClass('jbFixed');
			            }
			            else {
			              $('.mainNav').removeClass('jbFixed');
			            }
			          	});
		        });
			
		},
		authNav : ()=>{
				$('.nav_right').empty();
				$('<div/>').addClass('menubar').appendTo('.nav_right');
				$('<ul/>').append(
							$('<li/>').append(
									$('<a/>').attr({href:'#', id:'myinfo'}).addClass('ya_cusor').append(
											$('<img>').attr({src:$.img()+'/profile/'+sessionStorage.getItem("profileimg")}).addClass('avatar'),
				 							$('<a/>').attr({href:'#', style:'margin-left:5px;'}).html(sessionStorage.getItem("nickname")).addClass('ya_cusor')
									).append($('<ul/>').addClass('mouseOverUl').append(
										$('<li/>').append($('<a/>').attr({href:'#', id:'mypage'}).html('마이페이지')).click(e=>{
											e.preventDefault();
											hyungjun.permision.mypage();
										}),		 															
	 									$('<li/>').append($('<a/>').attr({href:'#',id:'logout'}).html('로그아웃')).click(e=>{
	 										e.preventDefault();
	 										sessionStorage.removeItem("login");
	 										sessionStorage.removeItem("profileimg");
	 										sessionStorage.removeItem("nickname");
	 										hyungjun.router.home();
	 									}),
			 							$('<li/>').append($('<a/>').attr({href:'#', id:'moveToReservationList'}).html('예약내역')).click(e=>{
			 								e.preventDefault();
			 								hyungjun.permision.reservationList();
			 							}),		 															
			 							$('<li/>').append($('<a/>').attr({href:'#', id:'mycast'}).html('마이캐스트')).click(e=>{
			 								e.preventDefault();
			 								$.getScript($.ctx()+'/resources/js/sein.js',()=>{
			 									sein.service.mycast();
			 								})
			 							})		 															
									)))).appendTo('.menubar');
				
			      $( document ).ready( function() {
			          var jbOffset = $('.mainNav').offset();
			          $( window ).scroll( function() {
				            if ( $(this).scrollTop() > jbOffset.top ) {
				              $('.mainNav').addClass('jbFixed');
				            }
				            else {
				              $('.mainNav').removeClass('jbFixed');
				            }
				          	});
			        });
		},
		makeRandomLetter : d=>{
		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		    for( var i=0; i < d; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));
		    return text;
		},
		dayDiffCalc : d=>{
			var oldToday = new Date();
			var currentYear = oldToday.getFullYear();
		    var currentMonth = oldToday.getMonth();
		    var currentDay = oldToday.getDate();
		    var newToday = new Date(currentYear, currentMonth, currentDay);
		    var strDate1 = d;
		    var arr1 = strDate1.split('-');
		    var checkinDate = new Date(arr1[0], arr1[1], arr1[2].split(',')[0]);
		    checkinDate.setMonth(checkinDate.getMonth()-1);
		    var diff = (newToday.getTime()-checkinDate.getTime())/(1000*60*60*24);
			return diff;
		},
		date_format : x=>{
			let yyyy = x.getFullYear().toString();
		    let mm = (x.getMonth() + 1).toString();
		    let dd = x.getDate().toString();
		    return yyyy + '-' +(mm[1] ? mm : '0'+mm[0]) +'-'+ (dd[1] ? dd : '0'+dd[0]);
		}
}

hyungjun.router = {
	init :x=>{
		$.getScript(x+'/resources/js/router.js',
			()=>{
				$.extend(new Session(x));
							console.log(
									"%c                                                ", 
									`background: url("http://image.sportsseoul.com/2016/04/06/news/2016040601000286800018951.jpg") no-repeat; 
									width: 250px; 
									height: 250px; 
									line-height: 220px; 
									color: #0f0; 
									font-size: 1.0rem; 
							`);
						    console.log(
						        '\n' +
						        'LETS PLAY 비트캠프 프로젝트 홈페이지에 방문을 환영합니다.\n\n\n' +
					        	'           ("`-’-/").___..--’’"`-._\n' +
					            '            `6_ 6  )   `-.  (     ).`-.__.‘)\n' +
						        '            (_Y_.)’  ._   )  `._ `. ``-..-’\n' +
			                    '           _..`--’_..-_/  /--’_.’ ,’\n' +
						        '          (il),-’‘  (li),’  ((!.-‘\n\n\n' +
			                    '다섯명의 비트캠프 수강생이 작업한 프로젝트 작품으로\n'+
			                    '숙박예약사이트 야놀자를 모티브로하여 구현하였습니다.'
						    );
				hyungjun.main.init();
			}
		);
	},
	home :d =>{
		$('#wrapper').empty();
		$('#nav').empty();
		$('.mainNav').empty();
		$('#header').empty();
		$('#content').empty();
		$('#footer').empty();
		hyungjun.service.nav();
		hyungjun.service.header();			
		hyungjun.service.content();
		hyungjun.service.footer();
		$('#amdin').addClass('ya_cusor').click(e=>{
			e.preventDefault();
			$.getScript($.ctx()+'/resources/js/sanghoon.js',()=>{
				sessionStorage.removeItem("login");
				sessionStorage.removeItem("profileimg");
				sessionStorage.removeItem("nickname");
				sanghoon.main.init();
			});
		});
		$('#logo_btn').click(e=>{
			e.preventDefault();
			let session = sessionStorage.getItem("login");
				if(!session){
					hyungjun.router.home();
				}else{
					e.preventDefault();
					hyungjun.service.header();
					hyungjun.service.content();
					hyungjun.service.footer();
				}
			})
		$('#login_btn').addClass('ya_cusor').click(e=>{
					e.preventDefault();
					hyungjun.permision.login();	
			});
		$('#board').addClass('ya_cusor').click(e=>{
			e.preventDefault();
			$.getScript($.ctx()+'/resources/js/sein.js',()=>{
			sein.board.cast();
				});
			});
		$('#add_btn').addClass('ya_cusor').click(e=>{
			e.preventDefault();
			hyungjun.permision.join();
			});
		}
};
