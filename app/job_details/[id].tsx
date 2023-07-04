import { Stack, useRouter, useSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import useFetch from "../../hook/useFetch";
import { JobModel } from "../../models/jobModel";
import { COLORS, SIZES, icons } from "../../constants";
import ScreenHeaderButton from "../../components/common/header/ScreenHeaderButton";
import Company from "../../components/job_details/company/company";
import JobTabs from "../../components/job_details/tabs/jobTabs";
import JobFooter from "../../components/job_details/footer/jobFooter";

const tabs = ["About", "Qualifications", "Benefits"];
export default function JobDetails() {
  const params = useSearchParams();
  const router = useRouter();

  const job_id = params.id || "";

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeTabs, setActiveTabs] = useState<string>(tabs[0]);

  const { data, isLoading, error, refetch } = useFetch<JobModel[]>({
    job_id: job_id,
    endPoint: "job-details",
  });

  const onRefresh = () => {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderButton
              iconUrl={icons.chevronLeft}
              dimension="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderButton iconUrl={icons.share} dimension="60%" />
          ),
          headerTitle: "Job Detail",
        }}
      />
      <>
        <ScrollView showsVerticalScrollIndicator={false}>
          {<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : !data || data?.length == 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company item={data[0]} />

              <JobTabs
                tabs={tabs}
                activeTab={activeTabs}
                setActiveTabs={setActiveTabs}
                item={data[0]}
              />
            </View>
          )}
        </ScrollView>
        <JobFooter
          url={
            data?.[0].job_google_link ??
            "https://careers.google.com/jobs/results/"
          }
        />
      </>
    </SafeAreaView>
  );
}
