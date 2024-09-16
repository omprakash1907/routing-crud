import React, { useState } from "react";
import axios from "axios"; // Import axios (if you're using axios)
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const nevigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      alert("You must accept the terms and conditions");
      return;
    }

    try {
      // API call to register user
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        password,
        email,
        name
      });

      console.log(response.data); // Handle the response as needed
      alert("Registration successful!");
      nevigate('/login')
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Create an Account
                      </h5>
                      <p className="text-center small">
                        Enter your personal details to create an account
                      </p>
                    </div>

                    <form
                      className="row g-3 needs-validation"
                      onSubmit={handleSubmit}
                    >
                      <div className="col-12">
                        <label htmlFor="yourName" className="form-label">
                          Your Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="yourName"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourEmail" className="form-label">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="yourEmail"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourUsername" className="form-label">
                          Username
                        </label>
                        <div className="input-group has-validation">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend"
                          >
                            @
                          </span>
                          <input
                            type="text"
                            name="username"
                            className="form-control"
                            id="yourUsername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="yourPassword"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            name="terms"
                            type="checkbox"
                            id="acceptTerms"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                            required
                          />
                          <label
                            className="form-check-label"
                            htmlFor="acceptTerms"
                          >
                            I agree and accept the{" "}
                            <a href="#">terms and conditions</a>
                          </label>
                        </div>
                      </div>

                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          Create Account
                        </button>
                      </div>

                      <div className="col-12">
                        <p className="small mb-0">
                          Already have an account? <a href="/login">Log in</a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
