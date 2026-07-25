class AuthServices{
    setData(data,uid){
        console.log(data);

        localStorage.setItem("uid",uid)
        localStorage.setItem("email",data.email)
        localStorage.setItem("name",data.name)
        localStorage.setItem("userType",data.userType)
        localStorage.setItem("isLogin",true)
        
    }

    getUserType(){
       return localStorage.getItem("userType")
    }
    getUid(){
       return localStorage.getItem("uid")
    }
    getIslogin(){
       return localStorage.getItem("isLogin")
    }

    getName() {
    return localStorage.getItem("name")
}

getEmail() {
    return localStorage.getItem("email")
}

    clear(){
        localStorage.clear()
    }


}

export default new AuthServices