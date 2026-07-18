import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { MenuModel } from "../model/MenuModel";
import { db } from "../firebase";

const dbPath = "products";

class MenuServices {
  async Add(data) {
    try {
      let obj = new MenuModel();

      obj.name = data.name;
      obj.categoryId = data.categoryId;
      obj.categoryName = data.categoryName;
      obj.description = data.description;
      obj.price = Number(data.price);
      obj.image = data.image;

      await addDoc(collection(db, dbPath), { ...obj });

      return 1;
    } catch (err) {
      console.log(err);
      return 0;
    }
  }

  async All() {
    try {
      const productDocs = await getDocs(collection(db, dbPath));

      const productData = productDocs.docs.map((el) => {
        return {
          id: el.id,
          ...el.data(),
        };
      });

      return productData;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    try {
      await deleteDoc(doc(db, dbPath, id));
      return 1;
    } catch (err) {
      console.log(err);
      return 0;
    }
  }

  async single(id) {
    try {
      const menuDoc = await getDoc(doc(db, dbPath, id));
      return menuDoc.data();
    } catch (err) {
      console.log(err);
    }
  }

  async Update(data, id) {
    try {
      let obj = new MenuModel();

      obj.name = data.name;
      obj.categoryId = data.categoryId;
      obj.categoryName = data.categoryName;
      obj.description = data.description;
      obj.price = Number(data.price);
      obj.image = data.image;

      await updateDoc(doc(db, dbPath, id), { ...obj });

      return 1;
    } catch (err) {
      // console.log(err);
      console.log("Update Error:", err);
      return 0;
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

export default new MenuServices();