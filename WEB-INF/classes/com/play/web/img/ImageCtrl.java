package com.play.web.img;

import java.awt.image.BufferedImage;
import java.io.File;
import java.net.URL;
import java.util.HashMap;
import java.util.UUID;

import javax.annotation.Resource;
import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.play.web.cmm.Util;
import com.play.web.cmm.Util2;
import com.play.web.img.Image;
import com.play.web.mbr.Member;
import com.play.web.mbr.MemberMapper;

@RestController
@RequestMapping("/image")
public class ImageCtrl {
	static final Logger logger = LoggerFactory.getLogger(ImageCtrl.class);
	@Autowired Image img;
	@Autowired MemberMapper mbrMap;
	@Autowired Member mbr;
	@Autowired Util2 util2;
	@Autowired HashMap<String, Object> map;
	@Resource(name="uploadPath")
	private String uploadPath;
	String savedName ="";

	@PostMapping("/profile/{member_id}")
	public String uploadProfile(MultipartFile files, @PathVariable String member_id) throws Exception {
		map.clear();
		Util.log.accept("멤버 아이디 :"+member_id);
		Util.log.accept("파일 이름 : "+files.getOriginalFilename());
		Util.log.accept("파일 크기 : "+files.getBytes());
		String savedName = uploadPhoto(files.getOriginalFilename(), files.getBytes(), member_id);
		mbr.setProfileimg(savedName);
		mbr.setMember_id(member_id);
		mbrMap.update(mbr);
		return savedName;
	}
/*	@PostMapping("/kakaoProfile/")
	public String uploadKakaoProfile(@RequestBody Member mbr) throws Exception {
		URL url = new URL(mbr.getProfileimg());
		String ext = mbr.getProfileimg().substring(mbr.getProfileimg().lastIndexOf(".")+1,mbr.getProfileimg().length()); 
		BufferedImage img = ImageIO.read(url);
        savedName = UUID.randomUUID() + "." +ext;
        File file=new File(uploadPath,savedName);
        ImageIO.write(img, ext, file);
        mbr.setProfileimg(savedName);
		mbr.setMember_id(mbr.getMember_id());
		mbrMap.update(mbr);
		return savedName;
	}*/
	
	private String uploadPhoto(String originalName, byte[] fileData, String member_id) throws Exception {
		savedName = UUID.randomUUID() + "." + originalName.split("\\.")[1];		
		FileCopyUtils.copy(fileData, new File(uploadPath, savedName));
		return savedName;
	}
}
