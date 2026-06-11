package com.swapskill.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swapskill.dto.LoginDTO;
import com.swapskill.dto.UserDTO;
import com.swapskill.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserAPI {
	
	 @Autowired
	    private UserService userService;
	 
	  @PostMapping("/register")
	    public ResponseEntity<String> registerUser(@Validated @RequestBody UserDTO userDTO) throws Exception {
	        String successMessage = userService.registerUser(userDTO);
	        System.out.println("REGISTER API HIT");
	        return new ResponseEntity<>(successMessage, HttpStatus.CREATED);
	    }

	    @PostMapping("/login")
	    public ResponseEntity<UserDTO> loginUser(@Valid @RequestBody LoginDTO loginDTO) throws Exception {
	        UserDTO loggedInUser = userService.loginUser(loginDTO);
	        return new ResponseEntity<>(loggedInUser, HttpStatus.OK);
	    }
}
