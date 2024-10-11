

import React from 'react';
import {User} from '../classes/User';


interface UserContext {
    // Define the types for the UserContext module here
    user: User|null;
    setUser: (user: User|null) => void;
  }
  
const UserContext = React.createContext<UserContext>({
    user: null,
    setUser: (user: User|null) => {},
});

export default UserContext;
