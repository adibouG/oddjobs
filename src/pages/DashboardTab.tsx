// Dashboard.tsx
import React,  { useEffect, useState }  from 'react';
import { RouteComponentProps } from 'react-router';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, 
   IonButton, IonCard, IonCardContent, IonCardTitle, IonCardSubtitle, IonSearchbar, IonItem, IonLabel, IonInput, IonList, IonListHeader, 
   IonCardHeader,
   IonIcon} from '@ionic/react';
import { close, closeOutline, searchOutline  } from 'ionicons/icons';
import { Mission } from '../classes/Mission';
import './DashboardTab.css';
   
import {SERVER} from '../App'; //'= '' //'http://localhost:3000';	

const DashboardTab: React.FC = () => {
 
  const [showIntroCard, setShowIntroCard] = useState(true);
  const [missions, setMissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userHistory, setUserHistory] = useState([]);
  const [openChats, setOpenChats] = useState([]);
  const [missedNotifications, setMissedNotifications] = useState([]);

  useEffect(() => {

    fetch('/api/models') 
    .then(response => response.json())
    .then(data => console.log(data));


    // Fetch missions from server
    fetch(SERVER + '/api/missions')
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        setMissions(data)
  });

    // Fetch user history from server
    fetch(SERVER + '/api/user/history')
      .then(response => response.json())
      .then(data => setUserHistory(data));

    // Fetch open chats from server
    fetch(SERVER + '/api/chats/open')
      .then(response => response.json())
      .then(data => setOpenChats(data));

    // Fetch missed notifications from server
    fetch(SERVER + '/api/notifications/missed')
      .then(response => response.json())
      .then(data => setMissedNotifications(data));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCreateMission = () => {
    // Navigate to create mission form
  };

  const closeIntroCard = () => {
    setShowIntroCard(false);
  }

  return (
    <IonPage>
      
    <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
          <IonButton slot='end' routerLink={'/Mission/Create'}>
                Create New Mission
          </IonButton>
          
          <IonButton slot='end' onClick={handleCreateMission}>
                User Profile
          </IonButton>
        </IonToolbar>
      </IonHeader>
  
     
      <IonContent>
        <IonGrid>
              {/* Introduction card */}
              {
                showIntroCard &&
          <IonRow>
              <IonCol size="12">
                <IonCard>
                <IonCardHeader>
                  <IonItem>
                    <IonIcon slot="end" icon={closeOutline}  onClick={closeIntroCard}/>
                    <IonCardTitle slot='start'>Welcome to the Dashboard</IonCardTitle>
                  </IonItem>
                </IonCardHeader>
                <IonCardContent>
                  <IonCardSubtitle>Here you can access the main features of the app</IonCardSubtitle>
                </IonCardContent>
              </IonCard>

            </IonCol>
          </IonRow>
              }
          <IonRow>
            <IonCol size="6">
              <IonList>
                <IonListHeader>Missions</IonListHeader>
                <IonItem>
                  <IonInput
                    type="search"
                    value={searchQuery}
                    onIonChange={handleSearch}
                    placeholder="Search missions"
                  />
                </IonItem>
                {missions.map((mission, index) => (
                  <IonItem key={index}>
                    <IonLabel>{mission.title}</IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
            <IonCol size="6">
            
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="6">
              <IonList>
                <IonListHeader>User History</IonListHeader>
                {userHistory.map((history, index) => (
                  <IonItem key={index}>
                    <IonLabel>{history.activity}</IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
            <IonCol size="6">
              <IonList>
                <IonListHeader>Open Chats</IonListHeader>
                {openChats.map((chat, index) => (
                  <IonItem key={index}>
                    <IonLabel>{chat.name}</IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
          </IonRow>

                  {/* footer */}
          <IonRow>
            <IonCol size="12">
              <IonList>
                <IonListHeader>Missed Notifications</IonListHeader>
                {missedNotifications.map((notification, index) => (
                  <IonItem key={index}>
                    <IonLabel>{notification.message}</IonLabel>
                  </IonItem>
                ))}
              </IonList>
            </IonCol>
          </IonRow>

        </IonGrid>
      </IonContent>
      </IonPage> 
        
);
};

export default DashboardTab;
