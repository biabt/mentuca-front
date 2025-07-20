import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Modal
} from "react-native";
import { Colors, Fonts, Spacing} from "../themes";
import { Ionicons } from '@expo/vector-icons'; 
import CustomTitle from "./Title";

interface MudarTrilhaProps {
  macroarea: string;
  mesoarea: string;
}

const MudarTrilha: React.FC<MudarTrilhaProps> = ({
    macroarea,
    mesoarea,
}) => {

    const [currentMacro, setCurrentMacro] = useState({macroarea});

    const [isModalMacroVisible, setIsModalMacroVisible] = useState(false);
    const [isModalMesoVisible, setIsModalMesoVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity style={[styles.container]}>
                <View style={[styles.innerContainer]}>
                    <Text>{macroarea}</Text>
                    <Text>{mesoarea}</Text>
                </View>
                <TouchableOpacity style={[styles.iconButton]}>
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
    padding: Spacing.xlarge,
    borderRadius: 12,
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
})