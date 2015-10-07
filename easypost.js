let Future = Npm.require('fibers/future');
let easypost = Npm.require('node-easypost')(process.env.EASYPOST_KEY);

Meteor.startup(function () {
  _ = lodash;
});

/**
 * Takes all of the EasyPost API and wraps it with futures.
 * At the end, will return an EasyPost object as a wrapper.
 */
EasyPost = _.reduce(easypost, function (wrapper, val, key) {
  wrapper[key] = _.reduce(_.keys(val), function (wrap, inner) {
    wrap[_.camelCase(inner)] = function () {
      let future = new Future();

      _.clone(easypost)[key][inner].apply(this, _.toArray(arguments).concat(function (err, result) {
        if (err) {
          future.throw(new Meteor.Error(err.message.code, err.message.message))
        } else {
          future.return(result);
        }
      }));

      future.wait();
      return future.value;
    }.bind(this)
    return wrap;
  }, {}, easypost);
  return wrapper;
}, {}, easypost);

