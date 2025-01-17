document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.tab'); // 탭 요소
    const tabContents = document.querySelectorAll('.tab-content'); // 콘텐츠 요소
    const completeButton = document.getElementById("complete-button");
    // 뒤로 가기 버튼 클릭 이벤트
    const backButton = document.getElementById("back-btn");

    if (backButton) {
        backButton.addEventListener("click", (event) => {
            event.preventDefault();

            const url = backButton.getAttribute("data-url");

            if (url) {
                window.location.href = url;
            } else {
                console.error("URL not found in data-url attribute");
            }
        });
    }
    
    // URL에서 project_no 추출
    const urlPath = window.location.pathname;
    const projectNo = urlPath.split("/")[2]; // URL의 세 번째 부분이 project_no (예: /project_detail/1/)

    // 페이지 로드 시 프로젝트 상태 확인
    fetch(`/get_project_status/${projectNo}/`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "완료") {
                completeButton.textContent = "완료";
                completeButton.disabled = true;
                completeButton.style.backgroundColor = "#d4edda";
                completeButton.style.color = "#155724";
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });

    completeButton.addEventListener("click", () => {
        fetch(`/update_project_status/${projectNo}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCSRFToken() // CSRF 토큰 설정
            }
        })
        .then(response => {
            if (response.ok) {
                completeButton.textContent = "완료";
                completeButton.disabled = true;
                completeButton.style.backgroundColor = "#d4edda";
                completeButton.style.color = "#155724";
                alert("프로젝트 상태가 완료로 변경되었습니다!");
                window.location.href = "/mypage/";
            } else {
                alert("프로젝트 상태 업데이트에 실패했습니다.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("서버와의 통신 중 문제가 발생했습니다.");
        });
    });

    // CSRF 토큰 가져오기 함수
    function getCSRFToken() {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [name, value] = cookie.split("=");
            if (name === "csrftoken") {
                return value;
            }
        }
        return "";
    }

    // 탭 전환 함수
    function showTab(stage) {
        // 모든 탭 및 콘텐츠 초기화
        tabs.forEach(tab => {
            tab.classList.remove('active');
            tab.src = tab.getAttribute('data-default'); // 기본 이미지로 변경
        });

        tabContents.forEach(content => content.classList.remove('active')); // 콘텐츠 숨기기

        // 클릭한 탭 활성화
        const activeTab = document.querySelector(`.tab[data-stage="${stage}"]`);
        const activeContent = document.getElementById(`data-${stage}`);

        if (activeTab) {
            activeTab.classList.add('active');
            activeTab.src = activeTab.getAttribute('data-active'); // 활성 이미지로 변경
        }

        if (activeContent) {
            activeContent.classList.add('active'); // 관련 콘텐츠 표시
        }
    }

    // 탭 클릭 이벤트 등록
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const stage = tab.getAttribute('data-stage'); // 클릭한 탭의 단계 가져오기
            showTab(stage); // 해당 단계 표시
            console.log("Active content:", document.getElementById(`data-${stage}`));
        });
    });

    // 기본 선택된 탭 설정 (데이터 수집)
    showTab('수집'); // '수집' 탭을 기본 활성화

    document.querySelector('.complete-button').addEventListener('click', function () {
        this.textContent = '완료'; // 버튼 텍스트 변경
        this.disabled = true; // 버튼 비활성화
        this.style.backgroundColor = '#d4edda'; // 버튼 색상 변경
        this.style.color = '#155724'; // 텍스트 색상 변경
    });
});
