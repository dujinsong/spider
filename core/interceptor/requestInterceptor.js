var interceptor = {};

interceptor.pre = function (req, res) {
    return true;
};

interceptor.after = function (req, res) {
    return true;
};

module.exports = interceptor;
