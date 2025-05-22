import { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface SafeScreenPropsTypes {
    children: React.ReactNode;
    style?: object; // Add the style property as optional
};

const SafeScreen: FC<SafeScreenPropsTypes> = ({ children, style }) => {
    return (
        <SafeAreaView style={style}>
            {children}
        </SafeAreaView>
    );
};

export default SafeScreen;