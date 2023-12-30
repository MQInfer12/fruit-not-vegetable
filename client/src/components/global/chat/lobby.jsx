import { useJoin, useRemoteUsers } from "agora-rtc-react";
import React, { useEffect, useState } from "react";
import { useUser } from "../../../context/user";
import Videos from "./videos";
import Button from "../button";
import styled from "styled-components";

const Lobby = ({ close }) => {
  const appId = import.meta.env.VITE_AGORA;
  const remoteUsers = useRemoteUsers();
  const [joined, setJoined] = useState(false);
  const { user } = useUser();
  const iAmAnfitrion = user.rol.includes("v");
  const uidAnfitrion = 1;

  useJoin({
    appid: appId,
    channel: "callcenter",
    token: null,
    uid: iAmAnfitrion ? uidAnfitrion : undefined,
  });

  const anfitrionIn = remoteUsers.find((user) => user.uid === uidAnfitrion);

  useEffect(() => {
    if(!anfitrionIn) {
      setJoined(false);
    }
  }, [remoteUsers]);

  if ((joined && anfitrionIn) || iAmAnfitrion)
    return (
      <Videos
        close={close}
        remoteUsers={remoteUsers}
        iAmAnfitrion={iAmAnfitrion}
        uidAnfitrion={uidAnfitrion}
      />
    );

  return (
    <Container>
      {anfitrionIn ? (
        <>
          <p>¡El anfitrión está en línea para ayudarte!</p>
          <Button type="secondary" onClick={() => setJoined(true)}>Unirse a la llamada</Button>
        </>
      ) : (
        <p>
          El anfitrión no se encuentra en línea ahora mismo, por favor vuelva
          más tarde...
        </p>
      )}
    </Container>
  );
};

export default Lobby;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;