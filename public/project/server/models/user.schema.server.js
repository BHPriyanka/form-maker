
module.exports = function(mongoose){
    var NewsSchema = require("./news.schema.server.js")(mongoose);
    var CommentSchema = require("./comment.schema.server.js")(mongoose);

    var NewsUserSchema = mongoose.Schema({
        userName: String,
        password : String,
        firstName : String,
        lastName : String,
        emails : [String],
        phones : [String],
        roles :  [String],
        likes: [String],
        likesArticles: [NewsSchema],
        commentsArticles: [NewsSchema],
        comments: [String]
    }, {collection: 'project.news.user'});

    return NewsUserSchema;
}