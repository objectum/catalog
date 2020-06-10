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
		await store.getDict ("d.item.type");
		
		this.setState ({
			roleCode: store.roleCode
		});
	}
	
	readFileAction = async ({progress}) => {
		this.setState ({
			fileData: await store.remote ({
				model: "admin",
				method: "readFile",
				filename: "package.json",
				progress
			})
		});
	}
	
	increaseCostAction = async () => {
		let result = await store.remote ({
			model: "admin",
			method: "increaseCost"
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
					<div className="m-5 px-4">
						<div className="text-right py-1 border">
							<Action label="Admin action: readFile" onClick={this.readFileAction} />
							<Action label="Admin action: increaseCost" onClick={this.increaseCostAction} />
							<Action label="Sign In" onClick={() => this.signIn (app)} />
							{this.state.fileData && <div className="p-1">
								<StringField textarea rows={15} value={this.state.fileData} />
							</div>}
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
				username="guest"
				password={crypto.createHash ("sha1").update ("guest").digest ("hex").toUpperCase ()}
			/>
		);
	}
};

export default App;
