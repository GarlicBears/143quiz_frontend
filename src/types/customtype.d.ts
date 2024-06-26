// 이미지 파일 타입 추가
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

// 오디오 파일 타입 추가
declare module '*.mp3' {
  const src: string;
  export default src;
}

// 글로벌 카카오 타입 추가(공유하기 기능 용)
interface Window {
  Kakao: any;
}
