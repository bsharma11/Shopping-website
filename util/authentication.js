function createusersession(req,user,action){
    req.session.uid = user._id.toString()
    req.session.isAdmin = user.isAdmin
    req.session.save(action)
}
function destroyuserauth( req){
    req.session.uid = null
}

module.exports = {
    createusersession: createusersession,
    destroyuserauth:destroyuserauth
}
