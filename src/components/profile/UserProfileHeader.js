import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CAvatar, CButton } from '@coreui/react'
import { cibBehance, cibLinkedinIn, cibStackoverflow, cilPen, cilStar } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import './profile.css'
import Modal from './PhotoModal'
import EditProfileModal from './EditModal'
import axiosInstance from '../../axiosInstance'

import { useDispatch, useSelector } from 'react-redux'
const UserProfileHeader = () => {
  const user = useSelector((state) => state.userData.userData)
  const [visible, setVisible] = useState(false)
  const [image, setImage] = useState(null)
  const [open, setOpen] = useState(false)
  const [updateLog, setUpdateLog] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const updateUserLogs = async () => {
      try {
        const updatedLogs = [
          ...user.logs, // Existing logs from user
          ...updateLog, // New logs to append
        ]

        const response = await axiosInstance.put(`/users/${user._id}`, {
          logs: updatedLogs,
        })

        if (response.data) {
          console.log('Logs Updated')
          setUpdateLog([])
        } else {
          console.log('Error in updating Logs')
        }
      } catch (error) {
        console.error('Error updating Logs:', error)
      }
    }

    if (updateLog.length > 0) {
      updateUserLogs()
    }
  }, [updateLog, user, dispatch])
  const handleConfirmPhoto = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image) // Assuming image is a File object obtained from input[type=file]
      console.log('formData :', formData)
      const response = await axiosInstance.put(`/users/${user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 200) {
        console.log('User photo updated successfully:', response.data)
        const updatedUser = { ...user, image: response.data.image }
        const currentDate = new Date().toLocaleDateString()
        setUpdateLog((prevUpdateLog) => {
          const updatedLogs = [...prevUpdateLog]
          const existingLogIndex = updatedLogs.findIndex((log) => log.date === currentDate)
          if (existingLogIndex !== -1) {
            updatedLogs[existingLogIndex].events.push(
              `User update photo at ${new Date().toLocaleTimeString()}`,
            )
          } else {
            updatedLogs.push({
              date: currentDate,
              events: [`User update photo at ${new Date().toLocaleTimeString()}`],
            })
          }
          return updatedLogs
        })
      } else {
        console.error('Failed to update user photo:', response.statusText)
      }
    } catch (error) {
      console.error('Error updating user photo:', error.message)
    }
    setImage(null)
  }

  const handleVisible = () => {
    setVisible(true)
  }
  const calculateCompletionPercentage = () => {
    const fieldsToCheck = [
      'role',
      'department',
      'cin',
      'matricule',
      'phone',
      'adress',
      'birthday',
      'image',
    ]
    const completedFields = fieldsToCheck.filter((field) => {
      const value = user[field]
      return value !== undefined && value !== '' && value !== 'Undefined'
    })
    const completionPercentage = (completedFields.length / fieldsToCheck.length) * 100
    return completionPercentage.toFixed(2)
  }
  const completionPercentage = calculateCompletionPercentage()

  return (
    <>
      <Modal setImage={setImage} visible={visible} setVisible={setVisible} />
      <EditProfileModal
        user={user}
        setUpdateLog={setUpdateLog}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {/* <EditModal setOpen={setOpen} /> */}
      <CCard className="text-center mb-3">
        <CCardHeader className="bg-dark text-light">Profile Header</CCardHeader>
        <CCardBody>
          <div className="d-flex justify-content-center bg-gray">
            <CAvatar
              size="xl"
              status="success"
              src={image ? image : user.image ? user.image : null}
              className="mx-auto d-block mb-3"
            />
          </div>
          <div className="text-center mb-3">
            {image ? (
              <>
                {' '}
                <CButton color="primary" onClick={handleConfirmPhoto}>
                  Confirm
                </CButton>
                <CButton
                  style={{ marginLeft: '10px' }}
                  color="danger"
                  onClick={() => setImage(null)}
                >
                  Cancel
                </CButton>
              </>
            ) : (
              <CButton color="primary" onClick={handleVisible}>
                Upload
              </CButton>
            )}
          </div>
          <h4>{user.username}</h4>
          <div className="text-center">
            <CIcon icon={cilStar} /> <strong>{user.exp} points</strong>
          </div>
          <div className="progress" style={{ width: '40%', margin: '20px auto' }}>
            <div
              className="progress-bar progress-bar-success progress-bar-striped"
              role="progressbar"
              aria-valuenow={completionPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${completionPercentage}%` }} // Dynamically set width based on completionPercentage
            >
              {`${completionPercentage}% Complete`}
            </div>
          </div>
          <div className="m-4 text-center">
            <p className="mx-5">{user.bio}</p>
          </div>

          <div className="d-flex justify-content-center mb-3 profile-links">
            <a href={user.linkedIn} target="_blank" rel="noopener noreferrer" className="me-3">
              <CIcon icon={cibLinkedinIn} /> {user.linkedIn}
            </a>
            <a href={user.behance} target="_blank" rel="noopener noreferrer" className="me-3">
              <CIcon icon={cibBehance} /> {user.behance}
            </a>
          </div>
          <div className="container mt-5">
            <button
              onClick={() => setIsOpen(true)}
              id="editButton"
              className="btn btn-success"
              data-toggle="tooltip"
              title="Edit"
            >
              <CIcon icon={cilPen} />
            </button>
          </div>
        </CCardBody>
      </CCard>
    </>
  )
}

export default UserProfileHeader
