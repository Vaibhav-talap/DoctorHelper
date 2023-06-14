from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('medicalRecords/', views.medicalRecord_list),
    path('medicalRecords/<int:id>/', views.medicalRecord_detail),
    path('doctorRegistration/', views.doctorRegister),
    path('doctorValidate/', views.validateDoctor),
    path('patients/', views.addpatient),
    path('patientId/', views.getPatientIDByEmail),
    path('patientMedicalRecords/<int:id>/', views.patientMedicalRecordHistory)

]
