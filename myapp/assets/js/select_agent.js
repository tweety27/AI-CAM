document.addEventListener('DOMContentLoaded', () => {
    // 탭 전환
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => {
            tabButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');
            tabPanes.forEach((pane) => pane.classList.remove('active'));
            const targetTab = button.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // 아이템 클릭 및 선택
    document.querySelectorAll('.tab-pane ul li').forEach((item) => {
        item.addEventListener('click', () => {
            const parentTab = item.closest('.tab-pane').id;
            const selectedList = document.querySelector(`#${parentTab}-selected`);
            if (!selectedList) return;

            const newItem = document.createElement('li');
            newItem.textContent = item.textContent;
            newItem.classList.add('selected-item');

            // 선택된 항목 삭제 기능
            newItem.addEventListener('click', () => {
                newItem.remove();
            });

            selectedList.appendChild(newItem);
        });
    });

    // 선택 완료 버튼 클릭 이벤트
    const completeButton = document.getElementById('complete-btn');
    completeButton.addEventListener('click', () => {
        const allSelectedItems = document.querySelectorAll('.selected-items ul');
        let result = {};

        allSelectedItems.forEach((list) => {
            const tabId = list.id.replace('-selected', '');
            const selectedValues = Array.from(list.querySelectorAll('li')).map(
                (item) => item.textContent
            );
            result[tabId] = selectedValues;
        });

        console.log('선택된 항목:', result);

        // 페이지 이동
        const url = 'project_detail.html'; // 이동할 페이지 URL
        const params = new URLSearchParams();

        // 선택된 데이터를 쿼리 파라미터로 추가
        for (const tab in result) {
            params.append(tab, JSON.stringify(result[tab]));
        }

        // 이동
        window.location.href = `${url}?${params.toString()}`;
    });
});
