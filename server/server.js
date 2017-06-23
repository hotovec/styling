const express = require('express');
const app = express();
const port = 4000;

// list of templates
const templates = require('./../src/templates');

// documentor setup & content for modules previews
const documentor = require('./../src/templates/documentor/modules');

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
    data: dummy.dummy
  });
});


app.get('/.components/:componentId', function (req, res) {

  var docModules = documentor.documentor.modules;
  var currentModule = null;

  for (var idx = 0; idx < docModules.length; idx++) {
    if(docModules[idx].id === req.params.componentId) {
      currentModule = docModules[idx];
    }
  }

  if(currentModule === null) {
    res.send("whoops");
  }

  console.info(currentModule);

  var moduleTemplate = 'documentor/' + currentModule.template;
  if(!currentModule.template) {
    moduleTemplate = 'documentor/documentor'
  }


  res.render(moduleTemplate, {
    templates: templates.templates,
    config: config.config,
    data: dummy.dummy,
    documentor: documentor.documentor,
    component: currentModule
  });
});



app.get('/.components', function (req, res) {
  res.render('documentor/documentor', {
    templates: templates.templates,
    config: config.config,
    data: dummy.dummy,
    documentor: documentor.documentor
  });
});

app.listen(port, function () {
  console.log('App listening on port: ' + port)
});

