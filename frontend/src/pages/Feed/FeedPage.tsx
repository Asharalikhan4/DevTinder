import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { addFeed } from "@/redux/slices/feedSlice";
import axios from "axios";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FeedPage: FC = () => {

    const dispatch = useDispatch();

    const feed = useSelector((state: any) => state.feed) || [];

    const getFeed = async () => {
        try {
            const response = await axios.get(`${process.env.BASE_URL}/user/feed`, {
                withCredentials: true
            });
            dispatch(addFeed(response?.data?.data));
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect(() => {
    //     if (!feed) {
    //         getFeed();
    //     };
    // }, []);

    useEffect(() => {
        getFeed();
    }, [])

    console.log("this is feed", feed);

    return (
        <div className="flex justify-center items-center h-full mt-5">
            <ProfileCard profile={feed[0]} onLike={() => {}} onDislike={() => {}} />
        </div>
    );
};

export default FeedPage;