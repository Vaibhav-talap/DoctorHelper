from django.db import models

# Create your models here.


class Patient(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    age = models.IntegerField()

    def __str__(self) -> str:
        return self.email


class Doctor(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    age = models.IntegerField()


class PatientMedicalRecord(models.Model):
    date = models.DateField()
    diseasetype = models.TextField()
    recommededMedicine = models.TextField()
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    # doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True)


class PatientWaitingList(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
