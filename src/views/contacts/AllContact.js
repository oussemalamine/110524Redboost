import React from 'react';
import { FaUser } from 'react-icons/fa'; // Import the person icon
import { Link } from 'react-router-dom'; // Import Link from React Router
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CWidgetStatsC,
  CCol,
  CRow,
  CButton
} from '@coreui/react';

const AllContacts = () => {

  return (
    <CContainer className="my-4">
      <CCard>
        <CCardHeader className="bg-dark text-light">All Contacts</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs={3}>
              <Link to="Dash/EntrepConacts"> {/* Link to the contacts page */}
                <CWidgetStatsC
                  className="mb-3"
                  icon={<FaUser style={{ marginRight: '5px' }} />}
                  progress={{ color: 'success', value: 75 }}
                  text="Widget helper text"
                  title="Widget title"
                  value="89.9%"
                />
              </Link>
            </CCol>


          </CRow>

        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default AllContacts;
