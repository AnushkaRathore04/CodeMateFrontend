import { BrowserRouter, Route, Routes } from "react-router"
import Body from "./body"
import Login from "./Login"
import Profile from "./Profile"

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes> {/* wrapper for different route */}
          <Route path="/" element={<Body/>}> {/* add whatever element we have to render  */}
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
