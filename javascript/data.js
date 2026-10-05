// All portfolio content, taken from Sudipto_Sarkar_CV.pdf.
// Edit this file to update the site; main.js renders everything from here.

const PORTFOLIO = {
  // Research profiles. Leave a value empty ("") to hide its button.
  profiles: {
    scholar: "" // Google Scholar profile URL, e.g. https://scholar.google.com/citations?user=XXXXXXXX
  },

  projects: [
    {
      title: "Autonomous Rescue Drone for Locating Survivors",
      date: "Sep 2024 – Dec 2024",
      icon: "fa-helicopter",
      cats: ["robotics", "ai"],
      tags: ["Computer Vision", "AI", "UAV"],
      metric: { value: "GPS", label: "autonomous waypoints" },
      points: [
        "Developed an AI-powered drone for search and rescue in disaster areas.",
        "Implemented real-time human detection using a tracking algorithm and OpenCV.",
        "Integrated GPS-based autonomous flight control for structured coverage and waypoint navigation."
      ],
      link: "https://github.com/JubayerONROB/autonomous-rescue-drone"
    },
    {
      title: "Deepfake Detection using CLIP-ViT",
      date: "Oct 2024 – Jan 2025",
      icon: "fa-masks-theater",
      cats: ["ai"],
      tags: ["OpenCLIP", "ViT", "PyTorch"],
      metric: { value: "97%", label: "validation accuracy" },
      points: [
        "Developed a deepfake detection model using OpenCLIP-ViT trained on a balanced dataset.",
        "Achieved 98% training and 97% validation accuracy using strict mini-batch training and augmentation.",
        "Evaluated the model on the IEEE SP Cup 2025 dataset (43k real, 219k fake images)."
      ]
    },
    {
      title: "Multi-Modal Political Meme Classification",
      date: "2025",
      icon: "fa-layer-group",
      cats: ["ai"],
      tags: ["Computer Vision", "NLP", "Multimodal AI", "PyTorch"],
      metric: { value: "90.7%", label: "validation accuracy" },
      points: [
        "Proposed a novel dual co-attention framework integrating CLIP, XGLM, EasyOCR, and PaddleOCR for multimodal political meme classification.",
        "Achieved 90.7% validation accuracy and 82.8% test accuracy on a large-scale political meme dataset.",
        "Enabled interpretable cross-modal feature fusion, improving robustness for multilingual political memes."
      ],
      link: "https://github.com/DarkJ0Y/polimemeDetector"
    },
    {
      title: "Shabdotori: Bengali Dialect Speech Recognition",
      date: "2025",
      icon: "fa-microphone-lines",
      cats: ["ai"],
      tags: ["Speech Processing", "ASR", "Deep Learning", "LoRA"],
      metric: { value: "2-stage", label: "dialect-aware ASR" },
      points: [
        "Proposed a two-stage Bengali dialect ASR pipeline combining Wav2Vec2-based dialect classification with LoRA fine-tuned Whisper models.",
        "Achieved significant improvements in WER and CER over dialect-agnostic ASR through region-specific transcription.",
        "Enhanced robustness using comprehensive audio data augmentation for low-resource Bengali dialects."
      ],
      link: "https://github.com/DarkJ0Y/bengaliWhisperMedium"
    },
    {
      title: "Brain Tumor Detection on MRI Images",
      date: "Dec 2023 – Feb 2024",
      icon: "fa-brain",
      cats: ["ai"],
      tags: ["Digital Image Processing", "MATLAB"],
      metric: { value: "CAD", label: "automated detection" },
      points: [
        "Developed a CAD system for automated brain tumor detection in MRI images.",
        "Improved MRI image clarity through advanced image processing and filtering techniques.",
        "Achieved high sensitivity and specificity in tumor detection in validation experiments."
      ],
      link: "https://github.com/DarkJ0Y/brianTumorDetectWatershed"
    },
    {
      title: "FPGA Based Home Automation System",
      date: "Sep 2024 – Jan 2025",
      icon: "fa-microchip",
      cats: ["hardware"],
      tags: ["Quartus", "FPGA", "Verilog"],
      metric: { value: "IoT", label: "occupancy-driven control" },
      points: [
        "Implemented an IoT-based home automation system on FPGA using Quartus and Verilog.",
        "Device regulation in a room controlled by the number of individuals (sensor-driven logic)."
      ],
      link: "https://github.com/JubayerONROB/FPGA-based-Home-Automation-System-"
    },
    {
      title: "Underfrequency Load Shedding Implementation",
      date: "Dec 2023 – Mar 2024",
      icon: "fa-bolt",
      cats: ["power"],
      tags: ["PSS/E", "Power Systems"],
      metric: { value: "24-bus", label: "IEEE test system" },
      points: [
        "Analyzed underfrequency load shedding schemes using PSS/E on the IEEE 24-bus test system.",
        "Simulated load shedding strategies and assessed system recovery and stability."
      ],
      link: "https://github.com/JubayerONROB/Under-Frequency-Load-Shedding-Implementation-in-PSSE"
    },
    {
      title: "Ultrasonic Obstacle Mapping Bot",
      date: "2025",
      icon: "fa-satellite-dish",
      cats: ["robotics", "hardware"],
      tags: ["Embedded Systems", "Robotics", "IoT"],
      metric: { value: "180°", label: "environment scanning" },
      points: [
        "Developed an autonomous robot using NodeMCU and an HC-SR04 ultrasonic sensor for real-time indoor mapping.",
        "Implemented obstacle avoidance and 180° scanning using a servo-based sensing mechanism.",
        "Designed a web-based interface to visualize mapped surroundings dynamically.",
        "Built as a low-cost, educational DIY platform for robotics and embedded systems experimentation."
      ],
      link: "https://github.com/JubayerONROB/Ultrasonic-Obstacle-Mapping-Bot"
    }
  ],

  publications: [
    {
      status: "Published",
      kind: "Conference Paper",
      title: "Real-Time Multi-Modal Drone and Bird Tracking Using Modality-Aware Adaptation and Physics-Aware Filtering",
      authors: "F. Labiba, M. A. Hasan, S. Sarkar, A. Shahriar, N. Tasnim, S. A. Fattah",
      venue: "2025 IEEE International Women in Engineering (WIE) Conference on Electrical and Computer Engineering (WIECON-ECE), Cox's Bazar, Bangladesh",
      year: "2025",
      icon: "fa-satellite-dish",
      links: [
        { label: "IEEE Xplore", url: "https://ieeexplore.ieee.org/document/11526317" },
        { label: "DOI", url: "https://doi.org/10.1109/WIECON-ECE69386.2025.11526317" }
      ]
    },
    {
      status: "Preprint",
      kind: "arXiv",
      title: "EGD-YOLO: A Lightweight Multimodal Framework for Robust Drone-Bird Discrimination via Ghost-Enhanced YOLOv8n and EMA Attention under Adverse Conditions",
      authors: "S. Sarkar, M. A. Hasan, K. A. Shahriar, F. Labiba, N. Tasnim, S. A. H. Fattah",
      venue: "arXiv preprint arXiv:2510.10765",
      year: "2025",
      icon: "fa-eye",
      links: [
        { label: "arXiv", url: "https://arxiv.org/abs/2510.10765" },
        { label: "PDF", url: "https://arxiv.org/pdf/2510.10765" },
        { label: "DOI", url: "https://doi.org/10.48550/arXiv.2510.10765" }
      ]
    },
    {
      status: "Under Review",
      kind: "Journal Manuscript",
      title: "GLFNet: Gated Local-Focus Network for EEG-Based Visual Semantic Decoding",
      authors: "S. Sarkar, H. Imtiaz",
      venue: "Manuscript under review",
      year: "2026",
      icon: "fa-brain"
    }
  ],

  timeline: [
    { type: "experience", period: "2025 – Present", title: "Founder & Senior Software Developer", org: "Langgol – Agritech", place: "Dhaka, Bangladesh", icon: "fa-seedling" },
    { type: "leadership", period: "2025 – Present", title: "President", org: "BUET Robotics Society", icon: "fa-robot" },
    { type: "leadership", period: "2025 – Present", title: "Vice Chairperson", org: "IEEE BUET Student Branch Chapter", icon: "fa-people-group" },
    { type: "leadership", period: "2025 – Present", title: "Senior Coordinator", org: "Team Interplanetary – Drone Sub-Team", icon: "fa-helicopter" },
    { type: "leadership", period: "2024 – 2025", title: "Treasurer", org: "BUET Robotics Society", icon: "fa-robot" },
    { type: "experience", period: "2023 – Present", title: "Math Instructor", org: "Udvash (Education Institute)", place: "Dhaka, Bangladesh", icon: "fa-chalkboard-user" },
    { type: "education", period: "2022 – 2026 (Expected)", title: "B.Sc. Engg., Electrical & Electronic Engineering", org: "Bangladesh University of Engineering and Technology (BUET)", place: "Dhaka, Bangladesh", note: "CGPA 3.21 (up to Level-4 Term 2)", icon: "fa-graduation-cap" },
    { type: "experience", period: "2020 – 2024", title: "Founder & Senior Developer", org: "Somakolon – the learning app", place: "Dhaka, Bangladesh", icon: "fa-book-open-reader", link: "https://www.somakolon.apeiroworld.com/" },
    { type: "education", period: "2018 – 2020", title: "Higher Secondary Certificate (HSC), Science", org: "Notre Dame College", place: "Dhaka, Bangladesh", icon: "fa-graduation-cap" },
    { type: "education", period: "2012 – 2018", title: "Secondary School Certificate (SSC), Science", org: "Kushtia Zilla School", place: "Kushtia, Bangladesh", icon: "fa-graduation-cap" }
  ],

  awards: [
    { rank: "2nd Runner Up", title: "IEEE VIP-CUP 2025", year: "2025", note: "Lightweight multimodal drone–bird detection and tracking system for the IEEE VIP-CUP international competition", icon: "fa-trophy" },
    { rank: "1st Runner Up", title: "IAS Humanitarian Contest 2025", year: "2025", note: "Autonomous disaster-response drone for search and rescue and medical supply delivery", icon: "fa-trophy" },
    { rank: "Champion", title: "University Innovation Hub Programme 2025", year: "2025", note: "IC4, BUET", icon: "fa-crown" },
    { rank: "1st Runner Up", title: "IEEE-WIE Robotics for Climate Change", year: "2024", note: "WIE BD Summit", icon: "fa-medal" },
    { rank: "1st Runner Up", title: "Project Showcasing", year: "2024", note: "EEE DAY 2023", icon: "fa-medal" },
    { rank: "2nd Runner Up", title: "Project Showcasing", year: "2025", note: "Intra BUET Robo Challenge", icon: "fa-medal" },
    { rank: "Finalist", title: "Orange Corners Bangladesh Ideation Challenge", year: "2025", note: "IC 5.0", icon: "fa-award" },
    { rank: "Finalist", title: "Datathon CUET CSE FEST 2025", year: "2025", note: "Novel PaddleOCR pipeline to classify memes as political or non-political", icon: "fa-award" },
    { rank: "Finalist", title: "Hult Prize at BUET", year: "2024", icon: "fa-award" }
  ],

  skills: {
    "Languages": ["Python", "C++", "C", "JavaScript", "SQL", "PHP", "HTML", "CSS", "MATLAB"],
    "ML & AI": ["PyTorch", "TensorFlow", "OpenCV", "Scikit-learn", "Hugging Face", "OpenCLIP", "YOLOv8", "OCR", "Whisper", "Wav2Vec2", "LoRA", "Pandas", "NumPy"],
    "Backend & DevOps": ["Node.js", "Firebase", "Docker", "Git", "GitHub"],
    "Hardware & Robotics": ["Arduino", "ESP32", "Raspberry Pi 4B", "Pixhawk", "FPGA", "ROS"],
    "Tools": ["Kaggle", "Vast.ai", "VS Code", "Blender", "Figma", "PSS/E", "LTspice", "Mission Planner", "RealVNC"]
  },

  coursework: ["AI & ML", "Digital Signal Processing", "Digital Electronics", "Random Signal Processing", "Communication System", "MATLAB", "Power Electronics", "Control System", "Robotics and Automation"],

  interests: [
    { label: "Brain-Computer Interface", icon: "fa-brain" },
    { label: "Computer Vision", icon: "fa-eye" },
    { label: "Quantum Computing & QML", icon: "fa-atom" },
    { label: "Deep Learning", icon: "fa-diagram-project" },
    { label: "Foundation Models & LLMs", icon: "fa-cubes" },
    { label: "Biomedical AI", icon: "fa-heart-pulse" }
  ]
};
