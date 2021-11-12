import React from "react";
import { List, Button, Title, Text } from "react-native-paper";
import { View } from "react-native";
import { StyleSheet } from "react-native";
export const Details = ({ navigation }) => {
  const hospital = navigation.getState().routes[1].params.hospital;

  console.log(hospital);

  const Back = () => {
    navigation.navigate("Principal");
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>{hospital?.title}</Title>
      <Text style={styles.item}>Endereço:</Text>
      <Text style={styles.description}>{hospital?.description}</Text>
      <Text style={styles.itemEspec}>Especialidades:</Text>
      {hospital.specialtys.map((item, index) => (
        <>
          <List.Item
            style={styles.list}
            title={item.nome}
            left={(props) => <List.Icon {...props} icon={item.icon} />}
          />
        </>
      ))}

      <Button
        labelStyle={{ color: "#FFFFFF" }}
        style={styles.button}
        mode="contained"
        onPress={() => Back()}
      >
        Volta a Lista
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  list:{
    height: 50,
    paddingTop: 10,
    marginBottom: 20
  },
  description: {
    fontSize: 16
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  item: {
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  itemEspec:{
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  button: {
    height: 60,
    marginTop: 10,
    justifyContent: "center",
  },
  buttonOutlined: {
    height: 50,
    marginTop: 10,
    justifyContent: "center",
    borderColor: "#FF6347",
  },
});
