// 팝업 요소 가져오기
const popup = document.getElementById("popup"); // 팝업 전체 요소
const closePopup = document.getElementById("close-popup"); // 닫기 버튼
const generateProjectContainer = document.querySelector(".generate-project-container"); // 클릭 이벤트를 위한 컨테이너
const submitButton = document.querySelector(".submit-btn"); // 생성하기 버튼

// generate-project-container 클릭 시 팝업 열기
generateProjectContainer.addEventListener("click", () => {
    popup.style.display = "block"; // 팝업 보이기
});

// 닫기 버튼 클릭 시 팝업 닫기
closePopup.addEventListener("click", () => {
    popup.style.display = "none"; // 팝업 숨기기
});

// 팝업 바깥 영역 클릭 시 팝업 닫기
popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});

// 생성하기 버튼 클릭 시 페이지 이동
submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // 폼 기본 제출 동작 방지
    window.location.href = "select_agent.html"; // select_agent.html로 이동
});
