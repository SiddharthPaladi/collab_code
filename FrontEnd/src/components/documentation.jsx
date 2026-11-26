import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TbArrowUp, TbCopy } from 'react-icons/tb';
import FloatingDockDesktop from './FloatingDockDesktop';

const DocumentationPage = () => {
    // All sections for the documentation
    const sections = [
        {
            id: "overview",
            title: "Overview",
            content: "Collab Code is a collaborative coding workspace built on the MERN stack. Teams can edit projects together, run applications in the browser, communicate in real time, and use AI assistance directly alongside their code. It combines project management, a shared editor, terminal access, browser previews, team chat, and an AI coding agent in one environment."
        },
        {
            id: "features",
            title: "Features",
            content: [
                "Real-time collaborative editing with shared project sessions",
                "AI-powered coding assistance for questions and file changes",
                "Browser-based project execution with WebContainer",
                "Team chat, project management, and member invitations",
                "Secure authentication and protected project routes"
            ]
        },
        {
            id: "tech-stack",
            title: "Tech Stack",
            content: [
                "Frontend: React.js, Tailwind CSS, Monaco Editor, Yjs, and WebContainer",
                "Backend: Node.js, Express.js, NodeGit, Passport",
                "AI Integration: Google Generative AI (Gemini)",
                "Database: MongoDB (with Mongoose for ODM)",
                "Real-time Communication: Socket.io"
            ]
        },
        {
            id: "folder-structure",
            title: "Folder Structure",
            codeBlock: `COLLAB CODE
├── BackEnd
│   ├── controllers
│   ├── middlewares
│   ├── routes
│   ├── services
│   ├── db
│   │   └── models
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── FrontEnd
│   ├── public
│   ├── src
│   ├── package.json
│   └── package-lock.json
├── README.md
└── package.json`
        },
        {
            id: "npm-packages",
            title: "Key NPM Packages",
            tables: [
                {
                    title: "Backend Packages",
                    headers: ["Package", "Description"],
                    rows: [
                        ["@google/generative-ai", "Google's Generative AI library"],
                        ["bcrypt", "Library for hashing passwords securely"],
                        ["cookie-parser", "Middleware to parse cookies"],
                        ["cors", "Middleware for handling Cross-Origin Resource Sharing"],
                        ["dotenv", "Loads environment variables from .env files"],
                        ["express", "Web framework for handling routes, middleware, and HTTP requests/responses"],
                        ["express-validator", "Library for validating and sanitizing user inputs"],
                        ["jsonwebtoken", "Token-based authentication"],
                        ["mongoose", "Object Data Modeling (ODM) library for MongoDB"],
                        ["morgan", "HTTP request logger middleware"],
                        ["nodegit", "Library for running Git commands in Node.js"],
                        ["passport", "Authentication middleware for Node.js"],
                        ["passport-github", "GitHub OAuth strategy for Passport"],
                        ["socket.io", "Real-time bidirectional communication"]
                    ]
                },
                {
                    title: "Frontend Packages",
                    headers: ["Package", "Description"],
                    rows: [
                        ["@radix-ui/react-label", "Accessible label component"],
                        ["@radix-ui/react-slot", "Primitive slot component from Radix"],
                        ["@react-oauth/google", "Google OAuth integration for React"],
                        ["@react-three/drei", "Helper components for react-three-fiber"],
                        ["@react-three/fiber", "React renderer for three.js"],
                        ["@tabler/icons-react", "Tabler icon set for React"],
                        ["@tailwindcss/vite", "Tailwind CSS plugin for Vite"],
                        ["@webcontainer/api", "Run Node.js apps in the browser"],
                        ["axios", "Promise-based HTTP client"],
                        ["class-variance-authority", "Conditional classNames utility"],
                        ["clsx", "Utility for constructing className strings"],
                        ["dotenv", "Loads environment variables"],
                        ["framer-motion", "Animation library for React"],
                        ["jwt-decode", "Decode JWT tokens"],
                        ["lucide-react", "Icon set for React"],
                        ["motion", "Animation helpers for React"],
                        ["prop-types", "Runtime type checking for React props"],
                        ["react", "JavaScript library for building user interfaces"],
                        ["react-dom", "Renders React components to the DOM"],
                        ["react-icons", "SVG icon library for React"],
                        ["react-router-dom", "Routing library for React"],
                        ["socket.io", "Real-time event library"],
                        ["socket.io-client", "Client for Socket.io"],
                        ["tailwind-merge", "Utility to merge Tailwind CSS classes"],
                        ["tailwind-scrollbar-hide", "Hide scrollbars with Tailwind"],
                        ["tailwindcss-animate", "Animations for Tailwind CSS"],
                        ["three", "3D library for WebGL"],
                        ["three-globe", "Globe visualization built on three.js"]
                    ]
                }
            ]
        },
        {
            id: "installation",
            title: "Installation",
            subsections: [
                {
                    title: "Prerequisites",
                    content: [
                        "Node.js and npm installed",
                        "MongoDB installed and running"
                    ]
                },
                {
                    title: "Steps",
                    steps: [
                        {
                            text: "Clone the repository:",
                            code: "git clone https://github.com/your-repo/COLLAB-CODE.git"
                        },
                        {
                            text: "Navigate to the project folder:",
                            code: "cd COLLAB-CODE"
                        },
                        {
                            text: "Install backend dependencies:",
                            code: "cd BackEnd\nnpm install"
                        },
                        {
                            text: "Install frontend dependencies:",
                            code: "cd ../FrontEnd\nnpm install"
                        },
                        {
                            text: "Configure environment variables:",
                            subtext: "Create a .env file in the BackEnd folder.",
                            code: "PORT=3000\nMONGO_URI=your_mongodb_connection_string\nJWT_SECRET=your_jwt_secret"
                        },
                        {
                            text: "Start the development server:",
                            subtext: "For backend:",
                            code: "cd BackEnd\nnpm run dev",
                            secondSubtext: "For frontend:",
                            secondCode: "cd ../FrontEnd\nnpm start"
                        }
                    ]
                }
            ]
        },
        {
            id: "usage",
            title: "Usage",
            steps: [
                {
                    text: "Open the application in your browser at http://localhost:3000."
                },
                {
                    text: "Sign up or log in to access the messaging interface."
                },
                {
                    text: "To interact with Gemini AI, start your message with @ai. For example:",
                    code: "@ai What is the weather today?"
                }
            ]
        },
        {
            id: "contributing",
            title: "Contributing",
            content: "We welcome contributions to enhance the functionality and performance of Collab Code. Please create a pull request with a detailed description of your changes."
        },
        {
            id: "license",
            title: "License",
            content: "This project is licensed under the MIT License."
        },
        {
            id: "acknowledgments",
            title: "Acknowledgments",
            content: [
                "Socket.io for enabling real-time communication",
                "Gemini AI for intelligent, conversational responses",
                "The open-source community for providing inspiration and tools"
            ]
        }
    ];

    const [activeSection, setActiveSection] = useState(sections[0].id);
    const [copiedCode, setCopiedCode] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (visible?.target?.id) {
                setActiveSection(visible.target.id);
                window.history.replaceState(null, '', `#${visible.target.id}`);
            }
        }, { rootMargin: '-20% 0px -55% 0px', threshold: [0.05, 0.25, 0.5] });

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const copyCode = async (code, key) => {
        await navigator.clipboard.writeText(code);
        setCopiedCode(key);
        window.setTimeout(() => setCopiedCode(null), 1600);
    };

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen font-sans bg-gradient-to-br from-[#02091B] to-[#014860] text-white">


            {/* Floating dock */}
            <FloatingDockDesktop
                visibleItems={{
                    login: true,
                    // signup: true,
                    home: true,
                    docs: true,
                    team: true,
                    projects: true,
                }}
                variant="bottom"
            />

            {/* Compact documentation header */}
            <header className="sticky top-0 z-30 border-b border-cyan-800/30 bg-[#02091B]/95 backdrop-blur-md">
                <div className="container mx-auto px-4 py-8 md:px-8 lg:px-10">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">Collab Code</p>
                    <h1 className="text-3xl font-bold text-slate-100 md:text-4xl">Documentation</h1>
                </div>
            </header>

            <div className="container relative mx-auto px-4 py-8 md:px-8 lg:px-10">
                {/* Mobile contents navigation */}
                <div className="mb-6 lg:hidden">
                    <label htmlFor="documentation-section" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Jump to section
                    </label>
                    <select
                        id="documentation-section"
                        value={activeSection}
                        onChange={(event) => scrollToSection(event.target.value)}
                        className="w-full rounded-lg border border-cyan-800/40 bg-[#031A2B] px-3 py-2.5 text-sm text-slate-200 focus:border-cyan-400 focus:outline-none"
                    >
                        {sections.map((section) => (
                            <option key={section.id} value={section.id}>{section.title}</option>
                        ))}
                    </select>
                </div>

                <div className="lg:flex lg:gap-10">
                    <aside className="hidden h-fit w-64 shrink-0 lg:sticky lg:top-32 lg:block">
                        <nav
                            aria-label="Documentation contents"
                            className="rounded-xl border border-cyan-800/30 bg-[#031A2B]/70 p-4 backdrop-blur-sm"
                        >
                            <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Contents</h2>
                            <ul className="space-y-1">
                                {sections.map((section, index) => (
                                    <li key={section.id}>
                                        <button
                                            onClick={() => scrollToSection(section.id)}
                                            aria-current={activeSection === section.id ? 'location' : undefined}
                                            className={`flex w-full items-center gap-2 rounded-md border-l-2 px-3 py-2 text-left text-sm transition-colors ${activeSection === section.id
                                                    ? "border-cyan-400 bg-cyan-500/10 text-cyan-200"
                                                    : "border-transparent text-slate-400 hover:border-slate-600 hover:bg-slate-800/40 hover:text-slate-200"
                                                }`}
                                        >
                                            <span className="w-5 shrink-0 font-mono text-[10px] opacity-70">{String(index + 1).padStart(2, '0')}</span>
                                            <span>{section.title}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>

                    {/* Content */}
                    <main className="min-w-0 flex-1">
                        {sections.map((section, index) => (
                            <motion.section
                                key={section.id}
                                id={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="scroll-mt-36 mb-12 rounded-xl border border-cyan-900/30 bg-[#031A2B]/45 px-5 py-6 md:px-7"
                            >
                                <div className="mb-5 flex items-center gap-3">
                                    <span className="font-mono text-xs text-cyan-500">{String(index + 1).padStart(2, '0')}</span>
                                    <h2 className="text-2xl font-bold text-cyan-200 md:text-3xl">{section.title}</h2>
                                </div>

                                {section.content && !Array.isArray(section.content) && (
                                    <p className="mb-6 max-w-4xl leading-7 text-slate-300">{section.content}</p>
                                )}

                                {section.content && Array.isArray(section.content) && (
                                    <ul className="list-disc list-inside space-y-2 mb-6">
                                        {section.content.map((item, i) => (
                                            <li key={i} className="text-slate-300">{item}</li>
                                        ))}
                                    </ul>
                                )}

                                {section.codeBlock && (
                                    <div className="mb-6 overflow-hidden rounded-lg border border-slate-700/60 bg-[#020B18]">
                                        <div className="flex items-center justify-between border-b border-slate-700/50 px-3 py-2">
                                            <span className="text-xs font-medium text-slate-400">Text</span>
                                            <button
                                                type="button"
                                                onClick={() => copyCode(section.codeBlock, `section-${section.id}`)}
                                                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-slate-400 transition hover:bg-slate-800 hover:text-cyan-300"
                                                aria-label="Copy code"
                                            >
                                                <TbCopy size={14} />
                                                {copiedCode === `section-${section.id}` ? 'Copied' : 'Copy'}
                                            </button>
                                        </div>
                                        <pre className="overflow-x-auto p-4 text-sm leading-6 text-slate-300">
                                            <code>{section.codeBlock}</code>
                                        </pre>
                                    </div>
                                )}

                                {section.tables && section.tables.map((table, i) => (
                                    <div key={i} className="mb-8">
                                        <h3 className="text-xl font-semibold mb-3 text-cyan-200">{table.title}</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse mb-6">
                                                <thead>
                                                    <tr className="border-b border-cyan-800/50 bg-[#031E34]">
                                                        {table.headers.map((header, j) => (
                                                            <th key={j} className="p-3 text-left text-cyan-400">{header}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table.rows.map((row, j) => (
                                                        <tr key={j} className="border-b border-cyan-900/30 hover:bg-[#031E34]/50">
                                                            {row.map((cell, k) => (
                                                                <td key={k} className="p-3 text-slate-300">{cell}</td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}

                                {section.subsections && section.subsections.map((subsection, i) => (
                                    <div key={i} className="mb-6">
                                        <h3 className="text-xl font-semibold mb-3 text-cyan-200">{subsection.title}</h3>

                                        {subsection.content && Array.isArray(subsection.content) && (
                                            <ul className="list-disc list-inside space-y-2 mb-4">
                                                {subsection.content.map((item, j) => (
                                                    <li key={j} className="text-slate-300">{item}</li>
                                                ))}
                                            </ul>
                                        )}

                                        {subsection.steps && (
                                            <ol className="space-y-4 mb-4">
                                                {subsection.steps.map((step, j) => (
                                                    <li key={j} className="text-slate-300">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                                                {j + 1}
                                                            </span>
                                                            <span className="font-medium">{step.text}</span>
                                                        </div>

                                                        {step.subtext && (
                                                            <p className="ml-8 text-slate-400 mb-2">{step.subtext}</p>
                                                        )}

                                                        {step.code && (
                                                            <div className="relative ml-8 mb-3 overflow-x-auto rounded-lg border border-slate-700/60 bg-[#020B18] p-3 pr-12">
                                                                <button type="button" onClick={() => copyCode(step.code, `step-${section.id}-${i}-${j}`)} className="absolute right-2 top-2 rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-cyan-300" aria-label="Copy code">
                                                                    <TbCopy size={14} />
                                                                </button>
                                                                <pre className="whitespace-pre-wrap font-mono text-sm text-slate-300">
                                                                    {step.code}
                                                                </pre>
                                                            </div>
                                                        )}

                                                        {step.secondSubtext && (
                                                            <p className="ml-8 text-slate-400 mb-2">{step.secondSubtext}</p>
                                                        )}

                                                        {step.secondCode && (
                                                            <div className="relative ml-8 mb-2 overflow-x-auto rounded-lg border border-slate-700/60 bg-[#020B18] p-3 pr-12">
                                                                <button type="button" onClick={() => copyCode(step.secondCode, `second-step-${section.id}-${i}-${j}`)} className="absolute right-2 top-2 rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-cyan-300" aria-label="Copy code">
                                                                    <TbCopy size={14} />
                                                                </button>
                                                                <pre className="whitespace-pre-wrap font-mono text-sm text-slate-300">
                                                                    {step.secondCode}
                                                                </pre>
                                                            </div>
                                                        )}
                                                    </li>
                                                ))}
                                            </ol>
                                        )}
                                    </div>
                                ))}

                                {section.steps && (
                                    <ol className="space-y-4 mb-6">
                                        {section.steps.map((step, i) => (
                                            <li key={i} className="text-slate-300">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="bg-cyan-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                                        {i + 1}
                                                    </span>
                                                    <span className="font-medium">{step.text}</span>
                                                </div>

                                                {step.code && (
                                                    <div className="relative ml-8 my-2 overflow-x-auto rounded-lg border border-slate-700/60 bg-[#020B18] p-3 pr-12">
                                                        <button type="button" onClick={() => copyCode(step.code, `direct-step-${section.id}-${i}`)} className="absolute right-2 top-2 rounded p-1.5 text-slate-400 hover:bg-slate-800 hover:text-cyan-300" aria-label="Copy code">
                                                            <TbCopy size={14} />
                                                        </button>
                                                        <pre className="font-mono text-sm text-slate-300">
                                                            {step.code}
                                                        </pre>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                )}
                            </motion.section>
                        ))}
                    </main>
                </div>

                {/* Footer */}
                <footer className="mb-24 mt-12 border-t border-cyan-800/30 pt-8 text-center text-slate-400">
                    <p>© {new Date().getFullYear()} Collab Code. All rights reserved.</p>
                    <p className="mt-2 text-sm">For questions or feedback, please contact us.</p>
                </footer>

                <button
                    type="button"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Back to top"
                    title="Back to top"
                    className="fixed bottom-24 right-5 z-40 hidden h-10 w-10 items-center justify-center rounded-full border border-cyan-700/40 bg-slate-950/90 text-cyan-300 shadow-lg backdrop-blur-md transition hover:border-cyan-400 md:flex"
                >
                    <TbArrowUp size={18} />
                </button>
            </div>
        </div>
    );
};

export default DocumentationPage;