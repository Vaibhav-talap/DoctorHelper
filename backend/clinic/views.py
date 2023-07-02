from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
from .models import *
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
import re

# Create your views here.
# also want to know that the conversion of age to integer


# class MyError(Exception):

#     # Constructor or Initializer
#     def __init__(self, value):
#         self.value = value

#     # __str__ is to print() the value
#     def __str__(self):
#         return (repr(self.value))


@api_view(['GET', 'POST'])
def medicalRecord_list(request):
    if request.method == 'GET':
        queryset = PatientMedicalRecord.objects.all()
        serializer = MedicalRecordSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        serializer = MedicalRecordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        patientId = int(request.data['patient'])
        get_object_or_404(Patient, pk=patientId)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
def patientWaitingList(request):
    if request.method == 'GET':
        queryset = PatientWaitingList.objects.select_related(
            'patient').select_related('doctor').all()
        serializer = PatientWaitingListSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        try:
            doctor_id = request.data['doctor_id']
            patient_id = request.data['patient_id']
        except KeyError:
            return Response({'ResponseMessage': 'Please provide all the Fields'}, status=status.HTTP_400_BAD_REQUEST)

        doctor = get_object_or_404(Doctor, pk=doctor_id)
        patient = get_object_or_404(Patient, pk=patient_id)

        if PatientWaitingList.objects.filter(doctor=doctor_id, patient=patient_id):
            return Response({'ResponseMessage': 'You have already book appoinment with this doctor'}, status=status.HTTP_400_BAD_REQUEST)
        patientWaitingList = PatientWaitingList()
        patientWaitingList.doctor = doctor
        patientWaitingList.patient = patient
        patientWaitingList.save()
        serializer = PatientWaitingListSerializer(patientWaitingList)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        # serializer = MedicalRecordSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # serializer.save()
        # return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def doctorWisePatientWaitingList(request, id):
    if request.method == 'GET':
        queryset = PatientWaitingList.objects.select_related(
            'patient').select_related('doctor').filter(doctor__id=id)
        serializer = PatientWaitingListSerializer(queryset, many=True)
        return Response(serializer.data)


@api_view(['DELETE'])
def deletingPatientFromPatientWaitingList(request, id):
    recordInpatientWaitingList = get_object_or_404(PatientWaitingList, pk=id)
    if request.method == 'DELETE':
        recordInpatientWaitingList.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT'])
def medicalRecord_detail(request, id):

    medicalRecord = get_object_or_404(PatientMedicalRecord, pk=id)
    print(medicalRecord)
    if request.method == 'GET':
        serializer = MedicalRecordSerializer(medicalRecord)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = MedicalRecordSerializer(medicalRecord, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


@api_view(['GET'])
def patientMedicalRecordHistory(request, id):
    if request.method == 'GET':
        try:
            queryset = PatientMedicalRecord.objects.filter(patient__id=id)
            serializer = MedicalRecordSerializer(queryset, many=True)
            print('In the patientMedicalRecordHistory')
            return Response(serializer.data)
        except PatientMedicalRecord.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
@api_view(['POST', 'GET'])
def doctorRegister(request):
    if request.method == 'GET':
        queryset = Doctor.objects.all()
        serializer = DoctorSerializer(queryset, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        # print("request:", request.data)
        try:
            first_name = str(request.data['first_name'])
            last_name = str(request.data['last_name'])
            doctorEmail = request.data['email']
            phone = request.data['phone']
            password = request.data['password']
            confirm_password = request.data['confirm_password']
            age = request.data['age']
        except KeyError:
            return Response('Please provide all the Fields', status=status.HTTP_400_BAD_REQUEST)

        try:
            pat = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
            if re.match(pat, doctorEmail):
                pass
            else:
                raise ValueError
        except ValueError:
            return Response({'ResponseMessage': 'Please provide the email in correct format'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if first_name.isalpha():
                pass
            else:
                raise ValueError
        except ValueError:
            return Response({'ResponseMessage': 'First Name can contain alphabets only'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if last_name.isalpha():
                pass
            else:
                raise ValueError
        except ValueError:
            return Response({'ResponseMessage': 'Last Name can contain alphabets only'}, status=status.HTTP_400_BAD_REQUEST)

        # print(first_name)
        # print(last_name)

        # if (len(first_name.text.strip()) == 0 | len(last_name.text.strip()) == 0):
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
        if (password != confirm_password):
            return Response('Password and Confirm Password must be same', status=status.HTTP_400_BAD_REQUEST)

        doctor = Doctor()
        doctor.first_name = first_name
        doctor.last_name = last_name
        doctor.email = doctorEmail
        doctor.phone = phone
        # Here I have to save the password in the encrypted format
        doctor.password = make_password(password)
        doctor.age = age
        doctor.save()
        display_doctor = Doctor.objects.filter(email=doctorEmail).first()
        serializer = DoctorSerializer(display_doctor)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def validateDoctor(request):
    if request.method == 'POST':
        try:
            checkemail = request.data['email']
            password = request.data['password']
        except KeyError:
            return Response({'responseMessage': 'Please provide all the Fields'}, status=status.HTTP_400_BAD_REQUEST)

        doctor = Doctor.objects.filter(email=checkemail).first()
        if (doctor == None):
            return Response({'responseMessage': 'The Doctor mail does not exists please do register first'}, status=status.HTTP_404_NOT_FOUND)
        isValid = check_password(password, doctor.password)
        if (isValid == False):
            return Response({'responseMessage': 'Wrong Password'}, status=status.HTTP_401_UNAUTHORIZED)

        # If is valid gets true we have to return the token for the doctor
        refresh = RefreshToken.for_user(doctor)
        return Response({'refresh': str(refresh), 'access': str(refresh.access_token), 'responseMessage': 'ok', 'id': doctor.id})


@api_view(['POST'])
def validatePatient(request):
    if request.method == 'POST':
        try:
            checkemail = request.data['email']
            password = request.data['password']
        except KeyError:
            return Response('Please provide all the Fields', status=status.HTTP_400_BAD_REQUEST)
        patient = Patient.objects.filter(email=checkemail).first()
        if (patient == None):
            return Response({'responseMessage': 'The Patient mail does not exists please do register first'}, status=status.HTTP_404_NOT_FOUND)
        isValid = check_password(password, patient.password)
        if (isValid == False):
            return Response({'responseMessage': 'Wrong Password'}, status=status.HTTP_401_UNAUTHORIZED)

        # If is valid gets true we have to return the token for the doctor
        refresh = RefreshToken.for_user(patient)
        return Response({'refresh': str(refresh), 'access': str(refresh.access_token), 'responseMessage': 'ok', 'id': patient.id})


# @api_view(['POST'])
# def getPatientIDByEmail(request):
#     if request.method == 'POST':
#         try:
#             patientEmail = request.data['email']
#         except KeyError:
#             return Response('Please provide all the Fields', status=status.HTTP_400_BAD_REQUEST)

#         patient = Patient.objects.filter(email=patientEmail).first()
#         id = patient.id
#         return Response(id)


# @api_view(['POST', 'GET'])
# def addpatient(request):
#     if request.method == 'GET':
#         queryset = Patient.objects.all()
#         serializer = PatientSerializer(queryset, many=True)
#         return Response(serializer.data)
#     if request.method == 'POST':
#         serializer = PatientSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         print(serializer.validated_data)
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#         # patient = Patient()
#         # patient.first_name = request.POST.get('first_name')
#         # patient.last_name = request.POST.get('last_name')
#         # patient.email = request.POST.get('email')
#         # patient.phone = request.POST.get('phone')
#         # patient.age = request.POST.get('age')
#         # patient.save()

# # def retrivePatientMedicalRecord(request):
# #     if request.method


@csrf_exempt
@api_view(['GET', 'POST'])
def patientRegister(request):
    if request.method == 'GET':
        queryset = Patient.objects.all()
        serializer = PatientSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        # print("request:", request.data)
        try:
            first_name = str(request.data['first_name'])
            last_name = str(request.data['last_name'])
            patientEmail = request.data['email']
            phone = request.data['phone']
            password = request.data['password']
            confirm_password = request.data['confirm_password']
            age = request.data['age']
        except KeyError:
            return Response('Please provide all the Fields', status=status.HTTP_400_BAD_REQUEST)

        try:
            pat = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
            if re.match(pat, patientEmail):
                pass
            else:
                raise ValueError
        except ValueError:
            return Response({'ResponseMessage': 'Please provide the email in correct format'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if first_name.isalpha():
                pass
            else:
                raise ValueError
        except ValueError:
            return Response({'ResponseMessage': 'First Name can contain alphabets only'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if last_name.isalpha():
                pass
            else:
                raise ValueError
        except ValueError:
            return Response({'ResponseMessage': 'Last Name can contain alphabets only'}, status=status.HTTP_400_BAD_REQUEST)

        # print(first_name)
        # print(last_name)

        # if (len(first_name.text.strip()) == 0 | len(last_name.text.strip()) == 0):
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
        if (password != confirm_password):
            return Response('Password and Confirm Password must be same', status=status.HTTP_400_BAD_REQUEST)

        patient = Patient()
        patient.first_name = first_name
        patient.last_name = last_name
        patient.email = patientEmail
        patient.phone = phone
        # Here I have to save the password in the encrypted format
        patient.password = make_password(password)
        patient.age = age
        patient.save()
        display_patient = Patient.objects.filter(email=patientEmail).first()
        serializer = PatientSerializer(display_patient)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
