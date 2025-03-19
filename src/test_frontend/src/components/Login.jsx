import { useState, useEffect } from 'react';
import { test_backend } from 'declarations/test_backend';
import { isAuthenticated, login, logout, initAuth } from './auth';

function App() {
    const [greeting, setGreeting] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);

    // Initialize authentication on component mount
    useEffect(() => {
        const checkAuth = async () => {
            await initAuth();
            const authenticated = await isAuthenticated();
            setIsLoggedIn(authenticated);
            setLoading(false);
        };

        checkAuth();
    }, []);

    async function handleLogin() {
        const success = await login();
        if (success) {
            setIsLoggedIn(true);
        }
    }

    async function handleLogout() {
        await logout();
        setIsLoggedIn(false);
        setGreeting('');
    }

    function handleSubmit(event) {
        event.preventDefault();
        const name = event.target.elements.name.value;
        setUsername(name);

        test_backend.greet(name).then((greeting) => {
            setGreeting(greeting);
        });

        return false;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
        <img src="/logo2.svg" alt="DFINITY logo" />
        <br />
        <br />

        {!isLoggedIn ? (
            <div className="auth-section">
            <h2>Please log in to continue</h2>
            <button onClick={handleLogin}>Log in with Internet Identity</button>
            </div>
        ) : (
            <div className="content-section">
            <div className="user-info">
            <p>You are logged in</p>
            <button onClick={handleLogout}>Log out</button>
            </div>

            <form action="#" onSubmit={handleSubmit}>
            <label htmlFor="name">Enter your name: &nbsp;</label>
            <input id="name" alt="Name" type="text" />
            <button type="submit">Click Me!</button>
            </form>
            <section id="greeting">{greeting}</section>
            </div>
        )}
        </main>
    );
}

export default App;
