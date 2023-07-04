import React, { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONT, icons, SIZES } from "../../../constants";
import styles from "./welcome.style";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  const [search, setSearch] = useState<string>("");
  const jobTypes = ["Full-time", "Part-time", "Contractor"];

  const [activeJobType, setActiveJobType] = useState<string>("Full-time");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Welcome James</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={search}
            onChangeText={(e) => {}}
            placeholder="What are you looking for"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                ...styles.tab,
                borderColor:
                  activeJobType === item ? COLORS.secondary : COLORS.gray2,
              }}
            >
              <Text
                style={{
                  fontFamily: FONT.medium,
                  color:
                    activeJobType === item ? COLORS.secondary : COLORS.gray2,
                }}
                onPress={() => {
                  setActiveJobType(item);
                  router.push(`/search/${item}`);
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.small }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
