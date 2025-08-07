import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

export default function MovieCard({ movie }: { movie: Movie }) {

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/600x400/1a1a1a/ffffff.png';

  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image 
          source={{ uri: imageUrl }} 
          className="w-full h-52 rounded-lg mb-2" 
          resizeMode="cover"
        />
        <Text className="text-white text-sm">{movie.title}</Text>
      </TouchableOpacity>
    </Link>
  );
}