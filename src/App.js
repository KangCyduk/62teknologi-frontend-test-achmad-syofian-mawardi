import React, { useState } from 'react';
import { Route, Routes as Switch } from "react-router";
import './assets/css/custom.scss';
import './assets/css/App.scss';
import routeAll from './helpers/route';
import LayoutUser from './views/user/shared/master';
import NotFound from './components/notFound';
import GlobalState from './helpers/globalState';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const [globalState, setGlobalState] = useState(
    {
      error: null,
      isAuthenticated: false,
      user: {}
    }
  );

  const renderElement = (value) =>{
    return(
      <value.component pageName={value.pageName} adminLevel={value.adminLevel} name={value.name}/>
    )
  }

  const renderRoute = (value, idx, idxParent)=>{
    
    const valueElement = {
      pageName:value.pageName,
      adminLevel:value.adminLevel,
      name:value.name,
      component:value.component
    }
    return(
      <Route
        key={idx}
        path={value.path}
        element={
          {
            0:<LayoutUser>{renderElement(valueElement)}</LayoutUser>,
            1:renderElement(valueElement)
          }[idxParent] || renderElement(valueElement)
        }
      />
    )
  }

  return (
    <HelmetProvider>
          <GlobalState.Provider value={[globalState,setGlobalState]}>
              <div className="d-flex flex-column h-100">
                    <Switch>
                      {Object.values(routeAll).map((_,idxParentRoute,array)=>
                          Object.values(array[idxParentRoute]).map((value,idxChildren)=>
                            renderRoute(value,idxChildren,idxParentRoute)
                          )
                      )}
                      <Route path='*' element={<NotFound pageName={routeAll.component.notFound.pageName} name={routeAll.component.notFound.name}/>}/>
                    </Switch>
              </div>
          </GlobalState.Provider>
    </HelmetProvider>
  );
}

export default App;
