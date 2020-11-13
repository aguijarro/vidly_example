// Project packages required
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './scss/main.scss';

// Project components
import Movies from './components/Movies';
import addMovie from './components/addMovie';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navbar';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import RegisterForm from './components/RegisterForm';
import auth from './services/authService';
import ProtectedRoute from './components/common/protectedRoute';

class App extends Component {
	state = {};

	componentDidMount() {
		const user = auth.getCurrentUser();
		this.setState({ user });
	}

	render() {
		const { user } = this.state;
		return (
			<>
				<ToastContainer />
				<NavBar user={user} />
				<main className="container">
					<Switch>
						<Route
							path="/register"
							component={RegisterForm}
						></Route>
						<Route path="/login" component={LoginForm}></Route>
						<Route path="/logout" component={Logout}></Route>
						<ProtectedRoute
							path="/movies/:id"
							component={addMovie}
						/>
						<Route
							path="/movies"
							render={(props) => <Movies {...props} />}
						></Route>
						<Route path="/customers" component={Customers}></Route>
						<Route path="/rentals" component={Rentals}></Route>
						<Route path="/notFound" component={NotFound}></Route>
						<Redirect from="/" exact to="/movies" />
						<Redirect to="/not-found" />
					</Switch>
				</main>
			</>
		);
	}
}

export default App;
