import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiMiniProgramFill } from 'react-icons/ri'
import { FaHourglassStart } from 'react-icons/fa'
import { FaHourglassEnd } from 'react-icons/fa'
import { AiFillDollarCircle } from 'react-icons/ai'
import { GiPirateCaptain } from 'react-icons/gi'

import {
  createActivity,
  updateActivity,
  loadActivitiesByProgramId,
} from '../../app/features/activity/activitySlice'
import { loadPrograms } from '../../app/features/programs/programsSlice'
import {
  CContainer,
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CPagination,
  CPaginationItem,
  CSpinner,
} from '@coreui/react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AddActivity from './AddActivity'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
const EventList = ({ events }) => {
  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const totalPages = Math.ceil(events.length / itemsPerPage)

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <>
      <CTable striped responsive className="text-center">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Activities</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentEvents.map((event, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{event.name}</CTableDataCell>
              <CTableDataCell>{new Date(event.startDate).toLocaleString()}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CPagination pages={totalPages} align="center">
        <CPaginationItem
          onClick={goToPreviousPage}
          disabled={currentPage <= 1}
          aria-label="Previous"
        >
          Previous
        </CPaginationItem>
        <CPaginationItem
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
          aria-label="Next"
        >
          Next
        </CPaginationItem>
      </CPagination>
    </>
  )
}

function Activities({ program, activities }) {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false)

  const handleAddActivity = (activityData) => {
    console.log('activityData', activityData)
    console.log('program id', program._id)
    const finalActivityData = {
      ...activityData,
      programId: program._id,
      createdBy: program.authorizedUsers[0],
    }
    console.log('finalActivityData', finalActivityData)
    dispatch(createActivity(finalActivityData)).then((activity) => {
      console.log('activity dispatch', activity)
      dispatch(loadPrograms())
    })
    setOpen(false)
  }
  if (!program) {
    return (
      <CContainer style={{ padding: '20px' }} className="mt-4">
        <CRow>
          <CCol xs="auto">
            <CSpinner color="primary" />
          </CCol>
        </CRow>
      </CContainer>
    )
  }
  const programInfo = [
    {
      icon: <RiMiniProgramFill />,
      name: 'Program Name',
      value: program.programTitle,
    },
    { icon: <FaHourglassStart />, name: 'Start Date', value: program.startDate },
    { icon: <FaHourglassEnd />, name: 'End Date', value: program.endDate },
    { icon: <AiFillDollarCircle />, name: 'Budget', value: program.budget },
    {
      icon: <GiPirateCaptain />,
      name: 'Program Lead',
      value: JSON.stringify(program.authorizedUsers).split('"')[1],
    },
  ]
  const handleDateClick = (activity) => {
    console.log('activity', activity)
    // Navigate to the activity details page without reloading the entire app
    navigate(`/Dash/Monitoring/${program.programTitle}/${activity.title}`)
  }
  return (
    <CContainer style={{ padding: '20px' }} className="mt-4">
      <AddActivity open={open} setOpen={setOpen} handleAddActivity={handleAddActivity} />
      <CRow className="mb-3">
        <CCol xs={12} md={8}>
          <CCard className="text-center mb-3">
            <CCardHeader className="bg-dark text-light">Activites Calendar</CCardHeader>
            <CCardBody>
              {' '}
              <FullCalendar
                plugins={[dayGridPlugin]}
                events={activities.map((activity) => ({
                  id: activity._id,
                  title: activity.name,
                  start: new Date(activity.startDate),
                  end: new Date(activity.endDate),
                  color: activity.color,
                  allDay: activity.allDay,
                }))}
                eventClick={(activity) => handleDateClick(activity.event._def)}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,dayGridWeek,dayGridDay',
                }}
                initialDate={new Date()}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={4}>
          <CCard>
            <CCardHeader style={{ textAlign: 'center' }} className="bg-dark text-light">
              Program Information
            </CCardHeader>
            <CCardBody style={{ padding: '50px 0px' }}>
              {/* <p>
                <strong>Program Name:</strong> {programInfo.programName}
              </p>
              <p>
                <strong>Start Date:</strong> {programInfo.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {programInfo.endDate}
              </p>
              <p>
                <strong>Budget:</strong> {programInfo.budget}
              </p>
              <p>
                <strong>Program Lead:</strong> {programInfo.programLead}
              </p> */}
              <CTable responsive="sm">
                <CTableBody>
                  {programInfo.map((detail, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell style={{ display: 'flex', alignItems: 'center' }}>
                        {detail.icon}
                        {detail.name}:
                      </CTableHeaderCell>
                      <CTableDataCell>{detail.value}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
            <div className="text-center mb-3">
              <CButton
                onClick={() => setOpen(true)}
                style={{ textAlign: 'center' }}
                color="primary"
              >
                Add Activity
              </CButton>
            </div>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className="text-center mb-3">
            <CCardHeader className="bg-dark text-light">Activities List</CCardHeader>
            <CCardBody>
              <EventList events={activities} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Activities
