import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { FavoriteProvider } from "./src/context/FavoriteContext";
import StackNavigator from "./src/navigation/StackNavigator";
import { BorrowProvider } from "./src/context/BorrowContext";

export default function App() {
  return (
    <FavoriteProvider>
      <BorrowProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </BorrowProvider>
    </FavoriteProvider>
  );
}
