const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    await Application.deleteMany({});
    await Job.deleteMany({});
    await User.deleteMany({});

    console.log('Old data cleared');

    const password = await bcrypt.hash('Password123', 10);

    const jobSeekers = await User.insertMany([
      {
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        password,
        role: 'user',
        phone: '9876543210',
        location: 'Delhi',
        bio: 'Full Stack Developer with 2 years of experience',
        skills: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
        resume: 'https://example.com/resume/rahul.pdf'
      },
      {
        name: 'Priya Singh',
        email: 'priya@example.com',
        password,
        role: 'user',
        phone: '9876543211',
        location: 'Mumbai',
        bio: 'Frontend Developer passionate about UI/UX',
        skills: ['React', 'CSS', 'JavaScript', 'Tailwind'],
        resume: 'https://example.com/resume/priya.pdf'
      },
      {
        name: 'Amit Kumar',
        email: 'amit@example.com',
        password,
        role: 'user',
        phone: '9876543212',
        location: 'Bangalore',
        bio: 'Backend Developer with Node.js expertise',
        skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
        resume: 'https://example.com/resume/amit.pdf'
      },
      {
        name: 'Sneha Patel',
        email: 'sneha@example.com',
        password,
        role: 'user',
        phone: '9876543213',
        location: 'Pune',
        bio: 'Recent graduate looking for internship opportunities',
        skills: ['Python', 'Java', 'C++', 'MySQL'],
        resume: 'https://example.com/resume/sneha.pdf'
      }
    ]);

    console.log('Job seekers created');

    const recruiters = await User.insertMany([
      {
        name: 'Tech Corp HR',
        email: 'hr@techcorp.com',
        password,
        role: 'recruiter',
        phone: '9876540001',
        location: 'Mohali',
        companyName: 'Tech Corp',
        companyWebsite: 'https://techcorp.com',
        bio: 'Leading technology company in India'
      },
      {
        name: 'Startup Hub HR',
        email: 'hr@startuphub.com',
        password,
        role: 'recruiter',
        phone: '9876540002',
        location: 'Bangalore',
        companyName: 'Startup Hub',
        companyWebsite: 'https://startuphub.com',
        bio: 'Innovative startup building next-gen products'
      },
      {
        name: 'InfoSys Recruiter',
        email: 'recruiter@infosys.com',
        password,
        role: 'recruiter',
        phone: '9876540003',
        location: 'Hyderabad',
        companyName: 'InfoSys',
        companyWebsite: 'https://infosys.com',
        bio: 'Global technology services company'
      },
      {
        name: 'Digital Solutions HR',
        email: 'hr@digitalsolutions.com',
        password,
        role: 'recruiter',
        phone: '9876540004',
        location: 'Delhi',
        companyName: 'Digital Solutions',
        companyWebsite: 'https://digitalsolutions.com',
        bio: 'Digital transformation and consulting firm'
      }
    ]);

    console.log('Recruiters created');

    const jobs = await Job.insertMany([
      {
        title: 'Frontend Developer',
        description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building modern, responsive web applications using React.js.',
        company: 'Tech Corp',
        location: 'Mohali',
        jobType: 'Full Time',
        salary: '5-8 LPA',
        experience: '0-2 Years',
        skills: ['React', 'JavaScript', 'CSS', 'HTML'],
        category: 'Software Development',
        recruiter: recruiters[0]._id,
        status: 'Active'
      },
      {
        title: 'Backend Developer',
        description: 'Join our team as a Backend Developer. Work with Node.js, Express, and MongoDB to build scalable APIs.',
        company: 'Tech Corp',
        location: 'Mohali',
        jobType: 'Full Time',
        salary: '6-10 LPA',
        experience: '1-3 Years',
        skills: ['Node.js', 'Express', 'MongoDB', 'REST API'],
        category: 'Software Development',
        recruiter: recruiters[0]._id,
        status: 'Active'
      },
      {
        title: 'Full Stack Developer',
        description: 'We need a Full Stack Developer proficient in MERN stack. You will work on end-to-end application development.',
        company: 'Startup Hub',
        location: 'Bangalore',
        jobType: 'Full Time',
        salary: '8-12 LPA',
        experience: '2-4 Years',
        skills: ['React', 'Node.js', 'MongoDB', 'Express'],
        category: 'Software Development',
        recruiter: recruiters[1]._id,
        status: 'Active'
      },
      {
        title: 'React Developer Internship',
        description: 'Great opportunity for freshers to learn and grow. Work on real projects with experienced mentors.',
        company: 'Startup Hub',
        location: 'Bangalore',
        jobType: 'Internship',
        salary: '15000-25000/month',
        experience: '0 Years',
        skills: ['React', 'JavaScript', 'HTML', 'CSS'],
        category: 'Software Development',
        recruiter: recruiters[1]._id,
        status: 'Active'
      },
      {
        title: 'Senior Software Engineer',
        description: 'Looking for experienced software engineers to lead development projects and mentor junior developers.',
        company: 'InfoSys',
        location: 'Hyderabad',
        jobType: 'Full Time',
        salary: '15-25 LPA',
        experience: '5+ Years',
        skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
        category: 'Software Development',
        recruiter: recruiters[2]._id,
        status: 'Active'
      },
      {
        title: 'DevOps Engineer',
        description: 'We are hiring a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines.',
        company: 'InfoSys',
        location: 'Hyderabad',
        jobType: 'Full Time',
        salary: '10-15 LPA',
        experience: '3-5 Years',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
        category: 'DevOps',
        recruiter: recruiters[2]._id,
        status: 'Active'
      },
      {
        title: 'UI/UX Designer',
        description: 'Create beautiful and intuitive user interfaces. Work closely with developers to bring designs to life.',
        company: 'Digital Solutions',
        location: 'Delhi',
        jobType: 'Full Time',
        salary: '4-7 LPA',
        experience: '1-3 Years',
        skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
        category: 'Design',
        recruiter: recruiters[3]._id,
        status: 'Active'
      },
      {
        title: 'Data Analyst',
        description: 'Analyze data to provide insights and support business decisions. Experience with Python and SQL required.',
        company: 'Digital Solutions',
        location: 'Delhi',
        jobType: 'Full Time',
        salary: '5-9 LPA',
        experience: '1-3 Years',
        skills: ['Python', 'SQL', 'Excel', 'Power BI'],
        category: 'Data Science',
        recruiter: recruiters[3]._id,
        status: 'Active'
      },
      {
        title: 'Mobile App Developer',
        description: 'Develop cross-platform mobile applications using React Native. Experience with iOS and Android required.',
        company: 'Tech Corp',
        location: 'Mohali',
        jobType: 'Full Time',
        salary: '6-10 LPA',
        experience: '2-4 Years',
        skills: ['React Native', 'JavaScript', 'iOS', 'Android'],
        category: 'Mobile Development',
        recruiter: recruiters[0]._id,
        status: 'Active'
      },
      {
        title: 'Python Developer',
        description: 'Work on backend systems using Python and Django. Build scalable and maintainable applications.',
        company: 'Startup Hub',
        location: 'Bangalore',
        jobType: 'Full Time',
        salary: '7-11 LPA',
        experience: '2-4 Years',
        skills: ['Python', 'Django', 'PostgreSQL', 'REST API'],
        category: 'Software Development',
        recruiter: recruiters[1]._id,
        status: 'Active'
      },
      {
        title: 'Quality Assurance Engineer',
        description: 'Ensure software quality through comprehensive testing. Experience with automation testing tools required.',
        company: 'InfoSys',
        location: 'Hyderabad',
        jobType: 'Full Time',
        salary: '4-7 LPA',
        experience: '1-3 Years',
        skills: ['Selenium', 'Jest', 'Manual Testing', 'API Testing'],
        category: 'Quality Assurance',
        recruiter: recruiters[2]._id,
        status: 'Active'
      },
      {
        title: 'Content Writer',
        description: 'Create engaging technical content for our blog and documentation. Strong writing skills required.',
        company: 'Digital Solutions',
        location: 'Remote',
        jobType: 'Remote',
        salary: '3-5 LPA',
        experience: '0-2 Years',
        skills: ['Content Writing', 'Technical Writing', 'SEO', 'Communication'],
        category: 'Content',
        recruiter: recruiters[3]._id,
        status: 'Active'
      },
      {
        title: 'Project Manager',
        description: 'Lead software development projects from conception to delivery. Agile experience required.',
        company: 'Tech Corp',
        location: 'Mohali',
        jobType: 'Full Time',
        salary: '12-18 LPA',
        experience: '4-6 Years',
        skills: ['Agile', 'Scrum', 'Project Management', 'JIRA'],
        category: 'Management',
        recruiter: recruiters[0]._id,
        status: 'Active'
      },
      {
        title: 'Business Analyst',
        description: 'Bridge the gap between business and technology. Gather requirements and create specifications.',
        company: 'InfoSys',
        location: 'Hyderabad',
        jobType: 'Full Time',
        salary: '6-10 LPA',
        experience: '2-4 Years',
        skills: ['Business Analysis', 'Requirements Gathering', 'SQL', 'Documentation'],
        category: 'Business Analysis',
        recruiter: recruiters[2]._id,
        status: 'Active'
      },
      {
        title: 'Machine Learning Engineer',
        description: 'Build and deploy machine learning models. Experience with TensorFlow and PyTorch required.',
        company: 'Startup Hub',
        location: 'Bangalore',
        jobType: 'Full Time',
        salary: '10-16 LPA',
        experience: '2-5 Years',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning'],
        category: 'Data Science',
        recruiter: recruiters[1]._id,
        status: 'Active'
      }
    ]);

    console.log('Jobs created');

    console.log('\n=== SEED DATA COMPLETED ===\n');
    console.log('Sample Login Credentials:\n');
    console.log('Job Seekers:');
    console.log('  Email: rahul@example.com | Password: Password123');
    console.log('  Email: priya@example.com | Password: Password123');
    console.log('  Email: amit@example.com | Password: Password123');
    console.log('  Email: sneha@example.com | Password: Password123\n');
    console.log('Recruiters:');
    console.log('  Email: hr@techcorp.com | Password: Password123');
    console.log('  Email: hr@startuphub.com | Password: Password123');
    console.log('  Email: recruiter@infosys.com | Password: Password123');
    console.log('  Email: hr@digitalsolutions.com | Password: Password123\n');

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
