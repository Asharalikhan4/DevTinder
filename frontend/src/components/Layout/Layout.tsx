import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/redux/slices/userSlice";

const Layout: FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((store:any) => store?.user);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${process.env.BASE_URL}/user/user-profile`, {
                withCredentials: true
            });
            dispatch(addUser(response?.data?.user));
        } catch (error) {
            navigate("/signin");
            console.error(error);
        };
    };

    useEffect(() => {
        if(!user) {
            fetchUser();
        }
    }, []);

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default Layout;