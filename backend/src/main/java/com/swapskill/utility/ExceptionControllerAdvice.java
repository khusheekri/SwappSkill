package com.swapskill.utility;


	import java.time.LocalDateTime;
	import java.util.stream.Collectors;
	import org.springframework.http.HttpStatus;
	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.MethodArgumentNotValidException;
	import org.springframework.web.bind.annotation.ExceptionHandler;
	import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.swapskill.exception.SwapSkillException;

	

	@RestControllerAdvice
	public class ExceptionControllerAdvice {

		@ExceptionHandler
		public ResponseEntity<ErrorInfo> habiTrackExceptionHandler(SwapSkillException exception) {
			ErrorInfo error = new ErrorInfo();
			error.setErrorMessage(exception.getMessage());
			error.setErrorCode(HttpStatus.BAD_REQUEST.value());
			error.setTimestamp(LocalDateTime.now());

			return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
		}

		@ExceptionHandler(MethodArgumentNotValidException.class)
		public ResponseEntity<ErrorInfo> validationExceptionHandler(MethodArgumentNotValidException exception) {
			ErrorInfo errorInfo = new ErrorInfo();
			errorInfo.setErrorCode(HttpStatus.BAD_REQUEST.value());
			errorInfo.setTimestamp(LocalDateTime.now());

			String errorMsg = exception.getBindingResult().getAllErrors().stream().map(err -> err.getDefaultMessage())
					.collect(Collectors.joining(", "));

			errorInfo.setErrorMessage(errorMsg);

			return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
		}

		@ExceptionHandler(Exception.class)
		public ResponseEntity<ErrorInfo> genericExceptionHandler(Exception exception) {

			exception.printStackTrace();

			ErrorInfo error = new ErrorInfo();
			error.setErrorMessage("An unexpected error occurred. Please try again later.");
			error.setErrorCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
			error.setTimestamp(LocalDateTime.now());

			return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


