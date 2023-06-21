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


# Create your views here.
# also want to know that the conversion of age to integer


@api_view(['GET', 'POST'])
def medicalRecord_list(request):
    if request.method == 'GET':
        queryset = PatientMedicalRecord.objects.all()
        serializer = MedicalRecordSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = MedicalRecordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT'])
def medicalRecord_detail(request, id):

    medicalRecord = get_object_or_404(PatientMedicalRecord, pk=id)
    print(medicalRecord)
    if request.method == 'GET':
        serializer = MedicalRecordSerializer(medicalRecord)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = MedicalRecordSerializer(medicalRecord, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


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
@api_view(['POST'])
def doctorRegister(request):
    if request.method == 'POST':
        # print("request:", request.data)
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        email = request.data['email']
        phone = request.data['phone']
        password = request.data['password']
        confirm_password = request.data['confirm_password']
        age = request.data['age']
        # print(first_name)
        # print(last_name)

        # if (len(first_name.text.strip()) == 0 | len(last_name.text.strip()) == 0):
        #     return Response(status=status.HTTP_400_BAD_REQUEST)
        if (password != confirm_password):
            return Response('Password and Confirm Password must be same', status=status.HTTP_400_BAD_REQUEST)

        doctor = Doctor()
        doctor.first_name = first_name
        doctor.last_name = last_name
        doctor.email = email
        doctor.phone = phone
        # Here I have to save the password in the encrypted format
        doctor.password = make_password(password)
        doctor.age = age
        doctor.save()

        return Response(status=status.HTTP_201_CREATED)


@api_view(['POST'])
def validateDoctor(request):
    if request.method == 'POST':
        checkemail = request.data['email']
        password = request.data['password']

        doctor = Doctor.objects.filter(email=checkemail).first()
        if (doctor == None):
            return Response({'responseMessage': 'The Doctor mail does not exists please do register first'}, status=status.HTTP_404_NOT_FOUND)
        isValid = check_password(password, doctor.password)
        if (isValid == False):
            return Response({'responseMessage': 'Wrong Password'}, status=status.HTTP_401_UNAUTHORIZED)

        # If is valid gets true we have to return the token for the doctor
        refresh = RefreshToken.for_user(doctor)
        return Response({'refresh': str(refresh), 'access': str(refresh.access_token), 'responseMessage': 'ok'})


@api_view(['POST'])
def getPatientIDByEmail(request):
    if request.method == 'POST':
        patientEmail = request.data['email']
        patient = Patient.objects.filter(email=patientEmail).first()
        id = patient.id
        return Response(id)


@api_view(['POST', 'GET'])
def addpatient(request):
    if request.method == 'GET':
        queryset = Patient.objects.all()
        serializer = PatientSerializer(queryset, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = PatientSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print(serializer.validated_data)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        # patient = Patient()
        # patient.first_name = request.POST.get('first_name')
        # patient.last_name = request.POST.get('last_name')
        # patient.email = request.POST.get('email')
        # patient.phone = request.POST.get('phone')
        # patient.age = request.POST.get('age')
        # patient.save()

# def retrivePatientMedicalRecord(request):
#     if request.method
