import { FC, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { feed } from "../../actions/User";
import CustomTinderCardDeck from "../../components/CustomTinderCardDeck/CustomTinderCardDeck";
import SafeScreen from "../../components/SafeScreen/SafeScreen";

const FeedScreen: FC = () => {

    const [userFeed, setUserFeed] = useState([]);

    const getUserFeed = async () => {
        try {
            const allUsers = await feed();
            Toast.show({
                type: "success",
                text2: allUsers?.message || "User feed fetched successfully!",
            });
            setUserFeed(allUsers?.data || []);
        } catch (error) {
            console.error("Error fetching user feed:", error);
        }
    };

    useEffect(() => {
        getUserFeed();
    }, []);

    return (
        <SafeScreen style={{ flex: 1 }}>
            <CustomTinderCardDeck />
        </SafeScreen>
    );
};

export default FeedScreen;