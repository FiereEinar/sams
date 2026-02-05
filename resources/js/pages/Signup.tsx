import { useForm } from '@inertiajs/react';

export default function Signup() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          post('/students'); // submit to Laravel endpoint
        }}
        className="space-y-4"
      >
        <div>
          <label className="block font-semibold">Name</label>
          <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="w-full rounded border p-2" />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="block font-semibold">Email</label>
          <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="w-full rounded border p-2" />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>

        <button type="submit" disabled={processing} className="rounded bg-blue-500 px-4 py-2 text-white">
          {processing ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
