Package.describe({
  name: 'insightfil:easypost',
  version: '1.0.0',
  summary: 'The wrapper of EasyPost is terrible. Wrappers for easypost.',
  git: 'https://github.com/artaic/easypost',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use([
    'ecmascript',
    'underscore',
    'promise',
    'es5-shim',
    'erasaur:meteor-lodash@3.10.1_1'
  ], ['client', 'server']);

  api.export('EasyPost', 'server');
  api.addFiles('easypost.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('easypost');
  api.addFiles('easypost-tests.js');
});

Npm.depends({
  'node-easypost': '2.0.7'
});

