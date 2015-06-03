var path = require('path'),
    through2 = require('through2'),
    sleet = require('sleet'),
    util = require('gulp-util'),
    merge = require('deepmerge');

module.exports = function(opt) {
    var pkg = require(path.join(process.cwd(), 'package.json')) || {},
        options = merge({}, pkg.sleet || {}, opt || {});

    function compileSleet(file, enc, cb) {
        var content, result;
        options.filename = file.path;

        if (file.isStream()) {
            return cb(new util.PluginError('gulp-sleet', 'Streaming not supported'));
        }

        if (file.isBuffer()) {
            try {
                content = file.contents.toString(enc);
                result = sleet.compile(content, options);
                file.contents = new Buffer(result.content);
                file.path = util.replaceExtension(file.path, '.' + result.extension);
            } catch (e) {
                return cb(new util.PluginError('gulp-sleet', e));
            }
        }

        cb(null, file);
    }

    return through2.obj(compileSleet);
};
