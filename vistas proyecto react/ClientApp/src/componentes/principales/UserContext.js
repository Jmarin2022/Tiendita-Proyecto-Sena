import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const storedPayload = localStorage.getItem('userPayload');
    const initialPayload = storedPayload ? JSON.parse(storedPayload) : null;

    const [userPayload, setUserPayload] = useState(initialPayload);

    const updateUserPayload = (payload) => {
        localStorage.setItem('userPayload', JSON.stringify(payload));
        setUserPayload(payload);
        console.log(payload)
    };

    return (
        <UserContext.Provider value={{ userPayload, setUserPayload: updateUserPayload }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}
