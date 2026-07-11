import { BrowserRouter } from 'react-router-dom';
import { SidebarProvider } from './context/SidebarContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <AppRoutes />
      </SidebarProvider>
    </BrowserRouter>
  );
}
