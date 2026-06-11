package com.swapskill.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginDTO {

	@NotNull(message = "{login.email.notNull}")
	@Email(message = "{login.email.invalid}")
	private String email;

	@NotBlank(message = "{login.password.blank}")
	private String password;
}
