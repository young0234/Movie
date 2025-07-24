# **Weather site Project:** 
### 영화 사이트(작성 중입니다.)

<br/>
  
**박서영, Park seo young**  

<br/>

##  관련 링크
- [🎨 디자인 시안](https://www.figma.com/design/JapiGX58Kp2bd39g9wffDY/TMDB?node-id=0-1&t=lEP3xks9N902U0Yv-1)
- [🌐 DEMO 페이지](https://68799a0e0f449200083c8766--movie501.netlify.app/)

</br>
</br>
</br>


---

#### **Schedule** 
> **2025.07.10. - 2025.07.17. (5h - 6h, weekdays only)**

</br>

> 1. Design: 2025.07.10.- 2028.07.11.
> 2. Development: 2025.07.11. - 2025.07.17.


<br/>
<br/>
<br/>

## 목차
1. [프로젝트 개요](#1-프로젝트-개요)   
2. [파일 구성](#2-파일-구성)   
3. [주요 기능 소개](#3-주요-기능-소개)    
4. [작업 환경](#4-작업-환경)   

</br>
</br>
</br>

---

## 1. 프로젝트 개요

### 1.1. 작업 배경
다양한 위치별 날씨를 손쉽게 확인할 수 있는 직관적인 인터페이스에 대한 수요가 꾸준히 증가하고 있습니다. 사용자들은 텍스트뿐만 아니라 시각적인 요소를 통해 빠르고 명확하게 날씨 정보를 파악하고자 하며, 이에 따른 동적인 UI 구현이 필요해졌습니다.

기술의 발전과 함께 사용자들은 더욱 빠르고 편리한 정보 접근을 기대하고 있습니다. 특히 모바일과 웹 환경에서는 단순한 정보 제공을 넘어, 시각적이고 직관적인 인터페이스가 필수적이며, 이는 사용자 만족도와 서비스 경쟁력 향상에 크게 기여합니다. 따라서 위치와 날씨 변화에 따라 동적으로 반응하는 UI를 구현하는 것은 현대 사용자 경험 디자인에서 중요한 요소로 자리 잡고 있습니다.

</br>

이 프로젝트의 목적은 다음과 같다.   
1. 버튼 클릭을 통해 다양한 위치의 날씨 정보와 아이콘이 즉시 변경되어 사용자에게 명확한 정보를 제공합니다.
2. 위치와 날씨에 맞는 배경 이미지 전환으로 사용자가 현재 날씨 분위기를 시각적으로 느낄 수 있도록 합니다.
3. 실시간 정보 업데이트와 함께 UI 요소가 변화하는 인터랙티브한 환경을 구축하여 사용자 경험을 극대화합니다.



</br>
</br>
</br>

### 1.2. 키워드

1. **동적 UI (Dynamic UI)**   
  1.1. 사용자 입력에 따라 화면이 실시간으로 변화하는 인터페이스

</br>

2. **위치 기반 날씨 정보 (Location-based Weather)**   
  2.1. 사용자의 선택한 위치에 맞춘 맞춤형 날씨 데이터 제공
   
</br>

4. **시각적 피드백 (Visual Feedback)**   
  3.1. 아이콘과 배경 이미지로 직관적인 상태 전달

   </br>
   </br>
   </br>
   
---

## 2. 파일 구성
```
🌱 artcenter  
 ┣ 📂 public
 ┣ 📂 src
 ┣ 📄 .gitignore
 ┣ 📄 packgage-lock.json       
 ┗ 📄 packgage.json 
     
```

   </br>
   </br>
   </br>

---

## 3. 주요 기능 소개

### 3.1. 메인 페이지
#### 3.1.1. 전체적 레이아웃 및 네비게이션

![movie01](https://github.com/user-attachments/assets/7ce8ad27-8c7a-4491-bd8c-d4d9de203b74)
1. 하단 버튼을 클릭하면 휴태폰 화면의 내용과 배뎡이 전체 배경이 변경되어 직관적으로 확인할 수 있습니다.
2. 버튼을 클릭하면 클릭 효과가 나타나 눌렀음을 알 수 있도록 하였습니다.

</br>
</br>
</br>

#### 3.1.2. 배너 및 메인 비주얼 섹션

![movie02](https://github.com/user-attachments/assets/d1d2346b-e649-4e60-b94f-af48cbc52076)
1. 상세한 정보는 모달 창을 통해 알 수 있도록 하여 사용자의 호기심을 유도하였습니다.
2. 추후에는 모달이 아닌 별도의 서브페이지로 이동하도록 변경할 예정입니다.

</br>
</br>
</br>

#### 3.1.3. 최신 예고편

![movie03](https://github.com/user-attachments/assets/626767d7-bc48-4985-baa7-71182e86064b)
1. 하단 버튼을 클릭하면 휴태폰 화면의 내용과 배뎡이 전체 배경이 변경되어 직관적으로 확인할 수 있습니다.
2. 버튼을 클릭하면 클릭 효과가 나타나 눌렀음을 알 수 있도록 하였습니다.

</br>
</br>
</br>

#### 3.1.4. 영화 슬라이드 섹션

![movie02](https://github.com/user-attachments/assets/d1d2346b-e649-4e60-b94f-af48cbc52076)
1. 상세한 정보는 모달 창을 통해 알 수 있도록 하여 사용자의 호기심을 유도하였습니다.
2. 추후에는 모달이 아닌 별도의 서브페이지로 이동하도록 변경할 예정입니다.

</br>
</br>
</br>


#### 3.1.5. TV 슬라이드 섹션

![movie05](https://github.com/user-attachments/assets/b9ec672f-1c1a-47a1-a7ff-7372d75406bc)
1. 상세한 정보는 모달 창을 통해 알 수 있도록 하여 사용자의 호기심을 유도하였습니다.
2. 추후에는 모달이 아닌 별도의 서브페이지로 이동하도록 변경할 예정입니다.

</br>
</br>
</br>


---

### 3.2. 서브 페이지


#### 3.2.1. 영화 검색 및 전체 페이지

![movie06](https://github.com/user-attachments/assets/395c3e68-07ee-420e-a1c5-a814747f14a6)
1. 상단에 이력서, 이메일, 홈 버튼을 배치하여 사용자가 필요한 정보에 빠르게 접근할 수 있도록 접근성을 고려한 UI로 구성하였습니다.
2. 이력서는 클릭 시 바로 다운로드되며, 이메일은 클릭만으로 자동 복사되도록 설정하여 사용자 편의성을 높였습니다.

</br>
</br>
</br>

#### 3.2.2. TV 검색 및 전체 페이지

![movie07](https://github.com/user-attachments/assets/ea49a2cf-75a0-442b-a3ab-ba6ab2ab4b60)
1. 각각의 버튼은 관련 페이지로 직접 연결되어 있어, 원하는 콘텐츠를 빠르게 확인할 수 있습니다.
2. 스크롤 시에도 주요 요소들은 고정된 위치에 유지되어, 필요한 정보를 언제든지 쉽게 확인할 수 있도록 구성했습니다.

</br>
</br>
</br>

#### 3.2.3. 영화 상세페이지

![movie08](https://github.com/user-attachments/assets/73d6fd9d-1941-4a51-a7f6-a83ef82ccfb0)
1. 각 프로젝트의 기획 의도와 제작 과정을 상세히 서술하여, 작업에 대한 이해도를 높였습니다.
2. 페이지 하단에는 스크롤이 일정 수준 이상 내려갔을 때 자동으로 나타나는 탑 버튼(Top Button)을 적용해, 긴 콘텐츠 탐색 후에도 쉽게 상단으로 이동할 수 있도록 했습니다.

</br>
</br>
</br>

#### 3.2.4. 마이 페이지

![movie09](https://github.com/user-attachments/assets/b5e10bbc-d2d3-4f19-9656-e45e56e9501e)
1. 각각의 버튼은 관련 페이지로 직접 연결되어 있어, 원하는 콘텐츠를 빠르게 확인할 수 있습니다.
2. 스크롤 시에도 주요 요소들은 고정된 위치에 유지되어, 필요한 정보를 언제든지 쉽게 확인할 수 있도록 구성했습니다.

</br>
</br>
</br>

#### 3.2.5. 로그인 페이지

![movie10](https://github.com/user-attachments/assets/60b025b3-db0b-4d6c-985c-e5b0399564ba)
1. 각 프로젝트의 기획 의도와 제작 과정을 상세히 서술하여, 작업에 대한 이해도를 높였습니다.
2. 페이지 하단에는 스크롤이 일정 수준 이상 내려갔을 때 자동으로 나타나는 탑 버튼(Top Button)을 적용해, 긴 콘텐츠 탐색 후에도 쉽게 상단으로 이동할 수 있도록 했습니다.

</br>
</br>
</br>

#### 3.2.6. 404 페이지

![movie11](https://github.com/user-attachments/assets/43dee77d-567b-440c-b9fe-fa35e523d89e)
1. 각 프로젝트의 기획 의도와 제작 과정을 상세히 서술하여, 작업에 대한 이해도를 높였습니다.
2. 페이지 하단에는 스크롤이 일정 수준 이상 내려갔을 때 자동으로 나타나는 탑 버튼(Top Button)을 적용해, 긴 콘텐츠 탐색 후에도 쉽게 상단으로 이동할 수 있도록 했습니다.

</br>
</br>
</br>

---

## 4. 작업 환경

1. **개발 환경**  
   <img src="https://img.shields.io/badge/windows10-0078D6?style=flat-square&logo=windows10&logoColor=white"/>

2.  **사용 프로그램**  
   <img src="https://img.shields.io/badge/Vs code-007ACC?style=flat-square&logo=visualstudiocode&logoColor=white"/> <img src="https://img.shields.io/badge/figma-F24E1E?style=flat-square&logo=figma&logoColor=white"/>

3.  **사용 기술**  
 <img src="https://img.shields.io/badge/html5-E34F26?style=flat-square&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/css3-1572B6?style=flat-square&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/react-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React Badge" />

    
    
4.  **작업 해상도**   
    4.1.  PC 기준 1920X1080  

</br>
</br>
</br>

---


