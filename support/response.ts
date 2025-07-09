interface ResponseFormat<T> {
  code: number;
  message: string;
  data: T | null;
  timestamp: number;
}

class ResponseFormat<T> {
  static success<T>(data: T | null = null, message = "success") {
    return {
      code: 0,
      message,
      data,
      timestamp: Date.now(),
    };
  }

  static error(code = 500, message = "error", data = null) {
    return {
      code,
      message,
      data,
      timestamp: Date.now(),
    };
  }
}

export default ResponseFormat;
