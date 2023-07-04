import React from "react";

import styles from "./about.style";
import { Text, View } from "react-native";

export default function About({ info }: { info: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.headText}>About the job:</Text>

      <View style={styles.contentBox}>
        <Text style={styles.contextText}>{info}</Text>
      </View>
    </View>
  );
}
