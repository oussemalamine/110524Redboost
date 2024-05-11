import React, { Suspense, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import axiosInstance from './axiosInstance'
import ResetPassword from './components/ResetPassword'
// import { setUserData } from './app/features/userData/userData'
import { setEvents } from './app/features/events/events'
// import ProtectedRoute from './ProtectedRoute'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  // const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [isLogged, setIsLogged] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const checkAuth = async () => {
      await axiosInstance.get('/login').then((response) => {
        if (response.data.authenticated) {
          // setUserEmail(response.data.email)
          setIsLogged(true)
        } else {
          setIsLogged(false)
        }
        setLoading(false)
        console.log('checkAuth:', response.data)
      })
    }
    checkAuth()
  }, [])
  // useEffect(() => {
  //   if (userEmail.length === 0) return
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axiosInstance.get(`/users?email=${userEmail}`)
  //       if (response.data) {
  //         const { password, confirmation, ...userDataWithoutPassword } = response.data
  //         dispatch(setUserData(userDataWithoutPassword))
  //       }
  //     } catch (error) {
  //       console.log('Error fetching user data:', error)
  //     }
  //   }
  //   fetchUser()
  // }, [userEmail])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/events')
        if (response.data) {
          dispatch(setEvents(response.data))
        }
      } catch (error) {
        console.log('Failed to fetch events ;', error)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      ></Suspense>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="pt-3 text-center">
          <CSpinner color="primary" variant="grow" />
        </div>
      }
    >
      <Routes>
        <Route
          exact
          path="/"
          name="Login Page"
          element={<Login setIsLogged={setIsLogged} isLogged={isLogged} />}
        />
        <Route exact path="/register" name="Register Page" element={<Register />} />
        <Route exact path="/*" name="Page 404" element={<Page404 />} />
        <Route exact path="/500" name="Page 500" element={<Page500 />} />
        <Route exact path="/password-reset" name=" Account Recovery" element={<ResetPassword />} />
        <Route
          path="/Dash/*"
          element={isLogged ? <DefaultLayout setIsLogged={setIsLogged} /> : <Navigate to="/" />}
        />
      </Routes>
    </Suspense>
  )
}

export default App
