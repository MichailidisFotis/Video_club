function requireAdmin(req , res , next){

    if(req.session.role_id ===1 ){

        return next()
    }
    else{
      return res.redirect("/")

    }
}

export default requireAdmin