import { addDoc, collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
import { db } from "../firebase";

const dbPath = "Orders";

class OrderServices {

  async Add(data) {
    try {

      await addDoc(collection(db, dbPath), data);

      return 1;

    }
    catch (err) {
      console.log(err);
      return 0;
    }
  }

  async All() {

    try {

      let orderDocs = await getDocs(collection(db, dbPath));

      let orderData = orderDocs.docs.map((el) => {
        return {
          id: el.id,
          ...el.data()
        };
      });

      return orderData;

    }
    catch (err) {
      console.log(err);
    }

  }

  async OrderByUser(uid) {

    try {

      let orderDocs = await getDocs(

        query(
          collection(db, dbPath),
          where("userId", "==", uid)
        )

      );

      let orderData = orderDocs.docs.map((el) => {
        return {
          id: el.id,
          ...el.data()
        };
      });

      return orderData;

    }
    catch (err) {
      console.log(err);
    }

  }

  async StatusChange(id, status) {

    try {

      await updateDoc(doc(db, dbPath, id), {
        status: status
      });

      return 1;

    }
    catch (err) {
      console.log(err);
      return 0;
    }

  }

}

export default new OrderServices();