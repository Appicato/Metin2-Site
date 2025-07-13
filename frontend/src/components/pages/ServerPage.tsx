import React, { useEffect, useState } from "react";
import { getServers } from "../services/api";
import ServerCard from "../components/servers/ServerCard";

const ServerPage = () => {
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServers().then((res) => {
      setServers(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Lade Server...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Server</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {servers.map((s) => (
          <ServerCard key={s.id} server={s} />
        ))}
      </div>
    </div>
  );
};

export default ServerPage;
