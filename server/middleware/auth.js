import jwt from 'jsonwebtoken';

const auth = (req, res,next ) => {
    try {
        // check if token is valid
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        console.log(token)

        let decodeData;

        if(token && isCustomAuth) {
            decodeData = jwt.verify(token, 'test');

            req.userId = decodeData?.id;
        }else{
            decodeData = jwt.decode(token);

            req.userId = decodeData?.sub //sub in what is used to differentiate users in google.
        }

        next();
        
    } catch (error) {
        console.log(error)
    }
}

export default auth;