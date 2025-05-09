# LearnHub - Learning Management System

## Overview

LearnHub is a responsive Learning Management System (LMS) prototype built using React and Supabase. It allows users to browse, search, and filter educational courses across various categories.

Live demo: [LearnHub Demo](https://your-deployment-url.vercel.app)
## Features

- **Responsive Design**: Fully responsive layout that works across mobile, tablet, and desktop devices
- **Course Browsing**: View all available courses with details like title, instructor, duration, and price
- **Category Filtering**: Filter courses by categories with learner count indicators
- **Search Functionality**: Search for courses by title or description
- **Multiple Pages**: Home, Courses, About, and Contact pages with consistent navigation
- **Supabase Integration**: Courses data fetched from Supabase backend

## Project Creation Process

### 1. Initial Prototype with GenAI

The project was initially prototyped using a GenAI tool to create the basic structure of an LMS system. This generated:
- Basic component structure (Navbar, Hero, CourseCard)
- Initial layout for the home page
- Mobile responsiveness foundation

### 2. Manual Edits and Customizations

Several significant manual edits were made to enhance the generated code:

#### UI Improvements
- **Enhanced Navbar**: Redesigned with better spacing, added logo icon, improved active states, and better mobile menu
- **Category Pills**: Created custom category filter pills similar to the design reference, with learner counts
- **Improved Course Cards**: Added hover effects, better typography, and visual hierarchy
- **Fixed Layout Issues**: Resolved the overlap between the hero banner and the search/filter components

#### Functionality Enhancements
- **Search & Filter**: Implemented dual filtering system (search term + category selection)
- **React Router Integration**: Added proper routing between different pages
- **Responsive Design Refinements**: Enhanced mobile and tablet layouts

#### New Components
- **Contact Page**: Created a comprehensive contact page with form submission and community section
- **About Page**: Added information about the platform with values and mission
- **Courses Page**: Dedicated page to browse all available courses

### 3. Supabase Integration

The application is connected to Supabase as the backend database to store and retrieve course data:

```javascript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Client-side safe environment variable access
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

#### Database Schema

The Supabase database includes the following table:

**courses**
- id (uuid, primary key)
- title (text)
- description (text)
- instructor (text)
- image (text - URL)
- price (numeric)
- duration (text)
- level (text)
- category (text)
- created_at (timestamp)

#### Data Fetching Example

```javascript
// From Home/Index component
useEffect(() => {
  const fetchCourses = async () => {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) {
      console.error("Error fetching courses:", error);
    } else {
      setCourses(data);
      setFilteredCourses(data);
      
      // Extract unique categories for filter pills
      const uniqueCategories = [...new Set(data.map(course => course.category))];
      setCategories(uniqueCategories);
    }
  };

  fetchCourses();
}, []);
```

## Technologies Used

- **Frontend**:
  - React
  - React Router (for navigation)
  - Tailwind CSS (for styling)
  - Custom UI components

- **Backend**:
  - Supabase (Database and API)

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Sujaltalreja29/course-flow-design
cd course-flow-design
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
*Note: If using Create React App, use REACT_APP_ prefix instead of VITE_*

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. The application should now be running at http://localhost:8080 (or your configured port)

## Future Enhancements

- User authentication and profiles
- Course enrollment functionality
- Progress tracking for enrolled courses
- Course rating and reviews
- Instructor dashboard for course creation

## Challenges and Solutions

One of the main challenges was integrating Supabase with a React (non-Next.js) application. The initial environment variable setup caused "process is not defined" errors in the browser. This was resolved by:

1. Using the correct environment variable prefix for the build system (VITE_ or REACT_APP_)
2. Implementing a more robust environment variable access pattern that works across different React build tools

Another challenge was creating the responsive category pills similar to the reference design. This was solved by implementing a custom component with proper spacing, counts, and active states that works well across different screen sizes.

