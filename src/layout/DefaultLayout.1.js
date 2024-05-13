import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components'
import axiosInstance from '../axiosInstance'
import ExpiryModal from './ExpiryModal'
import { useDispatch } from 'react-redux'
import { loadPrograms } from '../app/features/programs/programsSlice'
import { loadUsers } from '../app/features/users/usersSlice'
import { loadUserData } from '../app/features/userData/userData'
import { loadTasks } from '../app/features/task/taskSlice'
import { CProgress } from '@coreui/react'

const AUTH_PROGRESS = 33
const USER_DATA_PROGRESS = 66
const ALL_DATA_LOADED_PROGRESS = 100

export const DefaultLayout = ({ setIsLogged, isLogged}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
useEffect (() => {
  console.log("islogged: ", isLogged);


}, [isLogged, setIsLogged]
)
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axiosInstance.get('/login')
        if (response.data.authenticated) {
          setProgress(AUTH_PROGRESS)
          await dispatch(loadUserData(response.data.email))
          setProgress(USER_DATA_PROGRESS)
          await Promise.all([dispatch(loadPrograms()), dispatch(loadUsers())])
          setProgress(ALL_DATA_LOADED_PROGRESS)
          setLoading(false)
        } else {
          setLoading(false)
        }
      } catch (error) {
        setError('An error occurred while loading data.')
        setLoading(false)
      }
    }

    loadData()
  }, [dispatch])

  if (loading) {
    return (
      <div className="progress-wrapper">
        <CProgress value={progress} color="success" variant="striped" animated>
          {progress}%
        </CProgress>
        {error && <p className="text-danger">{error}</p>}
      </div>
    )
  }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader setIsLogged={setIsLogged} />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      <ExpiryModal setIsLogged={setIsLogged} setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </div>
  )
}
