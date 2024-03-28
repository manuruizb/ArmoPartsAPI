class Result {
    constructor(data, success = false, message = 'Petición exitosa.') {
      this.success = success;
      this.message = message || 'Petición exitosa.';
      this.data = data;
    }
  
    build() {
      return {
        success: this.success,
        message: this.message,
        data: this.data
      };
    }
  }

module.exports = Result;