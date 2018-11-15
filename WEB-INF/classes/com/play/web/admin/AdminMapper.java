package com.play.web.admin;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
@Repository
public interface AdminMapper {
	public List<HashMap<String,Object>> getAgeCnt ();
	public List<HashMap<String,Object>> getPayType ();
	public List<HashMap<String,Object>> getQuarter ();
	public List<HashMap<String,Object>> getAccomCnt ();
	public List<HashMap<String,Object>> getGenderCnt ();
	public List<HashMap<String,Object>> getTopLocal ();
	public List<HashMap<String,Object>> getTopSales ();
	public List<HashMap<String,Object>> getTopMember ();
	public List<HashMap<String,Object>> getSumHotel ();
	public List<HashMap<String,Object>> getSumMotel ();
	public List<HashMap<String,Object>> getByPriceAll (HashMap<String,Object>map);
	public List<HashMap<String,Object>> getByPricePart (HashMap<String,Object>map);
	public List<HashMap<String,Object>> getLocalHo (HashMap<String,Object>map);
	public List<HashMap<String,Object>> getLocalMo (HashMap<String,Object>map);
	public List<HashMap<String,Object>> getLocalHoPart (HashMap<String,Object>map);
	public List<HashMap<String,Object>> getLocalMoPart (HashMap<String,Object>map);
	//public List<HashMap<String,Object>> getByPricePart (String accom_addr, String start, String end);
	public List<HashMap<String,Object>> getPosition (HashMap<String,Object>map);
	//public List<HashMap<String,Object>> getAgeUse();
	public List<HashMap<String,Object>> getCustoAccom(HashMap<String,Object>map);
	public List<HashMap<String,Object>> getTopRes();
	public List<HashMap<String,Object>> getCustoPop();
	public List<HashMap<String,Object>> getTop();
}

