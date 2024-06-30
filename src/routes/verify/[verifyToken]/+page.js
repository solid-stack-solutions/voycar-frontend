// Loads verification token from url
export function load( {params} ){
    return { 
        verifyToken : params.verifyToken,
    };
}