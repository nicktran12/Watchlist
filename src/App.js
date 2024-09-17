import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Header} from "./components/Header";
import {Watched} from "./components/Watched";
import {Watching} from "./components/Watching";
import {Watchlist} from "./components/Watchlist";
import {Add} from "./components/Add";
import './App.css';
import "./lib/font-awesome/css/all.min.css";
import {GlobalProvider} from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header/>
        
        <Routes>
          <Route path="/watched" element={<Watched/>}/>

          <Route path="/watching" element={<Watching/>}/>

          <Route path="/watchlist" element={<Watchlist/>}/>

          <Route exact path="/" element={<Add/>}/>
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
