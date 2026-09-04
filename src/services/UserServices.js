import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth , db } from "../firebase";
import { doc , getDoc, setDoc } from "firebase/firestore";
import AuthServices from "./AuthServices";
import { UserModel } from "../model/UserModel";

const dbPath = "users"

class UserServices {
    async Login(email , password){
        try{
            let userCreed = await signInWithEmailAndPassword(auth, email, password)
            const uid = userCreed.user.uid
            
            let userDocs = await getDoc(doc(db, dbPath, uid))

            if (!userDocs.exists()) {
    return 0;
}
            const userData = userDocs.data()

            AuthServices.setData(userData,uid)

            if(userData.userType == 1){
                return 1
            }
            else if(userData.userType == 2){
                return 2
            }
            else {
                return 0
            }
        }
        catch (err){
            console.log(err);
            console.log(err.code);
    console.log(err.message);
            return 0;
        }
    }

    async Register(data){
        try {
            
           let userCreed=await createUserWithEmailAndPassword(auth,data.email,data.password)
           let uid=userCreed.user.uid

           let obj=new UserModel()
           obj.name=data.name
           obj.email=data.email
           obj.contact=data.contact
           obj.profile=data.profile
           obj.address=data.address

            let data1={ ...obj}

          await setDoc(doc(db,dbPath,uid),data1)

          AuthServices.setData(data1,uid)

          return 1

        } catch (error) {
                console.log(error.code);
                console.log(error.message);
                return 0
        }
    }
}

export default new UserServices