// --- LANGUAGE DICTIONARIES ---
const translations = {
    en: {
        navTitle: "Intelligence System",
        historyBtn: "History",
        mainHeader: "Analyze News Content",
        subtitle: "Detect misleading patterns and fact-check text instantly using our local rule-based AI engine.",
        placeholder: "Paste the news article or headline here...",
        chars: "characters",
        analyzeBtn: "Analyze Content",
        resultHeader: "Analysis Result",
        confidence: "Confidence",
        contentScan: "Content Scan",
        legSuspicious: "Suspicious",
        legAuthentic: "Authentic",
        explanationTitle: "Explanation",
        verificationTitle: "Verification Steps",
        historyTitle: "Analysis History",
        historyEmpty: "No history found.",
        analyzing: "Analyzing...",
        lblReal: "Real",
        lblFake: "Fake",
        lblMisleading: "Misleading"
    },
    te: {
        navTitle: "ఇంటెలిజెన్స్ సిస్టమ్",
        historyBtn: "చరిత్ర",
        mainHeader: "వార్తలను విశ్లేషించండి",
        subtitle: "మా స్థానిక రూల్-బేస్డ్ AI ఇంజిన్‌తో నకిలీ నమూనాలను కనుగొనండి మరియు వాస్తవాలను తనిఖీ చేయండి.",
        placeholder: "వార్తా కథనాన్ని లేదా శీర్షికను ఇక్కడ అతికించండి...",
        chars: "అక్షరాలు",
        analyzeBtn: "విశ్లేషించండి",
        resultHeader: "విశ్లేషణ ఫలితం",
        confidence: "నమ్మకం",
        contentScan: "కంటెంట్ స్కాన్",
        legSuspicious: "అనుమానాస్పదంగా",
        legAuthentic: "ప్రామాణికమైనది",
        explanationTitle: "వివరణ",
        verificationTitle: "ధృవీకరణ దశలు",
        historyTitle: "విశ్లేషణ చరిత్ర",
        historyEmpty: "చరిత్ర కనుగొనబడలేదు.",
        analyzing: "విశ్లేషిస్తోంది...",
        lblReal: "నిజం",
        lblFake: "నకిలీ",
        lblMisleading: "తప్పుదోవ పట్టించేది"
    }
};

// --- KEYWORDS ---
const keywords = {
    en: {
        fake: ["shocking", "viral", "breaking", "you won't believe", "secret", "miracle", "100% true", "illuminati", "conspiracy", "click here", "mind-blowing", "scandal", "banned", "hoax", "exposed", "truth revealed", "magic", "hidden"],
        real: ["according to", "verified", "official", "statement", "announced", "reported by", "research", "published", "investigation", "spokesperson", "data", "study", "university", "documented"]
    },
    te: {
        fake: ["షాకింగ్", "వైరల్", "బ్రేకింగ్", "నమ్మలేరు", "రహస్యం", "అద్భుతం", "100% నిజం", "సంచలనం", "క్లిక్ చేయండి", "బట్టబయలు", "నిజం తెలిసింది", "మాయ", "కుట్ర"],
        real: ["ప్రకటించారు", "అధికారిక", "ధృవీకరించబడింది", "నివేదిక", "పరిశోధన", "ప్రకారం", "వివరించారు", "ప్రచురించారు", "అధ్యయనం", "డేటా"]
    }
};

let currentLang = 'en';
let analysisHistory = [];

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    loadHistory();
    
    document.getElementById("newsInput").addEventListener("input", function() {
        document.getElementById("charCount").innerText = this.value.length;
    });
});

// --- LANGUAGE TOGGLE ---
function switchLanguage() {
    const isTe = document.getElementById("languageToggle").checked;
    currentLang = isTe ? 'te' : 'en';
    
    const t = translations[currentLang];
    
    // Update UI elements
    document.getElementById("title_nav").innerText = t.navTitle;
    document.getElementById("txt_history_btn").innerText = t.historyBtn;
    document.getElementById("txt_header_main").innerText = t.mainHeader;
    document.getElementById("txt_subtitle").innerText = t.subtitle;
    document.getElementById("newsInput").placeholder = t.placeholder;
    document.getElementById("txt_characters").innerText = t.chars;
    document.getElementById("btn_analyze_txt").innerText = t.analyzeBtn;
    document.getElementById("txt_analysis_result").innerText = t.resultHeader;
    document.getElementById("txt_confidence").innerText = t.confidence;
    document.getElementById("txt_content_scan").innerText = t.contentScan;
    document.getElementById("txt_leg_suspicious").innerText = t.legSuspicious;
    document.getElementById("txt_leg_authentic").innerText = t.legAuthentic;
    document.getElementById("txt_explanation").innerText = t.explanationTitle;
    document.getElementById("txt_verification").innerText = t.verificationTitle;
    document.getElementById("txt_history_title").innerText = t.historyTitle;
    document.getElementById("txt_history_empty").innerText = t.historyEmpty;

    // Reset results if visible
    if(document.getElementById("resultsPanel").style.display !== "none") {
        document.getElementById("resultsPanel").style.display = "none";
    }
}

// --- ANALYSIS LOGIC ---
function analyzeText() {
    const text = document.getElementById("newsInput").value.trim();
    if (!text) return;
    
    const btn = document.getElementById("analyzeBtn");
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner">↻</span> ${translations[currentLang].analyzing}`;
    
    // Simulate slight delay for "AI" feel
    setTimeout(() => {
        performAnalysis(text);
        btn.disabled = false;
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                        <span id="btn_analyze_txt">${translations[currentLang].analyzeBtn}</span>`;
    }, 800);
}

function performAnalysis(text) {
    let score = 80; // Base score
    let fakeHits = [];
    let realHits = [];
    
    // Create regex patterns
    const kFake = keywords[currentLang].fake;
    const kReal = keywords[currentLang].real;
    
    let highlightedText = text;
    
    // Process Fake keywords
    kFake.forEach(kw => {
        const regex = new RegExp(`(${kw})`, "gi");
        const matches = text.match(regex);
        if (matches) {
            fakeHits.push(...matches);
            score -= (20 * matches.length);
            highlightedText = highlightedText.replace(regex, `<mark class="suspicious">$1</mark>`);
        }
    });

    // Process Real keywords
    kReal.forEach(kw => {
        const regex = new RegExp(`(${kw})`, "gi");
        const matches = text.match(regex);
        if (matches) {
            realHits.push(...matches);
            score += (15 * matches.length);
            highlightedText = highlightedText.replace(regex, `<mark class="authentic">$1</mark>`);
        }
    });

    // Clamp score
    score = Math.max(0, Math.min(100, score));
    
    // Determine Classification
    let classification = "Misleading";
    let badgeClass = "badge-misleading";
    let statusId = "lblMisleading";
    
    if (score >= 70) {
        classification = "Real";
        badgeClass = "badge-real";
        statusId = "lblReal";
    } else if (score < 40) {
        classification = "Fake";
        badgeClass = "badge-fake";
        statusId = "lblFake";
    }
    
    // Generate Explanation
    let explanation = "";
    let verificationSteps = [];
    
    if (currentLang === 'en') {
        if (fakeHits.length > 0) {
            explanation += `Contains exaggerated language or emotional trigger words (${fakeHits.join(", ")}). `;
            verificationSteps.push("Check official sources.");
            verificationSteps.push("Cross-verify news.");
            verificationSteps.push("Avoid sharing unverified content.");
        }
        if (realHits.length > 0) {
            explanation += `Uses neutral and objective tone terms (${realHits.join(", ")}). `;
            if(fakeHits.length === 0) verificationSteps.push("Content appears factual, but verify primary sources.");
        }
        if (fakeHits.length === 0 && realHits.length === 0) {
            explanation = "Lacks neutral or factual tone explicitly. Tone is plain.";
            verificationSteps.push("Check official sources.");
            verificationSteps.push("Cross-verify news.");
        }
    } else {
        if (fakeHits.length > 0) {
            explanation += `అతిశయోక్తి లేదా భావోద్వేగ పదాలు ఉన్నాయి (${fakeHits.join(", ")}). `;
            verificationSteps.push("అధికారిక మూలాలను తనిఖీ చేయండి.");
            verificationSteps.push("వార్తలను క్రాస్-వెరిఫై చేయండి.");
            verificationSteps.push("ధృవీకరించని కంటెంట్‌ను భాగస్వామ్యం చేయడం నివారించండి.");
        }
        if (realHits.length > 0) {
            explanation += `తటస్థ మరియు వాస్తవిక పదాల వినియోగం ఉంది (${realHits.join(", ")}). `;
            if(fakeHits.length === 0) verificationSteps.push("కంటెంట్ ప్రామాణికంగా కనిపిస్తుంది, కానీ ప్రాథమిక మూలాలను ధృవీకరించండి.");
        }
        if (fakeHits.length === 0 && realHits.length === 0) {
            explanation = "తటస్థ లేదా వాస్తవిక స్వరం స్పష్టంగా లేదు. సాదాగా ఉంది.";
            verificationSteps.push("అధికారిక మూలాలను తనిఖీ చేయండి.");
            verificationSteps.push("వార్తలను క్రాస్-వెరిఫై చేయండి.");
        }
    }

    // Update UI
    const resultsPanel = document.getElementById("resultsPanel");
    resultsPanel.style.display = "block";
    
    document.getElementById("classBadge").className = `classification-badge ${badgeClass}`;
    document.getElementById("classBadge").innerText = translations[currentLang][statusId];
    
    document.getElementById("scoreValue").innerText = `${score}%`;
    document.getElementById("scoreCircle").style.background = `conic-gradient(var(--${score >= 70 ? 'success' : score < 40 ? 'danger' : 'warning'}) ${score}%, rgba(255,255,255,0.1) 0%)`;
    
    document.getElementById("highlightedOutput").innerHTML = highlightedText.replace(/\n/g, '<br>');
    document.getElementById("explanationText").innerText = explanation;
    
    const stepsHtml = verificationSteps.map(step => `<li>${step}</li>`).join("");
    document.getElementById("verificationList").innerHTML = stepsHtml;

    // Save to History
    saveToHistory(text.substring(0, 50) + "...", translations[currentLang][statusId], score, badgeClass);
}

// --- HISTORY LOGIC ---
function toggleHistory() {
    document.getElementById("historySidebar").classList.toggle("open");
    document.getElementById("sidebarOverlay").classList.toggle("open");
}

function saveToHistory(snippet, label, score, badgeClass) {
    const item = {
        snippet,
        label,
        score,
        badgeClass,
        date: new Date().toISOString()
    };
    
    analysisHistory.unshift(item);
    if (analysisHistory.length > 5) analysisHistory.pop(); // Keep only last 5
    
    localStorage.setItem("fns_history", JSON.stringify(analysisHistory));
    renderHistory();
}

function loadHistory() {
    const stored = localStorage.getItem("fns_history");
    if (stored) {
        try {
            analysisHistory = JSON.parse(stored);
            renderHistory();
        } catch(e) {
            console.error("Could not parse history");
        }
    }
}

function renderHistory() {
    const list = document.getElementById("historyList");
    if (analysisHistory.length === 0) return;
    
    list.innerHTML = "";
    analysisHistory.forEach(item => {
        const dateStr = new Date(item.date).toLocaleDateString();
        
        // Extract basic class name for badge
        let badgeTheme = "mis";
        if(item.badgeClass.includes("real")) badgeTheme = "real";
        if(item.badgeClass.includes("fake")) badgeTheme = "fake";

        const div = document.createElement("div");
        div.className = "history-item";
        div.innerHTML = `
            <div class="history-item-header">
                <span>${dateStr}</span>
                <span class="h-badge ${badgeTheme}">${item.label} (${item.score}%)</span>
            </div>
            <div class="history-item-snippet">${item.snippet}</div>
        `;
        
        // Optional: click to reload into input
        div.onclick = () => {
             document.getElementById("newsInput").value = item.snippet; // simplistic load
             toggleHistory();
        };

        list.appendChild(div);
    });
}
