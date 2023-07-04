import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { JobModel } from "../../../../models/jobModel";

import styles from "./nearbyJobsCard.style";
import { icons } from "../../../../constants";

type Props = {
  item: JobModel;
  handleCardPress: () => void;
};
export default function NearbyJobsCard({ item, handleCardPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={handleCardPress}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={
            item.employer_logo ? { uri: item.employer_logo } : icons.jobImage
          }
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {item.job_title}
        </Text>
        <Text style={styles.jobType} numberOfLines={1}>
          {item.job_employment_type}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
