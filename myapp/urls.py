from django.urls import path
from . import views

urlpatterns = [
    path('', views.main, name='main'),  # 메인 페이지
    path('mypage/', views.mypage, name='mypage'),  # MyPage
    path('project_detail/<int:project_no>/', views.project_detail, name='project_detail'), # 프로젝트 상세 페이지
    path('select_agent/<int:project_no>/', views.select_agent, name='select_agent'),  # 선택 에이전트 페이지
    path('create_project/', views.create_project, name='create_project'),
    path('delete_project/<int:project_id>/', views.delete_project, name='delete_project'),
    path('save-progress/', views.save_project_progress, name='save_progress'),
    path('update_project_status/<int:project_no>/', views.update_project_status, name='update_project_status'),
]