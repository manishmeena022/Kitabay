import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

export const useAuth = () => {
    return useContext(AuthContext)
}

// authProvider 
export const AuthProvide = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true);

    // register user
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    // login user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    // signup with google 
    const signupWithGoogle = async () => {
        return signInWithPopup(auth, googleProvider);
    }

    // logout user
    const logout = async () => {
        return signOut(auth)
    }

    // manage user 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if (user) {
                const { email, displayName, photoURL, } = user;
                const userData = {
                    email,
                    user: displayName,
                    photo: photoURL,
                }
            }
        })

        return () => unsubscribe()
    }, [])

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signupWithGoogle,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


