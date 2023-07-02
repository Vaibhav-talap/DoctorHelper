from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status

# Create your tests here.


class PatientTest(APITestCase):

    def test_Valid_patient_register(self):
        _data = {
            "first_name": "Sammer",
            "last_name": "Diwani",
            "email": "diwanisammer@gmail.com",
            "phone": "8956562159",
            "password": "123",
            "confirm_password": "123",
            "age": 50
        }

        _response = self.client.post(
            '/clinic/patients/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(_data['first_name'], 'Sammer')
        self.assertEqual(_data['last_name'], 'Diwani')
        self.assertEqual(_data['email'], 'diwanisammer@gmail.com')
        self.assertEqual(_data['phone'], '8956562159')
        self.assertEqual(_data['age'], 50)

    def test_patient_register_bad_email(self):
        _data = {
            "first_name": "Sammer",
            "last_name": "Diwani",
            "email": "diwanisammergmail.com",
            "phone": "8956562159",
            "password": "123",
            "confirm_password": "123",
            "age": 50
        }

        _response = self.client.post(
            '/clinic/patients/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(_data['ResponseMessage'],
                         'Please provide the email in correct format')

    def test_patient_register_bad_first_name(self):
        _data = {
            "first_name": 123,
            "last_name": "Diwani",
            "email": "diwanisammer@gmail.com",
            "phone": "8956562159",
            "password": "123",
            "confirm_password": "123",
            "age": 50
        }

        _response = self.client.post(
            '/clinic/patients/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_patient_register_empty_object(self):
        _data = {}

        _response = self.client.post(
            '/clinic/patients/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_validate_patient_wrong_password(self):
        _data = {
            "first_name": "Sammer",
            "last_name": "Diwani",
            "email": "diwanisammer@gmail.com",
            "phone": "8956562159",
            "password": "123",
            "confirm_password": "123",
            "age": 50
        }

        _response = self.client.post(
            '/clinic/patients/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_201_CREATED)
        _data = {
            "email": "diwanisammer@gmail.com",
            "password": "1234"
        }
        _response = self.client.post(
            '/clinic/patientValidate/', data=_data, format="json")
        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(_data['responseMessage'], 'Wrong Password')

    def test_patient_getList(self):
        _data = {}

        _response = self.client.get(
            '/clinic/patients/', format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_200_OK)


class DoctorTest(APITestCase):

    def test_fetch_doctor_List(self):
        _data = {}
        _response = self.client.get(
            '/clinic/doctors/', format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_200_OK)

    def test_valid_doctor_register(self):
        _data = {
            "first_name": "Sammer",
            "last_name": "Diwani",
            "email": "diwanisammer@gmail.com",
            "phone": "8956562159",
            "password": "123",
            "confirm_password": "123",
            "age": 50
        }

        _response = self.client.post(
            '/clinic/doctors/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(_data['first_name'], 'Sammer')
        self.assertEqual(_data['last_name'], 'Diwani')
        self.assertEqual(_data['email'], 'diwanisammer@gmail.com')
        self.assertEqual(_data['phone'], '8956562159')
        self.assertEqual(_data['age'], 50)

    def test_doctor_register_bad_email(self):
        _data = {
            "first_name": "Sammer",
            "last_name": "Diwani",
            "email": "diwanisammergmail.com",
            "phone": "8956562159",
            "password": "123",
            "confirm_password": "123",
            "age": 50
        }

        _response = self.client.post(
            '/clinic/doctors/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(_data['ResponseMessage'],
                         'Please provide the email in correct format')

    def test_doctor_register_bad_first_name(self):
        _data = {
            "first_name": 123,
            "last_name": "Diwani",
            "email": "diwanisammer@gmail.com",
            "phone": "8956562159",
            "password": "123",
            "confirm_password": "123",
            "age": 50
        }

        _response = self.client.post(
            '/clinic/doctors/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(_data['ResponseMessage'],
                         'First Name can contain alphabets only')

    def test_doctor_register_empty_object(self):
        _data = {}

        _response = self.client.post(
            '/clinic/doctors/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_validate_doctor_wrong_password(self):
        _data = {
            "first_name": "Sammer",
            "last_name": "Diwani",
            "email": "diwanisammer@gmail.com",
            "phone": "8956562159",
            "password": "123",
            "confirm_password": "123",
            "age": 50
        }

        _response = self.client.post(
            '/clinic/doctors/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_201_CREATED)
        _data = {
            "email": "diwanisammer@gmail.com",
            "password": "1234"
        }
        _response = self.client.post(
            '/clinic/doctorValidate/', data=_data, format="json")
        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(_data['responseMessage'], 'Wrong Password')


class MedicalReocrdTest(APITestCase):
    def test_medicalRecord_List(self):
        _data = {}
        _response = self.client.get(
            '/clinic/medicalRecords/', format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_200_OK)

    def test_medicalRecord_insert(self):

        _data = {
            "first_name": "Sammer",
            "last_name": "Diwani",
            "email": "diwanisammer@gmail.com",
            "phone": "8956562159",
            "password": "123",
            "confirm_password": "123",
            "age": 50
        }

        _response = self.client.post(
            '/clinic/patients/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_201_CREATED)
        id = _data['id']

        _data = {
            "date": "2023-05-31",
            "diseasetype": "Fever,cold,mouth ulcer",
            "recommededMedicine": "Crocine Advance,oracep gel",
            "patient": id
        }

        _response = self.client.post(
            '/clinic/medicalRecords/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_201_CREATED)

    def test_medicalRecord_empty_insert(self):

        _data = {
            "first_name": "Sammer",
            "last_name": "Diwani",
            "email": "diwanisammer@gmail.com",
            "phone": "8956562159",
            "password": "123",
            "confirm_password": "123",
            "age": 50
        }

        _response = self.client.post(
            '/clinic/patients/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_201_CREATED)

        _response = self.client.post(
            '/clinic/medicalRecords/', format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_medicalRecord_insert_wrong_patientId(self):
        id = 4

        _data = {
            "date": "2023-05-31",
            "diseasetype": "Fever,cold,mouth ulcer",
            "recommededMedicine": "Crocine Advance,oracep gel",
            "patient": id
        }

        _response = self.client.post(
            '/clinic/medicalRecords/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_400_BAD_REQUEST)


class PatientWaitingListTest(APITestCase):

    def test_patientWaitingList_Get_method(self):

        _response = self.client.get(
            '/clinic/patientWaitingList/', format="json")
        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_200_OK)

    def test_PatientWaitingList_doctorWise(self):

        _data = {
            "first_name": "Abhijit",
            "last_name": "Kore",
            "email": "koreabhi@gmail.com",
            "phone": "8956562159",
            "password": "123",
            "confirm_password": "123",
            "age": 50
        }

        _response = self.client.post(
            '/clinic/patients/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_201_CREATED)
        # print(_data)
        patientId = _data['id']

        _data = {
            "first_name": "Vaibahv",
            "last_name": "Talap",
            "email": "talapvaibhav@gmail.com",
            "phone": "8956562159",
            "password": "123",
            "confirm_password": "123",
            "age": 50
        }

        _response = self.client.post(
            '/clinic/doctors/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_201_CREATED)
        # print(_data)
        doctorId = _data['id']
        _data = {
            "patient_id": patientId,
            "doctor_id": doctorId
        }

        _response = self.client.post(
            '/clinic/patientWaitingList/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_201_CREATED)
        print(_data)

        url = '/clinic/PatientWaitingListDoctorWise/{0}/'.format(str(doctorId))

        _response = self.client.get(url, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_200_OK)
        # print(_data)
        self.assertEqual(_data[0]['id'], 1)
        self.assertEqual(_data[0]['patient'], patientId)
        self.assertEqual(_data[0]['email'], 'koreabhi@gmail.com')
        self.assertEqual(_data[0]['doctor'], doctorId)

    def test_PatientWaitingList_doctorWise_delete(self):

        _data = {
            "first_name": "Sammer",
            "last_name": "Diwani",
            "email": "diwanisammer@gmail.com",
            "phone": "8956562159",
            "password": "123",
            "confirm_password": "123",
            "age": 50
        }

        _response = self.client.post(
            '/clinic/patients/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_201_CREATED)
        patientId = _data['id']
        # print(patientId)

        _data = {
            "first_name": "Vaibahv",
            "last_name": "Talap",
            "email": "talapvaibhav@gmail.com",
            "phone": "8956562159",
            "password": "123",
            "confirm_password": "123",
            "age": 50
        }

        _response = self.client.post(
            '/clinic/doctors/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_201_CREATED)
        doctorId = _data['id']
        _data = {
            "patient_id": patientId,
            "doctor_id": doctorId
        }

        _response = self.client.post(
            '/clinic/patientWaitingList/', data=_data, format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_201_CREATED)
        # print(_data)

        _response = self.client.delete(
            '/clinic/patientWaitingList/2/', format="json")

        self.assertEqual(_response.status_code, status.HTTP_204_NO_CONTENT)

    def test_PatientWaitingList_post_witihout_body(self):
        _response = self.client.post(
            '/clinic/patientWaitingList/', format="json")

        _data = _response.json()
        self.assertEqual(_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(_data['ResponseMessage'],
                         'Please provide all the Fields')
