import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";

declare global {
  interface Window {
    hive_keychain: any;
  }
}


const authContext = createContext({});

export function AuthProvider({ children }) {
  const auth = useHiveKeychainAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useHiveKeychainAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      // createUser(user.uid, userWithoutToken);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutToken));
      setUser(user);

      setLoading(false);
      return user;
    } else {
      setUser(false);
      setLoading(false);
      return false;
    }
  };

  const signinWithHiveKeychain = (username, redirect) => {
    setLoading(true);
    // if(username.length == 0) return;

    let time = (new Date().getTime() / 1000, 10)

    if(typeof window !== 'undefined') {
        console.log("signinWithHiveKeychain");
        const keychain = window.hive_keychain;
        const signedMessageObj = { type: "login", app: "ipeeyay" };
        const messageObj = {
          signed_message: signedMessageObj,
          player: username,
          // timestamp: time,
        };
        keychain.requestSignBuffer(
          username,
          JSON.stringify(messageObj),
          "Posting",
          (response, err) => {
            if (response.err) {
              throw err;
            }
            handleUser(response.user);
            localStorage.setItem("currentUser", JSON.stringify(response.user));
            //Successfully logged in
            Router.push("/");
            console.log(response);
          }
        );
    }
    
  };

  const signout = () => {
    handleUser(false);
    localStorage.removeItem("currentUser");
    Router.push("/");
  };

  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
  //   return () => unsubscribe();
  // }, []);

  return {
    user,
    loading,
    signinWithHiveKeychain,
    signout,
  };
}

const formatUser = async (user) => {
  return {
    username: user.data.username,
    method: user.data.method,
    publicKey: user.publicKey,
    result: user.result,
    provider: "hive_keychain",
    token: "",
  };
};
