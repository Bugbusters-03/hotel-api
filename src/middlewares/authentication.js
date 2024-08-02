const { Token } = require("../models/tokenModel");



module.exports = async(req,res,next) => {

    req.user =null;
    req.token =null;

    
    const authHeader = req.headers.authorization || null;

    //token gelmismi
    //token istedigim igib gelmismi
    // if(authHeader && authHeader.startsWith('Token')){

    // }
    //Token skjdfnkjsdflkj23409uhjbg384ni9
    //Token 

    if(authHeader){
        if(authHeader.split(' ')[0] === 'Token' ){
            const tokenKey = authHeader.split(' ')[1]

            if(tokenKey){

                const tokenData = await Token.findOne({token:tokenKey}).populate('userId');

                if(tokenData){
                    req.user = tokenData.userId;
                    req.token = tokenKey;

                }



            }
        }
    }


    //token validmi

    next();
}