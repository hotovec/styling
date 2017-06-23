const express = require('express');
const app = express();
const port = 4000;

// list of templates
const templates = require('./../src/templates');

// config data
const config = require('./../src/config');

// dummy data
const dummy = require('./../src/dummy-data');



app.use(express.static(__dirname + './../public'));
app.set('views', __dirname + './../src/templates');
app.set('view engine', 'twig');

// This section is optional and can be used to configure twig.
app.set('twig options', {
  strict_variables: false
});

app.get('/', function (req, res) {
  res.render('index', {
    templates: templates.templates,
    config: config.config,
    data: dummy.dummy,
    namespaces: { 'thx': './templates' },
    message: "some mesage"
  });
});

app.listen(port, function () {
  console.log('App listening on port: ' + port)
});

