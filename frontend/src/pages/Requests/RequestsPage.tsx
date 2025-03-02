import { addRequests } from "@/redux/slices/requestSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const RequestsPage = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store: any) => store?.requests) || [];

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${process.env.BASE_URL}/user/connection-requests`, {
                withCredentials: true
            });
            dispatch(addRequests(response?.data?.data));
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        if(!(requests?.length > 0)) {
            fetchRequests();
        };
    }, []);

    return (
        <div>
            <h1>Requests</h1>
        </div>
    );
};

export default RequestsPage;