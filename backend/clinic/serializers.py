from rest_framework import serializers, fields
from rest_framework.validators import UniqueValidator
from .models import Doctor, Patient, PatientMedicalRecord


class MedicalRecordSerializer(serializers.ModelSerializer):

    class Meta:
        date = serializers.DateField(
            format="%Y-%m-%d", input_formats=["%Y-%m-%d"])
        model = PatientMedicalRecord
        fields = ['id', 'date', 'diseasetype', 'recommededMedicine', 'patient']

    # id = serializers.IntegerField()
    # date = serializers.DateField()
    # diseasetype = serializers.CharField(max_length=255)
    # recommededMedicine = serializers.CharField(max_length=255)
    # patient = serializers.PrimaryKeyRelatedField(
    #     queryset=Patient.objects.all()
    # )

# def validate(self, data):
#     in this method we have to specify our validation strategys


# class RegisterDoctorSerializer(serializers.ModelSerializer):
#     first_name = serializers.CharField(max_length=255)
#     last_name = serializers.CharField(max_length=255)
#     email = serializers.EmailField(
#         required=True,
#         validators=[UniqueValidator(queryset=Doctor.objects.all())]
#     )
#     phone = serializers.CharField(max_length=255)
#     password = serializers.CharField(max_length=255)
#     age = serializers.IntegerField()

class PatientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Patient
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'age']
    # id = serializers.IntegerField()
    # first_name = serializers.CharField(max_length=255)
    # last_name = serializers.CharField(max_length=255)
    # email = serializers.EmailField()
    # phone = serializers.CharField(max_length=255)
    # # password = models.CharField(max_length=255)
    # age = serializers.IntegerField()
