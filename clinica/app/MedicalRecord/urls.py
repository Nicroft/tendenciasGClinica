from django.urls import path
from .views import MedicalRecordList, MedicalRecordDetail

urlpatterns = [
    path('medical-records/', MedicalRecordList.as_view(), name='medical-record-list'), 
    path('medical-records/<int:pk>/', MedicalRecordDetail.as_view(), name='medical-record-detail'),  
]
