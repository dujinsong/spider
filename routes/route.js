var fs = require('fs');
var path = require('path');

var defaultIncludePath = '../modular';
var defaultExcludePath = '';

/**
 * 路由扫描实例（目前粗力度的扫描路由，业务需要可扩展此方法添加细粒度的路由规则）
 * @param app 应用上下文
 * @param includePath 需要扫描的路径
 * @param excludePath 需要排除的路径
 */
function doScan(app, includePath, excludePath) {
    includePath = includePath ? includePath : defaultIncludePath;
    excludePath = excludePath ? excludePath : defaultExcludePath;

    includePath = includePath ? path.join(__dirname, includePath) : defaultIncludePath;
    excludePath = excludePath ? path.join(__dirname, excludePath) : defaultExcludePath;

    scanRoute(app, includePath, excludePath, []);
}

/**
 * 扫描业务路由
 * @param app 应用上下文
 * @param includePath 需要扫描的路径
 * @param excludePath 需要排除的路径
 */
function scanRoute(app, includePath, excludePath) {

    var modularJs = fs.readdirSync(includePath);
    modularJs.forEach(function (value) {
        var modularJsFullPath = path.join(includePath, value);
        var modularJsStatus = fs.statSync(modularJsFullPath);

        if (modularJsStatus.isFile()) {
            if (path.extname(modularJsFullPath) !== '.js') {
                return true;
            }

            var modularJsRoute = require(modularJsFullPath);
            var controllerMapping = modularJsRoute.controllerMapping;
            if (!controllerMapping) return true;
            var requestMappings = modularJsRoute.requestMappings;

            app.use(controllerMapping, requestMappings);
        } else {
            scanRoute(app, modularJsFullPath, excludePath);
        }

    });
}

module.exports = function (app) {
    doScan(app);
};
