import React from "react";
import { View, TouchableOpacity, Linking, Image, Text } from "react-native";
import { icons } from "../../../constants";
import styles from "./jobFooter.style";

type Props = {
  url: string;
};
export default function JobFooter({ url }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn}>
        <Image
          source={icons.heartOutline}
          resizeMode="contain"
          style={styles.likeBtnImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
}
