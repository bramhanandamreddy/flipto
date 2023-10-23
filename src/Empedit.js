import React, { useState,useEffect} from 'react'
import  { Link,useNavigate,useParams} from 'react-router-dom';

export default function Empedit(){
    const {empid} = useParams();
    const[id,idchange] =useState("");
    const[name,namechange] =useState("");
    const[Category,Categorychange] =useState("");
    const[DateofExpence,DateofExpencechange] =useState("");
    const[Amount,Amountchange] =useState("");
    const [UpdatedAt,updatedatchange]=useState("");
    const[Createdby,CreatedbyChnge]=useState("")
    const navigation = useNavigate();
    useEffect(()=>{
        fetch('http://localhost:8001/cruddata/'+empid).then((res)=>{
        return res.json(); 
        }).then((res)=>{
            idchange(res.id);
            namechange(res.name);
            Categorychange(res.Category);
            DateofExpencechange(res.DateofExpence);
            Amountchange(res.Amount);
            updatedatchange(res.UpdatedAt)
            CreatedbyChnge(res.Createdby)
        }).catch((err)=>{
            console.log(err);
        })
   
    },[empid])

        const handleSubmit=(e)=>{
        e.preventDefault();
        const empdata = {id,name,Category,DateofExpence,Amount,UpdatedAt,Createdby}
       
            fetch('http://localhost:8000/cruddata/'+empid,{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(empdata)
            }).then((res)=>{
                alert('Record inserted');
                navigation('/');
            }).catch((err)=>{
                console.log(err);
            })
           }
  return (
    <div>
      <div className='row'>
        <div className='container'>
            <div className='card'>
                <div className='card-title'>
                    <h2>MY EXPENCE MANAGER</h2>
                </div>
                <div className='card-body'>
                <div className='offset-lg-3 col-lg-6'>
                <form onSubmit={handleSubmit}>
                    <div className='row' style={{'textAlign':'left'}}>
                    <div className='container'>
                        
                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label>Name</label>
                                    <input type='text' value={name} onChange={e=>namechange(e.target.value)} className='form-control' required></input>
                                </div>
                            </div>
                            <div className='col-lg-12'>
    <div className='form-group'>
        <label>Category</label>
        <select 
            value={Category} 
            onChange={e => Categorychange(e.target.value)} 
            className='form-control' 
            required
        >
            <option value="">Select a category</option>
            <option value="Health">Health</option>
            <option value="Electronics">Electronics</option>
            <option value="Travel">Travel</option>
            <option value="Education">Education</option>
            <option value="Book">Book</option>
            <option value="Others">Others</option>
        </select>
    </div>
</div>
                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label>DateofExpence</label>
                                    <input type='date' value={DateofExpence} onChange={e=>DateofExpencechange(e.target.value)} className='form-control' required></input>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label>Amount</label>
                                    <input type='number' value={Amount} onChange={e=>Amountchange(e.target.value)} className='form-control' required></input>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label>UpdatedAt</label>
                                    <input type='time' value={UpdatedAt} onChange={e=>updatedatchange(e.target.value)} className='form-control' required></input>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className='form-group'>
                                    <label>Createdby</label>
                                    <input type='text' value={Createdby} onChange={e=>CreatedbyChnge(e.target.value)} className='form-control' required></input>
                                </div>
                            </div>
                            <div className='col-lg-12'>
                                <div className='form-group' style={{'textAlign':'center'}}>
                                    <button type='submit' className='btn btn-success m-2'>Submit</button>
                                    <Link to="/" className='btn btn-danger'>Back</Link>
                                </div>
                            </div>
                    </div>
                </div>
</form>
                </div>
            </div>
        </div>
      </div>
    </div>
    </div>
  )
}