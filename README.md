## gulp-sleet

Compile sleet files with Gulp.

## Usage

```javascript
gulp.task('sleet', function() {
    gulp.src('./**/*.sleet')
        .pipe(sleet({
            extension: 'html',
            handlebars: {
                block: ['layout', 'view']
            }
        }))
        .pipe(gulp.dest('./'));
});
```

or configurate it via `package.json`
```json
{
    ...
    "dependencies": {
        ...
    },
    "sleet": {
        "extension": "html",
        "handlebars": {
            "block": ["layout", "view"]
        }
    }
}
```
and use it like:
```javascript
gulp.task('sleet', function() {
    gulp.src('./**/*.sleet')
        .pipe(sleet())
        .pipe(gulp.dest('./'));
});
```
