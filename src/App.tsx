import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { TodoList } from './components/TodoList'
import { Register } from './components/Register'
import { ErrorPage } from './components/ErrorPage'

function App() {
  return (
      <Router>
				<Routes>
					<Route path='/' element={<TodoList />} />
					<Route path='/register' element={<Register />} />
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</Router>
  )
}

export default App
