import React, { useEffect, useState } from "react";
import axios from "axios";

interface Server {
  id: number;
  name: string;
}

interface Props {
  onChange: (serverId: number) => void;
}

const ServerSelect: React.FC<Props> = ({ onChange }) => {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/servers/")
      .then((res) => {
        setServers(res.data);
        setLoading(false);
        if (res.data.length > 0) {
          setSelected(res.data[0].id);
          onChange(res.data[0].id);
        }
      })
      .catch(console.error);
  }, [onChange]);

  if (loading) return <p>Server laden...</p>;

  return (
    <select
      className="mb-6 p-2 rounded bg-gray-800 text-white"
      value={selected ?? ""}
      onChange={(e) => {
        const id = Number(e.target.value);
        setSelected(id);
        onChange(id);
      }}
    >
      {servers.map((server) => (
        <option key={server.id} value={server.id}>
          {server.name}
        </option>
      ))}
    </select>
  );
};

export default ServerSelect;
