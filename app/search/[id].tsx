import { Stack, useRouter, useSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import useFetch from "../../hook/useFetch";
import { JobModel } from "../../models/jobModel";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, icons } from "../../constants";
import ScreenHeaderButton from "../../components/common/header/ScreenHeaderButton";
import PopularJobsCard from "../../components/common/cards/popular/popularJobsCards";
import styles from "../../styles/search";
import NearbyJobsCard from "../../components/common/cards/nearby/nearbyJobsCard";

export default function Search() {
  const params = useSearchParams();
  const router = useRouter();

  const searchTerm = params.id ?? "";

  const [selectedItem, setSelectedItem] = React.useState<JobModel | null>();
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const { data, isLoading, error, refetch } = useFetch<JobModel[]>({
    query: searchTerm,
    page: "1",
    num_pages: "1",
    endPoint: "search",
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerTitle: "Search",
          headerLeft: () => (
            <ScreenHeaderButton
              iconUrl={icons.chevronLeft}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
        }}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList<JobModel>
          data={data ?? []}
          renderItem={({ item }) => {
            return (
              <NearbyJobsCard
                item={item}
                handleCardPress={() => {
                  router.push(`/job_details/${item.job_id}`);
                  setSelectedItem(item);
                }}
              />
            );
          }}
          keyExtractor={(item) => item.job_id}
          contentContainerStyle={{ columnGap: SIZES.small }}
          ListHeaderComponent={() => (
            <>
              <View style={styles.container}>
                <Text style={styles.searchTitle}>{params.id}</Text>
                <Text style={styles.noOfSearchedJobs}>Job Opportunities</Text>
              </View>
              <View style={styles.loaderContainer}>
                {isLoading ? (
                  <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                  error && <Text>Oops something went wrong</Text>
                )}
              </View>
            </>
          )}
          ListFooterComponent={() => (
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => {
                  let prevPage = currentPage > 1 ? currentPage - 1 : 1;
                  setCurrentPage(prevPage);

                  refetch(prevPage.toString());
                }}
              >
                <Image
                  source={icons.chevronLeft}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.paginationTextBox}>
                <Text style={styles.paginationText}>{currentPage}</Text>
              </View>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => {
                  let nextPage = currentPage + 1;
                  setCurrentPage(nextPage);

                  refetch(nextPage.toString());
                }}
              >
                <Image
                  source={icons.chevronRight}
                  style={styles.paginationImage}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
