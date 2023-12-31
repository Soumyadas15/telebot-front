import LoginForm from "./LoginForm";
import LoginLayout from "./LoginLayou";
import MainLayout from "./MainLayout";

const LoginPage = () => {
    return ( 
        <div className="relative h-full w-full flex items-center">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <LoginForm />
    </div>
    <LoginLayout />
</div>
     );
}
 
export default LoginPage;