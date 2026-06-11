package com.swapskill.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.swapskill.dto.LoginDTO;
import com.swapskill.dto.UserDTO;
import com.swapskill.entity.User;
import com.swapskill.exception.SwapSkillException;
import com.swapskill.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository repo;
	
	ModelMapper modelMapper= new ModelMapper();
	
	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	@Override
	public String registerUser(UserDTO userDTO) throws SwapSkillException{
		if(Boolean.TRUE.equals(repo.existsByEmail(userDTO.getEmail()))) {
			throw new SwapSkillException("Service.USER_ALREADY_EXISTS");
		}
		
		//DTO TO ENTITY
		User user = modelMapper.map(userDTO, User.class);
		
	    // Encrypt password
        user.setPassword(encoder.encode(userDTO.getPassword()));
        User savedUser= repo.save(user);
        //return response
        return "User registered successfully with ID : " + savedUser.getId();
	}
	
	@Override
	public UserDTO loginUser(LoginDTO loginDTO) throws SwapSkillException{
		
		Optional<User> optionalUser = repo.findByEmail(loginDTO.getEmail());
		
		User user=optionalUser.orElseThrow(()-> new SwapSkillException("Service.INVALID_CREDENTIALS"));
		
		if(!encoder.matches(loginDTO.getPassword(), user.getPassword())) {
			throw new SwapSkillException("Service.INVALID_PASSWORD");
		}
		
		return modelMapper.map(user,UserDTO.class);
		
		
	}
	
}
