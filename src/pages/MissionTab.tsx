import { IonList, IonItem, IonLabel, IonModal, IonInput, IonButton, IonContent, IonHeader, IonPage,  IonRouterOutlet,  IonTitle, IonToolbar, IonTextarea, IonDatetime, IonDatetimeButton } from '@ionic/react';
import React, { useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router';
import { Mission } from '../classes/Mission';
import MissionHandler from '../components/MissionHandler';
import MissionViewer from '../components/MissionViewer';
import UserContext from '../components/UserContext';
import {User} from '../classes/User';
import { Route } from 'react-router-dom';
import MissionForm from '../components/MissionForm';
import ExploreContainer from '../components/ExploreContainer';
import './MissionTab.css';

import {SERVER} from '../App';

const MissionTab: React.FC = ({ ...props}) => {

//  console.log(props.children);
  const userCtx = useContext(UserContext);

  console.log(userCtx.user);
  
  return (
    <IonPage>
    <IonRouterOutlet>
  
 
    <Route  path="/Mission" exact> 
      <MissionDashboard   />
    
    </Route>
  
    <Route  path="/Mission/Create"  > 
      <MissionAddForm   user={userCtx.user} />
    </Route>
    
    

    </IonRouterOutlet>
    </IonPage>
    )
    }
    

const MissionDashboard : React.FC = () => {
    
  return (
    
  
  <IonContent >
      <IonHeader>
        <IonToolbar>
          <IonTitle>MissionsDashboard</IonTitle>
          <IonButton slot="end" color="primary" routerLink="/Mission/Create">New</IonButton>
  
        </IonToolbar>

      </IonHeader>
        
  </IonContent>
  );
};

const MissionAddForm : React.FC<any> = (props) => {

  const submitRef = React.useRef(null);
const handleSaveMission = () => {
  
}

  return (
    
  <IonContent >
     <IonHeader>
        <IonToolbar>
        
          <IonTitle>New Mission</IonTitle>
        
          <IonButton  slot='end' onClick={handleSaveMission}>Save</IonButton>
          <IonButton  slot='end' routerLink="/Mission">Cancel</IonButton>
        </IonToolbar>
      </IonHeader>
      <CreateMissionForm handleMissionSubmit={handleSaveMission} user={props.user} ref={submitRef} />
      
        
  </IonContent>
  );
};


const CreateMissionForm =  React.forwardRef<HTMLIonButtonElement, any>(({handleMissionSubmit, user }: any, ref ) => {
  const [missionTitle, setMissionTitle] = useState('');
  const [missionDescription, setMissionDescription] = useState('');
  const [missionStartDate, setMissionStartDate] = useState('');
  const [missionStartTime, setMissionStartTime] = useState('');
  const [missionEndDate, setMissionEndDate] = useState('');
  const [missionEndTime, setMissionEndTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(missionTitle, missionDescription, missionStartDate, missionStartTime, missionEndDate, missionEndTime);
    // Call API to create mission
    const mission = new Mission(missionTitle, missionDescription,)
    mission.creator = user._id
    mission.createdAt = new Date() //
    console.log(missionEndDate);
    mission.timeLimitAt =  new Date(missionEndDate);
    mission.startAt =  new Date(missionStartDate);
    console.log(mission);
    // Call API to create mission
    fetch(SERVER + '/api/missions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mission),
    })
    .then((res) => res.json()
      .then((data) => console.log(data)))
      .then(() => console.log('Mission created:', missionTitle, missionDescription, missionStartDate, missionEndDate))    
    .catch((err) => console.log(err));
  };

  return (

       <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="floating">Mission Title</IonLabel>
            <IonInput
              type="text"
              value={missionTitle}
              onIonChange={(e) => setMissionTitle(e.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Mission Description</IonLabel>
            <IonTextarea rows={4}
              value={missionDescription}
              onIonChange={(e) => setMissionDescription(e.detail.value)}
            />
          </IonItem>
          <IonItem>

          <IonLabel  slot='start'>Start Date and Time</IonLabel>
          <IonDatetimeButton  slot='end'  datetime="startdatetime"></IonDatetimeButton>
          <IonModal keepContentsMounted={true}>
          <IonDatetime id="startdatetime" showDefaultButtons={true} showDefaultTimeLabel={true}  onIonChange={(e) => setMissionStartDate(e.detail.value)} value={missionStartDate||null}></IonDatetime>
          </IonModal>
          </IonItem>

          <IonItem>
                      <IonLabel slot='start'>End Date and Time</IonLabel>
          <IonDatetimeButton slot='end' datetime="enddatetime"></IonDatetimeButton>
          <IonModal keepContentsMounted={true}>
          <IonDatetime id="enddatetime"  showDefaultButtons={true} showDefaultTimeLabel={true} min={missionStartDate} max={new Date(new Date(missionStartDate).getTime() +  72 * 3600 * 1000).toString() } onIonChange={(e) => setMissionEndDate(e.detail.value)} value={missionEndDate || null  } ></IonDatetime>
          </IonModal>
            </IonItem>
        </IonList>
        <IonButton expand="block" ref={ref} onClick={handleSubmit}>
          Create Mission
        </IonButton>
       </IonContent>
    // </IonPage>
  );
});
  

export default MissionTab;
