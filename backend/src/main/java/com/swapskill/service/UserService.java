package com.swapskill.service;

import com.swapskill.dto.LoginDTO;
import com.swapskill.dto.UserDTO;

public interface UserService {

	String registerUser(UserDTO userDTO) throws Exception;
	UserDTO loginUser (LoginDTO loginDTO) throws Exception;
}
