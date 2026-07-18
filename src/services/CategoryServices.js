import { addDoc, collection, getDocs , deleteDoc, doc, getDoc , updateDoc , query , where } from "firebase/firestore"
import {CategoryModel} from "../model/CategoryModel"
import { db } from "../firebase"

const dbPath = "categories"


class CategoryServices {
    async Add(data){

        try{
            let obj = new CategoryModel()
            obj.CategoryName = data.name
            obj.Description = data.description
            obj.Image = data.image;
            await addDoc(collection(db, dbPath), {...obj})

            return 1

        }
        catch(err){
            console.log(err);
            return 0
        }
    }

    async All(payload, key) {
        try {
            let CateDocs = null

            if(!!payload){
                CateDocs = await getDocs(query(collection(db,dbPath), where(key,"==",payload.value)))

            }
            else{
                CateDocs = await getDocs(collection(db,dbPath))
            }

            let CateData = CateDocs.docs.map((el)=>{
                return {id: el.id, ...el.data()}
            })

            return CateData
        }
        catch(err){
            console.log(err);
        }
    }


async delete(id){
    try{
        await deleteDoc(doc(db,dbPath,id))
        return 1
    }
    catch(err){
        console.log(err);
        return 0
    }
}

async single(id){
    try{
        let cateDocs = await getDoc(doc(db,dbPath,id))
        return cateDocs.data()
    }
    catch(error){
        console.log(error);
    }
}

async Update(data,id){
    try{
        let obj = new CategoryModel()
        obj.CategoryName = data.name
        obj.Description = data.description
        obj.Image = data.image
        await updateDoc(doc(db,dbPath,id),{...obj})
        return 1
    }
    catch(err){
        console.log(err);
        return 0
    }
}

async statusChange(id,status){
    try{
        
        await updateDoc(doc(db,dbPath,id),{status:status})
        return 1
    }
    catch(err){
        console.log(err);
        return 0
    }
}

}
export default new CategoryServices