import Home from './components/home/Home'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

const router = createHashRouter([
  {
    path: '/',
    element: (
      <>
        <Home />
      </>
    )
  },
  {
    path: '/login',
    element: (
      <>
        <Login />
      </>
    )
  },
  {
    path: '/register',
    element: (
      <>
        <Register />
      </>
    )
  }
])
//pallete: https://coolors.co/palette/0081a7-00afb9-fdfcdc-fed9b7-f07167
function App(): JSX.Element {
  return (
    <>
      <div>123</div>
      <RouterProvider router={router} />
    </>
  )
}

export default App
