import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MiddelBar from '../components/Middlebar';
import Sidebar from '../components/Sidebar';

import Home from '../screens/Home.web';
import SobreNosotros from '../screens/SobreNosotros';
import PreguntasFrecuentes from '../screens/PreguntasFrecuentes';

import ScreenLugares from '../screenFunctions/screenLugares.web';
import ScreenPersonajes from '../screenFunctions/screenPersonajes.web';
import Episodios from '../screenFunctions/screenEpisodios';

import './webControler.css';

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const toggleSidebar = () => setOpenSidebar(o => !o);

  return (
      <Router>
        <div style={{ minHeight: '100vh' }}>
          <div className="header">
            <MiddelBar toggleSidebar={toggleSidebar} />
            <Sidebar open={openSidebar} toggleSidebar={toggleSidebar} />
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/about" element={<SobreNosotros />} />
              <Route path="/faq"   element={<PreguntasFrecuentes />} />

              <Route path="/lugares" element={<ScreenLugares />} />

              <Route path="/personajes" element={<ScreenPersonajes />} />

              <Route path="/episodios" element={<Episodios />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;