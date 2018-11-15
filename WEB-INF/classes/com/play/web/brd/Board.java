package com.play.web.brd;

import java.util.Date;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;
@Component
@Data @Lazy
public class Board {
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
	private Integer accom_grade;
	private Integer accom_reco;
	private Integer reply_seq;
	private Integer msg_ref;
	private String msg_addr;
	
	private String msg_photo1;
	
	private Integer accom_seq;
	private String room_name;
	private String room_no;
	private int room_price;
	
}
