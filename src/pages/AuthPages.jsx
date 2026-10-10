import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
export function AuthPage({ register = false }) {
  const { t, setUser } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const update = (event) =>
    setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    setUser({ name: form.name || form.email.split("@")[0], email: form.email });
    navigate("/account");
  };
  return (
    <div className="auth">
      <div className="auth-image" />
      <form onSubmit={submit}>
        <h1>{register ? t.signup : "Log in to Exclusive"}</h1>
        <p>Enter your details below</p>
        {register && (
          <input
            required
            name="name"
            placeholder={t.name}
            value={form.name}
            onChange={update}
          />
        )}
        <input
          required
          name="email"
          type="email"
          placeholder={t.email}
          value={form.email}
          onChange={update}
        />
        <input
          required
          name="password"
          type="password"
          placeholder={t.password}
          value={form.password}
          onChange={update}
        />
        <button className="red-btn full">
          {register ? t.signup : t.login}
        </button>
        <p>
          {register ? "Already have an account? " : "New to Exclusive? "}
          <Link to={register ? "/login" : "/register"}>
            {register ? t.login : t.signup}
          </Link>
        </p>
      </form>
    </div>
  );
}
export function AccountPage() {
  const { user, t, setUser } = useStore();
  const navigate = useNavigate();
  if (!user) return <AuthPage />;
  return (
    <div className="account page">
      <div className="side">
        <b>Manage My Account</b>
        <Link className="active">My Profile</Link>
        <Link>{t.account}</Link>
        <b>My Orders</b>
        <Link>My Returns</Link>
        <Link>My Cancellations</Link>
        <b>{t.wishlist}</b>
      </div>
      <div className="profile">
        <h2>Edit Your Profile</h2>
        <div className="form-grid">
          <input placeholder="First Name" value={user.name} readOnly />
          <input placeholder="Email" value={user.email} readOnly />
        </div>
        <input placeholder="Address" />
        <button
          className="red-btn"
          onClick={() => {
            setUser(null);
            navigate("/");
          }}
        >
          {t.logout}
        </button>
      </div>
    </div>
  );
}
