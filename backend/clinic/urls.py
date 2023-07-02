from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('medicalRecords/', views.medicalRecord_list),
    path('medicalRecords/<int:id>/', views.medicalRecord_detail),
    path('doctors/', views.doctorRegister),
    path('doctorValidate/', views.validateDoctor),
    path('patientValidate/', views.validatePatient),
    path('patients/', views.patientRegister),
    #     path('patientId/', views.getPatientIDByEmail),
    path('patientMedicalRecords/<int:id>/', views.patientMedicalRecordHistory),
    path('patientWaitingList/', views.patientWaitingList),
    path('patientWaitingList/<int:id>/',
         views.deletingPatientFromPatientWaitingList),
    path('PatientWaitingListDoctorWise/<int:id>/',
         views.doctorWisePatientWaitingList)


]
