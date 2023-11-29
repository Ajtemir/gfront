import Navbar from "@/components/navbar/navbar";
import Candidates from "@/components/candidates";
import { MainLayout } from "@/components/main-layout";
import { AuthGuard } from "@/components/auth-guard";

const Home = () => (
  <AuthGuard>
    <Navbar/>
    
    <MainLayout>
      <Candidates/>
    </MainLayout>
  </AuthGuard>
)

export default Home;