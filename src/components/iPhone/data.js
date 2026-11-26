// Content data for the iOS views. This mirrors the data that lives inline in
// the Mac app components (Finder.jsx: projectData, Notes.jsx:
// experienceData, awardsData). It is duplicated here on purpose: the
// desktop files are untouched by the mobile rebuild, and the iOS views read
// from this module instead of from the Mac components. If a project or role
// changes, update both places.

export const projects = [
    {
        id: 'bobalabs',
        title: 'Boba Labs',
        folder: 'Startups',
        date: 'Jan 2024',
        tile: '#AF52DE',
        description:
            'Boba Labs now ships a free resume builder — turn your experience into quantified, XYZ-formula bullets recruiters can scan in 7 seconds. Also co-founding a referral-based networking platform connecting recruiters with vetted talent through trusted peer networks.',
        link: 'https://namkhangnle.github.io/bobalabs/resume',
        linkText: 'Try the Free Resume Builder',
    },
    {
        id: 'diagnoseme',
        title: 'DiagnoseMe',
        folder: 'Hackathons',
        date: 'Feb 2024',
        tile: '#FF3B30',
        description:
            'Constructed a ChatGPT powered ElectronJS application for disease diagnosis supporting medical students and doctors in training. Streamlined user experience by creating 120 unique prompt-engineered scenarios through Pandas DataFrame consolidation. Achieved a 15% reduction in development time through REST APIs for seamless data exchange via JSON between React & Flask.',
        link: 'https://devfolio.co/projects/diagnoseme-1992',
        linkText: 'View on Devfolio',
    },
    {
        id: 'scribbletex',
        title: 'ScribbleTex',
        folder: 'Hackathons',
        date: 'Nov 2023',
        tile: '#0A84FF',
        description:
            'Developed a decision tree classifier and a convolutional neural network (CNN) using Keras achieving 97% translation accuracy. Preprocessed 3 datasets comprising over 200,000 samples. Implemented a React-based frontend built using HTML, CSS, and JavaScript connected to a Python Flask backend with REST API endpoints for optimized communication with the CNN model hosted on GCP Vertex AI.',
        link: 'https://devpost.com/software/scribbletex',
        linkText: 'AI ATL Github Winners!',
    },
    {
        id: 'morsetorch',
        title: 'MorseTorch',
        folder: 'Hackathons',
        date: 'Oct 2023',
        tile: '#FF9500',
        description:
            'Employed Swift-based iOS application for Morse code translation, integrating Torch and Carthage binary framework. Executed K-means clustering algorithm using CoreML enabling real-time translation of optical signals with a 75% accuracy rate. Using advanced computer vision technology, our app allows users to seamlessly communicate in Morse code.',
        link: 'https://cpjoseph18.wixsite.com/morsetorch',
        linkText: 'HackGT Hackathon',
    },
    {
        id: 'hemodynamics',
        title: 'Emory Hemodynamics Calculator',
        folder: 'Projects',
        date: '2023–2024',
        tile: '#30D158',
        description:
            'Developed a full-stack application for the Emory University School of Medicine to be used by 10 clinicians to reduce measurement error daily, impacting over 1,000 patients within the ICU. Leveraged ReactJS, Express, and MongoDB to develop interactive visualizations of trends in patient data, reducing data-related errors by 34%.',
        link: 'https://hemodynamics.vercel.app/',
        linkText: 'GT CS Capstone',
    },
];

export const projectFolders = ['Startups', 'Hackathons', 'Projects'];

export const experience = [
    {
        id: 'meta',
        company: 'Meta',
        url: 'https://about.meta.com/',
        title: 'Software Engineer II',
        period: 'Aug 2025 – Present',
        location: 'New York, NY',
        skills: ['Agentic AI systems', 'LLM harnesses', 'Agent evaluation', 'Context engineering', 'PyTorch', 'Distributed Systems'],
        points: [
            'Build infrastructure for agentic AI systems at Meta — agent harnesses and evaluation for the AI assistants used across the company.',
            'Work across the agent stack: tool use, context management, and evaluation.',
            'Standardize LLM evaluation pipelines to benchmark GenAI features, and ship AI-powered features to production surfaces.',
        ],
    },
    {
        id: 'aws',
        company: 'AWS',
        url: 'https://aws.amazon.com/',
        title: 'SDE Intern',
        period: 'May 2024 – Aug 2024',
        location: 'Arlington, VA',
        skills: ['Java', 'Spring Boot', 'SWF', 'SNS', 'SQS', 'Bedrock'],
        points: [
            'Engineered a Java and Spring-based customer-facing communication service to automate the delivery of 10+ Government Cloud request email notifications per day by enabling seamless integration with 3 native AWS packages.',
            'Redesigned a 13-year-old email system into a scalable, end-to-end microservices architecture using AWS SWF, SNS, and SQS achieving a processing rate of over 5 transactions per second (TPS), ensuring redundancy and autoscaling across the application.',
            'Architected a 1st place-winning Amazon Bedrock-powered AI onboarding buddy, fine-tuned on internal documentation, to significantly reduce ramp-up lag time for new software engineers company-wide and reducing question response time.',
        ],
    },
    {
        id: 'citi',
        company: 'Citigroup',
        url: 'https://www.citigroup.com/',
        title: 'SWE Intern',
        period: 'Jun 2023 – Aug 2023',
        location: 'Tampa, FL',
        skills: ['Angular', 'Oracle DB', 'Java', 'Spring Boot', 'Python'],
        points: [
            'Spearheaded Event Master Central, a full stack application for real-time corporate action event monitoring of financial assets in Angular & Oracle Database increasing engineering awareness of deployment failures by 18%.',
            'Revamped authentication logic, fortifying API token validation for REST API calls, contributing an 85% uptime to production.',
            'Orchestrated seamless integration with Institutional Services Group’s Cloud services using Spring Boot, optimizing performance through JSON-based HTTP requests, and enhancing overall efficiency by 15% across the application.',
            'Leveraged Python’s Pandas DataFrame to analyze surface temperatures vs global domestic product, resulting in a 0.8 positive correlation within Tableau in support of Citi’s 1 trillion dollar commitment to sustainable finance.',
        ],
    },
    {
        id: 'lockheed',
        company: 'Lockheed Martin',
        url: 'https://www.lockheedmartin.com/',
        title: 'SWE Intern',
        period: 'May 2022 – Aug 2022',
        location: 'Manassas, VA',
        skills: ['Python', 'Kubeflow', 'PyTorch', 'TensorFlow', 'Spring'],
        points: [
            'Trained a wildfire-based infrastructure identification AI model through Kubeflow, Pytorch, & Tensorflow, with 98% accuracy.',
            'Implemented a real-time data monitoring interface in Spring, driving a 20% increase in operator awareness & object tracking.',
            'Transformed codebase maintainability by converting logging levels from Apache Log4J to SLF4J, achieving 80% code coverage.',
            'Collaborated with quality analysis team to execute comprehensive testing, resulting in a 12% reduction in logging inefficiencies.',
        ],
    },
];

export const awards = [
    '3rd Place, Spring 2024 Georgia Tech Junior Design Capstone Expo (Hemodynamics Calculator)',
    'Winner, AI ATL 2023 (ScribbleTex, GitHub prize)',
    "President's Undergraduate Research Award, Georgia Tech, 2021",
];

export const about = {
    name: 'Namkhang Le',
    role: 'Software Engineer II, Agentic Systems @ Meta',
    school: 'Georgia Tech CS ’25 · Intelligence & Information Internetworks',
    email: 'NamkhangNLe@hotmail.com',
    intro: [
        'Hi! I’m Namkhang Le.',
        'I’m a Software Engineer at Meta, where I work on LLMs and generative AI — agent harnesses and evaluation for the AI assistants used across the company.',
        'Before Meta: AWS, Lockheed Martin, and Citi. I’m a Georgia Tech grad, CS with focuses in AI and computer networking.',
        'Outside of work I love building things at hackathons, I’m nerdy about tech gadgets, I love literary fiction, and I play way too many battle royale games.',
    ],
    technologies: ['Python', 'TypeScript', 'React.js', 'PyTorch', 'Node.js', 'Java'],
};
