import { BrowserRouter, Route, Routes } from "react-router"
import Body from "./components/body"
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Connections from "./components/Connections"
import Requests from "./components/Requests"

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes> {/* wrapper for different route */}
          <Route path="/" element={<Body/>}> {/* add whatever element we have to render  */}
            <Route path="/" element={<Feed/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/connections" element={<Connections/>} />
            <Route path="/requests" element={<Requests/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
