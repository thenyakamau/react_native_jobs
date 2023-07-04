import React from "react";
import { Text, View } from "react-native";

import styles from "./specifics.style";

type Props = {
  qualifications: string[];
  title: string;
};
export default function Specifics({ qualifications, title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}: </Text>

      <View style={styles.pointsContainer}>
        {qualifications.map((point, index) => (
          <View style={styles.pointWrapper} key={index}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>{point}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
