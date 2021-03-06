module.exports = function(app, db, mongoose) {
    var userModel = require("./models/user.model.js")(app, db, mongoose);
    var formModel = require("./models/form.model.js")(app, db, mongoose);
    var fieldModel = require("./models/field.model.js")(app, db, mongoose);
    var userService = require("./services/user.service.server.js")(app, userModel);
    var formService = require("./services/forms.service.server.js")(app, formModel);
    var fieldService = require("./services/field.service.server.js")(app, formModel, fieldModel);
}