package com.play.web.brd;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data @Lazy
public class SeinResult {
	/*Board bean*/
	private Integer msg_seq;
	private String msg_title;
	private String msg_photo;
	private String msg_date;
	private Integer msg_count;
	private String msg_content;
	private Integer bookmark_count;
	private Integer subscription_count;
	private Integer board_depth;
	private String board_id;
	private String member_id;
	private String pay_no;
	private String tag;
	private Integer like_count;
	private Integer reply_count;
	
	/*member bean*/
	private String name, password, birthdate, joindate, gender, age, phone, customer_grade, point, nickname, address, zipcode, profileimg;
	
	/*SAVED_ACCOM*/
	private Integer like_check, bookmark_check;
	private String sub_mem_id, saved_unique;
	
	/*accommodation*/
		private String accom_seq, accom_name, accom_addr, 
		accom_phone, accom_business_no, accom_type, accom_date, accom_grade;
		private double longitude, latitude;
}
