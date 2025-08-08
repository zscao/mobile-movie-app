import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Search() {

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies = [],
    loading,
    error,
    refetch,
    reset
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  }

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch();
      }
      else {
        reset()
      }
    }, 600)
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="flex-1 absolute w-full z-0" />
      <FlatList
        className="px-5"
        data={movies as Movie[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard movie={item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{ paddingBottom: 100}}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeHolder="Search movies" 
                value={searchQuery}
                onChangeText={handleSearch} />
            </View>
            {loading && <ActivityIndicator size="large" color="#0000ff" className="my-3" />
            }
            {error && (
              <Text className="text-red-500 text-center mt-3">
                {error?.message ?? "Failed to fetch movies."}
              </Text>
            )}
            {!loading && !error && searchQuery.trim() && (Array.isArray(movies) && movies.length > 0) && (
              <Text className="text-xl text-white font-bold">
                Search Results for "{searchQuery}"
              </Text>
            )}
          </>
        }
        ListEmptyComponent={(!loading && !error) ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-white text-lg">
              {searchQuery?.trim() ? `No movies found for "${searchQuery}"` : "Search for movies"}
            </Text>
          </View>
        ): undefined}
      />
    </View>
  );
}
