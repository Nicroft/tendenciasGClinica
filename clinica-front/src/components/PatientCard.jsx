import { useNavigate } from 'react-router-dom';

export function PatientCard({ patients }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-900 p-3 hover:bg-gray-800 hover:cursor-pointer"
      onClick={() => {
        navigate('/patients/' + patients.id);
      }}
    >
      <h1 className="font-bold uppercase text-white">{patients.full_name}</h1>
      <p className="text-slate-400">{patients.email}</p>
    </div>
  );
}
