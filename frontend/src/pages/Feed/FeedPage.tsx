import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { addFeed, removeSingleUserFromFeed } from "../../redux/slices/feedSlice";
import axios from "axios";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import CustomPage from "../../components/CustomPage/CustomPage";

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

    const handleAction = async (status: string, _id: string) => {
        try {
            const response = await axios.post(`${process.env.BASE_URL}/request/send/${status}/${_id}`, {}, {
                withCredentials: true
            });
            toast.success(response?.data?.message);
            dispatch(removeSingleUserFromFeed(_id));
        } catch (error) {
            toast.error("Something Went Wrong");
        };
    }

    useEffect(() => {
        if (!(feed?.length > 0)) {
            getFeed();
        };
    }, []);

    if(feed?.length === 0) {
        return <div>No Profiles Found.</div>;
    };

    return (
        <CustomPage className="flex justify-center items-center">
            {/* {
                feed?.map((profile: any) => ( */}
                    <ProfileCard profile={feed[0]} handleAction={handleAction} />
                {/* ))
            } */}
        </CustomPage>
    );
};

export default FeedPage;