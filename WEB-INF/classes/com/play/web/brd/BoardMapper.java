package com.play.web.brd;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface BoardMapper {
	public void write(Board vo);
	public List<SeinResult> list(HashMap<String,Object>map);
	public HashMap<String,Object> read(Board vo);
	public void modify(Board vo);
	public void delete(Board vo);
	
	public List<Board> reply(Board vo);
	public void reWrite(Board vo);
	public void reModify(Board vo);
	public void reDelete(Board vo);
	public int count(HashMap<String, Object>map);
	
	public void readInc(int seq);
	public void likeInc(int seq);
	public void likeDes(int seq);
	public void subInc(SeinResult sr);
	public void subDes(SeinResult sr);
	public void saveLike(HashMap<String, Object>map);
	public void deleteLike(HashMap<String, Object>map);
	public void saveBookmark(HashMap<String, Object>map);
	public void deleteBookmark(HashMap<String, Object>map);
  
	public HashMap<String,Object> check(HashMap<String, Object>map);
	
	public int subcheck(SeinResult sr);
	public int subcount(SeinResult sr);
	public int castcount(SeinResult sr);
	public List<SeinResult> mysub(HashMap<String, Object>map);
	public List<SeinResult> myBookmark(HashMap<String, Object> smap);
	public List<SeinResult> rankLike();
	public List<SeinResult> search(HashMap<String, Object> smap);
	public int searchCount(String search);
	public List<SeinResult> nearAccom(String region);
	
}
