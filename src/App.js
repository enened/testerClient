import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home.js'
import {Context} from "./context.js"
import Test from './test.js';

function App() {

  return (
    <Context.Provider>
      <Router>
        <Routes>
        
          <Route exact path="/" element={<Home />}/>
          <Route path="/test" element={<Test />}/>
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
