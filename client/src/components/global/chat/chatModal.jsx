import React from "react";
import styled from "styled-components";
import colors from "../../../styles/colors";
import AgoraRTC, {
  AgoraRTCProvider,
  useRTCClient,
} from "agora-rtc-react";
import Lobby from "./lobby";

const ChatModal = ({ close }) => {
  const client = useRTCClient(
    AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
  );
  return (
    <Container>
      <AgoraRTCProvider client={client}>
        <Lobby close={close} />
      </AgoraRTCProvider>
    </Container>
  );
};

export default ChatModal;

const Container = styled.div`
  width: 800px;
  height: 620px;
  background-color: ${colors.primary300};
  padding: 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: relative;
`;
