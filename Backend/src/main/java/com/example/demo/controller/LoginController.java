package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entitites.LoginUser;
import com.example.demo.service.LoginService;

//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class LoginController {

	@Autowired
	LoginService lservice;
	
	@GetMapping("/login")
	public Object checkLogin(@RequestParam String email,@RequestParam String password)
	{
		System.out.println(email+" "+password);
		return lservice.checkLogin(email, password);
	}
	
	@GetMapping("/allinfo")
	public List<LoginUser> getAll()
	{
		return lservice.getAll();
	}
	
	@GetMapping("/updateStatus")
	public void updateStatus(@RequestParam("status") String status, @RequestParam("loginid") LoginUser loginid)
	{
		lservice.updateStatus(status, loginid);
	}
	
	@PostMapping("/forgot-password")
	public ResponseEntity<String> forgotPassword(@RequestParam String email) {

		String response = lservice.forgotPassword(email);

		if (!response.startsWith("Invalid")) {
			response = "http://localhost:5010/reset-password?token=" + response;
			return ResponseEntity.ok().body(response);
		}
		return ResponseEntity.badRequest().body(response);
	}

	@PutMapping("/reset-password")
	public String resetPassword(@RequestParam String token,
			@RequestParam String password) {

		return lservice.resetPassword(token, password);
	}
}