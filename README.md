# 💬 Serverless Contact Form

![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Free Tier](https://img.shields.io/badge/Free%20Tier-100%25-green?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.12-blue?style=for-the-badge&logo=python&logoColor=white)
![S3](https://img.shields.io/badge/S3-Frontend-orange?style=for-the-badge&logo=amazon-s3&logoColor=white)
![Serverless](https://img.shields.io/badge/Serverless-Architecture-red?style=for-the-badge)

Serverless Contact Form is a cloud-native, fully serverless application for handling user contact/inquiry submissions. It uses S3 for frontend hosting, API Gateway and Lambda for backend processing, DynamoDB for data storage, and Amazon SES for real-time email notifications to the admin.

---

## 📑 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [AWS Services Used](#-aws-services-used)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Author](#-author)

---

## 🎯 Overview

This project is a production-ready serverless contact form built entirely on AWS. When a user submits the form, their message is saved to DynamoDB, and an email notification is sent to the admin via Amazon SES — all without managing any servers.

---

## 🚀 Features

- ✅ **Real-time Form Submission:** Responsive UI with dynamic loading state.
- ✅ **Instant Email Alerts:** Automated SES notifications to admin.
- ✅ **NoSQL Persistence:** Reliable storage of submissions in DynamoDB.
- ✅ **Least-Privilege Security:** Fine-grained IAM policies for execution roles.
- ✅ **Monitoring:** CloudWatch Logs for observability.
- ✅ **100% Serverless:** Zero server management and high availability.
- ✅ **Free Tier Friendly:** Cost-optimized architecture.

---

## 📐 Architecture

![Architecture Diagram](images/architecture.png)

**Flow:**
1. User submits the form (HTML/JS) hosted on **S3**.
2. Request goes through **API Gateway (REST API)**.
3. **API Gateway** invokes **AWS Lambda**.
4. Lambda saves the submission to **DynamoDB** and forwards the message to **Amazon SES**.
5. **SES** sends an email notification to the admin.
6. **CloudWatch** logs all activity, and **IAM** enforces least-privilege permissions across the stack.

---

## 🛠️ AWS Services Used

| Service | Role | Free Tier Limit |
| :--- | :--- | :--- |
| **Amazon S3** | Hosts static frontend files | 5GB storage |
| **Amazon API Gateway** | REST API endpoints | 1M requests/month |
| **AWS Lambda** | Backend business logic | 1M requests/month |
| **Amazon DynamoDB** | Stores all submitted messages | 25GB storage |
| **Amazon SES** | Sends email notifications | 62,000 emails/month |
| **Amazon CloudWatch** | Logs & monitoring | 5GB logs |
| **AWS IAM** | Granular execution permissions | Always Free |

---

## 📁 Project Structure

```text
├── frontend/
│   ├── index.html       # Web form interface
│   ├── style.css        # Responsive design & styles
│   └── script.js        # API integration & dynamic JS
├── lambda/
│   └── lambda.py        # Python backend script
├── images/               # Architecture diagram & screenshots
```

---

## 📸 Screenshots & Project Proofs

### 1. User Interface
![Contact Form UI](images/Contact%20Form%20AWS.png)
*Responsive contact form with dynamic loading state.*

### 2. API Gateway
![API Gateway](images/api.png)
*API Gateway REST endpoint configuration.*

### 3. DynamoDB Storage
![DynamoDB Table](images/DynamoDB.png)
*Submitted messages stored in DynamoDB.*

### 4. Amazon SES
![SES Configuration](images/SES.png)
*SES verified identity used for sending notifications.*

### 5. Email Notification
![Email Notification](images/mail.png)
*Instant email alert received by the admin.*

### 6. Submission Result
![Submission Result](images/Result.png)
*Success response shown to the user after submitting the form.*

---

## 👨‍💻 Author

**Mostafa Mohamed Abdrabo**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mostafa-m-abdrabo/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mostafaabdrabo2022)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mostafaabdrabo4900@gmail.com)

---
