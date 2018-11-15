package com.play.web.accom;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Repository;

@Repository
public interface AccomMapper {
	public List<Object> retrieveReservation(Map<String, Object> p);
	public HashMap<String, Object> retrieveReservationRoom(Map<String, Object> p);
	public HashMap<String, Object> retrieveAccommodation(Map<String, Object> p);
	public List<Object> retrieveReviewRoomSeq(Map<String, Object> p);
	public List<Object> listRoom(Map<String, Object> p);
	public List<Object> listReview(Map<String, Object> p);
	public int count(Map<String, Object> p);
	public void insertReview(Map<String, Object> p);
	public void insertReservation(Map<String, Object> p);
	public void updateReviewImage(Map<String, Object> p);
	public void delete(Map<String, Object> p);
	/**************
	 --  태형 처리한 부분
	 **************/
	public List<HashMap<String,Object>>list(HashMap<String,Object> searchMap);
	public List<HashMap<String, Object>> lowList(HashMap<String,Object> priceMap);
}
