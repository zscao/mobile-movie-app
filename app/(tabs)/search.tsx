import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Search() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-5xl font-bold text-primary">Search Movies</Text>
      <Link href="./index" className="mt-4 text-blue-500">
        Go to Home
      </Link>
    </View>
  );
}