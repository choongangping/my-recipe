package com.myrecipe.common.exception.server;

import lombok.Getter;

@Getter
public class DataPersistenceException extends RuntimeException {
    private final String errorCode;

    public DataPersistenceException(String message) {
        super(message);
        this.errorCode = "ERR_COMMON_PERSISTENCE_ERROR";
    }

    public DataPersistenceException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public DataPersistenceException(String message, String errorCode, String debugMessage) {
        super(message);
        this.errorCode = errorCode;
    }
}
