import { View, Text, Button } from "react-native";
import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react";
import api from "../../services/api";
import MudarTrilha from "../../components/MudarTrilha";
import CustomButton from "../../components/Button";

export default function Home({navigation}) {
  const { logout } = useAuth();
  const [macros, setMacros] = useState([]);
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <Button title="Log Out" onPress={logout} />
      <MudarTrilha mesoarea="sla" macroarea="Biologia"></MudarTrilha>
      <CustomButton title="FAZER LESSON" onPress={() => navigation.navigate("Lesson")}></CustomButton>
    </View>
  );
}