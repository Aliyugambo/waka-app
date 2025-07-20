import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '@tanstack/react-form';
import { FiUser, FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
// Update the path below to the correct relative path where signupSchema is defined
import { signupSchema } from '../../schemas/auth';
import type { AnyFieldApi } from '@tanstack/react-form'
import { AuthBackground } from '../../components/auth/AuthBackground';
import { AuthLogo } from '../../components/auth/AuthLogo';
import { useAuth } from '../../contexts/AuthContext';

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em className="text-red-500 text-sm mt-1">{field.state.meta.errors.map((err) => err.message).join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

export default function SignUp() {
  
  const { signup, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      try {
        await signupSchema.parseAsync(value);
        await signup(value);
      } catch (error) {
        return { error };
      }
    },
    validators: {
      onChange: signupSchema,
    },
  });


  return (
    <>
      <AuthBackground />

      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md">
          <AuthLogo />
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center">
              <FiAlertCircle className="mr-2" />
              {error.message}
            </div>
          )}

          <form onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }} className="space-y-4">
            <form.Field name="name">
              {(field) => (
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${field.state.meta.isTouched && !field.state.meta.isValid ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter your name"
                    />
                    <FieldInfo field={field} />
                  </div>
                </div>
              )}
            </form.Field>

            <form.Field name="email">
              {(field) => (
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${field.state.meta.isTouched && !field.state.meta.isValid ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Enter your email"
                    />
                    <FieldInfo field={field} />
                  </div>
                </div>
              )}
            </form.Field>
            
            <form.Field name="password">
        {(field) => (
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className={`w-full pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${field.state.meta.isTouched && !field.state.meta.isValid ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 outline-none"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
              <FieldInfo field={field} />
            </div>
          </div>
        )}
      </form.Field>

            <button
              type="submit"
              disabled={isLoading || form.state.isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}