package com.play.web.mbr;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberMapper {
	public void post(Member p);
	public List<HashMap<String, Object>> rlist(String member_id);
	public Member get(Member p);
	public Integer count(Member p);
	public void put(Member p);
	public void delete(Member p);
	public void update(Member p);
	public void cancel(HashMap<String, Object> map);
}