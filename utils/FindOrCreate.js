let UserSchema = require('./../MongoDB/Schema')
function UserExist(record)
{

    if(record.name == "eliweber2001@gmail.com")
    {
        return true
    }
    return false // not found

}

module.exports = UserExist