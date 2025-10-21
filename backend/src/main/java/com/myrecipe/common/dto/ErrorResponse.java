package com.myrecipe.common.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
@Builder
@ToString
public class ErrorResponse {
    private final LocalDateTime timestamp; // 예외 발생 시간
    private final int status;              // http 상태코드
    private final String error;            // http 상태명
    private final String errorCode;        // 프로젝트 커스텀 에러코드
    private final String message;          // 사용자용 메시지
    private final String path;             // 요청 url
    private final String traceId;          // 오류 추적을 위한 ID

    public static ErrorResponse of(HttpStatus status, String errorCode, String message, String path, String traceId) {
        return ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(status.value())
                .error(status.name())
                .errorCode(errorCode)
                .message(message)
                .path(path)
                .traceId(traceId)
                .build();
    }
}
