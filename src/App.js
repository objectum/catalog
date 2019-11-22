import React, {Component} from "react";
import store from "objectum-client";
import {ObjectumApp} from "objectum-react";

class App extends Component {
	constructor (props) {
		super (props);
		
		store.setUrl ("/api/projects/catalog/");
		window.store = store;
	}
	
	render () {
		return (
			<ObjectumApp store={store} _username="admin" _password={require ("crypto").createHash ("sha1").update ("admin").digest ("hex").toUpperCase ()} name="Catalog" />
		);
	}
};

export default App;
