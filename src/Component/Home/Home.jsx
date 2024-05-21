import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFormData, deleteFormData } from '../../app/formDataSlice';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import './Home.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const DisplayPage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.formData);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData'));
    if (storedData) {
      dispatch(setFormData(storedData));
    }
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteFormData(id));
    alert('Data delete permanent')
  };

  return (



    <div className='container-data'>
    <div className='data-box'>
        <div className='data-list'>
            <h2>Data List</h2>
            <button type="button" className="btn btn-primary">
                <Link to="/Form" className="link-addItem">Add Item</Link>
            </button>
        </div>
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th scope="col" className="table-info">S.N</th>
                    <th scope="col" className="table-info">Title</th>
                    <th scope="col" className="table-info" id='description'>Description</th>
                    <th scope="col" className="table-info">Time</th>
                    <th scope="col" className="table-info">Date</th>
                    <th scope="col" className="table-info">Image</th>
                    <th scope="col" className="table-info">Action</th>
                </tr>
            </thead>
            <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan="7">No data available</td>
                    </tr>
                ) : (
                    data.map((item, index) => (
                        <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>{item.time}</td>
                            <td>{item.date}</td>
                            <td>
                                <img src={item.image} alt="Uploaded" style={{ width: '100px' }} />
                            </td>
                            <td>
                                <div>
                                    <button type="button" className="btn btn-success">
                                        <Link to={`/edit/${item.id}`} className="link-edit">Edit</Link>
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} type="button" className="btn btn-danger">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
</div>

    // <>
    //   <div className='container-data'>
    //     <div className='data-box'>
    //       <div className='data-list'>
    //     <h2>Data List</h2>
    //     <button type="button" className="btn btn-primary">
    //       <Link to="/Form" className="link-addItem">Add Item</Link>
    //     </button>
    //     </div>
    //   <table className="table table-striped table-bordered">
    //     <thead>
    //       <tr>
    //         <th scope="col" className="table-info">S.N</th>
    //         <th scope="col" className="table-info">Title</th>
    //         <th scope="col" className="table-info" id='description'>Description</th>
    //         <th scope="col" className="table-info">Time</th>
    //         <th scope="col" className="table-info">Date</th>
    //         <th scope="col" className="table-info">Image</th>
    //         <th scope="col" className="table-info">Action</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {data.length === 0 ? (
    //         <tr>
    //           <td colSpan="7">No data available</td>
    //         </tr>
    //       ) : (
    //         data.map((item, index) => (
    //           <tr key={item.id}>
    //             <th scope="row">{index + 1}</th>
    //             <td>{item.title}</td>
    //             <td>{item.description}</td>
    //             <td>{item.time}</td>
    //             <td>{item.date}</td>
    //             <td>
    //               <img src={item.image} alt="Uploaded" style={{ width: '100px' }} />
    //             </td>
    //             <td>
    //               <div>
    //                 <button type="button" className="btn btn-success">
    //                   <Link to={`/edit/${item.id}`} className="link-edit">Edit</Link>
    //                 </button>
    //                 <button onClick={() => handleDelete(item.id)} type="button" className="btn btn-danger">Delete</button>
    //               </div>
    //             </td>
    //           </tr>
    //         ))
    //       )}
    //     </tbody>
    //   </table>
    //   </div>
    //   </div>
    // </>
  );
};

export default DisplayPage;
