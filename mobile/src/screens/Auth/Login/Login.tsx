import { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import CustomButton from "../../../components/Button";
import CustomInput from "../../../components/Input";
import CustomTitle from "../../../components/Title";
import styles from "./styles";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailToReset, setEmailToReset] = useState("");

  const handlePasswordReset = () => {
    console.log("Resetting password for:", emailToReset);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <CustomTitle
        title="Bem-vindo de volta!"
        subtitle="Pronto para mais uma sessão de estudos?"
      />

      <View style={styles.inputSpacing}>
        <CustomInput
          label="Email"
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputSpacing}>
        <CustomInput
          label="Senha"
          placeholder="Digite sua senha"
          secure
        />
      </View>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.linkText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <View style={styles.buttonSpacing}>
        <CustomButton size="large" title="Entrar" fill onPress={login} />
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Não tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.linkText}> Cadastre-se</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <CustomTitle title="Redefinir Senha" subtitle="Uma mensagem será enviada para o seu email para a recuperação da senha" titleStyle={styles.modalTitle}></CustomTitle>
            <CustomInput
              label="E-mail de recuperação"
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              value={emailToReset}
              onChangeText={setEmailToReset}
            />
            <CustomButton title="Enviar" fill onPress={handlePasswordReset}/>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalCloseIcon}>×</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
