var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
   username:{
       type : String,
       required : true
   },
    password:{
        type : String,
        required : true
    },
    create_date:{
        type: Date,
        default: Date.now()
    }
},
{ versionKey: false }

);

var User = module.exports = mongoose.model('User',userSchema);

//Add Details
module.exports.addUser = function (user,callback) {
    User.create(user,callback);
}

//Fetch Detail

module.exports.getData = function (callback) {
    User.find(callback);
}

