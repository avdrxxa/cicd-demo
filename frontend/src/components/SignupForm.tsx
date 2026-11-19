import { type FormEvent, useState } from 'react';
import { type SignupData, validateSignupForm } from '../utils/validation';

const initialData: SignupData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

function SignupForm() {
  const [formData, setFormData] = useState<SignupData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof SignupData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = validateSignupForm(formData);
    setErrors(result.errors);
    if(!result.isValid) return
    try{
      const res= await fetch('http://localhost:3000/api/signup', {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
          name:formData.name,
          email:formData.email
        })
      })
      const data= await res.json()
      console.log(data)
      setSubmitted(true);
    }catch(err){
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Namn
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
        </label>
        {errors.name && <p style={{ color: 'red', margin: 0 }}>{errors.name}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          E-post
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
        </label>
        {errors.email && <p style={{ color: 'red', margin: 0 }}>{errors.email}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Lösenord
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
        </label>
        {errors.password && <p style={{ color: 'red', margin: 0 }}>{errors.password}</p>}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>
          Bekräfta lösenord
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', padding: '0.5rem' }}
          />
        </label>
        {errors.confirmPassword && (
          <p style={{ color: 'red', margin: 0 }}>{errors.confirmPassword}</p>
        )}
      </div>

      <button type="submit">Registrera</button>

      {submitted && (
        <p style={{ color: 'green', marginTop: '1rem' }}>
          Registrering lyckades!
        </p>
      )}
    </form>
  );
}

export default SignupForm;
