package com.play.web.accom;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data @Lazy
public class Accom {
	private String accom_seq, accom_name, accom_addr, 
	accom_phone, accom_business_no, accom_type, accom_date, accom_grade;
}

