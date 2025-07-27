"use client";
import { userConnections } from "@/actions/user";
import ConnectionCard from "@/components/ConnectionCard/ConnectionCard";
import { useEffect, useState } from "react";

export default function ConnectionsPage() {
  
  const [connections, setConnections] = useState([]);
  
  const getUserConnection = async () => {
    try {
      const userConnection = await userConnections()
      setConnections(userConnection?.data);
    } catch (err) {
      console.log(err)
    }
  };
  
  useEffect(() => {
    getUserConnection();
  }, []);
  
  return (
    <section className="py-8 px-4 lg:px-12">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Your Connections
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {connections?.map((user) => (
          <ConnectionCard key={user._id} user={user} />
        ))}
      </div>
    </section>
  );
}
