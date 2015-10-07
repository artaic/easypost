process.env.EASYPOST_KEY = 'cueqNZUb3ldeWTNX7MU3Mel8UXtaAMUi';

Tinytest.add('Should initialize correctly', function (test) {
  test.isTrue(easypost);
});
