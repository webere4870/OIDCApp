let UserSchema = require('./Schema')
let bcrypt = require('bcrypt')

async function VerifyUser(username, password)
{
    let profile = await UserSchema.findById(username)
    if(profile)
    {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, profile.salt, (err, hash) => {
                if(hash == profile.hash)
                {
                    return true
                }
                else
                {
                    return false
                }
            });
        });

    }

}

module.exports = VerifyUser