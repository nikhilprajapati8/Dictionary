import "./header.css"
import logo from "../assets/logo.svg"



// eslint-disable-next-line react/prop-types
const Header = ({ handleClick, mode }) => {

    return (
        <header >

            <nav >
                <div className="logo-left"><img src={logo} alt="logo" /></div>

                <div className="right">

                    <div className="dark-light-mode">
                        <div>
                            <input type="checkbox" className="checkbox" id="checkbox" />
                            <label onClick={handleClick} htmlFor="checkbox" className={`checkbox-label ${mode === true ? "dark" : ""}`}>
                                <i className="fas fa-moon"></i>
                                <i className="fas fa-sun"></i>
                                <span className="ball"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </nav>


        </header>
    )
}

export default Header