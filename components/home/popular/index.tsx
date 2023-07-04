import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./popular.style";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import PopularJobsCard from "../../common/cards/popular/popularJobsCards";
import useFetch from "../../../hook/useFetch";
import { JobModel } from "../../../models/jobModel";
import { log } from "react-native-reanimated";

export default function PopularJobs() {
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch<JobModel[]>({
    query: "React developer",
    page: "1",
    num_pages: "1",
    endPoint: "search",
  });

  const [selectedItem, setSelectedItem] = useState<JobModel | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>

        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList<JobModel>
            data={data ?? []}
            renderItem={({ item }) => {
              return (
                <PopularJobsCard
                  item={item}
                  selected={selectedItem?.job_id == item.job_id}
                  handleCardPress={(jItem) => {
                    router.push(`/job_details/${item.job_id}`);
                    setSelectedItem(item);
                  }}
                />
              );
            }}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.small }}
            horizontal
          />
        )}
      </View>
    </View>
  );
}
