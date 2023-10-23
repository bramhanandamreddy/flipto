import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GrEdit } from 'react-icons/gr';
import {MdDelete} from 'react-icons/md'

export default function Curddata() {
  const [filterName, setFilterName] = useState('');
  const [empdata, empchange] = useState(null);
  const navigation = useNavigate();

  const loadcontent = (id) => {
    navigation('/empdata/' + id);
  };

  const deletecontent = (id) => {
    if (window.confirm('Do you want to delete')) {
      fetch('http://localhost:8001/cruddata/' + id, {
        method: 'DELETE',
      })
        .then((res) => {
          alert('Record Deleted');
          navigation('/');
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetch('http://localhost:8001/cruddata')
      .then((res) => res.json())
      .then((res) => {
        empchange(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredData = empdata
    ? empdata.filter((item) =>
        item.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : [];

  return (
    <div>
      <div className='row'>
        <div className='container'>
          <div className='card'>
            <div className='card-title'>
              <h2>My Expence manager</h2>
            </div>

            <div className='card-body'>
              <div>
                <label > filter option</label>
                <input
                  type='text'
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  placeholder='Filter by Name'
                />
              </div>
              <Link to='/empadd' className='btn btn-success mb-3'>
                Add New
              </Link>
              <table className='table table-bordered'>
                <thead className='bg-primary text-white'>
                  <tr>
                    <td>Id</td>
                    <td>name</td>
                    <td>Category</td>
                    <td>Date of Expence</td>
                    <td>Amount</td>
                    <td>UpdatedAt</td>
                    <td>Createdby</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.Category}</td>
                      <td>{item.DateofExpence}</td>
                      <td>{item.Amount}</td>
                      <td>{item.UpdatedAt}</td>
                      <td>{item.Createdby}</td>
                      <td>
                        <a onClick={() => loadcontent(item.id)} className='btn btn-white m-1'>
                          <GrEdit/>
                        </a>
                        <a onClick={() => deletecontent(item.id)} className='btn btn-white'>
                          <MdDelete style={{ color: 'red' }}/>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}