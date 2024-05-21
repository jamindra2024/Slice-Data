// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addFormData, updateFormData } from '../../app/formDataSlice';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
// import * as Yup from 'yup';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './Form.css';

// const FormPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const formDataList = useSelector((state) => state.formData);
//   const existingData = formDataList.find((data) => data.id === id);

//   const [errors, setErrors] = useState({});
//   const validationSchema = Yup.object().shape({
//     title: Yup.string()
//       .required('Title is required')
//       .min(3, 'Title must be at least 3 characters long')
//       .max(50, 'Title must be less than 50 characters'),
//     description: Yup.string()
//       .required('Description is required')
//       .min(10, 'Description must be at least 10 characters long')
//       .max(300, 'Description must be less than 300 characters'),
//     image: Yup.mixed()
//       .required('Image is required')
//       .test('fileSize', 'Image size must be less than 2MB', value => !value || (value && value.size <= 2097152))
//       .test('fileFormat', 'Unsupported Format', value => !value || (value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))),
//     time: Yup.string()
//       .required('Time is required')
//       .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format'),
//     date: Yup.date()
//       .required('Date is required')
//       .min(new Date(), 'Date must be in the future')
//   });
  
//   const [formData, setFormDataState] = useState({
//     time: existingData ? existingData.time : '',
//     title: existingData ? existingData.title : '',
//     description: existingData ? existingData.description : '',
//     date: existingData ? existingData.date : '',
//     image: existingData ? existingData.image : null,
//   });

//   const handleChange = async (e) => {
//     const { name, value, files } = e.target;
//     const newFormData = {
//       ...formData,
//       [name]: files ? files[0] : value,
//     };

//     setFormDataState(newFormData);

//     try {
//       await validationSchema.validateAt(name, newFormData);
//       setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
//     } catch (validationError) {
//       setErrors((prevErrors) => ({ ...prevErrors, [name]: validationError.message }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await validationSchema.validate(formData, { abortEarly: false });

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const dataToStore = {
//           id: existingData ? existingData.id : uuidv4(),
//           title: formData.title,
//           description: formData.description,
//           date: formData.date,
//           time: formData.time,
//           image: reader.result,
//         };

//         if (existingData) {
//           dispatch(updateFormData(dataToStore));
//         } else {
//           dispatch(addFormData(dataToStore));
//         }
// alert('file sumit successfully');
//         navigate('/');
//       };

//       if (formData.image) {
//         reader.readAsDataURL(formData.image);
//       }
//     } catch (validationError) {
//       const validationErrors = {};
//       validationError.inner.forEach((err) => {
//         validationErrors[err.path] = err.message;
//       });
//       setErrors(validationErrors);
//     }
//   };

//   return (
//     <div className='container'>
//       <div className='form-container'>
//         <form onSubmit={handleSubmit}>
//           <h1 style={{ textAlign: "center" }}>Add Data</h1>
//           <div className="mb-3">
//             <label htmlFor="title" className="form-label">Title</label>
//             <input
//               type="text"
//               className="form-control"
//               id="exampleInputtitle"
//               placeholder='Enter title'
//               name='title'
//               value={formData.title}
//               onChange={handleChange}
//             />
//             {errors.title && <div className="text-danger">{errors.title}</div>}
//           </div>
//           <div className="mb-3">
//             <label htmlFor="description" className="form-label">Description</label>
//             <textarea
//               className="form-control"
//               id="exampleInputdescription"
//               placeholder='Write something here...'
//               name='description'
//               value={formData.description}
//               onChange={handleChange}
//             />
//             {errors.description && <div className="text-danger">{errors.description}</div>}
//           </div>
//           <div className="mb-3">
//             <label htmlFor="image" className="form-label">Image</label>
//             <input
//               type="file"
//               className="form-control"
//               id="exampleInputfile"
//               name="image"
//               accept="image/*"
//               onChange={handleChange}
//             />
//             {errors.image && <div className="text-danger">{errors.image}</div>}
//           </div>
//           <div className="mb-3">
//             <label htmlFor="time" className="form-label">Time</label>
//             <input
//               type="time"
//               className="form-control"
//               id="exampleInputtime"
//               name='time'
//               value={formData.time}
//               onChange={handleChange}
//             />
//             {errors.time && <div className="text-danger">{errors.time}</div>}
//           </div>
//           <div className="mb-3">
//             <label htmlFor="date" className="form-label">Date:</label>
//             <input
//               type="date"
//               className="form-control"
//               id="exampleInputdate"
//               name='date'
//               value={formData.date}
//               onChange={handleChange}
//             />
//             {errors.date && <div className="text-danger">{errors.date}</div>}
//           </div>
//           <button type="button" className="btn btn-secondary"><Link to='/' className='link-back'>Back</Link></button>
//           <button type="submit" className="btn btn-primary">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FormPage;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFormData } from '../../app/formDataSlice';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Form.css';

const FormPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(3, 'Title must be at least 3 characters long')
      .max(50, 'Title must be less than 50 characters'),
    description: Yup.string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters long')
      .max(300, 'Description must be less than 300 characters'),
    image: Yup.mixed()
      .required('Image is required')
      .test('fileSize', 'Image size must be less than 2MB', value => !value || (value && value.size <= 2097152))
      .test('fileFormat', 'Unsupported Format', value => !value || (value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))),
    time: Yup.string()
      .required('Time is required')
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format'),
    date: Yup.date()
      .required('Date is required')
      .min(new Date(), 'Date must be in the future')
  });

  const [formData, setFormDataState] = useState({
    time: '',
    title: '',
    description: '',
    date: '',
    image: null,
  });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    const newFormData = {
      ...formData,
      [name]: files ? files[0] : value,
    };

    setFormDataState(newFormData);

    try {
      await validationSchema.validateAt(name, newFormData);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    } catch (validationError) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: validationError.message }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataToStore = {
          id: uuidv4(),
          title: formData.title,
          description: formData.description,
          date: formData.date,
          time: formData.time,
          image: reader.result,
        };

        dispatch(addFormData(dataToStore));
        alert('File submitted successfully');
        navigate('/');
      };

      if (formData.image) {
        reader.readAsDataURL(formData.image);
      }
    } catch (validationError) {
      const validationErrors = {};
      validationError.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className='container'>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: "center" }}>Add Data</h1>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputtitle"
              placeholder='Enter title'
              name='title'
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <div className="text-danger">{errors.title}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="exampleInputdescription"
              placeholder='Write something here...'
              name='description'
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <div className="text-danger">{errors.description}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <input
              type="file"
              className="form-control"
              id="exampleInputfile"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
            {errors.image && <div className="text-danger">{errors.image}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="time" className="form-label">Time</label>
            <input
              type="time"
              className="form-control"
              id="exampleInputtime"
              name='time'
              value={formData.time}
              onChange={handleChange}
            />
            {errors.time && <div className="text-danger">{errors.time}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date:</label>
            <input
              type="date"
              className="form-control"
              id="exampleInputdate"
              name='date'
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && <div className="text-danger">{errors.date}</div>}
          </div>
          <button type="button" className="btn btn-secondary"><Link to='/' className='link-back'>Back</Link></button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
