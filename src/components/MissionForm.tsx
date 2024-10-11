import React, { useState } from 'react';
import { Mission, MissionStatus, MissionType } from '../classes/Mission';
//interface MissionFormProps {}


const MissionForm = ({type,  ...props}) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'description':
                setDescription(value);
                break;
            default:
                console.log(`No handler for input ${name}`);
        }
    };


    return (
        <div>

            <form>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <br />
            <label>
                Description:
                <textarea name="description" />
            </label>
            <br />
           { type === 'edit' &&  
           <>
            <label>
                Creator ID:
                <input type="number" name="creator" />
            </label>
            <br />
            <label>
                Executor ID:
                <input type="number" name="executor" />
            </label>
            <br />
            
            <label>
                Status:
                <select name="status">
                    <option value={MissionStatus.DRAFT}>Draft</option>
                    <option value={MissionStatus.ACTIVE}>Active</option>
                    <option value={MissionStatus.COMPLETED}>Completed</option>
                    <option value={MissionStatus.CANCELLED}>Canceled</option>
                </select>
            </label>
            <br />
           </>
            }
            <label>
                Type:
                <select name="type">
                    <option value={MissionType.OWNED}>Owned</option>
                    <option value={MissionType.MANAGED}>Managed</option>
                    <option value={MissionType.MISSION_GROUP}>Mission Group</option>
                </select>
            </label>
            <br />
            <label>
                Reward:
                <input type="number" name="reward" />
            </label>
            <br />
            <label>
                Time Limit At:
                <input type="datetime-local" name="timeLimitAt" />
            </label>
            <br />
            <button type="submit">Submit</button>
                
            </form>       
        </div>
    );


}

export default MissionForm