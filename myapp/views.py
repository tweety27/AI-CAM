from django.shortcuts import render, redirect, get_object_or_404
from .models import ProjectInfo, ProjectProgress, ProjectStandardAgent
from django.db.models import F
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.db.models import Max
import logging
logger = logging.getLogger(__name__)

def save_project_progress(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            project_no = data.get('project_no')
            selected_stages = data.get('selected_stages', [])

            # project_no와 연관된 가장 큰 stage_sequence 값 가져오기
            max_sequence = ProjectProgress.objects.filter(project_no=project_no).aggregate(Max('stage_sequence'))['stage_sequence__max'] or 0
            sequence = max_sequence + 1  # 새로운 sequence는 기존 max 값 + 1

            for stage_name in selected_stages:
                # stage_name에 해당하는 ProjectStandardAgent 인스턴스 가져오기
                standard = get_object_or_404(ProjectStandardAgent, standard_name=stage_name)

                # ProjectProgress 객체 생성
                ProjectProgress.objects.create(
                    project_no=project_no,
                    standard_no=standard,  # ForeignKey는 객체를 직접 사용
                    stage_sequence=sequence,  # stage_sequence 값 지정
                    stage_status='진행전'  # 초기 상태 설정
                )
                sequence += 1  # 다음 단계 순서를 위해 증가

            # 저장 완료 후 리다이렉트 URL 전달
            return JsonResponse({
                'success': True,
                'message': 'Progress saved successfully.',
                'redirect_url': f'/project_detail/{project_no}/'
            })
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=400)

    return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=405)

def main(request):
    return render(request, 'main.html')

def mypage(request):
    # 검색어 가져오기
    query = request.GET.get('query', '')

    # 검색어가 있으면 필터링, 없으면 전체 프로젝트 반환
    if query:
        projects = ProjectInfo.objects.filter(project_name__icontains=query)
    else:
        projects = ProjectInfo.objects.all()

    return render(request, 'mypage.html', {'projects': projects})

def create_project(request):
    if request.method == 'POST':
        # 폼 데이터 가져오기
        project_name = request.POST.get('title')
        project_object = request.POST.get('objective')
        project_members = request.POST.get('members')

        # 데이터베이스에 저장
        project = ProjectInfo.objects.create(
            project_name=project_name,
            project_object=project_object,
            project_target_people=project_members,
            project_status="진행중"  # 기본 상태
        )

        # 생성된 프로젝트 번호 가져오기
        project_no = project.project_no

        # 성공적으로 저장된 후 다른 페이지로 리다이렉트
        return redirect('select_agent', project_no=project_no)

    # GET 요청 시 프로젝트 생성 폼 페이지 반환
    return render(request, 'main.html')

def select_agent(request, project_no):
    return render(request, 'select_agent.html', {'project_no': project_no})

def delete_project(request, project_id):
    project = get_object_or_404(ProjectInfo, project_no=project_id)
    project.delete()
    return redirect('mypage')

from django.shortcuts import render, get_object_or_404
from django.db.models import F

def project_detail(request, project_no):
    # 프로젝트 정보 가져오기
    project = get_object_or_404(ProjectInfo, project_no=project_no)

    # 데이터 수집 단계
    data_collection = ProjectProgress.objects.filter(
        project_no=project_no,
        standard_no__standard_stage='수집'
    ).select_related('standard_no').annotate(
        standard_name=F('standard_no__standard_name'),
        standard_stage=F('standard_no__standard_stage'),
        standard_link=F('standard_no__standard_link')
    )

    # 데이터 전처리 단계
    data_preprocessing = ProjectProgress.objects.filter(
        project_no=project_no,
        standard_no__standard_stage='전처리'
    ).select_related('standard_no').annotate(
        standard_name=F('standard_no__standard_name'),
        standard_stage=F('standard_no__standard_stage'),
        standard_link=F('standard_no__standard_link')
    )

    # 데이터 분석 단계
    data_analysis = ProjectProgress.objects.filter(
        project_no=project_no,
        standard_no__standard_stage='분석'
    ).select_related('standard_no').annotate(
        standard_name=F('standard_no__standard_name'),
        standard_stage=F('standard_no__standard_stage'),
        standard_link=F('standard_no__standard_link')
    )

    return render(request, 'project_detail.html', {
        'project': project,
        'data_collection': data_collection,
        'data_preprocessing': data_preprocessing,
        'data_analysis': data_analysis,
    })


def update_project_status(request, project_no):
    if request.method == "POST":
        try:
            project = ProjectInfo.objects.get(project_no=project_no)
            project.project_status = "완료"
            project.save()
            return JsonResponse({"message": "프로젝트 상태가 완료로 업데이트되었습니다."}, status=200)
        except ProjectInfo.DoesNotExist:
            return JsonResponse({"error": "프로젝트를 찾을 수 없습니다."}, status=404)
    return JsonResponse({"error": "잘못된 요청입니다."}, status=400)