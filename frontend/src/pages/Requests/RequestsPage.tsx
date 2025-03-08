import { addRequests, removeSingleRequest } from "../../redux/slices/requestSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import ConnectionRequestCard from "../../components/ConnectionRequestCard/ConnectionRequestCard";
import CustomPage from "../../components/CustomPage/CustomPage";

const RequestsPage = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store: any) => store?.requests) || [];

    const fetchRequests = async () => {
        try {
            const response = await axios.get(`${process.env.BASE_URL}/user/connection-requests`, {
                withCredentials: true
            });
            dispatch(addRequests(response?.data?.data));
            toast.success(response?.data?.message);
        } catch (error) {
            toast.error("Something Went Wrong.");
        };
    };

    const handleReviewRequest = async (status: string, _id: string) => {
        try {
            const response = await axios.post(`${process.env.BASE_URL}/request/review/${status}/${_id}`, {}, {
                withCredentials: true,
            });
            dispatch(removeSingleRequest(_id));
            toast.success(response?.data?.message);
        } catch (error) {
            toast.error("Something Went Wrong.");
        }
    };

    useEffect(() => {
        if (!(requests?.length > 0)) {
            fetchRequests();
        };
    }, []);

    return (
        // className="lg:p-4"
        <CustomPage>
            <div className="text-xl md:text-3xl font-bold text-indigo-600 mb-2 md:mb-4">Requests</div>
            {
                requests && requests?.length > 0 ? (
                    <div>
                        {
                            requests?.map((request: any) => (
                                <ConnectionRequestCard request={request} reviewRequest={handleReviewRequest} />
                            ))
                        }
                    </div>
                ) : (
                    <div>No Connections Found.</div>
                )
            }
        </CustomPage>
    );
};

export default RequestsPage;