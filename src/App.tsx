import React, { useEffect, useState } from 'react';
import { Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonRouter
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import DashboardTab from './pages/DashboardTab';
import SignIn from './pages/SignIn';
import MissionTab from './pages/MissionTab';
import MissionForm from './components/MissionForm';
import MissionViewer from './components/MissionViewer';
import MissionHandler from './components/MissionHandler';
import UserContext from './components/UserContext';
import { User } from './classes';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
setupIonicReact();

export const SERVER = 'http://localhost:3333';
//const admin = new User({ "username": "admin", "email": "admin@example.com", "password": "admin" ,"role": "admin" });

const App: React.FC = () => {

const [isRegistered, setIsRegistered] = useState(true);
const [isSignedIn, setIsSignedIn] = useState(true);
const [user, setUser] = useState<User | null>(null);

const history = useHistory()
//const iorout = useIonRouter();  
//const loc =  useLocation() //.canGoBack()

const getUser =  () => {

   fetch(SERVER + '/api/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: 'admin', password: 'admin' }) //`{ 'username': 'admin', 'password': 'admin' }`
  }).then(res => res.json())
  .then(data => { 
    console.log(data)
    const u = new User({ _id: data._id, username: data.username,  role: data.role})
    setUser(u) //new User(data)); 

  })
  .catch(err => console.log(err.message))
}

useEffect(() => {

  getUser()

},[]);


useEffect(() => {

  console.log(user)
      if (user) {
      setIsRegistered(true);
      setIsSignedIn(true);
       //iorout.push('/Dashboard')
    } 

},[user]);


   return (
    
    
   <IonApp>
    {  !user ?
  
    <SignIn />
    : 
   <IonReactRouter>
     <IonTabs>
           
   
       <IonRouterOutlet>
   <UserContext.Provider value={{user, setUser}}>     

          <Route exact path="/Dashboard">
            <DashboardTab />
          </Route>
          
          <Route  path="/Mission">
            <MissionTab  />
          </Route>

          <Route exact path="/Settings">
            <Tab3 />
          </Route>
  

        </UserContext.Provider>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="Dashboard" href="/Dashboard">
            <IonIcon aria-hidden="true" icon={triangle} />
            <IonLabel>Dashboard</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Mission" href="/Mission">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Mission</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Settings" href="/Settings">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>      

    </IonReactRouter>
    }
  </IonApp>
)};

export default App;
