import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface SearchBarProps {
  value?: string;
  placeHolder: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

export default function SearchBar({ 
  placeHolder, 
  value = "", 
  onChangeText = () => {}, 
  onPress = () => {} 
}: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff" />
      <TextInput 
        className="flex-1 ml-2 text-white text-base"
        placeholder={placeHolder}
        placeholderTextColor={"#a8b5db"}
        value={value}
        onChangeText={onChangeText}
        onPress={onPress}
      />
    </View>
  );
}