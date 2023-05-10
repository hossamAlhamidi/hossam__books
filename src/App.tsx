
import './App.css';
import RouteWrapper from './router/RouterWrapper';
import { useLocation } from 'react-router-dom';
import { PageLayout } from './components/PageLayout';
function App() {
   const location = useLocation();
  return (
    <PageLayout>
   <RouteWrapper key={location.pathname}/>
   </PageLayout>
  );
}

export default App;
