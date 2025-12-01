


class ResponseMessage {
  constructor(status, statusCode, message, data) {
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

// export const createResponseMessage = (status, statusCode, message, data) => {
//   return new ResponseMessage(status, statusCode, message, data);
// }   ;

module.exports = { ResponseMessage };