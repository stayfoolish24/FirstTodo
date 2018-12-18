/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react"
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Dimensions,
  ScrollView
} from "react-native"
import ToDo from "./ToDo"
import uuidv1 from "uuid/v1"

const { height, width } = Dimensions.get("window")

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
})

export default class App extends Component {
  state = {
    newToDo: "",
    toDos: {}
  }
  render() {
    const { newToDo, toDos } = this.state
    return (
      <View style={styles.container}>
        <StatusBar barstyle="light-content" />
        <Text style={styles.title}>First To Do </Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._contollNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).map(toDo => (
              <ToDo key={toDo.id} deleteToDo={this._deleteToDo} {...toDo} />
            ))}
          </ScrollView>
        </View>
      </View>
    )
  }
  _contollNewToDo = text => {
    this.setState({
      newToDo: text
    })
  }
  _addToDo = () => {
    const { newToDo } = this.state
    if (newToDo !== "") {
      this.setState(prevState => {
        const ID = uuidv1()
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createdAt: Date.now()
          }
        }
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject
          }
        }
        return { ...newState }
      })
    }
  }
  _deleteToDo = id => {
    this.setState(prevState => {
      const toDos = prevState.toDos
      delete toDos[id]
      const newState = {
        ...prevState,
        ...toDos
      }
      return { ...newState }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FBF76A"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  title: {
    color: "black",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25
  },
  toDos: {
    alignItems: "center"
  }
})
