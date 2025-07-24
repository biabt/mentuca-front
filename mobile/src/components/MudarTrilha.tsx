import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Modal,
  ScrollView
} from "react-native";
import { Colors, Fonts, Spacing} from "../themes";
import { Ionicons } from '@expo/vector-icons'; 
import CustomTitle from "./Title";
import Macroarea from "./Macroarea";
import api from "../services/api";

interface MudarTrilhaProps {
  macroarea: string;
  mesoarea: string;
}

const MudarTrilha: React.FC<MudarTrilhaProps> = ({
    macroarea,
    mesoarea,
}) => {

    const [isModalMacroVisible, setIsModalMacroVisible] = useState(false);
    const [isModalMesoVisible, setIsModalMesoVisible] = useState(false)
    const [macros, setMacros] = useState([]);

    const [selectedMacro, setSelectedMacro] = useState("");
    const [selectedMeso, setSelectedMeso] = useState("");

    const handleMacroPress = async (macroName: string) => {
    setSelectedMacro(macroName);
    await fetchMesos(macroName);
    setIsModalMacroVisible(false);
    setIsModalMesoVisible(true);
    };

    const [mesos, setMesos] = useState([]);
  
  
    const fetchMesos = async (macroName: string) => {
        try {
        const response = await api.get(`/mesoareas/by-macroarea/${encodeURIComponent(macroName)}`);
        setMesos(response.data);
        } catch (error) {
        console.error("Erro ao buscar mesoáreas:", error);
        }
    };
  
    useEffect(() => {
    const fetchMacros = async () => {
      try {
        const response = await api.get("/macroareas/");
        setMacros(response.data);
      } catch (error) {
        console.error("Erro ao buscar macroáreas:", error);
      }
    };

    fetchMacros();
  }, []);


    return (
        <View>
            <TouchableOpacity style={[styles.container]}>
                <View style={[styles.innerContainer]}>
                    <Text>{macroarea}</Text>
                    <Text>{mesoarea}</Text>
                </View>
                <TouchableOpacity style={[styles.iconButton]} onPress={() => setIsModalMacroVisible(true)}>
                    <Ionicons name="list-outline" size={24}></Ionicons>
                </TouchableOpacity>
            </TouchableOpacity>

            <Modal
                visible={isModalMacroVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setIsModalMacroVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <CustomTitle title="Selecione uma Matéria" subtitle="Escolha uma macroárea para continuar"/>
                        <ScrollView style={styles.scrollView} horizontal={false} showsHorizontalScrollIndicator={false}>
                        {macros.map((item) => (
                            <Macroarea
                                key={item.id}
                                nome={item.nome}
                                friendly_name={item.friendly_name}
                                nivel={3.2}
                                onPress={() => handleMacroPress(item.nome)}
                            />
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                          style={styles.modalCloseButton}
                          onPress={() => setIsModalMacroVisible(false)}
                        >
                          <Ionicons name="chevron-back-outline" size={24}></Ionicons>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={isModalMesoVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setIsModalMesoVisible(false)}
                >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                    <CustomTitle title="Escolha uma trilha" subtitle={`Macroárea: ${selectedMacro}`} />
                    <ScrollView style={styles.scrollView}>
                        {mesos.map((item) => (
                        <Macroarea
                                key={item.id}
                                nome={item.nome}
                                friendly_name={item.friendly_name}
                                nivel={3.2}
                                description={item.descricao}
                            />
                        ))}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.modalCloseButton}
                        onPress={() => {setIsModalMesoVisible(false); setIsModalMacroVisible(true)}}
                    >
                        <Ionicons name="chevron-back-outline" size={24} />
                    </TouchableOpacity>
                    </View>
                </View>
                </Modal>
        </View>
    );
};

export default MudarTrilha;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: Spacing.small,
    margin: Spacing.small,
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: Colors.background.medium,
    padding: Spacing.small,
    borderRadius: 8,
  },
  innerContainer: {
    marginVertical: Spacing.small,
    margin: Spacing.small,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  scrollView: {
    maxHeight: "70%",
    width: "100%",
  },
  iconButton: {
    marginVertical: Spacing.small,
    margin: Spacing.small,
    backgroundColor: Colors.pink.ligth,
    padding: Spacing.small,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: Colors.background.ligth,
    padding: Spacing.small,
    borderRadius: 12,
    width: "85%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  modalCloseButton: {
    position: "absolute",
    top: Spacing.large,
    left: Spacing.large,
    zIndex: 1,
  },
  modalCloseIcon: {
    fontSize: 28,
    color: Colors.text,
    fontFamily: Fonts.bold,
  },
})