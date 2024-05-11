import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loadActivitiesByProgramId } from '../../app/features/activity/activitySlice'
import Activities from '../../components/ProgramMonitoring/Activities'
import TaskManagement from '../../components/ProgramMonitoring/TaskManagment'
import { addRoutes } from '../../app/features/routeSlice/routeSlice'
const ProgramWithActivities = ({ program }) => {
  console.log('ProgramWithActivities rendered')
  const dispatch = useDispatch()
  const activities = useSelector((state) => state.activity.activitiesByProgramId || [])

  useEffect(() => {
    dispatch(loadActivitiesByProgramId(program._id)).then((result) => {
      if (result?.payload) {
        dispatch(
          addRoutes(
            result.payload.map((activity) => ({
              path: `/Monitoring/${encodeURIComponent(program.programTitle)}/${encodeURIComponent(activity.name)}`,
              name: activity.name,
              activityId: activity._id,
            })),
          ),
        )
      }
    })
  }, [dispatch, program._id, program.programTitle])

  return (
    <Routes>
      <Route path={`/`} element={<Activities activities={activities} program={program} />} />
      {activities.map((activity) => (
        <Route
          key={activity._id}
          path={`${activity.name}`}
          element={<TaskManagement key={activity._id} activity={activity} />}
        />
      ))}
    </Routes>
  )
}

export default ProgramWithActivities
