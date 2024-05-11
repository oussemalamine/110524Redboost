import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import { loadEntrepreneurs } from '../../app/features/entrepreneursData/entrepreneursSlice';

import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CInputGroup,
  CInputGroupText,
  CFormTextarea,
  CFormLabel,
} from '@coreui/react';

const CreateStartup = () => {
  const initialStartupData = {
    name: '',
    description: '',
    region: '',
    created: 'no',
    dateOfCreation: '',
    legalForm: '',
    logo: null,
    coFounders: [],
  };
  const [startupData, setStartupData] = useState(initialStartupData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const entrepreneurs = useSelector((state) => state.entrepreneurs.list);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntrepreneurs, setSelectedEntrepreneurs] = useState([]);
  const [filteredEntrepreneurs, setFilteredEntrepreneurs] = useState([]);

  useEffect(() => {
    dispatch(loadEntrepreneurs());
  }, [dispatch]);

  const handleSelectEntrepreneur = (entrepreneur) => {
    setSelectedEntrepreneurs([...selectedEntrepreneurs, entrepreneur]);
    const updatedFilteredEntrepreneurs = filteredEntrepreneurs.filter((e) => e.id !== entrepreneur.id);
    setFilteredEntrepreneurs(updatedFilteredEntrepreneurs);
    setStartupData({ ...startupData, coFounders: [...startupData.coFounders, entrepreneur] });
  };

  const handleRemoveEntrepreneur = (entrepreneur) => {
    setSelectedEntrepreneurs(selectedEntrepreneurs.filter((e) => e.id !== entrepreneur.id));
    const updatedFilteredEntrepreneurs = [...filteredEntrepreneurs, entrepreneur];
    setFilteredEntrepreneurs(updatedFilteredEntrepreneurs);
    setStartupData({ ...startupData, coFounders: startupData.coFounders.filter((e) => e.id !== entrepreneur.id) });
  };

  const handleSearchCoFounder = async (query) => {
    // Implement search logic to fetch co-founders based on the query
    const filteredAvailableEntrepreneurs = entrepreneurs.filter((entrepreneur) =>
      entrepreneur.name.toLowerCase().includes(query.toLowerCase()) &&
      !selectedEntrepreneurs.some((selected) => selected.id === entrepreneur.id)
    );
    setSearchQuery(query);
    setFilteredEntrepreneurs(filteredAvailableEntrepreneurs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('/createstartup', startupData);
      alert('Startup created successfully');
      setStartupData(initialStartupData); // Reset form using initial state
    } catch (error) {
      console.error(error);
      alert('Failed to create startup');
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStartupData({ ...startupData, [name]: value });
  };

  return (
    <CContainer className="my-4">
      <CCard>
        <CCardHeader className="bg-dark text-light">Create New Startup</CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              type="text"
              name="name"
              value={startupData.name}
              onChange={handleInputChange}
              placeholder="Startup Name"
              required
              className="mb-3"
            />
            <CFormTextarea
              type="text"
              name="description"
              value={startupData.description}
              onChange={handleInputChange}
              placeholder="Description"
              required
              className="mb-3"
              rows={3}
            />
            <CFormInput
              type="text"
              name="region"
              value={startupData.region}
              onChange={handleInputChange}
              placeholder="Region"
              required
              className="mb-3"
            />
            <CFormSelect
              name="created"
              value={startupData.created}
              onChange={handleInputChange}
              required
              className="mb-3"
            >
              <option value="">Is Created?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </CFormSelect>
            {startupData.created === 'yes' && (
              <div>
                <CFormLabel>Date Of Creation</CFormLabel>
                <CFormInput
                  type="date"
                  name="dateOfCreation"
                  value={startupData.dateOfCreation}
                  onChange={handleInputChange}
                  placeholder="Date of Creation"
                  required
                  className="mb-3"
                />
              </div>
            )}
            <CFormInput
              type="text"
              name="legalForm"
              value={startupData.legalForm}
              onChange={handleInputChange}
              placeholder="Legal Form"
              required
              className="mb-3"
            />
            <CInputGroup className="mb-3">
              <CFormInput
                type="text"
                placeholder="Search Co-Founders"
                value={searchQuery}
                onChange={(e) => handleSearchCoFounder(e.target.value)}
              />
              <CInputGroupText className="border-start-0">
                {/* Add your search icon here */}
              </CInputGroupText>
            </CInputGroup>
            {filteredEntrepreneurs.map((entrepreneur) => (
              <div
                key={entrepreneur.id}
                onClick={() => handleSelectEntrepreneur(entrepreneur)}
                style={{ cursor: 'pointer', marginBottom: '5px' }}
              >
                {entrepreneur.name}
              </div>
            ))}
            <h5>Selected Co-Founders:</h5>
            {selectedEntrepreneurs.map((entrepreneur) => (
              <div key={entrepreneur.id}>
                {entrepreneur.name}
                <span
                  style={{ cursor: 'pointer', marginLeft: '5px' }}
                  onClick={() => handleRemoveEntrepreneur(entrepreneur)}
                >
                  Remove
                </span>
              </div>
            ))}
            <CButton type="submit" color="primary" className="mt-3">
              Create Startup
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default CreateStartup;

