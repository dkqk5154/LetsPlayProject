package com.play.web.accom;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

@Component
@Data @Lazy
public class TaehyeongResult {
	private String accom_type, accom_addr;
}
