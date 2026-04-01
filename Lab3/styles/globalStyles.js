import { StyleSheet } from "react-native";

export const lightTheme = {
  background: "#F2F2F7",
  card: "#FFFFFF",
  text: "#1C1C1E",
  primary: "#007AFF",
};

export const darkTheme = {
  background: "#000000",
  card: "#1C1C1E",
  text: "#FFFFFF",
  primary: "#0A84FF",
};

export const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
      padding: 16,
    },

    button: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",

      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 4 },
      elevation: 5,
    },

    scoreCard: {
      width: "80%",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: theme.card,
      marginBottom: 10,

      alignItems: "center",
      justifyContent: "center",

      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 4,
     },

    card: {
      width: "80%",
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: 20,
      backgroundColor: theme.card,
      marginBottom: 10,

      flexDirection: "row",
      alignItems: "center",

      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 4,
    },

    text: {
      fontSize: 16,
      color: theme.text,
      marginLeft: 10,
    },

    title: {
      fontSize: 32,
      fontWeight: "700",
      color: theme.text,
      textAlign: "center",
    },

    switchRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "80%",
      marginTop: 20,
    },
  });