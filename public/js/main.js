requirejs.config({
    baseUrl: 'public/js',
    paths: {}
  });

// Start loading the main app file. Put all of
// your application logic in there.
requirejs([''], function () {
  console.log('ENTRY');
});
