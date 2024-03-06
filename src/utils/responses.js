const STATUS_MESSAGES = {
  200: "success",
  201: "success",
  400: "fail",
  401: "fail",
  403: "fail",
  404: "fail",
  500: "error",
};

/**
 * Sends a response with a status code and a payload.
 *
 * @param {import('express').Response} res - The response object.
 * @param {number} statusCode - The status code of the response.
 * @param {any} payload - The payload to be sent in the response.
 */
export function sendDataResponse(res, statusCode, payload) {
  return res.status(statusCode).json({
    status: STATUS_MESSAGES[statusCode],
    data: payload
  });
}

/**
 * Sends a response with a status code and a message.
 *
 * @param {import('express').Response} res - The response object.
 * @param {number} statusCode - The status code of the response.
 * @param {string} message - The message to be sent in the response.
 */
export function sendMessageResponse(res, statusCode, message) {
  return res.status(statusCode).json({
    status: STATUS_MESSAGES[statusCode],
    message
  });
}
