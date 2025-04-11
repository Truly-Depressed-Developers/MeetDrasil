import LoginForm from '@/components/auth/loginForm';

export default function Login() {
  return (
    <div className="flex size-full items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
