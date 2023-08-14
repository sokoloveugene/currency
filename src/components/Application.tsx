import React, { useEffect, useState } from 'react';

const Application: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [darkTheme, setDarkTheme] = useState(true);

  /**
   * On component mount
   */
  useEffect(() => {
    const useDarkTheme = parseInt(localStorage.getItem('dark-mode'));
    if (isNaN(useDarkTheme)) {
      setDarkTheme(true);
    } else if (useDarkTheme == 1) {
      setDarkTheme(true);
    } else if (useDarkTheme == 0) {
      setDarkTheme(false);
    }
  }, []);

  /**
   * On Dark theme change
   */
  useEffect(() => {
    if (darkTheme) {
      localStorage.setItem('dark-mode', '1');
      document.body.classList.add('dark-mode');
    } else {
      localStorage.setItem('dark-mode', '0');
      document.body.classList.remove('dark-mode');
    }
  }, [darkTheme]);

  /**
   * Toggle Theme
   */
  function toggleTheme() {
    setDarkTheme(!darkTheme);
  }

  return (
    <div id="erwt">
      <div className="header">
        <div className="main-heading">
          <h1 className="themed">React Webpack Typescript</h1>
        </div>
        <div className="main-teaser">
          <div>
            Robustqqqqqwww boilerplate for Desktop Applications with Electron and ReactJS.
            Hot Reloading is used in this project for fast development experience.
            <br />
            If you think the project is useful enough, just spread the word around!
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="center">
          <button
            onClick={() => {
              if (counter > 99) return alert('Going too high!!');
              setCounter(counter + 1);
            }}
          >
            Increment {counter != 0 ? counter : ''} <span>{counter}</span>
          </button>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <button
            onClick={() => {
              if (counter == 0) return alert('Oops.. thats not possible!');
              setCounter(counter > 0 ? counter - 1 : 0);
            }}
          >
            Decrement <span>{counter}</span>
          </button>
          &nbsp;&nbsp; &nbsp;&nbsp;
          <button onClick={toggleTheme}>
            {darkTheme ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Application;
