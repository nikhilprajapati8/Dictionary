import Header from "./Header/Header"
import MainComp from "./Main/MainComp"
import { useState } from "react"


const App = () => {


  const [mode, setMode] = useState(false)

  const handleClick = () => {
    setMode(!mode);
    if (mode) {
      document.body.style.setProperty("--black-secondary", "#393941");
      document.body.style.backgroundColor = ("#ffff")
    } else {
      document.body.style.setProperty("--black-secondary", "#ffff");
      document.body.style.backgroundColor = ("#393941")
    }
  }

  return (
    <div>
      <Header handleClick={handleClick} mode={mode} />
      <MainComp />
    </div>

  )
}

export default App