import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import SendRecipePage from './pages/SendRecipePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useEffect } from 'react';
import WebFont from 'webfontloader';
import './App.scss';
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {
    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Open Sans', 'Playpen Sans:400, 700', 'Outfit:300,400', 'Valera Round:300,400,700']
            }
        });
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Header />
                <Layout>
                    <Routes>
                        <Route path="/" element={<FrontPage />} />
                        <Route path="/reseptit" element={<RecipesPage />} />
                        <Route path="/reseptit/:id" element={<RecipeDetailPage />} />
                        <Route path="/laheta-resepti" element={<SendRecipePage />} />
                        <Route path="/kirjaudu" element={<LoginPage />} />
                        <Route path="/rekisteroidy" element={<RegisterPage />} />
                    </Routes>
                </Layout>
            </Router>
        </Provider>
    );
};

export default App;