import React, {Component} from "react";
import store from "objectum-client";
import {ObjectumApp} from "objectum-react";

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
