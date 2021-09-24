import React, {useState} from 'react';
import './App.css';
import CalculatorBase from "./Views/CalculatorBase/CalculatorBase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const handleThemeButtonClicked = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={darkMode ? 'App darkThemeApp' : 'App'}>
            <div className="themeContainer">
                <button className={darkMode ? 'themeButton darkThemeButton' : 'themeButton'}
                        onClick={handleThemeButtonClicked}>
                    <FontAwesomeIcon icon={darkMode ? faSun : faMoon}/>
                </button>
            </div>
            <CalculatorBase
                themeColor={darkMode}
            />
        </div>
    );
}

export default App;
