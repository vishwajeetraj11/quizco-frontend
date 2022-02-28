# Quizco - Quiz Builder and Assessment Application

**Live**: https://quizco-app.netlify.app/  
**Frontend**: https://github.com/vishwajeetraj11/quizco-frontend  
**Backend**: https://github.com/vishwajeetraj11/quizco-backend/  

## 💻 Screens
Landing Page          |  Landing Page (Scrolled Down)
:-------------------------:|:-------------------------:
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1646046660194/wHBN0Pr2E.png" alt="Quizco Landing Page"> | <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1646046735132/KQRnTIYD6.png" alt="Quizco Landing Page (Scrolled Down)">
Quizzes Page         | Dashboard Page
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1646047028648/3r1D14bCT.png" alt="Quizzes Page"> | <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1646047335453/5XW831gDY.png" alt="Dashboard Page">
Selected Quiz in Dashboard         |  Add/Update Questions
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1646047392073/F7IfCPNE4.png"> | <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1646047515512/UALa1tsvZ.png">
Player Screen         |  Finish Quiz
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1646047748564/KwSuPXuea.png"> | <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1646048483745/br9MKs6lhZ.png">
Attempts Screen         |  Statistics Screen
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1646048433636/33YSHlCAT.png"> | <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1646048634738/lc0ftMzoo.png">
View All Questions Screen        |  Question Statistics 
<img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1646048708971/3Yv3_Oa8e.png"> | <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1646048778169/fDMw0E15R.png">

Running it Locally:  
1. Go to Clerk Dashboard and create an application.
2. Go to Clerk Dashboard > Your Application > Paths > Change the paths as in this image.
   <img width="854" alt="image" src="https://user-images.githubusercontent.com/47270995/155996769-9bf880a8-8282-4284-ac21-9768321272a5.png">
4. Make a MongoDB cluster and copy its connection string.
5. Copy Frontend API Key and Backend API Key.
6. Backend env.
       - DB_PASSWORD=<DB_PASSWORD>  
       - MONGODB_URI=<MONGODB_URI>  
       - PORT=<PORT>  
       - CLERK_API_KEY=<CLERK_BACKEND_API_KEY>   
       - CLERK_API_URL=https://api.clerk.dev  
7. Frontend env.
       - REACT_APP_CLERK_FRONTEND_API=<CLERK_FRONTEND_API>   
8. Install Dependencies.
9. Run Backend (```yarn dev```), Run Frontend (```yarn start```)


