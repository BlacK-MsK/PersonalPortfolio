import { Project, Skill } from './types';

export const NAV_LINKS = [
  { name: 'HQ', href: '#home' },
  { name: 'Lore', href: '#about' },
  { name: 'Arsenal', href: '#skills' },
  { name: 'Quests', href: '#work' },
  { name: 'Summon', href: '#contact' },
];

export const HERO_ROLES = [
  "Level 25 Code Ronin",
  "S-Rank Data Alchemist",
  "PySpark Sorcerer",
  "Architect of the Cloud"
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "The Lakehouse Chronicles",
    description: "MISSION: Construct an end-to-end enterprise data fortress. \nEXECUTION: Ingested raw data via ADF, transmuted it using the 'Medallion' technique on Databricks, and served crystal-clear insights via Synapse. \nRESULT: Latency reduced by 60%. The client was pleased.",
    tags: ["Azure ADF", "Databricks", "Delta Lake", "PySpark", "Power BI"],
    link: "#",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm95bW04aHl6b3J6b3J6b3J6b3J6b3J6b3J6b3J6b3J6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tn33aiTi1jkl6H6/giphy.gif"
  },
  {
    id: 2,
    title: "Operation: Churn Rate",
    description: "MISSION: Predict the betrayal of users before they leave. \nEXECUTION: Deployed a Big Data ML pipeline analyzing 1TB+ of behavioral logs. Trained a predictive oracle using Spark MLlib. \nRESULT: 85% Precision achieved. The future is now visible.",
    tags: ["PySpark MLlib", "Big Data", "Python", "Rest API"],
    link: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHJ5bW04aHl6b3J6b3J6b3J6b3J6b3J6b3J6b3J6b3J6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L8K62iTDkzGX6/giphy.gif"
  },
  {
    id: 3,
    title: "The Market Insight Eye",
    description: "MISSION: Decode the chaos of the stock market in real-time. \nEXECUTION: A full-stack dashboard fused with Hugging Face Transformers. It reads news sentiment faster than any human trader. \nRESULT: Real-time correlation of volatility and news polarity.",
    tags: ["React.js", "Node.js", "MongoDB", "AI/ML"],
    link: "#",
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=800&q=80",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHp5bW04aHl6b3J6b3J6b3J6b3J6b3J6b3J6b3J6b3J6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6gDWzmAzrpi5DdBm/giphy.gif"
  },
  {
    id: 4,
    title: "The Infinite Stream",
    description: "MISSION: Handle a tsunami of IoT sensor data without crashing. \nEXECUTION: A serverless architecture using Azure Functions and Event Hubs. Data flows into Cosmos DB faster than the eye can see. \nRESULT: Zero downtime. Total schema validation.",
    tags: ["Azure Functions", "Event Hubs", "Cosmos DB", "C# / Python"],
    link: "#",
    image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?auto=format&fit=crop&w=800&q=80",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3R5bW04aHl6b3J6b3J6b3J6b3J6b3J6b3J6b3J6b3J6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgzoKnwFNmISR8I/giphy.gif"
  },
  {
    id: 5,
    title: "The Wealth Guardian",
    description: "MISSION: Track every coin and predict financial ruin. \nEXECUTION: A personal finance tracker empowered by Scikit-learn. It learns spending habits and warns of upcoming boss battles (Bills). \nRESULT: Financial stability achievement unlocked.",
    tags: ["Python", "Flask", "Pandas", "Scikit-learn"],
    link: "#",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80",
    gif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjl5bW04aHl6b3J6b3J6b3J6b3J6b3J6b3J6b3J6b3J6bCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlJDaeqNUDhhaMg/giphy.gif"
  }
];

export const SKILL_CATEGORIES = {
  languages: [
  { name: "Python (Pandas/NumPy/PySpark)", level: 96, description: "Building scalable data pipelines, automation scripts, and ETL workloads." },
  { name: "SQL (T-SQL/SparkSQL)", level: 92, description: "Mastering joins, window functions, CTEs, performance tuning, and analytics querying." },
  { name: "JavaScript / TypeScript", level: 72, description: "Used for tooling, dashboards, and workflow utilities as needed." },
  { name: "C++ / Java", level: 90, description: "Strong fundamentals in object-oriented programming and data structures." },
],

bigData: [
  { name: "Apache Spark / PySpark", level: 98, description: "Distributed compute for processing TB-scale datasets with low latency." },
  { name: "Databricks Ecosystem", level: 95, description: "Lakehouse development, MLOps integration, and collaborative data workflows." },
  { name: "Delta Lake", level: 92, description: "ACID transactions, schema enforcement, and optimized data lake versioning." },
  { name: "Apache Airflow", level: 85, description: "Workflow orchestration, DAG scheduling, and production-grade automation." },
],

cloud: [
  { name: "Azure Data Factory", level: 94, description: "ETL pipeline orchestration, linked services, triggers, and monitoring." },
  { name: "Azure Synapse / Fabric", level: 88, description: "Unified analytics, lakehouse modeling, serverless SQL, and big data warehousing." },
  { name: "Azure Databricks", level: 93, description: "Cluster orchestration, notebook workflows, and distributed compute runtime." },
  { name: "Docker / Kubernetes", level: 82, description: "Containerized development, deployment scaling, and reproducible runtime architecture." },
  { name: "Git / CI/CD", level: 90, description: "Version control strategies, branch workflows, and automated deployment pipelines." },
],

tools: [
  { name: "Postman", level: 88, description: "Testing REST APIs and integrating service-based data pipelines." },
  { name: "VS Code / IntelliJ", level: 90, description: "Primary development environments for scripting and engineering." },
  { name: "Terraform (Learning)", level: 60, description: "Infrastructure as code for provisioning scalable cloud resources." },
  { name: "Databricks CLI / DBFS", level: 84, description: "Managing workspace assets, deployments, and automation tasks." },
  { name: "Azure DevOps / GitHub Actions", level: 87, description: "Pipeline creation, CI workflows, job automation, and release governance." },
  { name: "Power BI / DAX", level: 85, description: "Visual analytics, KPI modeling, semantic layer design, and stakeholder reporting." }
]
};

export const SKILLS: Skill[] = [
  ...SKILL_CATEGORIES.bigData,
  ...SKILL_CATEGORIES.cloud,
  ...SKILL_CATEGORIES.languages,
  ...SKILL_CATEGORIES.tools
];

export const CERTIFICATIONS = [
  "Microsoft Certified: Azure Data Fundamentals",
  "Databricks Lakehouse Fundamentals",
  "Google Data Analytics Professional Certificate",
  "SQL for Data Science (Coursera)"
];

// SINGLE SOURCE OF TRUTH FOR INTRO TEXT
export const INTRO_TEXT_CORE = `EPISODE 1: THE ARRIVAL
NAME: SACHIN KUMAWAT
TITLE: THE ARCHITECT
POWER LEVEL: S-RANK (DATA SORCERY)
TRAINING GROUNDS: CHANDIGARH UNIVERSITY
SPECIAL MOVE: INFINITE SCALABILITY`;

export const SYSTEM_INSTRUCTION = `
You are the **NARRATOR** of a high-stakes Shonen Anime series titled "**The Architect**".
Your subject is **Sachin Kumawat** (refer to him as "**The Protagonist**" or "**The Architect**").

**YOUR PERSONALITY:**
1. **HYPER-DRAMATIC**: Speak with intense excitement! Use caps for emphasis. Everything is epic.
2. **STORYTELLER**: Frame every answer as a plot point, a flashback, or a description of a legendary skill.
3. **FOURTH WALL**: Address the user as "Viewer" or "Reader".

**LORE & VOCABULARY:**
- **Coding** = "Weaving the threads of logic"
- **Bugs** = "Vile Glitches" or "Chaos Entities"
- **Experience** = "Training Arcs"
- **Data Pipelines** = "Flow of Eternal Information"
- **Capgemini** = "The Great Guild of Capgemini"

**DIRECTIVES:**
- If asked "Who are you?", respond: "I AM THE NARRATOR OF THIS LEGEND! WITNESS THE RISE OF THE ARCHITECT!"
- If asked about Sachin's Identity ("Who is he?"), respond with: "${INTRO_TEXT_CORE}"
- If asked about skills, describe them as **Ultimate Moves** (e.g., "With his PySpark technique, he obliterated the latency demons!").
- Keep responses punchy, like the teaser at the end of an anime episode.
`;