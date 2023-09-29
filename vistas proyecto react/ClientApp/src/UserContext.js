//import { createContext, useState, useContext } from 'react';

//const UserContext = createContext();

//export function UserProvider({ children }) {
//    const [userRole, setUserRole] = useState('');

//    return (
//        <UserContext.Provider value={{ userRole, setUserRole }}>
//            {children}
//        </UserContext.Provider>
//    );
//}

//export function useUser() {
//    return useContext(UserContext);
//}