import { View, Text, Button } from "react-native";
import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react";
import api from "../../services/api";
import MudarTrilha from "../../components/MudarTrilha";

export default function Home() {
  const { logout } = useAuth();
  const [macros, setMacros] = useState([]);
  
    useEffect(() => {
    const fetchMacros = async () => {
      try {
        console.log("pushando api.get")
        const response = await api.get("/macroareas/");
        setMacros(response.data);
      } catch (error) {
        console.error("Erro ao buscar macroáreas:", error);
      }
    };

    fetchMacros();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <Button title="Log Out" onPress={logout} />
      <View>
      {macros.map((item) => (
        <View>
          <Text>{item.nome}</Text>
        </View>
      ))}
      </View>
      <MudarTrilha mesoarea="sla" macroarea="Biologia"></MudarTrilha>
    </View>
  );
}