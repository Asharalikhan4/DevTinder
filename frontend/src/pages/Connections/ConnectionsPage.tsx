import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "@/redux/slices/connectionSlice";
import toast from "react-hot-toast";
import ConnectionRequestCard from "@/components/ConnectionRequestCard/ConnectionRequestCard";
import CustomPage from "@/components/CustomPage/CustomPage";

const ConnectionsPage = () => {

    const dispatch = useDispatch();

    const connections = useSelector((store: any) => store?.connections) || [];

    const fetchConnections = async () => {
        try {
            const response = await axios.get(`${process.env.BASE_URL}/user/connections`, {
                withCredentials: true
            });
            dispatch(addConnections(response?.data?.connections));
            toast.success(response?.data?.message);
        } catch (error) {
            toast.error("Something Went Wrong.");
        }
    };

    useEffect(() => {
        if(!(connections?.length > 0)) {
            fetchConnections();
        }
    }, []);

    return (
        <CustomPage className="lg:p-4">
            <div className="text-xl md:text-3xl font-bold text-indigo-600">Connections</div>
            {
                connections && connections?.length > 0 ? (
                    <div>
                        {
                            connections?.map((connection: any) => (
                                <ConnectionRequestCard request={connection} onAccept={() => {}} onReject={() => {}}  />
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

export default ConnectionsPage;