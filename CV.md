%-------------------------------------------------------------------------------
% Ahmed Mohamed Naguib -- CV
% Compile with: pdflatex Ahmed_Naguib_CV.tex   (no extra files required)
%-------------------------------------------------------------------------------
\documentclass[letterpaper,10pt]{article}

\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage{charter}                 % Bitstream Charter, as in the reference CV
\usepackage[letterpaper,margin=0.5in,top=0.45in,bottom=0.45in]{geometry}
\usepackage{enumitem}
\usepackage{microtype}
\usepackage[hidelinks]{hyperref}
\input{glyphtounicode}
\pdfgentounicode=1                   % keep the PDF text selectable and searchable

\hypersetup{
  pdftitle={Ahmed Mohamed Naguib - CV},
  pdfauthor={Ahmed Mohamed Naguib},
  pdfsubject={Backend Engineer},
}

\pagestyle{empty}
\raggedright
\raggedbottom
\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}
\setlength{\tabcolsep}{0pt}
\urlstyle{same}
\clubpenalty=10000 \widowpenalty=10000 \interlinepenalty=10000  % never split a bullet across pages
\linespread{1.02}

%-------------------------------------------------------------------------------
% Layout helpers
%-------------------------------------------------------------------------------
\newcommand{\entryindent}{0.12in}    % left indent of every entry under a section
\newcommand{\sep}{\hspace{0.35em}\textbar\hspace{0.35em}}
\newcommand{\cvlink}[2]{\href{#1}{\underline{#2}}}

% Section heading in the reference's "small caps + rule" style.
% Charter has no true small caps, so capitals are set one size larger: \Cp{S}ummary
\newcommand{\Cp}[1]{{\large #1}}
\newif\ifafterheading
\newcommand{\entrybreak}{\ifafterheading\global\afterheadingfalse\else\pagebreak[2]\fi}
\newcommand{\cvsection}[1]{%
  \pagebreak[3]\vspace{9pt}%
  {\normalsize\MakeUppercase{#1}}\par
  \nobreak\vspace{-5.5pt}\rule{\textwidth}{0.5pt}\par
  \nobreak\vspace{3pt}\global\afterheadingtrue%
}

% Experience / leadership heading:  Role | Organisation ........ Dates | Mode
\newcommand{\cvrole}[4]{%
  \entrybreak\vspace{2.5pt}%
  \hspace*{\entryindent}\textbf{#1}\sep\textbf{#2}\hfill #3\sep\textit{#4}\par\nobreak
}

% Education heading (two lines)
\newcommand{\cvschool}[4]{%
  \global\afterheadingfalse
  \hspace*{\entryindent}\textbf{#1}\hfill #2\par\nobreak
  \hspace*{\entryindent}\textit{#3}\hfill #4\par\nobreak
}

% Project heading:  Name | stack | links ........ label
\newcommand{\cvproject}[4]{%
  \entrybreak\vspace{2.5pt}%
  \hspace*{\entryindent}\textbf{#1}\sep\textit{#2}\if\relax\detokenize{#3}\relax\else\sep #3\fi\hfill #4\par\nobreak
}

% Certificate heading:  Name (links to credential) | Issuer ........ Date
\newcommand{\cvcert}[4]{%
  \entrybreak\vspace{2.5pt}%
  \hspace*{\entryindent}\textbf{\cvlink{#2}{#1}}\sep #3\hfill #4\par\nobreak
}

% Bullet list used under every entry
\newenvironment{cvitems}{%
  \begin{itemize}[leftmargin=0.42in, labelsep=0.5em, itemsep=1pt, topsep=1.5pt, beginpenalty=10000, midpenalty=10000,
                  parsep=0pt, partopsep=0pt, label=\raisebox{0.15ex}{\footnotesize\textbullet}]
}{%
  \end{itemize}
}

%-------------------------------------------------------------------------------
\begin{document}

%----------HEADING----------
\begin{center}
  {\fontsize{24}{28}\selectfont\bfseries Ahmed Mohamed Naguib}\par
  \vspace{5pt}
  (+20) 106-279-6067\sep
  \cvlink{mailto:amnoe20052007@gmail.com}{amnoe20052007@gmail.com}\sep
  Cairo, Egypt\par
  \vspace{2pt}
  \cvlink{https://www.linkedin.com/in/ahmed-naguib-075415328/}{linkedin.com/in/ahmed-naguib-075415328}\sep
  \cvlink{https://github.com/AhmedNaguib01}{github.com/AhmedNaguib01}\sep
  \cvlink{https://ahmednaguib01.github.io/Portfolio/}{ahmednaguib01.github.io/Portfolio}
\end{center}
\vspace{-6pt}

%----------SUMMARY----------
\cvsection{\Cp{S}ummary}
Backend developer building production NestJS, GraphQL, PostgreSQL, and Redis services at OptimaTech, and Computer
and AI Engineering student at Ain Shams University. Experienced in API and schema design, queue-based processing,
access control, and serverless deployment, with AWS Solutions Architect training. Targeting backend, full-stack,
cloud, and DevOps roles.

%----------EDUCATION----------
\cvsection{\Cp{E}ducation}
\cvschool{Ain Shams University \& University of East London}{Cairo, Egypt}
         {Bachelor of Science in Computer and Artificial Intelligence Engineering}{2023 -- Present}
\begin{cvitems}
  \item \textbf{Relevant Coursework:} Cloud Computing, Distributed Systems, Computer Networking, Advanced Database Systems
        Design, Advanced Software Engineering, Data Structures and Problem Solving.
\end{cvitems}

%----------EXPERIENCE----------
\cvsection{\Cp{P}rofessional \Cp{E}xperience}

\cvrole{Back End Developer}{OptimaTech for Technical Solutions}{Oct 2026 -- Present}{Part-time, Remote}
\begin{cvitems}
  \item Promoted from intern; own and extend the assessment, video-tracking, and content-security services in production.
\end{cvitems}

\cvrole{Back End Developer Intern}{OptimaTech for Technical Solutions}{Jun 2026 -- Oct 2026}{Full-time, Remote}
\begin{cvitems}
  \item Built a \textbf{NestJS/GraphQL} assessment engine, moving quizzes from a JSON blob to a normalized schema with
        atomic auto-grading that locks attempts and triggers certificate issuance.
  \item Moved video-heartbeat writes from the database to a \textbf{Redis/BullMQ} queue with an upsert worker,
        sustaining \textbf{1,000 concurrent learners} with cross-device resume.
  \item Gated video access with Firebase Storage rules tied to \textbf{PostgreSQL} enrollments; added JWT-checked
        anti-cheat timers.
  \item Deployed to \textbf{Railway} and \textbf{Cloudflare Workers} with exception filters and health-check endpoints.
\end{cvitems}

%----------PROJECTS----------
\cvsection{\Cp{P}rojects}

\cvproject{Inventory Command}{Express, Supabase (PostgreSQL), React, Vercel}
  {\cvlink{https://github.com/AhmedNaguib01/Sales-and-Inventory-Management-System}{GitHub}\sep
   \cvlink{https://sales-and-inventory-management-syst-six.vercel.app}{Live Demo}}{Solo Project}
\begin{cvitems}
  \item Multi-branch POS and inventory system with six-role RBAC enforced in Express middleware, Zod request
        validation, and PostgreSQL row-level security on every table.
  \item Made sales, purchase receiving, and stock transfers atomic with PL/pgSQL functions writing to a stock ledger;
        added a Gemini assistant that answers via function calls to read-only, branch-scoped queries.
\end{cvitems}

\cvproject{Reddit Replica}{Node.js, Express, MongoDB, React, Vercel}
  {\cvlink{https://github.com/AhmedNaguib01/Reddit-Replica}{GitHub}\sep
   \cvlink{https://reddit-replica-asu.vercel.app/}{Live Demo}}{Solo Project}
\begin{cvitems}
  \item REST API with \textbf{61 endpoints across 8 modules}, deployable as a Node server or a Vercel serverless function.
  \item Implemented bcrypt and Google OAuth 2.0 sign-in with JWT, compound and text indexes, and TTL caching.
\end{cvitems}

\cvproject{EduVerse -- University Management System}{Node.js, Express, MongoDB, React}
  {\cvlink{https://github.com/AhmedNaguib01/University-Management-System}{GitHub}}{Team Project}
\begin{cvitems}
  \item Maintained the repository for a six-person team, reviewing and merging pull requests; built direct messaging.
  \item Created the MongoDB aggregation pipelines behind four role-restricted instructor analytics reports.
\end{cvitems}

\cvproject{FOS Kernel -- Memory Management \& Concurrency}{C, OS Internals}
  {Private repository}{Course Project}
\begin{cvitems}
  \item Implemented a First Fit kernel memory allocator and fixed race conditions with semaphores and mutexes.
\end{cvitems}

%----------SKILLS----------
\cvsection{\Cp{S}kills}
\begin{itemize}[leftmargin=\dimexpr\entryindent+1.2em\relax, itemindent=-1.2em, label={}, itemsep=1.5pt, topsep=0pt, parsep=0pt, beginpenalty=10000, midpenalty=10000]
  \item \textbf{Programming Languages:} TypeScript, JavaScript (ES6+), Python, Java, C, C++, C\#, Dart, SQL, PL/SQL.
  \item \textbf{Frameworks \& Libraries:} Node.js, NestJS, Express.js, React.js, Flask, Flutter, JavaFX, PyTorch,
        TensorFlow, scikit-learn, Streamlit, Vite, TanStack Query.
  \item \textbf{Data \& Visualization:} NumPy, pandas, Matplotlib, Seaborn, OpenCV, BeautifulSoup.
  \item \textbf{Backend \& APIs:} RESTful APIs, GraphQL, Mongoose, BullMQ, JWT, OAuth 2.0, RBAC, Zod.
  \item \textbf{Tools \& Platforms:} PostgreSQL, MongoDB, Redis, Oracle SQL, Oracle APEX, Supabase, Firebase, AWS
        (EC2, S3, Lambda, RDS, IAM, CloudWatch), Docker, Kubernetes, CI/CD, Railway, Vercel, Git, GitHub,
        Postman, Jira, Notion, Scene Builder.
  \item \textbf{Languages:} Arabic (Native), English (Fluent).
\end{itemize}

%----------LEADERSHIP----------
\cvsection{\Cp{L}eadership and \Cp{C}ommunity}

\cvrole{Founder \& Community Lead}{Eduvance\textnormal{\sep\cvlink{https://www.eduvance.au/}{Website}\sep
  \cvlink{https://discord.com/servers/eduvance-community-983670206889099264}{Discord}}}{2023 -- Present}{Remote}
\begin{cvitems}
  \item Founded and lead a free, student-led community for Edexcel IGCSE and IAL students with \textbf{20,000+ Discord members}.
  \item Lead 13 volunteer subject curators who answer student questions and curate resources across 13 subjects,
        alongside a 3-person development team; Python bots automate routine moderation.
  \item Run eduvance.au, which hosts student- and teacher-contributed notes, study guides, past papers, and Edexcel
        exam and grading guides, and reached 16,000 active users from January to August 2026.
\end{cvitems}


%----------CERTIFICATIONS----------
\cvsection{\Cp{C}ourses and \Cp{C}ertifications}

\cvcert{AWS Cloud Solutions Architect Professional Certificate}{https://coursera.org/verify/professional-cert/9ABF95KTHYIM}
  {Amazon Web Services, Coursera}{Aug 2026}
\begin{cvitems}
  \item Designing secure, highly available, cost-optimized AWS architectures; Solutions Architect -- Associate exam prep.
\end{cvitems}

\cvcert{AWS Fundamentals Specialization}{https://coursera.org/verify/specialization/XQIRXH0SPXCS}
  {Amazon Web Services, Coursera}{Aug 2026}
\begin{cvitems}
  \item Core AWS services (EC2, Lambda, S3, RDS, DynamoDB), IAM security, CloudWatch monitoring, and cloud migration.
\end{cvitems}

\cvcert{Introduction to Git and GitHub}{https://coursera.org/verify/04DUIYZN3ISN}
  {Google, Coursera}{Sep 2026}
\begin{cvitems}
  \item Version control with Git: branching, merging, rebasing, remotes, pull requests, code review, and CI basics.
\end{cvitems}

\cvcert{Full-Stack Web Development}{http://ude.my/UC-7509fc90-187a-4a3f-bdeb-39839df833c2}
  {Udemy}{Aug 2025}
\begin{cvitems}
  \item Building web applications end to end, from front-end interfaces to back-end APIs and databases.
\end{cvitems}

\cvcert{AI-Powered Digital Operations \& Engineering Training}{https://lms-app.coach-academy.net/credential-validation?credentialId=8I23PELBBMV46}
  {Coach Academy}{Aug 2026}
\begin{cvitems}
  \item Applying AI tools to streamline software engineering and digital operations workflows.
\end{cvitems}

\cvcert{Mobile App Development Training}{https://drive.google.com/file/d/1M6_mqh6OJC_hYcvZXmPiRWRiKIr01m6m/view?usp=sharing}
  {National Telecommunication Institute (NTI)}{Aug 2025}
\begin{cvitems}
  \item Building cross-platform mobile applications with Dart.
\end{cvitems}

\end{document}