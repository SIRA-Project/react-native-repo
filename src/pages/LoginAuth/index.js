import React, { useState, useEffect, Component } from 'react';
import { View, Text, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '746144349214-k76rrecdob8tkth82j4v6mjahekfia0q.apps.googleusercontent.com',
});

const LoginFirebase = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login BROOOOOOOOOOOO</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
    </View>
  );
}


class LoginAuth extends Component {
  
  onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  createUser = () => {
    auth()
      .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  logOff = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  render() {
    return (
      <View style={{
        flex: 1, backgroundColor: 'white',
        justifyContent: 'center', alignItems: 'center',
      }}>
        <Button
        title="Google Sign-In"
        onPress={() => this.onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        />
        <LoginFirebase />
        <Button title="Create User" onPress={this.createUser} />
        <Button title="Log off" onPress={this.logOff} />
      </View>
    )
  }
}

export default LoginAuth;

// const styles = StyleSheet.create({})
