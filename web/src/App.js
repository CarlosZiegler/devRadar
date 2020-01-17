import React from 'react';

import './Global.css'
import './App.css'



function App() {
  
  return (
      <div id="app">
        <aside>
        <strong>Cadastrar</strong>
        <form action="">
          <div className="input-block">
          <label htmlFor="github_username">Usuario do Github</label>
          <input name="github_username" id="git" required />
          </div>

          <div className="input-block">
          <label htmlFor="techs">Technologies</label>
          <input name="techs" id="techs" required />
          </div>

          <div className="input-block">
          <label htmlFor="github_username"></label>
          <input name="github_username" id="git" required />
          </div>

        </form>
        </aside>
        <main>

        </main>
      </div>
  );
}

export default App;
