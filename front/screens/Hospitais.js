import React from "react";
import { List, Surface } from "react-native-paper";
import { StyleSheet } from "react-native";

export const Hospitais = ({ navigation }) => {
  const listaHospital = [
    {
      title: "São Luiz",
      description:
        "R. Francisco Marengo, 1312 - Jardim Analia Franco, São Paulo - SP, 03313-001",
      specialtys: [
        {
          nome: "Clínico Geral",
          icon: "hospital",
        },
        {
          nome: "Dermatologista",
          icon: "nature-people",
        },
        {
          nome: "Cardiologista",
          icon: "cards-heart",
        },
      ],
    },
    {
      title: "Beneficência Portuguesa",
      description:
        "R. Maestro Cardim, 1041 - Bela Vista, São Paulo - SP, 01323-130",
        specialtys: [
            {
              nome: "Clínico Geral",
              icon: "hospital",
            },
            {
              nome: "Dermatologista",
              icon: "nature-people",
            },
            {
              nome: "Cardiologista",
              icon: "cards-heart",
            },
          ],
    },
    {
      title: "São Luiz",
      description:
        "R. Francisco Marengo, 1312 - Jardim Analia Franco, São Paulo - SP, 03313-001",
        specialtys: [
            {
              nome: "Clínico Geral",
              icon: "hospital",
            },
            {
              nome: "Dermatologista",
              icon: "nature-people",
            },
            {
              nome: "Cardiologista",
              icon: "cards-heart",
            },
          ],
    },
    {
      title: "Beneficência Portuguesa",
      description:
        "R. Maestro Cardim, 1041 - Bela Vista, São Paulo - SP, 01323-130",
        specialtys: [
            {
              nome: "Clínico Geral",
              icon: "hospital",
            },
            {
              nome: "Dermatologista",
              icon: "nature-people",
            },
            {
              nome: "Cardiologista",
              icon: "cards-heart",
            },
          ],
    },
  ];

  const DetailsHospital = (item) => {
    navigation.navigate("Details", {hospital: item})
  };

  return listaHospital.map((item, index) => (
    <Surface key={index} style={styles.surface}>
      <List.Item
        title={item.title}
        description={item.description}
        onPress={() => DetailsHospital(item)}
        left={(props) => <List.Icon {...props} icon="hospital" />}
      />
    </Surface>
  ));
};

const styles = StyleSheet.create({
  surface: {
    padding: 5,
    margin: 10,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});
