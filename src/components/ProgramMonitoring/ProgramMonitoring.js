import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import ProgramWithActivities from './ProgramWithActivities'

const ProgramMonitoring = () => {
  const programs = useSelector((state) => state.programsSlice.programs)
  return (
    <Routes>
      {programs.map((program) => (
        <Route
          key={program._id}
          name={program.programTitle}
          path={`/${program.programTitle}/*`}
          element={<ProgramWithActivities program={program} />}
        />
      ))}
    </Routes>
  )
}

export default ProgramMonitoring
