package com.myrecipe.common.exception.client;

import lombok.Getter;

@Getter
public class UnauthorizedException extends RuntimeException {
    private final String errorCode;

    public UnauthorizedException(String message) {
        super(message);
        this.errorCode = "ERR_COMMON_UNAUTHORIZED";
    }

    public UnauthorizedException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public UnauthorizedException(String message, String errorCode, String debugMessage) {
        super(message);
        this.errorCode = errorCode;
    }
}
