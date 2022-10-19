const NouvelleModel = require('../models/nouvelle');
const Repository = require('../models/repository');
module.exports =
    class BookmarksController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext, new Repository(new NouvelleModel()));
        }
    }