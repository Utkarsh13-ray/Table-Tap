import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MUIDataTable from "mui-datatables";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { db } from "@/config/firebase";
import {  collection, getDocs, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";



const Team = () => {
    const [teamdata, setTeamData] = useState([]);
    const router = useRouter();
    const { rest } = router.query;
    const columns = [
        {
            name: 'name',
            label: 'Name',
        },
        {
            name: 'designation',
            label: 'Designation',
        },
        {
            name: 'phone_number',
            label: 'Phone No.',
        },
        {
            name: 'salary',
            label: 'Salary',
        },
        {
            name: 'joining',
            label: 'Joining date',
        },
        {
            name: 'icon',
            label: ' ',
        },

    ]
   
    const [getitem, setGetitem] = useState(0);
    const [addnew, setAddnew]= useState(false);
    const CustomToolbar = () => {
      return(
         <>
           <Button variant={"contained"} className="button" onClick={AddRowModal}>Add NEW</Button>
         </>
       );
      }
      
      const options = {
        whiteSpace: 'nowrap',
        selectableRows: false,
        customToolbar: CustomToolbar,
    }
  
    useEffect(() => {
      const getData = async () => {
        const data = await getDocs(collection(db, `restaurants/${rest}/Team`))
        const temp = data.docs.map((doc) => {
          console.log(doc.data().uid);
          return { ...doc.data(), 'icon' : <div className="flex gap-4"><DriveFileRenameOutlineIcon className="cursor-pointer" onClick={()=>{handleOpen(doc)}} /><DeleteIcon className="cursor-pointer" onClick={()=>{handleDelete(doc.id)}}/></div> } })
          setTeamData(temp)
     
      }
      getData();
    }, [getitem]);

    const [open, setOpen] = useState(false);
    const [name, setName]= useState();
    const [id, setId] = useState();
    const [designation, setDesignation] = useState();
    const [joining, setJoining] = useState();
    const [salary, setSalary] = useState();
    const [phone, setPhone] = useState();
    
    const handleOpen = (doc) => {
        setId(doc.id)
        setName(doc.name);
        setDesignation(doc.designation);
        setSalary(doc.salary);
        setPhone(doc.phone_number);
        setJoining(doc.joining);
        setAddnew(false)
        setOpen(true)
        console.log(doc.phone_number)
        console.log(name)
      
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const  UpdateRow= async()=>{
      try {
       
        await updateDoc(doc(db, `restaurants/${rest}/Team`, id), { name: name,
          designation: designation,
          joining: joining,
          salary:salary,
          phone_number: phone });
        
    } catch (error) {
        console.error("Error updating leave status:", error);
    }
        handleClose();
        setGetitem(1^getitem);
             
    }
    const AddRowModal=async ()=>{
      setName('');
      setDesignation('');
      setSalary('');
      setPhone('');
      setJoining('');
      setAddnew(true);
      setOpen(true);

    }
    const  AddRow= async()=>{
       await addDoc(collection(db, `restaurants/${rest}/Team`), { 
          name: name,
          designation: designation,
          joining: joining,
          salary:salary,
          phone_number: phone });
        
   
        handleClose();
        setGetitem(1^getitem);
    }
  
    const  handleDelete= async(element_id)=>{
    await deleteDoc(doc(db, `restaurants/${rest}/Team`,element_id));
         
            setGetitem(1^getitem);
    }
  
  
  
    return (
        <>   
          <MUIDataTable
              columns={columns}
              data={teamdata}
              options={options}
          />
            <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth={true}>
            <DialogTitle>Edit Details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Name
              </DialogContentText>
              <TextField
                  autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e)=>{
                setName(e.target.value);
            }}
          />
          <DialogContentText>
          Designation
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="designation"
            type="text"
            fullWidth
            variant="standard"
            value={designation}
            onChange={(e)=>{
                setDesignation(e.target.value);
            }}
          />
          
          <DialogContentText>
            Phone Number
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            type="text"
            fullWidth
            variant="standard"
            value={phone}
            onChange={(e)=>{
                setPhone(e.target.value);
            }}
          /> 
          <DialogContentText>
          Salary
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="joining"
          type="text"
          fullWidth
          variant="standard"
          value={salary}
          onChange={(e)=>{
              setSalary(e.target.value);
          }}
        />
          <DialogContentText>
            Joining Date
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="joining"
            type="text"
            fullWidth
            variant="standard"
            value={joining}
            onChange={(e)=>{
                setJoining(e.target.value);
            }}
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {!addnew && <Button onClick={UpdateRow}>Apply Changes</Button>}
          {addnew && <Button onClick={AddRow}>Add</Button>}
        </DialogActions>
      </Dialog>
           </>
    )
}
export default Team;