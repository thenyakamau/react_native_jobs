import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import styles from "./nearby.style";
import { useRouter } from "expo-router";
import useFetch from "../../../hook/useFetch";
import { JobModel } from "../../../models/jobModel";
import { COLORS } from "../../../constants";
import NearbyJobsCard from "../../common/cards/nearby/nearbyJobsCard";

export default function NearbyJobs() {
  const router = useRouter();

  const { data, isLoading, error, refetch } = useFetch<JobModel[]>({
    query: "React developer",
    page: "1",
    num_pages: "1",
    endPoint: "search",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
          data?.map((item) => {
            return (
              <NearbyJobsCard
                item={item}
                handleCardPress={() => {
                  router.push(`/job_details/${item.job_id}`);
                }}
                key={item.job_id}
              />
            );
          })
        )}
      </View>
    </View>
  );
}
