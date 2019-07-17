var responseWrapper = {};

function response(status, msg, data) {
    responseWrapper.status = status;
    responseWrapper.msg = msg;
    responseWrapper.data = data;
    return responseWrapper;
}

module.exports = response;
