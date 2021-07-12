import React, { useState, useEffect, useContext, createContext } from "react";
import { useQuery } from "react-query";
import { getPosts } from "./dhive";

export const AuthContext = React.createContext(null);

export const AuthProvider = (props) => {
  const [user, setUser] = React.useState("");
  const authValue = React.useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    // console.log("auth provider user", user);
    // check localstorage for user
    const storageObject = localStorage.getItem("currentUser");
    if (storageObject) {

      // need a function here to get local time and set it in localstorage.

      // e

      let currentUser = JSON.parse(storageObject).data.username;
      setUser("");
      setUser(currentUser);
      console.log("grabbed user in local storage");
    } else {
      console.log("no user in localStorage");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const signinWithHiveKeychain = async (username, callback) => {
  // if(username.length == 0) return;
  let time = (new Date().getTime() / 1000, 10);

  if (typeof window !== "undefined") {
    const keychain = window.hive_keychain;
    const signedMessageObj = { type: "login", app: "ipeeyay" };
    const messageObj = {
      signed_message: signedMessageObj,
      username: username,
      // timestamp: time,
    };
    const request = keychain.requestSignBuffer(
      username,
      JSON.stringify(messageObj),
      "Posting",
      (response, err) => {
        if (response.err) {
          throw err;
        }
        localStorage.setItem("currentUser", JSON.stringify(response));
        //Successfully logged in

        console.log(response);
        return callback(response);
      }
    );
  }
};

export const logOut = () => {
  localStorage.removeItem("currentUser");
}
