# Bazaar Backend

This repository contains/represents the API endpoints for Bazaar, a location-based marketplace SaaS platform designed specifically for universities. The platform combines an Express.js backend API with a React frontend application (migrated from the previous `bazaar-frontend` repository).

## Documentation Links

- [Project Presentation](https://docs.google.com/presentation/d/1uYJgy-9p8F5zbn42IaDNNw9yz8hhbtYE1njiP_f4qHQ/edit?usp=sharing)
- [User API Specification](https://docs.google.com/document/d/12rYZbLaJDUn2WrAo4IB3NEbMbclypLRBIVlUPKn4kIw/edit?usp=sharing)
- [Service API Specification](https://docs.google.com/document/d/1Me3JWNBoYTcA4qdGUUl86sMfDichKdttBX7f6nNOrs8/edit?usp=sharing)
- [API Documentation (Postman)](https://documenter.getpostman.com/view/5785834/RzZ6HLLg)

## Overview

Bazaar enables university students to buy, sell, and trade items within their campus community. The platform uses location-based services to connect buyers and sellers in the same university area, creating a safe and localized marketplace experience.

## Features

- User authentication and authorization
- Location-based item discovery
- Item listing management (create, read, update, delete)
- Search and filtering capabilities
- University-specific marketplaces
- Real-time item availability updates
- User profiles and ratings
- Secure messaging between buyers and sellers

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (database)
- JWT (authentication)
- Passport.js (authorization)

### Frontend
- React.js
- Redux (state management)
- Material-UI (component library)
- Axios (API client)
- React Router (routing)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/steevejoseph/bazaar-backend.git
cd bazaar-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

## API Documentation

The API endpoints are organized around the following resources:

- `/api/auth` - Authentication endpoints
- `/api/users` - User management
- `/api/items` - Item listings
- `/api/messages` - User messaging
- `/api/universities` - University management

For detailed API documentation, please refer to:
- [Complete API Documentation (Postman)](https://documenter.getpostman.com/view/5785834/RzZ6HLLg)
- [User API Specification](https://docs.google.com/document/d/12rYZbLaJDUn2WrAo4IB3NEbMbclypLRBIVlUPKn4kIw/edit?usp=sharing)
- [Service API Specification](https://docs.google.com/document/d/1Me3JWNBoYTcA4qdGUUl86sMfDichKdttBX7f6nNOrs8/edit?usp=sharing)

## Development

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Building for Production
```bash
npm run build
```

## Deployment

The application can be deployed to any Node.js hosting platform. Make sure to set the appropriate environment variables for production deployment.

```bash
npm run start
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Original frontend code from [bazaar-frontend](https://github.com/steevejoseph/bazaar-frontend/)
- All contributors who have helped shape and improve this project

## Contact

For any questions or concerns, please open an issue in the repository.