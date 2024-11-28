import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { UserContextProvider } from "./Context/UserContext";

import ErrorBoundary from './ErrorBoundary';

import { Home } from "./Pages/Home/Home";
import SignUp from "./Pages/LogIn/SignUp";
import Login from "./Pages/LogIn/LogIn";
import ForgotPassword from "./Pages/LogIn/ForgotPassword";
import ResetPassword from './Pages/LogIn/ResetPassword';

import Loader from "./Component/Loader/Loader";
import {SearchResults} from './Component/Search/SearchResults';
import {ResoSearch} from './Pages/Resources/ResoSearch';
import { QuestionSearch } from "./Pages/Forum/QuestionSearch";

import {Resources} from './Pages/Resources/Resources';
import {Sensors} from './Pages/Resources/Sensors/Sensors';
import {Pcb} from './Pages/Resources/Sensors/pcb';
import {Communi} from './Pages/Resources/Sensors/communi';
import {DataSheet} from './Pages/Resources/Sensors/datasheets/dataSheet';
import {DataSheetWrite} from './Pages/Resources/Sensors/datasheets/DataSheetWrite';
import {IotPlat} from './Pages/Resources/Sensors/IotPlat';
import {IotProto} from './Pages/Resources/Sensors/IotProto';
import {Micro} from './Pages/Resources/Sensors/micro';
import {Others} from './Pages/Resources/Sensors/others';
import {Writepost} from './Pages/Resources/Writepost';
import {ResoPostdetails} from './Pages/Resources/ResoPostdetails';
import {ResoEditpost} from './Pages/Resources/ResoEditpost';

import { Forum } from "./Pages/Forum/Forum";
import QuestionForm from "./Pages/Forum/QuestionForm";
import ViewQuestion from "./Pages/Forum/ViewQuestion";

import MySaves from "./Pages/Profile/MySaves";
import MyCollections from "./Pages/Profile/MyCollections";
import MyQuestions from "./Pages/Profile/MyQuestions";
import EditProfile from "./Pages/Profile/EditProfile";

import MainLayout from "./Layouts/MainLayout";

import "animate.css/animate.min.css";

import AOS from "aos";
import "aos/dist/aos.css";

const AppWithLoader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust the timeout as needed
    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration
      once: false, // Whether animation should happen only once
      mirror: true, // Whether elements should animate out while scrolling past them
    });
  }, []);

  return (

    <div>
      {loading && <Loader />}
      {!loading && (
        <>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
           <Route path="/resosearch" element={<ResoSearch/>} />
          <Route path="/questionsearch" element={<QuestionSearch/>}/>


              <Route path='/resources'element={<Resources/>}/>
            <Route path='/sensors' element={<Sensors/>}/>
            <Route path='/pcb' element={<Pcb/>}/>
            <Route path='/communi' element={<Communi/>}/>
            <Route path='/dataSheet' element={<DataSheet/>}/>
            <Route path='/DataSheetWrite' element={<DataSheetWrite/>}/>
            <Route path='/IotPlat' element={<IotPlat/>}/>
            <Route path='/IotProto' element={<IotProto/>}/>
            <Route path='/micro' element={<Micro/>}/>
            <Route path='/others' element={<Others/>}/>
              <Route path='/writepost' element={<Writepost/>}/>
              <Route path='/resopostdetails/:id' element={<ResoPostdetails/>}/>
              <Route path='/resoeditpost/:id' element={<ResoEditpost/>}/>

              <Route path="/forum" element={<Forum />} />
              <Route path="/questionform" element={<QuestionForm />} />
              <Route path="/viewquestion/:id" element={<ViewQuestion />} />

              <Route path="/MySaves" element={<MySaves />} />
              <Route path="/MyCollections" element={<MyCollections />} />
              <Route path="/MyQuestions" element={<MyQuestions />} />
              <Route path="/EditProfile" element={<EditProfile />} />
             

              <Route path="/" element={<Navigate to="/home" />} />
            </Route>

              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path='/ResetPassword/:token' element={<ResetPassword />} />
           
          </Routes>
        </>
      )}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <UserContextProvider>
      <ErrorBoundary>
        <AppWithLoader />
      </ErrorBoundary>
    </UserContextProvider>
  </BrowserRouter>
);

export default App;
