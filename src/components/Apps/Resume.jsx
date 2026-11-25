import React from 'react';

// In-site, readable rendering of Namkhang's resume (Namkhang_Le_Resume.pdf).
// Used on phone widths, where the full-page PDF scales too small to read.
// The text below reproduces the PDF verbatim.
export default function Resume() {
    return (
        <div className="bg-white text-gray-800 font-sans select-none">
            <div className="max-w-3xl mx-auto px-2 py-2 space-y-8">
                {/* Header */}
                <div className="text-center space-y-1">
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Namkhang Le</h1>
                    <p className="text-[13px] text-gray-600">
                        NamkhangNLe@hotmail.com | (571) 443-0967 | San Francisco, CA
                    </p>
                    <p className="text-[13px] text-gray-600">
                        NamkhangNLe.github.io | linkedin.com/in/NamkhangNLe
                    </p>
                    <p className="pt-2">
                        <a
                            href="/Namkhang_Le_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[13px] font-semibold text-[#3478F6] hover:underline"
                        >
                            Download PDF
                        </a>
                    </p>
                </div>

                {/* Experience */}
                <section className="space-y-5">
                    <h2 className="text-lg font-black text-gray-900 border-b border-gray-200 pb-1">
                        Experience
                    </h2>

                    <div className="space-y-1">
                        <div className="flex items-baseline justify-between gap-4">
                            <h3 className="font-bold text-gray-900">Meta (Facebook)</h3>
                            <span className="text-[13px] text-gray-500 whitespace-nowrap">Menlo Park, CA</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                            <p className="text-[14px] text-gray-700">Software Engineer</p>
                            <span className="text-[13px] text-gray-500 whitespace-nowrap">August 2025 - Present</span>
                        </div>
                        <ul className="list-disc pl-5 space-y-1 text-[14px] leading-relaxed text-gray-700">
                            <li>Architected a semantic search and embedding-based retrieval system, improving content discovery and content accuracy.</li>
                            <li>Standardized LLM evaluation pipelines to benchmark GenAI features, reducing hallucination rates by 34% and accuracy by 12%.</li>
                            <li>Shipped new GenAI feature on Android, launching AI-powered summaries and contextual suggestions to 3B+ users.</li>
                            <li>Led development of an internal full-stack application (React, GraphQL) that scaled Facebook&apos;s meme strategy across surfaces, enabling automated content analysis, curation workflows, and cross-functional collaboration.</li>
                        </ul>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-baseline justify-between gap-4">
                            <h3 className="font-bold text-gray-900">Amazon Web Services (AWS)</h3>
                            <span className="text-[13px] text-gray-500 whitespace-nowrap">Arlington, VA</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                            <p className="text-[14px] text-gray-700">Software Development Engineer Intern</p>
                            <span className="text-[13px] text-gray-500 whitespace-nowrap">May 2024 – August 2024</span>
                        </div>
                        <ul className="list-disc pl-5 space-y-1 text-[14px] leading-relaxed text-gray-700">
                            <li>Engineered a Java and Spring-based customer-facing communication service to automate the delivery of 10+ Government Cloud request email notifications (received, approved, denied) per day by enabling seamless integration with 3 native AWS packages.</li>
                            <li>Redesigned a 13-year-old email system into a scalable, end-to-end microservices architecture using AWS SWF, SNS, and SQS achieving a processing rate of over 5 transactions per second (TPS), ensuring redundancy and autoscaling across the application.</li>
                            <li>Architected a 1st place-winning Amazon Bedrock-powered AI onboarding buddy, fine-tuned on internal documentation, to significantly reduce ramp-up lag time for new software engineers company-wide and reducing question response time.</li>
                        </ul>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-baseline justify-between gap-4">
                            <h3 className="font-bold text-gray-900">Citigroup</h3>
                            <span className="text-[13px] text-gray-500 whitespace-nowrap">Tampa, FL</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                            <p className="text-[14px] text-gray-700">Software Engineer Intern</p>
                            <span className="text-[13px] text-gray-500 whitespace-nowrap">June 2023 – August 2023</span>
                        </div>
                        <ul className="list-disc pl-5 space-y-1 text-[14px] leading-relaxed text-gray-700">
                            <li>Spearheaded Event Master Central, a full stack application for real-time corporate action event monitoring of financial assets in Angular &amp; Oracle Database increasing engineering awareness of deployment failures by 18%.</li>
                            <li>Revamped authentication logic, fortifying API token validation for REST API calls, contributing an 85% uptime to production.</li>
                            <li>Orchestrated seamless integration with Institutional Services Group&apos;s Cloud services using Spring Boot, optimizing performance through JSON-based HTTP requests, and enhancing overall efficiency by 15% across the application.</li>
                            <li>Leveraged 2 Python&apos;s Pandas DataFrame to analyze surface temperatures vs global domestic product, resulting in a 0.8 positive correlation within Tableau in support of Citi&apos;s 1 trillion dollar commitment to sustainable finance.</li>
                        </ul>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-baseline justify-between gap-4">
                            <h3 className="font-bold text-gray-900">Lockheed Martin</h3>
                            <span className="text-[13px] text-gray-500 whitespace-nowrap">Manassas, VA</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                            <p className="text-[14px] text-gray-700">Software Engineer Intern</p>
                            <span className="text-[13px] text-gray-500 whitespace-nowrap">May 2022 – August 2022</span>
                        </div>
                        <ul className="list-disc pl-5 space-y-1 text-[14px] leading-relaxed text-gray-700">
                            <li>Trained a wildfire-based infrastructure identification AI model through Kubeflow, Pytorch, &amp; Tensorflow, with 98% accuracy.</li>
                            <li>Implemented a real-time data monitoring interface in Spring, driving a 20% increase in operator awareness &amp; object tracking.</li>
                            <li>Transformed codebase maintainability by converting logging levels from Apache Log4J to SLF4J, achieving 80% code coverage.</li>
                            <li>Collaborated with quality analysis team to execute comprehensive testing, resulting in a 12% reduction in logging inefficiencies.</li>
                        </ul>
                    </div>
                </section>

                {/* Projects */}
                <section className="space-y-5">
                    <h2 className="text-lg font-black text-gray-900 border-b border-gray-200 pb-1">
                        Projects
                    </h2>

                    <div className="space-y-1">
                        <div className="flex items-baseline justify-between gap-4">
                            <h3 className="font-bold text-gray-900">Georgia Tech Computer Science Capstone Project | JavaScript, ReactJS, MongoDB, ExpressJS, NodeJS</h3>
                            <span className="text-[13px] text-gray-500 whitespace-nowrap">August 2023 – May 2024</span>
                        </div>
                        <ul className="list-disc pl-5 space-y-1 text-[14px] leading-relaxed text-gray-700">
                            <li>Developed a Hemodynamics Calculator, a full-stack application for the Emory University School of Medicine, to be used by 10 clinicians to reduce measurement error daily, impacting over 1,000 patients within the intensive care unit.</li>
                            <li>Leveraged ReactJS, Express, and MongoDB to develop user-friendly interactive visualizations of trends in patient data and a reduction in data-related errors by 34%.</li>
                        </ul>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-baseline justify-between gap-4">
                            <h3 className="font-bold text-gray-900">ScribbleTex (AI ATL Hackathon GitHub Winner) | JavaScript, Google Cloud Platform, VertexAI, Flask, ReactJS</h3>
                            <span className="text-[13px] text-gray-500 whitespace-nowrap">November 2023</span>
                        </div>
                        <ul className="list-disc pl-5 space-y-1 text-[14px] leading-relaxed text-gray-700">
                            <li>Preprocessed 3 datasets comprising over 200,000 samples for the training of a custom machine learning model Scikit-learn.</li>
                            <li>Developed a decision tree classifier and a convolutional neural network using Keras achieving a 97% translation accuracy.</li>
                            <li>Implemented a React-base frontend built using HTML, CSS, and JavaScript connected to a Python Flask backend with Rest API endpoints for optimized communication with the CNN model hosted on Google Cloud&apos;s Vertex AI platform.</li>
                        </ul>
                    </div>
                </section>

                {/* Education */}
                <section className="space-y-2">
                    <h2 className="text-lg font-black text-gray-900 border-b border-gray-200 pb-1">
                        Education
                    </h2>
                    <h3 className="font-bold text-gray-900">Georgia Institute of Technology</h3>
                    <p className="text-[14px] leading-relaxed text-gray-700">
                        B.S. Computer Science, concentrations in Intelligence (AI/ML) and Information Internetworks
                    </p>
                    <p className="text-[14px] leading-relaxed text-gray-700">
                        Relevant Coursework: Data Structures &amp; Algorithms, Artificial Intelligence, Design &amp; Analysis of Algorithms, Computer Organization &amp; Programming, Probability &amp; Statistics, Combinatorics, Linear Algebra, Computer Systems &amp; Networks, Database Systems
                    </p>
                </section>

                {/* Skills */}
                <section className="space-y-2">
                    <h2 className="text-lg font-black text-gray-900 border-b border-gray-200 pb-1">
                        Skills
                    </h2>
                    <p className="text-[14px] leading-relaxed text-gray-700">
                        <span className="font-bold text-gray-900">Programming Languages: </span>
                        Hack, Java, Python, C, SQL, JavaScript, CSS, HTML, UML, C#, R, Swift, LaTeX
                    </p>
                    <p className="text-[14px] leading-relaxed text-gray-700">
                        <span className="font-bold text-gray-900">Technologies: </span>
                        GraphQL, Spring Boot, Angular, Android Studio, Bootstrap, RESTful APIs, Gradle, Pandas, Postman, React, Linux
                    </p>
                    <p className="text-[14px] leading-relaxed text-gray-700">
                        <span className="font-bold text-gray-900">Software Development: </span>
                        Agile, Jira, CI/CD, DevSecOps, CLI, Confluence, Coverity, Jenkins, Artifactory, Unit Test, Git
                    </p>
                    <p className="text-[14px] leading-relaxed text-gray-700">
                        <span className="font-bold text-gray-900">Spoken Languages: </span>
                        English (Native), Vietnamese (Fluent), Spanish (Limited Working Proficiency)
                    </p>
                </section>
            </div>
        </div>
    );
}
