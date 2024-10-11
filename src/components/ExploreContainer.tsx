
import { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Mission } from '../classes/Mission';

interface ContainerProps {
  name: string;
}



const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const getMissions = async () => {
    const res = await fetch('http://localhost:3000/missions');
    const data = await res.json();
    console.log(data);
    return setMissions(data);  
  }
  const [missions, setMissions] = useState<Mission []>([]);

  useEffect(() => {
    const res = getMissions();
    console.log(res);
    }, [])

  return (
    <div className="container">

    </div>
  );
};

export default ExploreContainer;
