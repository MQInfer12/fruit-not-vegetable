import {
  RemoteUser,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
} from "agora-rtc-react";
import React, { useState } from "react";
import styled from "styled-components";
import VideoContainer from "./videoContainer";
import MyVideo from "./myVideo";
import colors from "../../../styles/colors";

const Videos = ({ close, remoteUsers, iAmAnfitrion, uidAnfitrion }) => {
  const { isLoading: isLoadingMic, localMicrophoneTrack } =
    useLocalMicrophoneTrack();
  const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);

  const handleMute = () => {
    localMicrophoneTrack.setMuted(!localMicrophoneTrack.muted);
    setMicEnabled(localMicrophoneTrack.muted);
  };

  const handleEnableCamera = () => {
    localCameraTrack.setMuted(!localCameraTrack.muted);
    setCameraEnabled(localCameraTrack.muted);
  };

  usePublish([localMicrophoneTrack, localCameraTrack]);

  audioTracks.map((track) => track.play());

  const deviceLoading = isLoadingMic || isLoadingCam;
  if (deviceLoading)
    return (
      <ChatContainer>
        <small>Cargando dispositivos...</small>
      </ChatContainer>
    );

  return (
    <ChatContainer>
      <Layout>
        <VideosContainer>
          <AnfitrionContainer>
            {iAmAnfitrion ? (
              <MyVideo localCameraTrack={localCameraTrack} />
            ) : (
              <VideoContainer border={4} label="Anfitrión">
                <RemoteUser
                  user={remoteUsers.find((user) => user.uid === uidAnfitrion)}
                />
              </VideoContainer>
            )}
          </AnfitrionContainer>
          <UsersContainer>
            {remoteUsers.length === 0 ? (
              <NoOne>
                <p>Ningún usuario en línea</p>
              </NoOne>
            ) : (
              <>
                {!iAmAnfitrion && (
                  <MyVideo localCameraTrack={localCameraTrack} />
                )}
                {remoteUsers
                  .filter((user) => user.uid !== uidAnfitrion)
                  .map(
                    (user) =>
                      !!user._cname && (
                        <VideoContainer border={4}>
                          <RemoteUser user={user} />
                        </VideoContainer>
                      )
                  )}
              </>
            )}
          </UsersContainer>
        </VideosContainer>
        <ButtonsContainer>
          <IconButton onClick={handleMute} type="secondary">
            {micEnabled ? (
              <i className="fa-solid fa-microphone"></i>
            ) : (
              <i className="fa-solid fa-microphone-slash"></i>
            )}
          </IconButton>
          <IconButton onClick={handleEnableCamera} type="secondary">
            {cameraEnabled ? (
              <i className="fa-solid fa-video"></i>
            ) : (
              <i className="fa-solid fa-video-slash"></i>
            )}
          </IconButton>
          <IconButton
            onClick={close}
            tint={colors.tertiary600}
            type="secondary"
          >
            <i className="fa-solid fa-phone-slash"></i>
          </IconButton>
        </ButtonsContainer>
      </Layout>
    </ChatContainer>
  );
};

export default Videos;

const ChatContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const VideosContainer = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
`;

const AnfitrionContainer = styled.div`
  height: 60%;
`;

const UsersContainer = styled.div`
  height: 40%;
  display: flex;
  overflow-x: auto;
  & > div {
    width: 33.33%;
  }
`;

const NoOne = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-self: center;
  gap: 20px;
`;

const IconButton = styled.button`
  width: 50px;
  height: 50px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 2.5px solid ${(props) => props.tint || colors.tertiary400};
  color: ${(props) => props.tint || colors.tertiary400};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
  &.button {
    cursor: pointer;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.7;
    }
  }
  & > img {
    width: 100%;
    height: 100%;
  }
`;
