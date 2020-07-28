import React, {Component} from "react";
import {Store} from "objectum-client";
import {ObjectumApp, ModelList, Action, StringField} from "objectum-react";
import crypto from "crypto";

import ItemModel from "./models/ItemModel";
import ItemCommentModel from "./models/ItemCommentModel";

import "objectum-react/lib/css/bootstrap.css";
import "objectum-react/lib/css/objectum.css";
import "objectum-react/lib/fontawesome/css/all.css";

const store = new Store ();

class App extends Component {
	constructor (props) {
		super (props);

		this.state = {
			roleCode: "guest",
			refresh: false
		};
		store.setUrl ("/api");
		store.register ("item", ItemModel);
		store.register ("t.item.comment", ItemCommentModel);
		
		window.store = store;
	}
	
	onConnect = async () => {
		await store.getDict ("d.item.category");
		
		this.setState ({
			roleCode: store.roleCode
		});
	}
	
	readFileAction = async ({progress}) => {
		return await store.remote ({
			model: "admin",
			method: "readFile",
			filename: "package.json",
			progress
		});
	}
	
	increaseCostAction = async ({progress}) => {
		let result = await store.remote ({
			model: "admin",
			method: "increaseCost",
			progress
		});
		this.setState ({refresh: !this.state.refresh});
		
		return result;
	}
	
	signIn = (app) => {
		app.setState ({sid: ""});
		this.setState ({roleCode: ""});
	}
	
	onCustomRender = ({content, app}) => {
		if (this.state.roleCode === "guest") {
			if (!app.state.sid) {
				return <div />;
			}
			return (
				<div className="container">
					<div className="mx-5 my-2 px-4">
						<div className="pl-1 pt-1 border d-flex">
							<Action label="Admin action: readFile" onClick={this.readFileAction} />
							<Action label="Admin action: increaseCost" onClick={this.increaseCostAction} />
							<Action label="Sign In" onClick={() => this.signIn (app)} />
						</div>
						<ModelList store={store} model="item" refresh={this.state.refresh} />
					</div>
				</div>
			);
		}
	}
	
	render () {
		return (
			<ObjectumApp
				store={store}
				name="Catalog"
				onConnect={this.onConnect}
				onCustomRender={this.onCustomRender}
/*
				username="admin"
				password={crypto.createHash ("sha1").update ("admin").digest ("hex").toUpperCase ()}
*/
				username="guest"
				password={crypto.createHash ("sha1").update ("guest").digest ("hex").toUpperCase ()}
			/>
		);
	}
};

export default App;
