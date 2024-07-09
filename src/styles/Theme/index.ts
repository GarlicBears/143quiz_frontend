import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    customOrange: {
      50: '#ffece3', // 밝은 색상 (secondary-color의 밝은 버전)
      100: '#ffd8c8', // 밝은 색상
      200: '#ffb691', // 중간 색상 (secondary-color의 중간 버전)
      300: '#ffa46b', // 중간 색상
      400: '#ff8d41', // 중간 색상
      500: '#FF711A', // primary-color
      600: '#e66119', // primary-color의 어두운 버전
      700: '#cc5317', // primary-color의 더 어두운 버전
      800: '#b34414', // primary-color의 더 더 어두운 버전
      900: '#8f340f', // 가장 어두운 색상
    },
  },
});

export default customTheme;
