/**
 * Fake News Intelligence System
 * AI-native rule-based evaluation engine
 * No external dependencies
 */

// --- DICTIONARIES & KEYWORDS ---
const keywords = {
    en: {
        clickbait: ["shocking", "viral", "secret", "miracle", "100%", "click", "trick", "banned", "hoax", "illuminati", "conspiracy", "magic", "hidden", "you won't believe", "mind-blowing", "scandal", "exposed"],
        emotional: ["devastating", "panic", "fear", "terrifying", "outrage", "destroy", "disaster", "warning", "deadly", "crisis", "furious", "heartbreaking", "urgent", "desperate"],
        credible: ["official", "report", "confirmed", "verified", "statement", "announced", "research", "published", "investigation", "data", "study", "university", "documented", "spokesperson", "according to"]
    },
    te: {
        clickbait: ["షాకింగ్", "వైరల్", "నమ్మలేరు", "రహస్యం", "అద్భుతం", "100% నిజం", "సంచలనం", "క్లిక్ చేయండి", "బట్టబయలు", "మాయ", "కుట్ర"],
        emotional: ["భయం", "అలజడి", "ప్రమాదం", "హెచ్చరిక", "ఆగ్రహం", "దారుణమైన", "విషాదం", "అత్యవసర"],
        credible: ["ప్రకటించారు", "అధికారిక", "ధృవీకరించబడింది", "నివేదిక", "పరిశోధన", "ప్రకారం", "వివరించారు", "ప్రచురించారు", "అధ్యయనం", "డేటా"]
    }
};

const labels = {
    en: {
        title: "Analyze News", desc: "Detect misleading patterns instantly using our local AI-like engine.", placeholder: "Paste article or headline here...", analyzeBtn: "Analyze Content",
        testBtn: "System Tests", historyBtn: "History",
        whyTitle: "Why Fake News Detection Matters", whyDesc: "Misinformation spreads 6x faster than truth. By analyzing emotional triggers and clickbait structures before sharing, we can actively prevent the dangerous spread of false narratives and protect digital integrity.",
        lReal: "Real News", lFake: "Fake News", lMis: "Misleading",
        errEmpty: "⚠️ Input cannot be empty! Please provide text."
    },
    te: {
        title: "వార్తలను విశ్లేషించండి", desc: "మా స్థానిక AI ఇంజిన్‌తో తప్పుదోవ పట్టించే నమూనాలను తక్షణమే కనుగొనండి.", placeholder: "వార్తా కథనాన్ని ఇక్కడ అతికించండి...", analyzeBtn: "విశ్లేషించండి",
        testBtn: "సిస్టమ్ పరీక్షలు", historyBtn: "చరిత్ర",
        whyTitle: "ఫేక్ న్యూస్ డిటెక్షన్ ఎందుకు ముఖ్యం", whyDesc: "తప్పుడు సమాచారం నిజం కంటే 6 రెట్లు వేగంగా వ్యాపిస్తుంది. భాగస్వామ్యం చేయడానికి ముందు భావోద్వేగాలను విశ్లేషించడం ద్వారా, మేము అవాస్తవాలను నిరోధించగలము.",
        lReal: "నిజమైన వార్తలు", lFake: "నకిలీ వార్తలు", lMis: "తప్పుదోవ పట్టించేవి",
        errEmpty: "⚠️ ఇన్‌పుట్ ఖాళీగా ఉండకూడదు! దయచేసి వచనాన్ని అందించండి."
    }
};

let currentLang = 'en';
const MAX_HISTORY = 5;

// --- CORE ANALYSIS ENGINE ---

/**
 * Main engine entry for text analysis
 * @param {string} text - The input text
 * @returns {Object} Structured analysis result
 */
function processAnalysisLogic(text) {
    const rawText = text.substring(0, 2000).trim(); // Prevent processing overflows
    
    // Engine State
    let score = 80; // Base baseline trust
    let breakdown = { clickbait: 0, emotional: 0, credibility: 0 };
    let hits = { clickbait: [], emotional: [], credible: [] };
    
    let highlightedText = rawText;
    const langDict = keywords[currentLang];

    // Evaluator Helper
    const evaluateTokens = (category, weightMultiplier, markClass) => {
        langDict[category].forEach(kw => {
            const regex = new RegExp(`(${kw})`, "gi");
            const matches = rawText.match(regex);
            if (matches) {
                breakdown[category] += matches.length;
                hits[category].push(...matches);
                score += (weightMultiplier * matches.length);
                highlightedText = highlightedText.replace(regex, `<mark class="${markClass}">$1</mark>`);
            }
        });
    };

    // Weights: clickbait (-20), emotional (-10), credible (+15)
    evaluateTokens('clickbait', -20, 'm-clickbait');
    evaluateTokens('emotional', -10, 'm-emotional');
    evaluateTokens('credible', 15, 'm-credible');

    score = Math.max(0, Math.min(100, score)); // Normalize 0 - 100%
    
    // Determine classification
    let labelCategory = "misleading";
    let statusLabel = labels[currentLang].lMis;
    
    if (score >= 70) {
        labelCategory = "real";
        statusLabel = labels[currentLang].lReal;
    } else if (score < 40) {
        labelCategory = "fake";
        statusLabel = labels[currentLang].lFake;
    }

    // Reasoning Generator
    let reasons = [];
    if (hits.clickbait.length > 0) reasons.push(`Contains high-risk manipulation keywords (${[...new Set(hits.clickbait)].join(", ")}).`);
    if (hits.emotional.length > 0) reasons.push(`Leverages emotional triggers to incite reaction rather than report facts (${[...new Set(hits.emotional)].join(", ")}).`);
    if (hits.credible.length > 0) reasons.push(`Utilizes standard structural terminology of official reporting (${[...new Set(hits.credible)].join(", ")}).`);
    if (reasons.length === 0) reasons.push("Text is entirely neutral. Lacks both clickbait flags and strong indicators of official sourcing. Cross-verification recommended.");

    return {
        labelCategory,       // "real", "fake", "misleading"
        statusLabel,         // Translated UI string
        confidence: score,
        scoreBreakdown: breakdown,
        reasons,
        highlightedText
    };
}

// --- UI CONTROLLERS ---

function handleAnalyzeClick() {
    const input = document.getElementById("newsInput");
    const text = input.value.trim();
    
    if (!text) {
        showWarning(labels[currentLang].errEmpty);
        return;
    }
    
    const result = processAnalysisLogic(text);
    renderResults(result, text);
    saveToHistory(text, result);
}

function renderResults(res, originalText) {
    // Hide tests, show analysis
    document.getElementById("testResultsCard").classList.add("hidden");
    const card = document.getElementById("analysisCard");
    card.classList.remove("hidden");
    
    // Update Badge
    const badge = document.getElementById("statusBadge");
    badge.className = `badge ${res.labelCategory}`;
    badge.innerText = res.statusLabel;

    // Update Progress
    document.getElementById("scoreText").innerText = `${res.confidence}%`;
    const pBar = document.getElementById("progressBar");
    pBar.style.width = `${res.confidence}%`;

    let colorVar = "var(--status-mis)";
    if (res.labelCategory === 'real') colorVar = "var(--status-real)";
    if (res.labelCategory === 'fake') colorVar = "var(--status-fake)";
    pBar.style.backgroundColor = colorVar;
    
    // Update Metrics
    document.getElementById("valClickbait").innerText = res.scoreBreakdown.clickbait;
    document.getElementById("valEmotional").innerText = res.scoreBreakdown.emotional;
    document.getElementById("valCredibility").innerText = res.scoreBreakdown.credibility;

    // Update Highlights & Reasons
    document.getElementById("highlightBox").innerHTML = res.highlightedText.replace(/\n/g, '<br>');
    const rList = document.getElementById("reasonsList");
    rList.innerHTML = res.reasons.map(r => `<li>${r}</li>`).join("");
}

// --- SYSTEM TESTING ENGINE ---

const testCases = [
    { input: "Official statement from the university confirms the research data.", expected: "real" },
    { input: "SHOCKING! You won't believe this secret 100% miracle cure!", expected: "fake" },
    { input: "There is a warning regarding the recent storm.", expected: "misleading" },
    { input: "Panic and fear as devastating disaster destroys everything! Hoax exposed!", expected: "fake" },
    { input: "The investigation published verified data according to the spokesperson.", expected: "real" },
    { input: "Viral video shows hidden magic trick. Click to see.", expected: "fake" },
    { input: "A local meeting was held today at 5 PM.", expected: "misleading" }
];

function runSystemTest() {
    document.getElementById("analysisCard").classList.add("hidden");
    const testCard = document.getElementById("testResultsCard");
    testCard.classList.remove("hidden");

    const list = document.getElementById("testCasesList");
    list.innerHTML = "";
    let passCount = 0;

    testCases.forEach((tc, idx) => {
        const result = processAnalysisLogic(tc.input);
        const passed = (result.labelCategory === tc.expected);
        if (passed) passCount++;

        const li = document.createElement("li");
        li.className = `test-item ${passed ? 'pass' : 'fail'}`;
        li.innerHTML = `
            <div class="test-header">
                <span>Test ${idx + 1}</span>
                <span class="badge ${passed ? 'real' : 'fake'}">${passed ? 'PASS' : 'FAIL'}</span>
            </div>
            <div class="test-body">Input: "${tc.input}"</div>
            <div class="test-body text-muted">Expected: ${tc.expected.toUpperCase()} | Got: ${result.labelCategory.toUpperCase()} (${result.confidence}%)</div>
        `;
        list.appendChild(li);
    });

    const acc = Math.round((passCount / testCases.length) * 100);
    document.getElementById("accuracyScore").innerText = `${acc}%`;
}

// --- UTILS & INFRASTRUCTURE ---

function updateCharCount() {
    const len = document.getElementById("newsInput").value.length;
    document.getElementById("charCount").innerText = `${len} chars`;
}

function showWarning(msg) {
    const toast = document.getElementById("toastWarning");
    toast.querySelector("span").innerText = msg;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 3000);
}

function toggleLanguage() {
    currentLang = document.getElementById("langSwitch").checked ? 'te' : 'en';
    const ui = labels[currentLang];
    
    document.getElementById("navTitle").innerText = ui.navTitle;
    document.getElementById("btnSystemTest").lastChild.nodeValue = " " + ui.testBtn;
    document.getElementById("btnHistory").innerText = ui.historyBtn;
    document.getElementById("analyzeHeader").innerText = ui.title;
    document.getElementById("analyzeDesc").innerText = ui.desc;
    document.getElementById("newsInput").placeholder = ui.placeholder;
    document.getElementById("btnAnalyze").innerText = ui.analyzeBtn;
    document.getElementById("whyMattersTitle").innerText = ui.whyTitle;
    document.getElementById("whyMattersDesc").innerText = ui.whyDesc;
    
    // Hide results on switch to avoid language mismatch in highlights
    document.getElementById("analysisCard").classList.add("hidden");
    document.getElementById("testResultsCard").classList.add("hidden");
}

function toggleHistory() {
    document.getElementById("historySidebar").classList.toggle("open");
    document.getElementById("sidebarOverlay").classList.toggle("open");
    loadAndRenderHistory();
}

function saveToHistory(text, result) {
    let history = JSON.parse(localStorage.getItem("fns_rank1_history") || "[]");
    history.unshift({
        snippet: text.substring(0, 60) + "...",
        date: new Date().toISOString(),
        label: result.statusLabel,
        category: result.labelCategory,
        confidence: result.confidence
    });
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem("fns_rank1_history", JSON.stringify(history));
}

function loadAndRenderHistory() {
    const list = document.getElementById("historyList");
    let history = JSON.parse(localStorage.getItem("fns_rank1_history") || "[]");
    
    if (history.length === 0) {
        list.innerHTML = `<p class="text-muted" style="text-align:center;margin-top:2rem;">No history</p>`;
        return;
    }
    
    list.innerHTML = history.map(item => `
        <div class="history-item">
            <div class="flex-between mb-1">
                <span class="h-date">${new Date(item.date).toLocaleDateString()}</span>
                <span class="badge ${item.category}">${item.label} (${item.confidence}%)</span>
            </div>
            <div class="h-snippet text-muted">${item.snippet}</div>
        </div>
    `).join("");
}

// Initial binding
document.addEventListener("DOMContentLoaded", () => {
    // Basic setup already handled via HTML inline handlers
});
