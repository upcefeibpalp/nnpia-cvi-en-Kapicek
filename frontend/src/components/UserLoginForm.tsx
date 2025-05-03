import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../authSlice';
import { useNavigate } from 'react-router-dom';

type LoginData = {
  email: string;
  password: string;
};

const UserLoginForm = () => {
  const { register, handleSubmit } = useForm<LoginData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    const response = await fetch('http://localhost:8080/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const token = await response.text();
    dispatch(login(token));
    console.log('JWT token:', token);
    navigate('/'); // přesměrování po loginu
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <input placeholder="Email" {...register("email")} className="border w-full" />
      <input type="password" placeholder="Heslo" {...register("password")} className="border w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Přihlásit se</button>
    </form>
  );
};

export default UserLoginForm;
