 
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import Viewpastes from './components/Viewpastes';
import Home from './components/Home';
import { Provider } from 'react-redux';
import Paste from './components/Paste';


const router= createBrowserRouter(

[
  {
   path: "/",
   element:
   <div>
    <Navbar />
    <Home />

   </div>
  },
  {
   path: "/pastes",
   element:
   <div>
    <Navbar />
    <Paste />
       </div>
  },
  {
   path: "/pastes/:id",
   element:
   <div>
    <Navbar />
   <Viewpastes />
   </div>
  },
]
);




function App() {
   

  return (
    <>
      <div className='flex justify-center'>
      <RouterProvider router={router} />
      </div>
       
    </>
  )
}

export default App
