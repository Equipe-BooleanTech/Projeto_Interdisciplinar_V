import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Página Inicial</Text>
      <Button title="Login" onPress={() => router.push('/Login')} />
      <Button title="Cadastrar" onPress={() => router.push("/Cadastro")} />
    </View>
  )
}