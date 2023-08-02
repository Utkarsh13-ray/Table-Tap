import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { query, collection, where, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";
import Input from "./Input";
import { MdDelete } from "react-icons/md"
import { MdEdit } from "react-icons/md"
import { GrDocumentUpdate } from "react-icons/gr"
import { IoIosArrowDropupCircle } from "react-icons/io"
import { MdAddBox } from "react-icons/md"

const MenuViewer = ({ id, cat, len, index}) => {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const { rest } = router.query;
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState();
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  
  useEffect(()=>{
    const q = query(collection(db, `restaurants/${rest}/Menu/${id}/${cat}`))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const arr = []
      querySnapshot.forEach((doc) => {
        arr.push({ id:doc.id, ...doc.data() })
      })
      setItems(arr);
    });

    return () => unsubscribe()
  }, [])

  const toggleEdit = (ind) => {
    const newArray = [...edit];
    newArray[ind] = !edit[ind];
    setEdit(newArray);
  }

  const addItem = async () => {
    const q = query(
      collection(db, `restaurants/${rest}/Menu`),
      where("category", "==", cat)
    );
    const querySnapshot = await getDocs(q);
    const usersCollectionRef = collection(db,`restaurants/${rest}/Menu/${querySnapshot.docs[0].id}/${cat}`);
    await addDoc(usersCollectionRef, { name, price, desc });
    setName("")
    setPrice("")
    setDesc("")
  };

  const deleteItem = async (cat, id) => {
    const q = query(collection(db, `restaurants/${rest}/Menu`),where("category", "==", cat));
    const querySnapshot = await getDocs(q);
    await deleteDoc(doc(db, `restaurants/${rest}/Menu/${querySnapshot.docs[0].id}/${cat}`, id));
  }

  const deleteCategory = async (cat) => {
    const q = query(collection(db, `restaurants/${rest}/Menu`), where("category", "==", cat));
    const querySnapshot = await getDocs(q);
    await deleteDoc(doc(db, `restaurants/${rest}/Menu/`, querySnapshot.docs[0].id));
  }

  const updateItem = async (cat, id, ind) => {
    const q = query(collection(db, `restaurants/${rest}/Menu`), where("category", "==", cat));
    const querySnapshot = await getDocs(q);
    let data = {...items[ind]}
    if(newName!="") data = { ...items[ind], name: newName }
    if(newDesc!="") data = { ...items[ind], desc: newDesc }
    if(newPrice!="") data = { ...items[ind], price: newPrice }
    
    await updateDoc(doc(db, `restaurants/${rest}/Menu/${querySnapshot.docs[0].id}/${cat}`, id), data);
    setNewName("")
    setNewDesc("")
    setNewPrice("")
    toggleEdit(ind)
  }
  useEffect(()=>{

  }, [addItem, deleteItem, deleteCategory, updateItem])

  function toTitleCase(str) {
    const titleCase = str
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");

    return titleCase;
  }

  const [edit, setEdit] = useState(Array(items.length).fill(false));
  const [add, setAdd] = useState(Array(len).fill(false));

  return (
    <>
      <div className="mb-6 text-black border-b-1 rounded-lg border-secondary">
        <div className="flex text-2xl font-medium text-secondary rounded p-4 bg-accent">
          <div className="w-full text-center font-bold">{toTitleCase(cat)}</div>
          <button type="button" 
            className="text-secondary text-2xl text-center" 
            onClick={()=>{
                const newArray = [...add]
                newArray[index] = !add[index]
                setAdd(newArray)
              }}>
              {!add[index] && <MdAddBox/>}
              {add[index] && <IoIosArrowDropupCircle/>}
          </button>
          <button type="button" 
            className="text-secondary text-2xl text-center" 
            onClick={()=>deleteCategory(cat)}>
              <MdDelete/>
          </button>
        </div>
        { add[index] && 
        <div className="flex justify-center text-black my-2">
          <Input placeholder="Food Name" state={name} setState={setName}/>
          <Input placeholder="Price" state={price} setState={setPrice}/>
          <Input placeholder="Description" state={desc} setState={setDesc}/>
          <button className="text-secondary hover:text-white border-[3px] hover:bg-secondary transition-all duration-300 border-secondary font-semibold rounded-lg text-sm px-3 text-center" onClick={() => addItem()}>Add</button>
        </div>
        }

        <div className="rounded flex items-center flex-col transition-all duration-300">
          {items.map((item, ind) => {
            return (
              <div className="text-black flex shadow-md p-4 rounded-md justify-center w-[80%]" key={item.id}>
                  { !edit[ind] &&
                    <div className="w-full flex justify-between">
                      <div>
                        <div className="text-lg font-semibold">{toTitleCase(item.name)}</div>
                        <div className="text-sm">{toTitleCase(item.desc)}</div>
                      </div>
                  
                      <div className="flex items-center justify-center">
                        <div className="text-lg font-semibold mr-4">₹{item.price}</div>
                        <button className="ml-2 text-secondary text-xl text-center" onClick={()=>toggleEdit(ind)}><MdEdit/></button>
                        <button type="button" 
                                className="ml-2 text-secondary text-xl text-center" 
                                onClick={()=>deleteItem(cat, item.id)}>
                                <MdDelete/>
                        </button>
                      </div>
                    </div>
                  }
                  { edit[ind] && 
                      <div>
                        <Input placeholder="New Name" state={newName} setState={setNewName}/>
                        <Input placeholder="New Price" state={newPrice} setState={setNewPrice}/>
                        <Input placeholder="New Description" state={newDesc} setState={setNewDesc}/>
                        <button className="ml-2 text-secondary text-xl text-center" onClick={()=>updateItem(cat, item.id, ind)}><GrDocumentUpdate/></button>
                        <button className="ml-2 text-secondary text-xl text-center" onClick={()=>toggleEdit(ind)}><MdDelete/></button>
                      </div>
                  }
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MenuViewer;
