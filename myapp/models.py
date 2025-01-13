from django.db import models

class Project(models.Model):
    project_no = models.AutoField(primary_key=True)
    project_object = models.TextField()
    project_target_people = models.TextField()
    project_subject = models.TextField()
    project_remarks = models.TextField(null=True, blank=True)

    class Meta:
        db_table = 'project_info'

    def __str__(self):
        return f"{self.project_no} - {self.project_subject}"


class ProjectProgress(models.Model):
    id = models.AutoField(primary_key=True)
    project_no = models.ForeignKey(Project, on_delete=models.CASCADE, db_column='project_no')
    stage_no = models.IntegerField()
    stage_status = models.CharField(max_length=20, choices=[('진행중', '진행중'), ('완료', '완료')])
    stage_start_time = models.DateTimeField(null=True, blank=True)
    stage_end_time = models.DateTimeField(null=True, blank=True)
    stage_result = models.TextField(null=True, blank=True)
    stage_link = models.URLField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'project_progress'

    def __str__(self):
        return f"{self.project_no} - stage_no:{self.stage_no}"


class ProjectStandardProcess(models.Model):
    standard_no = models.AutoField(primary_key=True)
    standard_name = models.CharField(max_length=100)
    standard_content = models.TextField(null=True, blank=True)
    standard_link = models.URLField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = 'project_standard_process'

    def __str__(self):
        return f"{self.standard_no} - {self.standard_name}"
