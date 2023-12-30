import React from 'react'
import VideoContainer from './videoContainer'
import { LocalVideoTrack } from 'agora-rtc-react'

const MyVideo = ({ localCameraTrack }) => {
  return (
    <VideoContainer border={4} label="Yo">
      <LocalVideoTrack
        track={localCameraTrack}
        play
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </VideoContainer>
  )
}

export default MyVideo