from django.db import models

class ProjectInfo(models.Model):
    project_no = models.AutoField(primary_key=True)  # Auto-increment PK
    project_name = models.CharField(max_length=255)  # VARCHAR
    project_object = models.TextField()             # TEXT
    project_target_people = models.IntegerField()   # INTEGER
    project_subject = models.CharField(max_length=255, null=True, blank=True)  # VARCHAR, NULL 가능
    project_status = models.CharField(max_length=50, null=True, blank=True)    # VARCHAR, NULL 가능
    project_remarks = models.TextField(null=True, blank=True)                  # TEXT, NULL 가능

    class Meta:
        managed = False  # Django가 테이블 생성/삭제를 관리하지 않음
        db_table = 'project_info'  # 기존 테이블 이름

class ProjectStandardAgent(models.Model):
    standard_no = models.AutoField(primary_key=True)  # 고유 번호
    standard_name = models.CharField(max_length=255)  # 단계 이름
    standard_stage = models.CharField(max_length=50)  # 단계 구분 (수집, 전처리, 분석)
    standard_link = models.URLField(max_length=255, null=True, blank=True)
    
    class Meta:
        managed = False
        db_table = 'project_standard_agent'

class ProjectProgress(models.Model):
    progress_id = models.AutoField(primary_key=True)  # 자동 증가 ID
    project_no = models.IntegerField()  # 프로젝트 번호
    standard_no = models.ForeignKey(
        ProjectStandardAgent, on_delete=models.CASCADE, db_column='standard_no'
    )  # 단계 번호
    stage_sequence = models.IntegerField()  # 단계 순서
    stage_status = models.CharField(max_length=50, null=True, blank=True)
    stage_start_time = models.DateTimeField(null=True, blank=True)  # 시작 시간
    stage_end_time = models.DateTimeField(null=True, blank=True)  # 종료 시간
    stage_remarks = models.TextField(null=True, blank=True)  # 비고
    stage_link = models.TextField(null=True, blank=True)  # 관련 링크

    class Meta:
        managed = False
        db_table = 'project_progress'
