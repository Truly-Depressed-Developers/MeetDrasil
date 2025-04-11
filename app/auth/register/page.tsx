import RegisterForm from '@/components/auth/registerForm';

export default function Login() {
  return (
    <div className="flex size-full items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
}
