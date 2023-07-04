import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { JobModel } from "../../../../models/jobModel";
import styles from "./popularJobsCard.style";
import { COLORS, icons } from "../../../../constants";
import { checkImageURL } from "../../../../utils/helpers";

type Props = {
  item: JobModel;
  selected: boolean;
  handleCardPress: (item: JobModel) => void;
};
export default function PopularJobsCard({
  item,
  selected,
  handleCardPress,
}: Props) {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: selected ? COLORS.primary : "#FFF",
      }}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity
        style={{
          ...styles.logoContainer,
          backgroundColor: selected ? "#FFF" : COLORS.white,
        }}
      >
        <Image
          source={
            item.employer_logo ? { uri: item.employer_logo } : icons.jobImage
          }
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text
          style={{
            ...styles.jobName,
            color: selected ? COLORS.white : COLORS.primary,
          }}
          numberOfLines={1}
        >
          {item.job_title}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.publisher} numberOfLines={1}>
            {item.employer_name}
          </Text>
          <Text style={styles.location} numberOfLines={1}>
            {item.job_city}, {item.job_country}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
