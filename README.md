# 🧠 Fake News Intelligence System

An AI-powered web application that analyzes news content and predicts whether it is **REAL or FAKE**, along with a confidence score and reasoning.

🚀 Built for **PromptWars – Hack2Skill Hackathon** using **Antigravity AI**

---

## 🎯 Problem Statement

Fake news spreads rapidly across digital platforms, influencing public opinion and causing misinformation at scale.

### Challenges

* Difficulty in verifying authenticity instantly
* High volume of misleading and clickbait content
* Lack of simple, accessible verification tools

### Solution

This system provides **real-time fake news detection** using AI-inspired logic, enabling users to quickly evaluate the credibility of news content.

---

## 🚀 Features

* 🔍 Real/Fake classification
* 📊 Confidence score (0–100%)
* 🧠 AI-inspired detection engine
* 💡 Reasoning output (why classified)
* 📜 History tracking
* ⚡ Fast & responsive UI
* ♿ Accessibility support (ARIA + semantic HTML)
* 🔐 Secure input handling

---

## 🤖 AI & Google Services Integration

This project includes a **simulated Google AI / NLP integration layer**:

* Sentiment analysis
* Entity extraction
* Context-aware scoring

```js
analyzeWithGoogleAI(text)
```

📌 Designed to mimic real-world Google AI pipelines and can be extended to actual APIs.

---

## ⚡ Built with Antigravity AI

Developed using **Antigravity AI**, enabling:

* AI-assisted code generation
* Smart debugging & refactoring
* Performance optimization
* UI/UX enhancements

### Impact

* Faster development cycle
* Cleaner modular code
* Improved performance & accessibility

---

## 🧠 How It Works

1. **Preprocessing**
   Cleans and normalizes input text

2. **Feature Extraction**
   Detects clickbait words, sentiment, and patterns

3. **AI + Rule-Based Classification**
   Combines:

   * Keyword scoring
   * Sentiment signals
   * Pattern analysis

4. **Output**

```json
{
  "label": "FAKE",
  "confidence": 87,
  "reasoning": [
    "Clickbait detected",
    "Emotional language",
    "Negative sentiment bias"
  ]
}
```

---

## 🏗️ Project Structure

```
/project
 ├── index.html
 ├── style.css
 ├── app.js
 ├── services/
 │     └── googleAI.js
 └── utils/
```

---

## 🔐 Security

* Input sanitization
* Safe DOM rendering
* XSS protection

---

## ⚡ Performance

* Debounced input handling
* Efficient DOM updates
* Optimized rendering

---

## ♿ Accessibility

* Semantic HTML
* ARIA labels
* Keyboard navigation

---

## 🧪 Testing

Basic test coverage included:

```js
runTests()
```

* Validates classification
* Covers edge cases

---

## 📈 Hackathon Optimization

This project is structured to maximize:

* Code Quality
* Security
* Efficiency
* Testing
* Accessibility
* AI / Google Integration
* Problem Alignment

---

## 🚀 Future Scope

* Real Google NLP API integration
* ML model (TensorFlow)
* Live news API support
* Backend scalability

---

## 👨‍💻 Author

Ayyavari Vamshi Krishna

---

## 🌐 Live Demo

https://vamshiiyer.github.io/fake-news-intelligence-system

---

## 📌 Repository

https://github.com/vamshiiyer/fake-news-intelligence-system
