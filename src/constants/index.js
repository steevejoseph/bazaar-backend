export const CREATE_EDIT_CATEGORIES = [
    'Category',
    'Graphics & Design',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Business',
    'Fun & Lifestyle',
    'Lessons/Tutoring',
    'Event Management',
    'Beauty',
    'E-Commerce',
    'Photography'
];

export const CATEGORIES = [
    { category: 'Graphics & Design',  description: 'Bring art to your product or service with Graphics and Designs.' },
    { category: 'Digital Marketing',  description: 'Help push your marketing message further with Digital Marketing.' },
    { category: 'Writing & Translation',  description: 'Get copy done and anything translated for your needs.' },
    { category: 'Video & Animation',  description: "Produce your message with video or bring your art to life wih animation." },
    { category: 'Music & Audio',  description: "Develop your sound and let it be heard." },
    { category: 'Programming & Tech',  description: "Need technical help? We've got coders and technologists waiting to build." },
    { category: 'Business',  description: "Outsource your business needs and get things done." },
    { category: 'Fun & Lifestyle',  description: "Services to shake things up and have some fun." },
    { category: 'Lessons/Tutoring',  description: "Force = Mass x Acceleration. Get help with a course." },
    { category: 'Event Management',  description: "Hosting a big gig? Outsource help with Event Management." },
    { category: 'Beauty',  description: "You're beautiful. Make yourself look like a snack with Beauty." },
    { category: 'E-Commerce',  description: "Business is booming. E-Commerce pro's and experts ready to help." },
    { category: 'Photography',  description: "Capture that perfect moment with photography services." }
];

export const MARKDOWN_OPTIONS = {
    overrides: {
        h1: {
            props: {
                className: 'h3',
            },
        },
        h2: {
            props: {
                className: 'h4',
            },
        },
        h3: {
            props: {
                className: 'h5',
            },
        },
        h4: {
            props: {
                className: 'h6',
            },
        },
        h5: {
            props: {
                className: 'h6',
            },
        },
        h6: {
            props: {
                className: 'h6',
            },
        },
    },
};

export const tokenUrl = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/b90a149b-4af4-4243-9831-b133bff9a54e/token";
export const instanceLocator = "v1:us1:b90a149b-4af4-4243-9831-b133bff9a54e";
