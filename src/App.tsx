import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { Home } from './pages/Home';
import { PropertyDetail } from './pages/PropertyDetail';
import { Wishlist } from './pages/Wishlist';
import { Contact } from './pages/Contact';
import { Consultants } from './pages/Consultants';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/consultants" element={<Consultants />} />
          {/* AI Assistant route redirects to home for now, as it's a section there */}
          <Route path="/ai" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
