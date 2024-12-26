class ResponseFormat {
  static success(data = null, message = "success") {
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
