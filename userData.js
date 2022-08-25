function getUserData(profile)
{
    let name 
    let picture
    let email
    if(profile.provider == "facebook")
    {
        name = profile.displayName
        picture = profile.photos[0].value
        email = profile._json.email
    }
    else
    {

    }

    return {name: name, picture: picture, email: email}
}

module.exports = getUserData