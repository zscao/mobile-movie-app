import MovieCard from "@/components/movie-card";
import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {

  const router = useRouter();
  const { 
    data: movies, 
    error, 
    loading,
    refetch
  } = useFetch(() => fetchMovies({
    query: ""
  }), false);

  useEffect(() => {
    if(!loading) refetch();
  }, []);

  const handleSearchPress = () => {
    router.push("/search");
  };


  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView 
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        { loading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
        ) : error ? (
          <Text className="text-red-500 text-center mt-10">
            {error?.message ?? "Failed to fetch movies."}
          </Text>
        ) : (
          <MovieView handleSearchPress={handleSearchPress} movies={movies ?? []} />
        )}
        
      </ScrollView>    
    </View>
  );
}


function MovieView({
  movies = [], 
  handleSearchPress 
}: {
  movies?: Movie[],
  handleSearchPress: () => void }
) {
  return (
    <View className="flex-1 mt-5">
      <SearchBar
        placeHolder="Search for a movie"
        onPress={handleSearchPress}
      />
      <Text className="text-white text-lg font-bold mt-5 mb-3">
        Popular Movies
      </Text>

      { movies?.length > 0 && (
        <FlatList 
          data={movies} 
          renderItem={({ item }) => (
            <MovieCard movie={item} />
          )} 
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{ 
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          className="mt-2 pb-32"
          scrollEnabled={false}          
        />
      )}
    </View>
  )
}