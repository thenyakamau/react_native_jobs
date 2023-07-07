import React from "react";

import styles from "./company.styles";
import { Image, Text, View } from "react-native";
import { JobModel } from "../../../models/jobModel";
import { icons } from "../../../constants";

type Props = {
  item: JobModel;
};
export default function Company({ item }: Props) {
  const { employer_logo, employer_name, job_title, job_country } = item;

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={employer_logo ? { uri: employer_logo } : icons.jobImage}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.jobTitleBox}>
        <Text style={styles.jobTitle}>{job_title}</Text>
      </View>

      <View style={styles.companyInfoBox}>
        <Text style={styles.companyName}>{employer_name} / </Text>
        <View style={styles.locationBox}>
          <Image
            source={icons.location}
            resizeMode="contain"
            style={styles.locationImage}
          />
          <Text style={styles.locationName}>{job_country}</Text>
        </View>
      </View>
    </View>
  );
}
