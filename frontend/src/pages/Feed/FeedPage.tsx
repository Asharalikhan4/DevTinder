import { addFeed } from "@/redux/slices/feedSlice";
import axios from "axios";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const FeedPage: FC = () => {

    const dispatch = useDispatch();

    const feed = useSelector((state: any) => state.feed);

    const getFeed = async () => {
        try {
            const response = await axios.get(`${process.env.BASE_URL}/feed`, {
                withCredentials: true
            });
            dispatch(addFeed(response.data));
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!feed) {
            getFeed();
        };
    }, []);

    return (
        <div>
            <h1 className="text-4xl">Home Page</h1>
        </div>
    );
};

export default FeedPage;