package com.myrecipe.common.exception.client;

import lombok.Getter;

@Getter
public class ResourceNotFoundException extends RuntimeException {
    private final String errorCode;

    public ResourceNotFoundException(String message) {
        super(message);
        this.errorCode = "ERR_COMMON_NOT_FOUND";
    }

    public ResourceNotFoundException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public ResourceNotFoundException(String message, String errorCode, String debugMessage) {
        super(message);
        this.errorCode = errorCode;
    }
}
