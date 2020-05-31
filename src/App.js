import React, {Component} from "react";
import {Store} from "objectum-client";
import {ObjectumApp} from "objectum-react";

import "objectum-react/lib/css/bootstrap.css";
import "objectum-react/lib/css/objectum.css";
import "objectum-react/lib/fontawesome/css/all.css";

const store = new Store ();

class App extends Component {
	constructor (props) {
		super (props);
		
		store.setUrl ("/api");
		window.store = store;
	}
	
	render () {
		return (
			<ObjectumApp store={store} name="Catalog" />
		);
	}
};

export default App;
