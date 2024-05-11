import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance.js'
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react';

const CreateContact = () => {
  const [contactData, setContactData] = useState({
    name: '',
    lastName: '',
    gender: '',
    age: '',
    phoneNumber: '',
    email: '',
    startupId: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/createntrepreneurs', contactData);
      alert('Contact created successfully');
      // Reset form
      setContactData({
        name: '',
        lastName: '',
        gender: '',
        age: '',
        phoneNumber: '',
        email: '',
        startupId: '',
      });
    } catch (error) {
      console.error(error);
      alert('Failed to create contact');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData({ ...contactData, [name]: value });
  };

  return (
    <CContainer className="my-4">
      <CCard>
        <CCardHeader className="bg-dark text-light">Create New Contact</CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              type="text"
              name="name"
              value={contactData.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
              style={{ marginBottom: '10px' }} // Add margin bottom
            />
            <CFormInput
              type="text"
              name="lastName"
              value={contactData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              required
              style={{ marginBottom: '10px' }} // Add margin bottom
            />
            <CFormSelect
              name="gender"
              value={contactData.gender}
              onChange={handleInputChange}
              required
              style={{ marginBottom: '10px' }} // Add margin bottom
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </CFormSelect>
            <CFormInput
              type="number"
              name="age"
              value={contactData.age}
              onChange={handleInputChange}
              placeholder="Age"
              required
              style={{ marginBottom: '10px' }} // Add margin bottom
            />
            <CFormInput
              type="tel"
              name="phoneNumber"
              value={contactData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              required
              style={{ marginBottom: '10px' }} // Add margin bottom
            />
            <CFormInput
              type="email"
              name="email"
              value={contactData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              required
              style={{ marginBottom: '10px' }} // Add margin bottom
            />
            <CFormInput
              type="text"
              name="startupId"
              value={contactData.startupId}
              onChange={handleInputChange}
              placeholder="Startup ID"
              style={{ marginBottom: '10px' }} // Add margin bottom
            />
            <CButton type="submit" color="primary" className="mt-3">
              Create Contact
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default CreateContact;
