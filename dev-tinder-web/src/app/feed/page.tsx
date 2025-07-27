"use client";
import { feed } from "@/actions/user";
import CustomTinderCard from "@/components/CustomTinderCardDeck/CustomTinderCardDeck";
import { FC, useEffect, useState } from "react";

const FeedPage: FC = () => {
    const [users, setUsers] = useState([]);

    async function fetchFeed() {
        const data = await feed();
        setUsers(data?.data)
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    return (
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center min-h-screen p-4">
            <CustomTinderCard />
        </div>
    );
};

export default FeedPage;