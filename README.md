🚧 Civix – Local Civic Issue Reporting App
Domain: Governance / Public Welfare
Tagline: Empowering citizens, enabling better governance.


Civix is a full-stack web application designed to streamline the process of reporting, tracking, and resolving local civic issues such as potholes, broken streetlights, and uncollected garbage. It provides a bridge between citizens and municipal authorities, bringing accountability and transparency to local issue resolution.

🚨 Problem Addressed
Local civic issues often go unnoticed or unresolved due to the lack of a structured, user-friendly reporting system. Civix solves this by enabling:

Citizens to report problems easily with images and geolocation.

Transparent status tracking of reported issues.

Community-driven prioritization via upvotes.

A centralized admin dashboard for city workers to manage and resolve issues efficiently.

✨ Features
🧍 Citizens
📍 Report Issues: Submit problems with description, live location (via map), and image.

🔁 Track Status: View status transitions from Open → In Progress → Resolved.

🔼 Upvote Issues: Support others' reports to highlight common concerns.

🧑‍💼 Admins (City Workers)
📊 Dashboard Access: View, filter, and manage all reported issues.

🔧 Status Management: Update issue progress and mark resolutions.

🧑‍🤝‍🧑 Role-Based Access: Admin vs Citizen privileges secured via authentication.

🛠️ Tech Stack
Frontend:
React.js

Tailwind CSS – for modern and responsive UI

Leaflet.js – interactive maps for location tagging

Backend:
Node.js + Express.js

PostgreSQL – relational DB for storing reports and user data

Additional Integrations:
Cloudinary – for image uploads and hosting

Role-Based Authentication – Secure login for Citizens and Admins

🌗 Dark Mode Toggle

Civix supports a light and dark mode toggle to enhance user experience in different lighting conditions. This feature allows users to switch between a light theme and a dark theme with a single click.

🔧 Setup Details:
- `darkMode: 'class'` is enabled in `tailwind.config.js`
- User preference is saved using `localStorage`
- Toggle switch is implemented in `src/ThemeToggle.jsx`
- Imported and used inside `Home.jsx`, beside the "Sign Up" button

### How to Use
- **Locate the Toggle Button**: In the header of the app, look for the toggle button displaying a moon (🌙) or sun (☀️) icon.
- **Switch Modes**:
  - If the moon icon (🌙) is visible, click it to switch to dark mode.
  - If the sun icon (☀️) is visible, click it to switch to light mode.
- **Visual Changes**: The app will update instantly:
  - **Light Mode**: White or light gray backgrounds (e.g., `bg-slate-50`) with dark text (e.g., `text-gray-900`).
  - **Dark Mode**: Dark gray backgrounds (e.g., `dark:bg-gray-800`) with light text (e.g., `dark:text-gray-100`).


🚀 Getting Started
Prerequisites
Node.js and npm

PostgreSQL

Clone and Run
bash
Copy
Edit
git clone https://github.com/Harshs16/civix.git

cd civix-app

📌 Roadmap / Future Enhancements
🔔 Push notifications for issue updates

📈 Analytics for civic issue trends

🌐 Multilingual support

📱 Mobile app (React Native)

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.

📄 License
MIT License. See LICENSE file for more details.

