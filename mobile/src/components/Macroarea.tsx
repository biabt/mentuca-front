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
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import * as Progress from 'react-native-progress';

interface MacroareaProps {
  macroarea: string;
  nivel_macroarea: Float;
  onPress?: () => void;
  description?: string;
}

const Macroarea: React.FC<MacroareaProps> = ({
    macroarea,
    nivel_macroarea,
    onPress,
    description,
}) => {

    const [currentMacro, setCurrentMacro] = useState({macroarea});
    const [isModalMesoVisible, setIsModalMesoVisible] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    return (
        <TouchableOpacity style={[styles.container]}>
            <View style={[styles.mainContainer]}>
                <View style={[styles.iconButton]}>
                    <Ionicons name="list-outline" size={24} ></Ionicons>
                </View>
                <View style={[styles.innerContainer]}>
                    <View style={[styles.titleContainer]}>
                        <Text>{macroarea}</Text>
                        {description && 
                        <TouchableOpacity onPress={() => setShowDescription(!showDescription)}>
                            {showDescription ? (
                                <Ionicons name="chevron-up-outline" size={24} ></Ionicons>
                            ) : (
                                <Ionicons name="chevron-down-outline" size={24} ></Ionicons>
                            )}
                        </TouchableOpacity>
                        }
                    </View>
                    {/*barrinha de progresso*/}
                    <View style={[styles.progressBar]}>
                        <Text>{Math.floor(nivel_macroarea)}</Text>
                        <View style={[styles.innerProgressBar]}>
                            <Progress.Bar progress={nivel_macroarea - Math.floor(nivel_macroarea)} height={6} width={null}/>
                        </View>
                        <Text>{Math.ceil(nivel_macroarea)}</Text>
                    </View>
                </View>
            </View>
            {showDescription && <Text>{description}</Text>}
        </TouchableOpacity>
    );
};

export default Macroarea;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginVertical: Spacing.small,
    margin: Spacing.small,
    justifyContent: "flex-start",
    flexDirection: "column",
    backgroundColor: Colors.background.medium,
    padding: Spacing.small,
    borderRadius: 8,
  },
  mainContainer:{
    flexDirection:"row",
  },
  titleContainer:{
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerProgressBar:{
    width: "80%",
  },
  progressBar:{
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerContainer: {
    marginVertical: Spacing.small,
    margin: Spacing.small,
    flexDirection: "column",
    justifyContent: "space-around",
    width: "75%",
  },
  iconButton: {
    marginVertical: Spacing.small,

    backgroundColor: Colors.pink.ligth,
    padding: Spacing.small,
    borderRadius: 8,
    width:"20%",
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