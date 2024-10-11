/* Generate form to create a new mission */
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import  MissionForm from '../components/MissionForm';
import './CreateMission.css';


const CreateMission: React.FC = () => {
    return (
     
            <IonContent >
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Create Mission</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <MissionForm type='create' onSubmit={() => {}} />
                <ExploreContainer name="Create Mission page" />
            </IonContent>
   
    );
};

export default CreateMission