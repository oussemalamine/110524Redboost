import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormTextarea,
  CFormSelect,
} from '@coreui/react'
import Uploader from './Uploader'

function EditTask({ visible, setVisible, selectedTask, setSelectedtask }) {
  return (
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="LiveDemoExampleLabel"
      backdrop="static"
    >
      <CModalHeader closeButton>
        <CModalTitle id="LiveDemoExampleLabel">Edit Card</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ height: '450px', overflow: 'auto' }} className="modal-body">
        <div className="mb-3">
          <CFormInput
            type="text"
            id="taskTitle"
            placeholder="Task Title"
            aria-describedby="taskTitleHelpInline"
            value={selectedTask.title}
          />
        </div>
        <div className="mb-3">
          <CFormTextarea
            id="taskDescription"
            placeholder="Description"
            rows={3}
            value={selectedTask.description}
          />
        </div>
        <div className="mb-3">
          <CFormSelect value={selectedTask.priority} id="taskPriority" name="taskPriority">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </CFormSelect>
        </div>
        <div className="mb-3">
          <CFormInput type="date" id="taskDate" placeholder="Task Date" value={selectedTask.date} />
        </div>
        <div className="mb-3">
          <h5>Attachments</h5>
          <Uploader selectedTask={selectedTask} setSelectedtask={setSelectedtask} />
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger">Remove</CButton>
        <CButton color="primary">Save</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default EditTask
