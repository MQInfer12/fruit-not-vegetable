import React, { useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import colors from '../../styles/colors'

const InputText = ({ text, value, onChange, textarea, error, trigger }) => {
  const renders = useRef(0);

  useEffect(() => {
    renders.current += 1;
  }, [value])
  
  return (
    <InputContainer>
      {
        !textarea ?
        <input required id={text} type="text" 
          value={value} 
          onChange={onChange} 
        /> :
        <textarea required id={text}
          value={value} 
          onChange={onChange} 
        />
      }
      <label htmlFor={text}>{text}</label>
      {
        ((error && renders.current > 2) || (error && trigger)) &&
        <div className='error-container'>
          <i className="fa-solid fa-circle-exclamation"></i>
          <div className='popup'>{error}</div>
        </div>
      }
    </InputContainer>
  )
}

export default InputText

const InputContainer = styled.div`
  position: relative;
  width: 100%;

  & > label {
    position: absolute;
    pointer-events: none;
    left: 12px;
    top: 12px;
    transition: all 0.5s;
    padding: 2px 6px;
  }

  & > input, textarea {
    padding: 12px;
    font-size: 1rem;
    outline: none;
    resize: none;
    border: 1px solid ${colors.gray200};
    width: 100%;

    @media screen and (max-width: 700px) {
      width: 100%;
    }

    &:focus ~ label, &:valid ~ label {
      font-size: .8rem;
      top: -14px;
      color: ${colors.white};
      background-color: ${colors.primary500};
    }
  }

  & > .error-container {
    animation: appear .5s;
    position: absolute;
    top: 12px;
    right: 12px;

    & > i {
      font-size: 1.2rem;
      color: ${colors.danger};

      &:hover ~ .popup {
        display: inline;
      }
    }

    & > .popup {
      display: none;
      z-index: 5;
      position: absolute;
      top: 22px;
      right: 8px;
      background-color: ${colors.white};
      box-shadow: 0px 0px 30px -15px rgba(0,0,0,0.3);
      border: 1px solid ${colors.primary300};
      padding: 10px 15px;
      min-width: 200px;
      border-radius: 10px 0 10px 10px;
      font-size: .8rem;
      animation: appear .5s;
    }
    
    @keyframes appear {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`;