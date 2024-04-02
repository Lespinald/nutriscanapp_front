import { CSSProperties } from "react";

const ProfileLogo = ({className ,style}: {className?: string, style?: CSSProperties}) => {
  return (
    <svg className={className} style={style} width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24.5 2C12.0736 2 2 12.0736 2 24.5C2 36.9263 12.0736 47 24.5 47C36.9263 47 47 36.9263 47 24.5C47 12.0736 36.9263 2 24.5 2Z" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.10971 38.7779C7.10971 38.7779 12.125 32.3751 24.5 32.3751C36.875 32.3751 41.8904 38.7779 41.8904 38.7779" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M24.5 24.4999C28.228 24.4999 31.25 21.4779 31.25 17.7499C31.25 14.022 28.228 10.9999 24.5 10.9999C20.7719 10.9999 17.75 14.022 17.75 17.7499C17.75 21.4779 20.7719 24.4999 24.5 24.4999Z" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}


export default ProfileLogo;
