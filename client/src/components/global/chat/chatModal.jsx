import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import colors from "../../../styles/colors";
import Swal from "sweetalert2";
import { channel } from "../../../utilities/pusher";

const ChatModal = ({ close }) => {
  const myVideo = useRef(null);
  const [stream, setStream] = useState();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!navigator.mediaDevices)
      return Swal.fire({
        title: "Ups...",
        text: "Ocurrió un error inesperado",
        icon: "question",
      });
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      })
      .catch((err) => {
        if (err.name === "NotFoundError") {
          Swal.fire({
            title: "Ups...",
            text: "No se encontró la cámara o el micrófono en este dispositivo",
            icon: "question",
          });
          close();
        }
      });
  }, []);

  /* useEffect(() => {
    channel.emit("data", {
      stream
    });
  }, [stream]); */

  return (
    <Container>
      <VideoContainer>
        <video playsInline autoPlay controls muted ref={myVideo} />
      </VideoContainer>
    </Container>
  );
};

export default ChatModal;

const Container = styled.div`
  width: 800px;
  height: 550px;
  background-color: ${colors.primary300};
  padding: 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: relative;
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 4px solid ${colors.primary500};
  & > video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
