import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { addFeed } from "@/redux/slices/feedSlice";
import axios from "axios";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const FeedPage: FC = () => {

    const dispatch = useDispatch();

    const feed = useSelector((state: any) => state?.feed) || [];

    const getFeed = async () => {
        try {
            const response = await axios.get(`${process.env.BASE_URL}/user/feed`, {
                withCredentials: true
            });
            dispatch(addFeed(response?.data?.data));
            toast.success(response?.data?.message);
        } catch (error) {
            toast.error("Something Went Wrong")
        }
    };

    useEffect(() => {
        if (!(feed?.length > 0)) {
            getFeed();
        };
    }, []);

    return (
        <div className="">
            {
                feed?.map((profile: any) => (
                    <ProfileCard profile={profile} onLike={() => {}} onDislike={() => {}} />
                ))
            }
        </div>
    );
};

export default FeedPage;