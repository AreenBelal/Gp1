import React from 'react';
import { useState } from "react";
import Sidebar from '../global/Sidebar'
import Topbar from '../global/Topbar'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme";
import StudentNotes from './StudentNotes';
import '../../indexdash.css';

const Notesfinal = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div style={{direction:'rtl'}}>  
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        <div style={{marginRight:'10px',marginLeft:'10px'}}> 
          <Sidebar isSidebar={isSidebar} />
        </div>
          <main className="content" style={{marginRight:'120px',width:'900px'}}>
            <Topbar setIsSidebar={setIsSidebar} />
   
          <StudentNotes />
        

        </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </div>
    
  );
};

export default Notesfinal;
