const express = require('express');
const app = express();
const port = 4000;

const templates = require('./../src/templates/templates');

app.use(express.static(__dirname + './../public'));
app.set('views', __dirname + './../src/templates');
app.set('view engine', 'twig');

console.info(templates);

// This section is optional and can be used to configure twig.
app.set('twig options', {
  strict_variables: false
});

app.get('/', function (req, res) {
  res.render('index', {
    templates: templates.templates,
    message: "my message x2"
  });
});

app.listen(port, function () {
  console.log('Example app listening on port: ' + port)
});

