import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity
} from "react-native";
import CustomInput from "../../../components/Input";
import CustomButton from "../../../components/Button";
import CustomTitle from "../../../components/Title";
import styles from "./styles";

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("")
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const validatePassword = () => {
    if (password.length < 8 && password.length != 0) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      setIsPasswordValid(false);
      return;
    }
    if (password !== confirmPassword && confirmPassword.length != 0) {
      setErrorConfirm("As senhas não coincidem.");
      setIsPasswordValid(false);
      return;
    }
    setError("");
    setErrorConfirm("");
    setIsPasswordValid(true);
  };

  useEffect(() => {
    validatePassword();
  }, [password, confirmPassword]);

  const handleSignUp = () => {
    if (!isPasswordValid) {
      Alert.alert("Erro", "As senhas devem coincidir");
      return;
    }

    if (username.length == 0 || email.length == 0 || password.length == 0){
      Alert.alert("Erro", "Todos os campos devem estar preenchidos");
      return;
    }

    // Proceed with sign up
    Alert.alert("Cadastro realizado!", `Bem-vindo, ${username}!`);
    navigation.navigate("Login")
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <CustomTitle
          title="Crie sua conta"
          subtitle="Preencha os campos abaixo para começar"
        />

        <View style={styles.inputSpacing}>
          <CustomInput
            label="Nome de usuário"
            placeholder="Digite seu nome de usuário"
            value={username}
            onChangeText={setUsername}
            required
          />
        </View>

        <View style={styles.inputSpacing}>
          <CustomInput
            label="Email"
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            required
          />
        </View>

        <View style={styles.inputSpacing}>
          <CustomInput
            label="Senha"
            placeholder="Digite sua senha"
            secure
            value={password}
            onChangeText={setPassword}
            spanText={error}
            required
          />
        </View>

        <View style={styles.inputSpacing}>
          <CustomInput
            label="Confirmar senha"
            placeholder="Digite a senha novamente"
            secure
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            spanText={errorConfirm}
            required
          />
        </View>
        <View style={styles.buttonSpacing}>
          <CustomButton
            title="Cadastrar"
            fill
            size="large"
            onPress={handleSignUp}
          />
        </View>

        <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Já possui uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Log-In</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
