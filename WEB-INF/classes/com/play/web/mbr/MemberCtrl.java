package com.play.web.mbr;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.play.web.cmm.Util2;

@RestController
@RequestMapping("/member")
public class MemberCtrl {
	static final Logger logger = LoggerFactory.getLogger(MemberCtrl.class);
	@Autowired Member mbr;
	@Autowired MemberMapper mbrMap;
	@Autowired Util2 util2;
	@Autowired HashMap<String,Object>map;
	@Autowired List<HashMap<String, Object>> rlist;
	String savedName ="";
	
	@PostMapping("/join")
	public void join(@RequestBody Member param) throws IOException {
		if(param.getBirthdate()!=null) {
			param.setAge(util2.ageAndGender(param).getAge());
			param.setGender(util2.ageAndGender(param).getGender());
			mbrMap.post(param);
		} else {
/*			URL url = new URL(mbr.getProfileimg());
			String ext = mbr.getProfileimg().substring(mbr.getProfileimg().lastIndexOf(".")+1,mbr.getProfileimg().length()); 
			BufferedImage img = ImageIO.read(url);
	        savedName = UUID.randomUUID() + "." +ext;
	        File file=new File(uploadPath,savedName);
	        ImageIO.write(img, ext, file);
	        mbr.setProfileimg(savedName);*/
	        mbrMap.post(param);
		}
	}
	
	@PostMapping("/auth")
	public Map<String,Object> auth(@RequestBody Member pm){
		map.clear();
		map.put("mbr", mbrMap.get(pm));
		return map;
	}
	@PostMapping("/login")
	public Map<String,Object> login(@RequestBody Member pm) {
		Map<String,Object> rm =  new HashMap<>();
		String pwValid = "WRONG";
		String idValid ="WRONG";
		if(mbrMap.count(pm)!=0) {
			idValid ="CORRECT";
			Function<Member,Member> f = (t)->{
				return mbrMap.get(t);
			};
			mbr = f.apply(pm);
			pwValid = (mbr != null) ?"CORRECT":"WRONG";
			mbr = (mbr != null)?mbr:new Member();
		}
		rm.put("id_valid",idValid);
		rm.put("pw_valid", pwValid);
		rm.put("mbr", mbr);
		return rm;
	}
	@PostMapping("/delete")
	public Map<String,Object> delete(
			@RequestBody Member pm) {
		map.clear();
		String deleteMsg = "비밀번호오류";
		if(mbrMap.count(pm)!=0) {
			mbrMap.delete(pm);
			deleteMsg="탈퇴완료";
		};
		map.put("deleteMsg", deleteMsg);
		map.put("mbr", mbr);
		return map;
	}
	
	@PostMapping("/update")
	public void modify(@RequestBody Member pm) {
		map.clear();
		mbrMap.update(pm);
	}
	
	@GetMapping("/list/{member_id}")
	public HashMap<String, Object> rlist(@PathVariable String member_id){
		map.clear();
		rlist = mbrMap.rlist(member_id);
		map.put("rlist", rlist);
		return map;
	}
	
	@GetMapping("/cancel/{pay_no}/{member_id}")
	public void result(@PathVariable String pay_no, @PathVariable String member_id){
		map.clear();
		map.put("member_id", member_id);
		map.put("pay_no", pay_no);
		mbrMap.cancel(map);
	}
}