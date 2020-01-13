import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function App() {
  const [authenticated, setAuthenticated] = useState();
  const [hasHardware, setHasHardware] = useState(false);
  const [supportedTypes, setSupportedTypes] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const startScan = async () => {
    setAuthenticated(null);
    setAuthenticated(await LocalAuthentication.authenticateAsync());
  };

  useEffect(() => {
    async function initData() {
      setHasHardware(await LocalAuthentication.hasHardwareAsync());
      setSupportedTypes(
        await LocalAuthentication.supportedAuthenticationTypesAsync()
      );
      setIsEnrolled(await LocalAuthentication.isEnrolledAsync());
      startScan();
    }
    initData();
  }, []);
  componentDidMount = async () => {};

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>hasHardware: {hasHardware.toString()}</Text>
        <Text>supportedTypes: {JSON.stringify(supportedTypes)}</Text>
        <Text>isEnrolled: {isEnrolled.toString()}</Text>
        <Text>
          authenticated:{" "}
          {(authenticated && JSON.stringify(authenticated)) || "waiting..."}
        </Text>
      </View>
      {!authenticated && <Text>TOUCH FINGERPRINT SENSOR</Text>}
      {authenticated && (
        <>
          <Button title="Scan again" onPress={startScan} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
