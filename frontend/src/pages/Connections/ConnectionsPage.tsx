import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "@/redux/slices/connectionSlice";

const ConnectionsPage = () => {

    const dispatch = useDispatch();

    const connections = useSelector((store: any) => store?.connections) || [];

    const fetchConnections = async () => {
        try {
            const response = await axios.get(`${process.env.BASE_URL}/user/connections`, {
                withCredentials: true
            });
            dispatch(addConnections(response?.data?.connections));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if(!(connections?.length > 0)) {
            fetchConnections();
        }
    }, []);

    return (
        <div className="lg:p-4">
            <div className="text-xl md:text-3xl font-bold text-indigo-600">Connections</div>
            {
                connections && connections?.length > 0 ? (
                    <div>
                        {
                            connections?.map((connection: any) => (
                                <div>
                                    {connection?.firstName} {connection?.lastName}
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div>No Connections Found.</div>
                )
            }
        </div>
    );
};

export default ConnectionsPage;