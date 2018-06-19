module.exports = {
    getMessage:function (code) {
        if(this[code]){
            return this[code];
        }
        return code;
    },
    register_server_error:"не удалось зарегать",
    duplicate_email:"Такой email занят"
};