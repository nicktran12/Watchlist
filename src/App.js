import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Header} from "./components/Header";
import {Watchlist} from "./components/Watchlist";
import {Watched} from "./components/Watched";
import {Add} from "./components/Add";
import './App.css';
import "./lib/font-awesome/css/all.min.css";

function App() {
  return (
    <Router>
      <Header/>

      <Routes>
        <Route path="/watchlist" element={<Watchlist/>}/>

        <Route path="/watched" element={<Watched/>}/>

        <Route exact path="/" element={<Add/>}/>
      </Routes>
    </Router>
  );
}

export default App;
