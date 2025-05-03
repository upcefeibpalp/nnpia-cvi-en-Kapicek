import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const UserForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        alert("Uživatel přidán");
      } else {
        alert("Chyba při přidání uživatele");
      }
    } catch (error) {
      console.error("Chyba:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label>Email:</label>
        <input {...register("email", { required: true })} className="border w-full" />
        {errors.email && <p className="text-red-500 text-sm">Email je povinný</p>}
      </div>
      <div>
        <label>Heslo:</label>
        <input type="password" {...register("password", { required: true, minLength: 6 })} className="border w-full" />
        {errors.password && <p className="text-red-500 text-sm">Heslo musí mít alespoň 6 znaků</p>}
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Odeslat
      </button>
    </form>
  );
};

export default UserForm;
