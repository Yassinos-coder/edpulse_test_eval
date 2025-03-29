import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './Components/MainPage/MainPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
