export const profile = {
  name: "Saurabh Sagar Shinde",
  role: "Computer Science Undergraduate",
  sub: "AI Researcher · Systems Engineer",
  location: "Nashik, Maharashtra, India",
  email: "saurabhsshinde16@gmail.com",
  linkedin: "https://linkedin.com/in/saurabh-shinde-252b83276",
  github: "https://github.com/saurabhshinde1357",
};

export const interests = [
  "Predictive Maintenance / PHM",
  "Remaining Useful Life Prediction",
  "Uncertainty Quantification",
  "Conformal Prediction",
  "Decision-Theoretic ML",
  "Risk-Aware Decision Making",
  "Time-Series Deep Learning",
  "AI Agents & Multi-Agent Systems",
];

export type Project = {
  id: string; title: string; year: string; kind: string; summary: string;
  role: string; points: string[]; stack: string[]; metrics?: { v: string; l: string }[];
};

export const projects: Project[] = [
  {
    id: "rakshak", title: "Rakshak AI", year: "2025 — Present", kind: "Civic AI · RAG · Public-sector deployment",
    summary: "A bilingual AI + RAG platform built with Nashik Rural Police to improve citizen access to police services.",
    role: "Frontend and application development within a multidisciplinary team (AI, backend, data, architecture).",
    points: [
      "Mapped police procedures, citizen intents and legal information into a Marathi/English conversational system.",
      "Complaint guidance, lost-item reporting, legal guidance, station discovery and emergency assistance.",
      "Deployed on WhatsApp, then evolved toward voice/IVR access for accessibility.",
      "Presented to the Governor of Maharashtra.",
    ],
    stack: ["RAG", "LLMs", "WhatsApp", "IVR", "React"],
    metrics: [{ v: "5,000+", l: "users" }, { v: "51,000+", l: "conversations" }, { v: "80+", l: "complaints processed" }],
  },
  {
    id: "nyay", title: "NyayMargadarshak", year: "2026", kind: "LegalTech · Full-stack",
    summary: "A platform making Indian legal information and lawyer access more accessible to citizens.",
    role: "Full-stack developer.",
    points: [
      "Legal explorer covering BNS, BNSS and BSA; advocate discovery; client–lawyer communication.",
      "Python legal-update scraping pipeline; JWT-secured APIs with role-based access control.",
      "Frontend on Vercel, backend on AWS EC2 with PM2.",
    ],
    stack: ["React", "Node.js", "Express", "Python", "AWS EC2"],
  },
  {
    id: "nyaybot", title: "NyayBot", year: "2025", kind: "AI legal assistant",
    summary: "An AI-based assistant simplifying access to Indian legal information.",
    role: "Designed and developed the frontend.",
    points: ["User-centric interaction design.", "Integration with backend and AI components for context-aware assistance."],
    stack: ["React", "AI integration"],
  },
  {
    id: "shakti", title: "Shakti Link", year: "2025", kind: "Hackathon · 48 hours",
    summary: "Transparent in-kind donation platform connecting donors, NGOs and verified suppliers — no direct cash.",
    role: "Frontend and UI/UX.",
    points: ["Workflows for donation transparency, vendor selection and feedback-based quality checks.", "Built at Tech Horizon 2025 national-level hackathon."],
    stack: ["React", "UI/UX"],
  },
  {
    id: "nirvan", title: "Nirvan Care", year: "2024", kind: "Healthcare web platform",
    summary: "Appointment booking and medical-history access for patients.",
    role: "Frontend development and workflow design.",
    points: ["Collaborative team development.", "User-oriented flows for booking and records."],
    stack: ["Web", "Frontend"],
  },
];

export const publications = [
  { title: "Enterprise AI Agent Ecosystems: Architecture, Economics, and the Composition Gap", authors: "Shinde, S. S., et al.", venue: "SSRN", year: "2026", status: "Paper", note: "Agent discovery, trust, governance and economics; contributed analysis supporting a Trust-Aware Ranking System (TARS)." },
  { title: "Decision-Theoretic Predictive Maintenance with Calibrated Predictive Uncertainty for Remaining Useful Life Prediction", authors: "Shinde, S. S., et al.", venue: "Manuscript in preparation", year: "2026", status: "In preparation", note: "TCN–Transformer backbone, CQR intervals and a risk-aware maintenance decision layer on NASA C-MAPSS." },
  { title: "Justice-as-a-Protocol: Designing a Stateless, Scalable, and Self-Enforcing ODR System for 21st Century India", authors: "Shinde, S. S., et al.", venue: "ResearchGate", year: "2025", status: "Paper", note: "AI-assisted Online Dispute Resolution architecture for the Indian legal ecosystem." },
  { title: "From Chariots to Cavalry: The Evolution of Indian Warfare and the Fall of the War Chariot", authors: "Shinde, S. S., and Thorat, A. D.", venue: "Published research article", year: "2025", status: "Published", note: "Historical research article." },
];

export const skills: Record<string, string[]> = {
  "Uncertainty & Decision": ["Conformal Prediction", "CQR", "Calibration", "Deep Ensembles", "MC Dropout", "Expected-loss decisions", "Sensitivity analysis"],
  "Deep Learning": ["PyTorch", "TCN", "Transformers", "Attention", "LSTM / GRU", "CNN", "Multi-quantile regression"],
  "Machine Learning": ["scikit-learn", "XGBoost", "LightGBM", "Ensembles", "Regression", "Classification"],
  "Data & Statistics": ["Pandas", "NumPy", "SciPy", "Time-series", "Hypothesis testing", "Econometrics"],
  "AI / Research": ["RAG", "LLM apps", "AI agents", "Multi-agent systems", "Ablations", "Benchmarking"],
  "Systems & Web": ["React", "Node.js", "Express", "REST", "JWT", "AWS EC2", "Vercel", "Linux", "Git"],
  Languages: ["Python", "Java", "C++", "JavaScript"],
};

export const timeline = [
  { when: "2026 — Present", what: "Independent Researcher", where: "Decision-theoretic predictive maintenance", type: "Research" },
  { when: "2025 — Present", what: "Co-developer, Rakshak AI", where: "with Nashik Rural Police", type: "Civic tech" },
  { when: "2025", what: "Full-Stack Developer Intern", where: "DreamCare Developers Pvt. Ltd.", type: "Industry" },
  { when: "2025", what: "Web Development Intern", where: "Cognifyz Technologies", type: "Industry" },
  { when: "Expected 2027", what: "B.E. Computer Engineering · CGPA 8.0/10", where: "K. K. Wagh Institute of Engineering Education & Research, Nashik", type: "Education" },
];

export const recognition = [
  "Design patent application under review.",
  "Rakshak AI presented to the Governor of Maharashtra.",
  "Tech Horizon 2025 national-level hackathon participant.",
  "Econometrics: Methods and Applications — Erasmus University Rotterdam.",
  "Co-Founder, Neuronex Developers.",
  "Secretary, Rotaract Club of Nashik Nine Hills.",
];
