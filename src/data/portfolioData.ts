export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Full Stack" | "Backend & Cloud" | "AI / Machine Learning" | "UI & Creative";
  featured: boolean;
  image: string;
  tags: string[];
  metrics: string[];
  liveUrl?: string;
  githubUrl?: string;
  architectureDetails: string[];
  highlights: string[];
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 1-100
    icon?: string;
    description: string;
    tag?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: "Full-Time" | "Contract" | "Open Source";
  summary: string;
  achievements: string[];
  technologies: string[];
}

export const GREETINGS = [
  { text: "Hello", lang: "English", country: "EN" },
  { text: "Hola", lang: "Spanish", country: "ES" },
  { text: "Bonjour", lang: "French", country: "FR" },
  { text: "こんにちは", lang: "Japanese", country: "JA" },
  { text: "Hallo", lang: "German", country: "DE" },
  { text: "Ciao", lang: "Italian", country: "IT" },
  { text: "नमस्ते", lang: "Hindi", country: "IN" },
  { text: "你好", lang: "Mandarin", country: "ZH" },
  { text: "مرحبا", lang: "Arabic", country: "AR" },
  { text: "Olá", lang: "Portuguese", country: "PT" },
  { text: "Hej", lang: "Swedish", country: "SE" },
];

export const PERSONAL_INFO = {
  name: "Jahangir Alam Tamal",
  role: "Software Engineer",
  tagline: "Software Engineer at Donoro — Architecting Resilient Systems & Modern Platforms",
  location: "Dhaka, Bangladesh / Remote",
  email: "hello@tamal.dev",
  github: "https://github.com/fiftee15n",
  linkedin: "https://www.linkedin.com/in/jahangir-alam-tamal-8815a8268/",
  facebook: "https://www.facebook.com/tamal.ehmad15/",
  twitter: "https://www.facebook.com/tamal.ehmad15/",
  availability: "Software Engineer at Donoro",
  stats: [
    { label: "Years Experience", value: "3+" },
    { label: "Production Systems", value: "15+" },
    { label: "Active Users Served", value: "100k+" },
    { label: "Code Quality Index", value: "99.9%" },
  ],
  bio: [
    "I am a passionate Software Engineer at Donoro with a deep focus on distributed systems, emergency response platforms, and crafting high-performance, accessible digital experiences.",
    "My philosophy balances bulletproof system design with user-centric craftsmanship—writing maintainable, type-safe code that scales reliably under heavy production load.",
  ],
};

export const CODE_SNIPPET_TABS = [
  {
    filename: "engineer.ts",
    language: "typescript",
    code: `interface SoftwareEngineer {
  name: string;
  passions: string[];
  coreValues: string[];
  build: () => Promise<void>;
}

export const engineer: SoftwareEngineer = {
  name: "Alex Morgan",
  passions: ["Distributed Systems", "Clean Architecture", "UI Craftsmanship"],
  coreValues: [
    "Type-safety & Resilient Design",
    "Sub-100ms Performance Budgets",
    "Continuous Delivery & Observability",
  ],
  async build() {
    await system.scale({ throughput: "100k req/s", uptime: "99.99%" });
    return console.log("🚀 Shipped with precision and quality.");
  }
};`,
  },
  {
    filename: "stack.json",
    language: "json",
    code: `{
  "core_runtime": ["TypeScript", "Go", "Python", "Node.js"],
  "frontend": ["Next.js", "React", "TailwindCSS", "WebGL"],
  "backend": ["FastAPI", "GraphQL", "gRPC", "NestJS"],
  "infrastructure": ["AWS", "Docker", "Kubernetes", "PostgreSQL", "Redis"],
  "observability": ["OpenTelemetry", "Prometheus", "Datadog"]
}`,
  },
  {
    filename: "architecture.yaml",
    language: "yaml",
    code: `services:
  gateway:
    protocol: HTTP/3 & gRPC
    rate_limiting: TokenBucket (Redis)
    auth: JWT + mTLS
  event_bus:
    engine: Apache Kafka
    partitions: 32
    retention: 7d
  primary_store:
    database: PostgreSQL 16
    replication: Multi-AZ Read Replicas
    caching: Redis Cluster Tier`,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Frontend & Web Architecture",
    icon: "Layout",
    skills: [
      { name: "TypeScript / JavaScript", level: 96, description: "Advanced type gymnastics, async patterns & tooling" },
      { name: "React 19 & Next.js (App Router)", level: 95, description: "Server components, streaming SSR & optimization" },
      { name: "Tailwind CSS & CSS Systems", level: 92, description: "Design systems, tokens, fluid responsive layouts" },
      { name: "State Management & React Query", level: 90, description: "Zustand, Redux Toolkit, optimistic updates" },
      { name: "Performance & Core Web Vitals", level: 94, description: "Sub-second LCP, INP tuning, bundle splitting" },
    ],
  },
  {
    name: "Backend, APIs & Distributed Systems",
    icon: "Server",
    skills: [
      { name: "Node.js & Express / NestJS", level: 94, description: "High-throughput microservices, event emitters" },
      { name: "Go (Golang)", level: 88, description: "Concurrent workers, goroutines & gRPC microservices" },
      { name: "Python (FastAPI / Django)", level: 90, description: "Async REST APIs, AI/ML model serving pipelines" },
      { name: "GraphQL & RESTful Design", level: 93, description: "Federated schemas, caching directives & security" },
      { name: "Message Queues & Event Streaming", level: 86, description: "Kafka, RabbitMQ, BullMQ distributed queues" },
    ],
  },
  {
    name: "Databases, Caching & Storage",
    icon: "Database",
    skills: [
      { name: "PostgreSQL & SQL Tuning", level: 92, description: "Complex indexing, partitioning & query plans" },
      { name: "Redis & In-Memory Caching", level: 90, description: "Pub/Sub, rate limiting, session caching" },
      { name: "MongoDB & NoSQL", level: 86, description: "Document modeling, aggregation pipelines" },
      { name: "Prisma & Drizzle ORM", level: 92, description: "Type-safe migrations & automated seeders" },
    ],
  },
  {
    name: "Cloud, DevOps & Observability",
    icon: "Cloud",
    skills: [
      { name: "Docker & Containerization", level: 92, description: "Multi-stage builds, slim images, security audits" },
      { name: "Kubernetes & Helm", level: 84, description: "Ingress routing, HPA, cluster configurations" },
      { name: "AWS (ECS, Lambda, S3, RDS)", level: 89, description: "Serverless architectures, VPCs & IAM policies" },
      { name: "CI/CD & GitHub Actions", level: 94, description: "Automated test suites, preview builds & releases" },
      { name: "Monitoring & Observability", level: 88, description: "Prometheus, Grafana, Sentry, OpenTelemetry" },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "nexus-cloud",
    title: "NexusCloud Engine",
    tagline: "High-Performance Cloud Infrastructure Orchestrator",
    description:
      "A distributed orchestration platform for managing multi-cloud compute clusters, auto-scaling workloads with real-time telemetry streaming and automated failover.",
    category: "Full Stack",
    featured: true,
    image: "/projects/nexus-cloud.png",
    tags: ["Next.js 15", "TypeScript", "Go", "gRPC", "PostgreSQL", "Kafka", "Docker"],
    metrics: ["100k+ req/sec processed", "<15ms median latency", "99.99% fault tolerance"],
    liveUrl: "https://example.com/nexus",
    githubUrl: "https://github.com/example/nexus-cloud",
    highlights: [
      "Designed a real-time event pipeline handling 100M+ monthly telemetry events.",
      "Engineered an interactive live topology map using WebGL canvas and WebSockets.",
      "Achieved sub-15ms p99 response time through connection pooling and Redis caching.",
    ],
    architectureDetails: [
      "Decoupled microservice architecture communicating over bidirectional gRPC streams.",
      "PostgreSQL partitioned time-series storage with automated cold storage archiving.",
      "Distributed lock coordinator implemented with Redis Redlock algorithm.",
    ],
  },
  {
    id: "sentinel-ai",
    title: "Sentinel Observability AI",
    tagline: "Autonomous Incident Detection & Predictive Analytics",
    description:
      "An intelligent observability dashboard that correlates logs, metrics, and distributed traces to automatically diagnose production anomalies and suggest auto-remediations.",
    category: "AI / Machine Learning",
    featured: true,
    image: "/projects/sentinel-ai.png",
    tags: ["React", "FastAPI", "Python", "PyTorch", "OpenTelemetry", "TimescaleDB", "TailwindCSS"],
    metrics: ["72% faster MTTR", "94% anomaly detection accuracy", "Zero config ingest"],
    liveUrl: "https://example.com/sentinel",
    githubUrl: "https://github.com/example/sentinel-ai",
    highlights: [
      "Trained an unsupervised anomaly detection transformer model on production metric streams.",
      "Built an intuitive timeline visualizer capable of rendering 50,000 trace spans smoothly at 60fps.",
      "Reduced Mean Time to Resolution (MTTR) by 72% across 15 engineering teams.",
    ],
    architectureDetails: [
      "Streaming ingestion pipeline utilizing Apache Arrow for ultra-fast vectorized metric transformations.",
      "FastAPI backend with background task workers running isolated model inference.",
    ],
  },
  {
    id: "hyperflux-db",
    title: "HyperFlux In-Memory Cache",
    tagline: "Ultra-Lightweight Distributed Key-Value Store in Go",
    description:
      "A custom in-memory key-value database built in Go featuring LRU-K eviction, append-only persistence log (AOF), and Raft consensus for distributed high-availability.",
    category: "Backend & Cloud",
    featured: true,
    image: "/projects/hyperflux.png",
    tags: ["Go", "Raft Consensus", "TCP Sockets", "Docker", "Benchmarking"],
    metrics: ["1.2M OPS on single node", "Zero memory leaks in 30d soak test", "<2ms replication lag"],
    liveUrl: "https://example.com/hyperflux",
    githubUrl: "https://github.com/example/hyperflux",
    highlights: [
      "Custom byte-level serialization protocol minimizing network overhead by 48% vs JSON.",
      "Lock-free concurrent hash table using atomic CAS operations.",
      "Comprehensive fuzz testing and benchmark suite integrated in CI.",
    ],
    architectureDetails: [
      "Implemented Raft leader election and log replication from scratch.",
      "Write-ahead logging (WAL) with configurable fsync policies.",
    ],
  },
  {
    id: "zenith-ui",
    title: "Zenith Design System",
    tagline: "Accessible, Headless & Themeable UI Architecture",
    description:
      "A comprehensive design system and component architecture used across multiple web applications, featuring WCAG AAA accessibility, fluid typography, and zero-runtime CSS tokens.",
    category: "UI & Creative",
    featured: false,
    image: "/projects/zenith-ui.png",
    tags: ["React", "TypeScript", "TailwindCSS", "Storybook", "A11y", "NPM Package"],
    metrics: ["45+ accessible components", "100% WCAG AAA rating", "30k weekly downloads"],
    liveUrl: "https://example.com/zenith",
    githubUrl: "https://github.com/example/zenith-ui",
    highlights: [
      "Zero bundle bloat with tree-shakable ES modules.",
      "Keyboard navigable with automatic ARIA focus trap and screen-reader testing.",
      "Custom design token pipeline generating synchronized CSS and TypeScript types.",
    ],
    architectureDetails: [
      "Compound component patterns with React context and custom hook state machine.",
      "Automated visual regression testing with Playwright.",
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Senior Software Engineer",
    company: "Apex Tech Labs",
    period: "2023 — Present",
    location: "San Francisco, CA (Remote)",
    type: "Full-Time",
    summary:
      "Lead engineer for the core platform team, architecting microservices, optimizing data pipelines, and mentoring frontend & backend engineers.",
    achievements: [
      "Architected a Next.js micro-frontend platform serving 500k daily active users.",
      "Reduced cloud infrastructure costs by $140,000/year through Docker container rightsizing and auto-scaling policies.",
      "Established company-wide engineering guidelines for TypeScript typing and automated CI/CD security scanning.",
    ],
    technologies: ["Next.js", "TypeScript", "Go", "PostgreSQL", "AWS", "Kafka", "Docker"],
  },
  {
    id: "exp-2",
    role: "Full-Stack Software Engineer",
    company: "Vanguard Digital",
    period: "2021 — 2023",
    location: "New York, NY (Hybrid)",
    type: "Full-Time",
    summary:
      "Developed high-throughput API services and modern web interfaces for enterprise fintech clients.",
    achievements: [
      "Engineered real-time trading dashboards handling sub-second WebSocket updates.",
      "Migrated monolithic Node.js backend into modular Dockerized services, boosting deployment speed by 4x.",
      "Implemented comprehensive end-to-end testing pipeline achieving 92% code coverage.",
    ],
    technologies: ["React", "Node.js", "Express", "Redis", "MongoDB", "Jest", "TailwindCSS"],
  },
  {
    id: "exp-3",
    role: "Software Engineer",
    company: "Nova Systems",
    period: "2019 — 2021",
    location: "Austin, TX",
    type: "Full-Time",
    summary:
      "Built responsive customer-facing web applications and internal tooling for operational monitoring.",
    achievements: [
      "Built automated data ingestion pipelines processing 5M records daily.",
      "Refactored legacy UI components into reusable React design system, cutting feature development time by 35%.",
    ],
    technologies: ["JavaScript", "React", "Python", "Flask", "PostgreSQL", "Git"],
  },
];
