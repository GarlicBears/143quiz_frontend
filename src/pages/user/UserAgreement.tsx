import React from 'react';
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

function UserAgreement() {
  const {
    isOpen: isPrivacyOpen,
    onOpen: onPrivacyOpen,
    onClose: onPrivacyClose,
  } = useDisclosure();

  const privacyPolicyText = `
    제1조 (목적)
    갈릭베어즈(이하 이하 ‘회사’라고 함)는 회사가 제공하고자 하는 서비스 (이하 ‘회사 서비스’)를 이용하는 개인(이하 ‘이용자’ 또는 ‘고객’)의 정보(이하 ‘개인정보’)를 보호하기 위해, 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 ‘정보통신망법’) 등 관련 법령을 준수하고, 서비스 이용자의 개인정보 보호 관련 권익을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침(이하 ‘본 방침’)을 수립합니다.
    
    제2조 (개인정보 처리의 원칙)
    개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할 수 있으며 수집된 개인정보는 개인의 동의와 목적에 한해 제3자에게 제공될 수 있습니다. 또, 법령의 규정 등에 의해 적법하게 제공되는 경우 외에는 수집한 정보의 이용자의 개인정보를 사전에 얻은 동의 없이 제3자에게 제공할 수도 있습니다.
    
    제3조 (보관의 규칙)
    1. 회사는 이용자가 연계된 서비스 범위를 확인할 수 있도록 회사 홈페이지에서 최근 보관 년도를 공표하며 연 결과물을 통해 보관을 구체화하고 있습니다.
    2. 회사는 제1항에 따라 보관을 공개하는 경우 문서 크기, 생성 년도, 활용영역 이용자가 보관을 승인할 수 있도록 합니다.
    
    제4조 (보관의 범경)
    1. 보관은 개인정보 관련 법령, 지침, 고시 또는 규범과 회사 서비스의 경제성과 내용의 변곡에 따라 개정 될 수 있습니다.
    2. 회사는 제1항에 따라 보관을 개정하는 경우 단순 수정 또는 회복 이상의 방법으로 공지합니다.
    회사가 운영하는 인터넷 홈페이지의 최종업데이트 날짜와 관련된 정보 표시등은 보관의 증표로 하며, 수정,보관초소·철거물 또는 이와 비슷한 방법으로 이용자에게 공지하는 방법
    3. 회사는 제2항의 공지는 보관 개정의 성향문서라면 최소 7일 이전에 공지합니다. 다만, 이용자 권리의 중요한 변경이 있는 경우에는 최소 30일 전에 공지합니다.
    
    제5조 (회원 가입을 위한 정보)
    회사는 이용자의 회사 서비스에 대한 회원 가입을 위하여 다음과 같은 정보를 수집합니다.
    1. 필수 수집 정보: 이메일 주소, 휴대번호, 이름, 나이, 성별일원 및 활성원을 포함한 범주
    
    제6조 (일반 인증을 위한 정보)
    회사는 이용자의 본인인증을 위하여 다음과 같은 정보를 수집합니다.
    1. 필수 수집 정보: 휴대폰 번호, 이메일 주소, 이름, 생년월일, 성별, 본인확인(CI), 통신 사업자 정보(안테나 심볼)

    제7조 (회사 서비스 제공을 위한 정보)
    회사는 이용자에게 회사의 서비스를 제공하기 위하여 다음과 같은 정보를 수집합니다.
    1. 필수 수집 정보: 아이디, 이메일 주소, 이름, 생년월일 및 연락처

    제8조 (서비스 이용 및 부정 이용 확인을 위한 정보)
    회사는 이용자의 서비스 이용에 필요한 또는 부정 이용을 확인 위하여 다음과 같은 정보를 수집합니다. (부정 이용의 형태에 따라 수집할 수 있기에, 상황과 수집 데이터 종류 변화에 따른 부정적으로 영향을 미치지 않는 한도안으로, 이후에 필요 등의 추가 정보를 포함하여 요청될 수 있음, 이와 관련된 특이사항을 유의 필요, 모델링 등의 필요없이 통합정보 등을 운영합니다.)
    1. 필수 수집 정보: 서비스 이용기록, 쿠키, 접속장치 정보 및 기기정보

    제9조 (가입경로 추적 방법)
    회사는 다음과 같은 방법으로 이용자의 가입경로를 추적합니다.
    1. 이용자가 회사의 홈페이지에서 자신의 가입경로를 입력하는 방식
    2. 이용자의 세션에서 도출되는 회사의 외부 서비스 도입에 이용자가 자신의 가입경로를 입력하는 방식

    제10조 (가입경로의 이용)
    회사는 가입경로를 다음 각 조건의 요건에 의합니다.
    1. 공정성의 원칙 등 회사의의 원칙에 준수함
    2. 이용자의 의사 표현, 선택의 제한 등이 다른 서비스 개발로 위반 가능
    3. 회사의 서비스 제공하고자 할 경우
    4. 법적 의무와 상호 운영의 고려 등의 이유로 이용 조건, 부정 이용을 포함하여 실제 요청받은 운영에 기초로 추후 책임에 대한 법적 처우를 위한 경우
    5. 가입경로 및 경로에 기반한 이용자 관리 방법을 위한 경우

    제11조 (가입경로의 보유 및 이용 기간)
    회사는 이용자의 가입경로에 대한 개인정보 처리방침에 서술한 정보를 가진 뒤 동의한 가입경로를 보유 및 이용합니다.
    1. 공정한 보관과 회사는 내부 방침에 의해 회사가 보유하고자 하는 개인 정보 이용기간을 확정하고 공표합니다.
    2. 확정된 보관기간 내에서 보유 및 이용에 대한 처리를 가진 경우 가입경로를 보유 및 이용 방침을 확정하고 이행합니다.

  `;
  return (
    <Box>
      <Text
        onClick={onPrivacyOpen}
        textDecoration="underline"
        _hover={{ color: 'orange.500', cursor: 'pointer' }}
      >
        개인정보 수집 및 이용약관 (상세)
      </Text>
      <Modal size="3xl" isOpen={isPrivacyOpen} onClose={onPrivacyClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box mt={35} p={5}>
              <Text>개인 정보 수집 및 이용약관</Text>
              <Text whiteSpace="pre-wrap">{privacyPolicyText}</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default UserAgreement;
