package com.play.web.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.play.web.cmm.Util;

@RestController
public class AdminCtrl {

	@Autowired AdminMapper admMap;
	@Autowired Map<String, Object> map;
	@Autowired HashMap<String,Object> smap;

	@GetMapping("/admin/basic")
	public Map<String,Object> basic(){
		map.clear();
		map.put("pay", admMap.getPayType());
		map.put("booked", admMap.getQuarter());
		map.put("accom", admMap.getAccomCnt());
		map.put("age", admMap.getAgeCnt());
		map.put("gender", admMap.getGenderCnt());
		map.put("topLoc", admMap.getTopLocal());
		map.put("topSales", admMap.getTopSales());
		map.put("topMember", admMap.getTopMember());
		return map;
	}
	@GetMapping("/admin/sales")
	public Map<String,Object> sales(){
		map.clear();
		map.put("sumHotel", admMap.getSumHotel());
		map.put("sumMotel", admMap.getSumMotel());
		return map;
	}

	@GetMapping("/admin/accom/{accom_addr}")
	public Map<String,Object> accomAll(@PathVariable String accom_addr){
		map.clear();
		smap.clear();
		accom_addr += "%";
		smap.put("accom_addr", accom_addr);
		map.put("accomPrice", admMap.getByPriceAll(smap));
		map.put("accomPosition", admMap.getPosition(smap));

		return map;
		
	}
	@GetMapping("/admin/accom/{accom_addr}/{start}/{end}")
	public Map<String,Object> accomPart(@PathVariable String accom_addr, @PathVariable String start, @PathVariable String end){
		map.clear();
		smap.clear();
		accom_addr += "%";
		smap.put("accom_addr", accom_addr);
		smap.put("start", start);
		smap.put("end", end);
		map.put("accomPrice", admMap.getByPricePart(smap));
		map.put("accomPosition", admMap.getPosition(smap));
		return map;
	}
	@GetMapping("/admin/custo/{type}/{start}/{end}")
	public Map<String,Object> custo(@PathVariable String type, @PathVariable String start, @PathVariable String end){
		map.clear();
		smap.clear();
		smap.put("type", type);
		smap.put("start", start);
		smap.put("end", end);
		map.put("custoAccom", admMap.getCustoAccom(smap));
		map.put("custoPop", admMap.getCustoPop());
		return map;
	}

	@GetMapping("/admin/top")
	public Map<String,Object> top(){
		map.clear();
		map.put("top", admMap.getTop());
		return map;
	}
}
