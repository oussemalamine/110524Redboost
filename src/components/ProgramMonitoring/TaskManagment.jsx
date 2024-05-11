import {
  CCard,
  CCol,
  CContainer,
  CRow,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CButton,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { HiMagnifyingGlassCircle } from 'react-icons/hi2'
import React, { useState } from 'react'
import { CChart } from '@coreui/react-chartjs'
import { FaCircle, FaCirclePlus } from 'react-icons/fa6'
import CIcon from '@coreui/icons-react'
import { cilCalendar } from '@coreui/icons'
import EditTask from './EditTask'
import TaskView from './TaskView'

function TaskManagment({ activity }) {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedTask, setSelectedtask] = useState(null)
  const [tasks, setTasks] = useState(activity.tasks)

  const itemsPerPage = 4
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTasks = tasks.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const totalPages = Math.ceil(tasks.length / itemsPerPage)

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
  const getPriorityColor = (priority) => {
    if (priority === 'Low') {
      return 'text-success' // Green color for low priority
    } else if (priority === 'Medium') {
      return 'text-warning' // Yellow color for medium priority
    } else if (priority === 'High') {
      return 'text-danger' // Red color for high priority
    } else {
      return '' // Default color (if priority is not recognized)
    }
  }

  const addTask = (type) => {
    const newTask = {
      title: `Task-${tasks.length}`,
      description: 'New Card',
      priority: 'Low',
      status: type,
      date: new Date().toISOString(), // Convert date to ISO string
      uploadFiles: [],
    }

    setTasks([newTask, ...tasks])
  }
  const getDoneTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'Done') {
        nb++
      }
    })
    return nb
  }
  const getProgressTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'In Progress') {
        nb++
      }
    })
    return nb
  }
  const getToDoTasks = () => {
    let nb = 0
    tasks.map((task) => {
      if (task.status === 'To Do') {
        nb++
      }
    })
    return nb
  }
  const handleModalVisibility = (task) => {
    setSelectedtask(task)
    setVisible(true)
  }
  const handleOpen = (task) => {
    setSelectedtask(task)
    setOpen(true)
  }

  return (
    <CContainer style={{ padding: '20px' }} className="mt-4">
      {selectedTask && (
        <EditTask
          visible={visible}
          setVisible={setVisible}
          selectedTask={selectedTask}
          setSelectedtask={setSelectedtask}
        />
      )}
      {selectedTask && <TaskView open={open} setOpen={setOpen} selectedTask={selectedTask} />}

      <CRow className="mb-3">
        <CCol xs={12} md={4}>
          <CCard className="mb-3" style={{ height: '400px' }}>
            <CCardHeader
              style={{
                display: 'flex',
                backgroundColor: '#1ca1c1',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              className="text-light"
            >
              To Do <FaCirclePlus onClick={() => addTask('To Do')} />
            </CCardHeader>
            <CCardBody style={{ overflow: 'auto' }}>
              {tasks.map((task, index) => {
                if (task.status === 'To Do') {
                  return (
                    <div className="container">
                      <div
                        onClick={() => handleModalVisibility(task)}
                        key={index}
                        className="card border border-danger shadow mb-3"
                        style={{ maxWidth: '400px' }}
                      >
                        <div className="card-header">
                          <strong>{task.title}</strong>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title text-danger">{task.description}</h5>
                          <p className={`card-text ${getPriorityColor(task.priority)}`}>
                            <span className="text-dark">Priority:</span> {task.priority}
                          </p>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="text-muted">
                              <CIcon icon={cilCalendar} className="mr-1" />
                              {task.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              })}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={4}>
          <CCard className=" mb-3" style={{ height: '400px' }}>
            <CCardHeader
              className="text-light"
              style={{
                backgroundColor: '#1ca1c1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              IN PRPGRESS
              <FaCirclePlus onClick={() => addTask('In Progress')} />
            </CCardHeader>
            <CCardBody style={{ overflow: 'auto' }}>
              {tasks.map((task, index) => {
                if (task.status === 'In Progress') {
                  return (
                    <div className="container">
                      <div
                        onClick={() => handleModalVisibility(task)}
                        key={index}
                        className="card border border-warning shadow mb-3"
                        style={{ maxWidth: '400px' }}
                      >
                        <div className="card-header">
                          <strong>{task.title}</strong>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title text-warning">{task.description}</h5>
                          <p className={`card-text ${getPriorityColor(task.priority)}`}>
                            <span className="text-dark">Priority:</span> {task.priority}
                          </p>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="text-muted">
                              <CIcon icon={cilCalendar} className="mr-1" />
                              {task.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              })}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={12} md={4}>
          <CCard className="mb-3" style={{ height: '400px' }}>
            <CCardHeader
              className="text-light"
              style={{
                backgroundColor: '#1ca1c1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              DONE
              <FaCirclePlus onClick={() => addTask('Done')} />
            </CCardHeader>
            <CCardBody style={{ overflow: 'auto' }}>
              {tasks.map((task, index) => {
                if (task.status === 'Done') {
                  return (
                    <div className="container">
                      <div
                        onClick={() => handleModalVisibility(task)}
                        key={index}
                        className="card border border-success shadow mb-3"
                        style={{ maxWidth: '400px' }}
                      >
                        <div className="card-header">
                          <strong>{task.title}</strong>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title text-success">{task.description}</h5>
                          <p className={`card-text ${getPriorityColor(task.priority)}`}>
                            <span className="text-dark">Priority:</span> {task.priority}
                          </p>
                          <div className="d-flex justify-content-between align-items-center mt-3">
                            <div className="text-muted">
                              <CIcon icon={cilCalendar} className="mr-1" />
                              {task.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              })}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard className="mb-3">
            <CCardHeader className="bg-dark text-light">Recent Tasks</CCardHeader>
            <CCardBody>
              <CTable striped responsive className="text-center">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Release Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Task</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col">View</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentTasks.map((task, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>{task.date}</CTableDataCell>
                      <CTableDataCell>{task.title}</CTableDataCell>
                      <CTableDataCell>
                        {task.status === 'To Do' ? (
                          <span className="badge text-bg-danger">{task.status}</span>
                        ) : task.status === 'In Progress' ? (
                          <span className="badge text-bg-warning">{task.status}</span>
                        ) : task.status === 'Done' ? (
                          <span className="badge text-bg-success">{task.status}</span>
                        ) : null}
                      </CTableDataCell>
                      <CTableDataCell>
                        <HiMagnifyingGlassCircle
                          style={{ fontSize: '25px', color: '#4CAF50' }}
                          onClick={() => handleOpen(task)}
                        />
                      </CTableDataCell>
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
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard className="mb-3">
            <CCardHeader className="bg-dark text-light">Task Progress</CCardHeader>
            <CCardBody>
              <CChart
                type="bar"
                data={{
                  labels: ['Total Tasks', 'To Do', 'In Progress', 'Done'],
                  datasets: [
                    {
                      label: 'Task Progress',
                      backgroundColor: ['#1ca1c1', '#8664c6', '#fcbf1e', '#5ac18e'],
                      data: [tasks.length, getToDoTasks(), getProgressTasks(), getDoneTasks()],
                    },
                  ],
                }}
                labels="Stauts"
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: '#adb7c5',
                      },
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        color: '#adb7c5',
                      },
                      ticks: {
                        color: '#adb7c5',
                      },
                    },
                    y: {
                      grid: {
                        color: '#adb7c5',
                      },
                      ticks: {
                        color: '#adb7c5',
                      },
                    },
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default TaskManagment
