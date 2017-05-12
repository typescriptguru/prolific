const gulp = require('gulp');
const awspublish = require('gulp-awspublish');

const localConfig = {
  buildSrc: './dist/**/*',
  getAwsConf: function (environment) {
    const conf = require('./aws');

    if (!conf[environment]) {
      throw 'No aws conf for env: ' + environment;
    }

    if (!conf[environment + 'Headers']) {
      throw 'No aws headers for env: ' + environment;
    }

    return { keys: conf[environment], headers: conf[environment + 'Headers'] };
  }
};

gulp.task('publish', [], function(){
  const awsConf = localConfig.getAwsConf('production');
  const publisher = awspublish.create(awsConf.keys);

  return gulp.src(localConfig.buildSrc)
    .pipe(awspublish.gzip({ ext: '' }))
    .pipe(publisher.publish(awsConf.headers), 100)
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});
