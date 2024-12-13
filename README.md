<h1 align="center">
  <img align="center" src="assets/Github/KidCare - Capstone.gif" width="500"></img>
<br>
KID CARE CLOUD COMPUTING README
</h1>

# Team Profile

### Team ID : C242-PS019

### This is our Members

* (ML) M413B4KX3878 - Riska Dewi Yuliyanti - Sekolah Tinggi Teknologi Wastukancana
* (ML) M211B4KX0695 - Ashtri Cahyani - Universitas Indraprasta PGRI
* (ML) M312B4KX2146 - Kartika Rahma Sulistyawati - Universitas Sebelas Maret
* (CC) C413B4KY4123 - Shandy Satria Nugraha - Sekolah Tinggi Teknologi Wastukancana
* (CC) C764B4KX1539 - Fitri Sri Mulyani	- Sekolah Tinggi Teknologi Bandung
* (MD) A211B4KY1765 - Hendriansyah Rizky Setiawan - Universitas Indraprasta PGRI
* (MD) A211B4KY2173 - Kenny Josiah Silaen - Universitas Indraprasta PGRI

### Roles/personnel

* Project Plan ( M413B4KX3878 - Riska Dewi Yuliyanti, M211B4KX0695 - Ashtri Cahyani, M312B4KX2146 - Kartika Rahma Sulistyawati, C413B4KY4123 - Shandy Satria Nugraha, C764B4KX1539 - Fitri Sri Mulyani, A211B4KY1765 - Hendriansyah Rizky Setiawan, A211B4KY2173 - Kenny Josiah Silaen )
* UI/UX ( A211B4KY1765 - Hendriansyah Rizky Setiawan, A211B4KY2173 - Kenny Josiah Silaen, M413B4KX3878 - Riska Dewi Yuliyanti, C413B4KY4123 - Shandy Satria Nugraha )
* Build Machine Learning Model ( M312B4KX2146 - Kartika Rahma Sulistyawati, M413B4KX3878 - Riska Dewi Yuliyanti, M211B4KX0695 - Ashtri Cahyani )
* Android Apps Development ( A211B4KY1765 - Hendriansyah Rizky Setiawan, A211B4KY2173 - Kenny Josiah Silaen )
* Deployment Application ( C413B4KY4123 - Shandy Satria Nugraha, C764B4KX1539 - Fitri Sri Mulyani )

# KidCare Cloud Computing Project
This CC project is our final project for Google Bangkit Academy 2024 Batch 2.

**Machine Learning:**
[KidCare Machine Learning Apps Developments](https://github.com/KidCare-Capstone-Project/ML_Structuring_Model)

**Mobile Development:**
[KidCare Mobile Development Apps](https://github.com/KidCare-Capstone-Project/MobileDev_Apps)

**Project Background:**

Stunting is a condition of chronic malnutrition experienced by children, which results in impaired physical growth and brain development. Children who experience stunting will be shorter than children of the same age, and are at risk of learning difficulties and poor health in the future. The causes of stunting vary, ranging from lack of access to adequate nutrition, parental knowledge about nutrition, to less supportive sanitation and environmental conditions.

KID CARE is here as a digital solution that provides information, education, and monitoring features for parents and health workers. Through this application, users will get guidance and tools to monitor child growth in order to prevent stunting as early as possible. This team developed an application that prioritizes easy access to information and monitoring of child development to help reduce stunting rates in Indonesia.

**Cloud Computing:**

The KID CARE application is developed with Google Cloud technology to provide wide access and ease of use for the community. This application uses Android as the main platform because of its wide reach in Indonesia. The KID CARE application will use various features from Google Cloud Service such as:

- Google Firestore for safe and structured storage of children's health data.

- Cloud Storage for store unsructured storage, like foto, banner ETC.

- Cloud Run for Deployment Machine Learning API and Payment API, Link every Services apps need.

**Case:**

In its implementation, the KID CARE application helps health workers and parents in overcoming the problem of stunting. For example, a mother in a remote area can use this application to monitor the development of her child's weight and height. Based on the inputted data, the application will provide a warning if there are indications of stunting in the child and provide recommendations for appropriate diet and nutrition patterns.

The team will focus on developing and testing the following features:

- Growth Monitoring and Analysis: Routinely monitor children's height, weight, and head circumference and compare them with WHO standard data.

- Nutrition and Health Education: Provide educational content for parents about the importance of balanced nutrition and child health care.

- Notifications and Reminders: Provide reminders for routine health checks and vaccinations according to the child's age.

- Data Visualization: Displays child development graphs in an easy-to-understand manner, making it easier to monitor.

- This application is expected to be an innovative solution that can help the government and society in reducing stunting rates and supporting the creation of a healthy and intelligent generation in Indonesia.

## Documentation
<p align="center">
  <img src="assets/Documentation/Architecture KidCare.jpg" width="200">
</p>

<p align="center">
  <img src="assets/Documentation/Architecture_ KidCare ML API.png" width="200">
</p>

## CloudComputing RoadMaps
- [x] [Visual Studio](https://code.visualstudio.com/)
- [x] [Ubuntu WSL](https://apps.microsoft.com/detail/9PDXGNCFSCZV?hl=neutral&gl=ID&ocid=pdpshare)
- [x] [Flask API](https://flask.palletsprojects.com/en/stable/)
- [x] [TensorFlow Lite](https://www.tensorflow.org/api_docs/python/tf/lite)
- [x] [Docker](https://docs.docker.com/reference/dockerfile)
- [x] [Google Cloud Platform](https://cloud.google.com)
- [x] [Cloud Run](https://cloud.google.com/run?hl=en)
- [x] [Cloud Storage](https://cloud.google.com/storage?hl=en)
- [x] [Artifact Registery](https://cloud.google.com/artifact-registry/docs?hl=idhttps://cloud.google.com/artifact-registry/docs?hl=id)

## Features
- [x] **Machine Learning API** [Machine Learning API](https://github.com/KidCare-Capstone-Project/Cloud_computing/tree/main/MachineLearning_API)
- [x] **Payment BackEnd** [Payment BackEnd](https://github.com/KidCare-Capstone-Project/Cloud_computing/tree/main/BackEnd_Payment_API)

## Requirement
* Visual Studio
* WSL Ubuntu
* Python 10.15.0 or Higher
* TensorFlow 
* Flask API
* Numpay
* Pandas
* venv
* Google Cloud Platform


## Installation
0.1 Instal WSL Ubuntu
0.2 Make A Directory At WSL Ubuntu
```bash
mkdir path/yourfolder
```
0.3 Open your visual studio Cd to your directory path
```bash
cd path/yourfolder
```
0.4 Authorize your local with data Google Cloud
use your google account and project id
```bash
gcloud auth login --no-launch-browser
```
### 1. Clone this Project to local (Clone to your folder WSL Ubuntu) or cloud
```bash
git clone https://github.com/KidCare-Capstone-Project/Cloud_computing.git
```
### 2. Local Deployment 
2.1
Open the Project in your Visual Studio remote WSL ubuntu Venv and instal Python
```bash
sudo apt install python3.10 python3.10-venv
```
2.2 Active your venv
```bash
source .venv/bin/activate
```
2.3 Instal Requirements.txt
```bash
pip install -r requirements.txt
```
2.4 Run your flask run at http://127.0.0.1:5000/predict
```bash
flask run
```

### 3 For Cloud Deployment 
3.1 Open CLI
Cd to folder
```bash
cd Cloud_computing
```
3.2 Remove Line at google cloud editor at file app.py
```bash
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
```
3.3 Back to CLI and Enable Artifact Registery
```bash
gcloud services enable artifactregistry.googleapis.com cloudbuild.googleapis.com run.googleapis.com
```
3.4 Enable Artifact Registery
```bash
gcloud services enable artifactregistry.googleapis.com cloudbuild.googleapis.com run.googleapis.com
```
3.5 Make A Repository
```bash
gcloud artifacts repositories create backend --repository-format=docker --location=asia-southeast2 --async
```
3.6 Submit Image to Artifact Registery
```bash
gcloud builds submit --tag asia-southeast2-docker.pkg.dev/${GOOGLE_CLOUD_PROJECT}/backend/Ml-Prediction-api:1.0.0
```
3.7 Deploy Your API
```bash
gcloud run deploy --image asia-southeast2-docker.pkg.dev/${GOOGLE_CLOUD_PROJECT}/backend/Ml-Prediction-api:1.0.0
```
## Finish
