import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Icon } from "native-base";

export default function App() {
  const [value, onChangeText] = useState("");
  const [Data, setData] = useState(["item 1", "A"]);
  const [isEdit, setisEdit] = useState(false);
  const [index, setIndex] = useState(0);

  const Submit = () => {
    if (value == "") return;
    if (!isEdit) {
      setData([...Data, value]);
      onChangeText("");
    } else {
      let a = [...Data];
      a[index] = value;
      setData(a);
      onChangeText("");
      setisEdit(false);
    }
  };

  const Delete = (index) => {
    console.log(index);
    let a = [...Data];
    a.splice(index, 1);
    setData(a);
  };

  const Edit = (index) => {
    setisEdit(true);
    setIndex(index);
    onChangeText(Data[index]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textHeader}>Workshop Todo List</Text>
      <View style={styles.cardView}>
        <View
          style={{
            height: 70,
            width: "100%",
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={{ height: 70, flex: 1, fontSize: 20, marginLeft: 20 }}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            placeholder="Add an item!"
          />
          <TouchableOpacity onPress={Submit} style={{ width: 50 }}>
            <Icon style={styles.iconStyle} type="AntDesign" name="arrowright" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={Data}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: 70,
                  borderBottomWidth: 1,
                  borderColor: "gray",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 20, marginLeft: 20 }}>{item}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <TouchableOpacity onPress={() => Edit(index)}>
                    <Icon style={styles.iconStyle} type="Entypo" name="edit" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Delete(index)}>
                    <Icon style={styles.iconStyle} type="Entypo" name="cross" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    backgroundColor: "red",
    alignItems: "center",
  },
  textHeader: { fontSize: 30, color: "white", marginTop: 20 },
  cardView: {
    width: "95%",
    height: "100%",
    backgroundColor: "white",
    marginTop: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  iconStyle: { fontSize: 25, color: "red" },
});
