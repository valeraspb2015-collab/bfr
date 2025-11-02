import AdminPanel from '../AdminPanel';

export default function AdminPanelExample() {
  return <AdminPanel onBack={() => console.log('Back clicked')} />;
}
