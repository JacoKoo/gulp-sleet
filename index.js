var path = require('path'),
    fs = require('fs'),
    through2 = require('through2'),
    sleet = require('sleet'),
    PluginError = require('plugin-error'),
    replaceExt = require('replace-ext'),
    merge = require('deepmerge');

module.exports = function(opt) {
    var pkg = require(path.join(process.cwd(), 'package.json')) || {},
        options = merge({}, pkg.sleet || {}, opt || {});

    function compileSleet(file, enc, cb) {
        var content, result;
        options.filename = file.path;

        if (file.isStream()) {
            return cb(new PluginError('gulp-sleet', 'Streaming not supported'));
        }

        if (opt && opt.ignore && opt.ignore.some(i => fs.existsSync(replaceExt(file.path, '.' + i)))) {
            return cb()
        }

        if (file.isBuffer()) {
            try {
                content = file.contents.toString(enc);
                result = sleet.compile(content, options);
                file.contents = new Buffer(result.content);
                file.path = replaceExt(file.path, '.' + result.extension);
            } catch (e) {
                return cb(new PluginError('gulp-sleet', file.path + '\n' + e.message));
            }
        }

        cb(null, file);
    }

    return through2.obj(compileSleet);
};
