import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/use-fetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Search() {

  const { id } = useLocalSearchParams();
  const {
    data: movie,
    loading,
    error
  } = useFetch(() => fetchMovieDetails(id as string))


  const imageUrl = `https://image.tmdb.org/t/p/w500${movie?.poster_path || ''}`;

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image 
            source={{ uri: imageUrl }} 
            className="w-full h-[550px] rounded-lg mb-2" 
            resizeMode="stretch" 
          />
        </View>
        <View className="flex-col items-start justify-center px-5">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-white text-sm">{movie?.release_date?.split("-")[0]}</Text>
            <Text className="text-white text-sm ml-2">|</Text>
            <Text className="text-white text-sm ml-2">{movie?.runtime} min</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white text-sm ml-1">{Math.round(movie?.vote_average ?? 0)}/10</Text>
            <Text className="text-white text-sm ml-1">({movie?.vote_count ?? 0} votes)</Text>
          </View>

          <MovieInfo label="Overview" value={movie?.overview || "No overview available."} />
          <MovieInfo label="Genres" value={movie?.genres?.map((g: any) => g.name).join(", ") || "No genres available."} />
          <MovieInfo label="Production Companies" value={movie?.production_companies?.map((c: any) => c.name).join(", ") || "No production companies available."} />
          <MovieInfo label="Budget" value={`$${movie?.budget?.toLocaleString() || "0"}`} />
          <MovieInfo label="Languages" value={movie?.spoken_languages?.map((l: any) => l.name).join(", ") || "No languages available."} />
          <MovieInfo label="Status" value={movie?.status || "No status available."} />
        </View>
      </ScrollView>
      <TouchableOpacity 
        className="absolute bottom-5 left-0 right-0 mx-5 flex flex-row items-center bg-accent px-4 py-2 rounded-full" 
        onPress={() => router.back()}
      >
        <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff" />
        <Text className="text-white text-base font-semibold">Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

function MovieInfo({label, value}: {label: string, value: string}) {
  return (
    <View className="flex-col items-start justify-center mt-5">
      <Text className="text-light-200 text-base font-bold">{label}</Text>
      <Text className="text-light-100 text-sm">{value}</Text>
    </View>
  );
}