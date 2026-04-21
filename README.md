# 🧠 Fake News Intelligence System

## 🚀 Overview

**Fake News Intelligence System** is a lightweight, AI-style web application that detects whether a piece of news is **Real**, **Fake**, or **Misleading** using **rule-based intelligence**.
It simulates intelligent decision-making locally (no external APIs), making it fast, private, and deployable at scale.

---

## ❗ Problem Statement

Misinformation spreads rapidly during elections and major events, influencing public opinion and causing confusion.
There is a need for a **simple, accessible tool** that helps users quickly evaluate the credibility of news content.

---

## 💡 Proposed Solution

This system analyzes user-input text and:

* Classifies it as **Real / Fake / Misleading**
* Generates a **confidence score (0–100%)**
* Highlights **suspicious keywords**
* Provides a **clear explanation**
* Suggests **verification steps**

---

## ✨ Key Features

### 🧠 Smart Text Analyzer

* Detects emotional, exaggerated, and misleading language
* Uses keyword and tone-based scoring

### 📊 Confidence Score

* Outputs a percentage (0–100%)
* Visual indicator (progress bar / color-coded)

### 🔍 Keyword Highlighting

* Highlights trigger words (e.g., *shocking, viral, breaking*)
* Improves transparency and user trust

### 🧾 Explanation Engine

* Explains **why** content is classified as fake/real
* Example:

  * “Contains exaggerated language”
  * “Uses emotional trigger words”

### 📚 History Tracking

* Stores recent analyses using **localStorage**
* Allows users to revisit past checks

### 🌐 Multilingual Support

* Supports **English + Telugu**
* Improves accessibility for Indian users

### 📱 Responsive UI

* Clean, modern interface
* Works on desktop and mobile

---

## 🧠 Core Logic

The system uses **condition-based scoring (if–else logic)**:

* Words like:

  * *“shocking”, “viral”, “secret”* → increase fake score
* Words like:

  * *“official”, “report”, “confirmed”* → reduce fake score

Final classification is based on score thresholds:

* **0–30 → Real**
* **31–60 → Misleading**
* **61–100 → Fake**

---

## ⚙️ Tech Stack

* HTML
* CSS
* JavaScript

✔ No backend
✔ No external APIs
✔ Fully client-side

---

## ☁️ Cloud Perspective

This project is designed following **cloud-first architecture principles inspired by Google Cloud**.

It demonstrates how AI-like systems can be:

* Scalable
* Lightweight
* Efficient
* Deployable for millions of users

---

## 🚀 Live Demo

👉 https://vamshiiyer.github.io/fake-news-intelligence-system/

---

## 📌 How to Run Locally

1. Clone the repository
2. Open `index.html` in browser

OR run local server:

```bash
python3 -m http.server 8000
```

Then open:

```
http://localhost:8000
```

---

## 🔒 Security & Responsibility

* No user data is stored externally
* Encourages responsible sharing of information
* Promotes awareness against misinformation

---

## 🔮 Future Enhancements

* Integration with real AI/NLP models
* Real-time news verification APIs
* Voice-based input
* Advanced sentiment analysis

---

## 👨‍💻 Author

**Ayyavari Vamshi Krishna**

---

## ⭐ Final Note

This system simulates **AI-powered misinformation detection** using logical reasoning, making it a practical and scalable solution for real-world use.
