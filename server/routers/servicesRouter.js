var express = require('express');
var servicesRouter = express();

var ExportMiddleware = require('../middlewares/exportMiddleware');
servicesRouter.post('/pdf', ExportMiddleware.exportPdf);
servicesRouter.get('/pdf/:filename', ExportMiddleware.getPdf);
servicesRouter.post('/png', ExportMiddleware.exportPng);

module.exports = servicesRouter;