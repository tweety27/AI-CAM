document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.tab'); // 탭 요소
    const tabContents = document.querySelectorAll('.tab-content'); // 콘텐츠 요소
    const backButton = document.getElementById("back-btn");
    const completeButton = document.querySelector('.complete-button');
    const projectNo = document.getElementById('project_no').value;

    // 뒤로 가기 버튼 클릭 이벤트
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

    // 탭 전환 초기화
    const initializeTabFunctionality = () => {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });
    };

    // 항목 이동 초기화
    const initializeItemTransferFunctionality = () => {
        const containers = document.querySelectorAll('.container');

        containers.forEach(container => {
            const availableItems = container.querySelector('#available-items');
            const selectedItems = container.querySelector('#selected-items');

            availableItems.addEventListener('click', (e) => {
                if (e.target.tagName === 'LI') {
                    // 항목을 선택된 목록으로 복제
                    const newItem = e.target.cloneNode(true);
                    selectedItems.appendChild(newItem); // 중복 허용
                }
            });

            selectedItems.addEventListener('click', (e) => {
                if (e.target.tagName === 'LI') {
                    // 선택된 항목 제거
                    e.target.remove();
                }
            });
        });
    };

    // 단계 설정 완료 버튼 초기화
    const initializeCompleteButtonFunctionality = () => {
        if (completeButton) {
            completeButton.addEventListener('click', () => {
                // 모든 탭의 선택된 항목 수집
                const allSelectedItems = [];
                const selectedLists = document.querySelectorAll('#selected-items');

                selectedLists.forEach(list => {
                    Array.from(list.children).forEach(item => {
                        allSelectedItems.push(item.getAttribute('data-item')); // `data-item` 속성 값 가져오기
                    });
                });

                if (allSelectedItems.length === 0) {
                    alert('최소 한 개 이상의 단계를 선택해주세요.');
                    return;
                }

                // 서버로 데이터 전송
                fetch('/save-progress/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCookie('csrftoken') // CSRF 토큰 추가
                    },
                    body: JSON.stringify({
                        project_no: projectNo,
                        selected_stages: allSelectedItems // 배열 그대로 전달
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert('단계가 저장되었습니다.');
                            window.location.href = data.redirect_url;
                        } else {
                            alert(`저장 실패: ${data.message}`);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                
            });
        }
    };

    // CSRF 토큰 가져오기 함수
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    // Initialize functionality
    initializeTabFunctionality();
    initializeItemTransferFunctionality();
    initializeCompleteButtonFunctionality();
});
