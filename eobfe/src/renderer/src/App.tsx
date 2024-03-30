import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/home/Home'
import { RouterProvider, createHashRouter } from "react-router-dom"

const router = createHashRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
      </>
    ),
  },
])

function App(): JSX.Element {
  return (
    <>
    <div>123</div>
      <RouterProvider router={router} />
    </>
    
  )
}

export default App
