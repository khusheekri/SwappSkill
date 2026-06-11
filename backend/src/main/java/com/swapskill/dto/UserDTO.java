package com.swapskill.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class UserDTO {

	private Long id;
	
	@NotBlank(message="{user.name.blank}")
	private String name;
	
	@NotBlank(message="{user.email.blank}")
	 private String email;

	@NotBlank(message="{user.password.blank}")
	@Size(min=6,message="{user.password.size}")
    private String password;

    
    private String bio;
}
