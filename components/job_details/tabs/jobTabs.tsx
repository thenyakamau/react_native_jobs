import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";

import styles from "./jobTabs.style";
import { COLORS, SIZES } from "../../../constants";
import { JobModel } from "../../../models/jobModel";
import Specifics from "../specifics/specifics";
import About from "../about/about";

type Props = {
  item: JobModel;
  tabs: string[];
  activeTab: string;
  setActiveTabs: (tab: string) => void;
};
export default function JobTabs({
  tabs,
  activeTab,
  setActiveTabs,
  item,
}: Props) {
  const displayTabContent = () => {
    switch (activeTab) {
      case "About":
        return <About info={item.job_description} />;
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            qualifications={item.job_highlights?.Qualifications ?? ["N/A"]}
          />
        );

      case "Benefits":
        return (
          <Specifics
            title="Benefits"
            qualifications={item.job_benefits ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList<string>
          data={tabs}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  ...styles.btn,
                  backgroundColor:
                    item === activeTab ? COLORS.primary : "#F3F4F8",
                }}
                key={index}
              >
                <Text
                  style={{
                    ...styles.btnText,
                    color: item === activeTab ? "#C3BFCC" : "#AAA9B8",
                  }}
                  onPress={() => setActiveTabs(item)}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        />
      </View>
      {displayTabContent()}
    </>
  );
}
