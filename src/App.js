import React, {Component} from "react";
import {Store} from "objectum-client";
import {ObjectumApp, ModelList, Action} from "objectum-react";
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

		let me = this;

		me.state = {
			roleCode: "guest",
			refresh: false
		};
		me.onConnect = me.onConnect.bind (me);
		me.onCustomRender = me.onCustomRender.bind (me);
		
		store.setUrl ("/api");
		store.register ("item", ItemModel);
		store.register ("t.item.comment", ItemCommentModel);
	}
	
	async onConnect () {
		await store.getDict ("d.item.type");
		
		this.setState ({
			roleCode: store.roleCode
		});
	}
	
	onCustomRender ({content, app}) {
		let me = this;
		
		if (me.state.roleCode === "guest") {
			if (!app.state.sid) {
				return <div />;
			}
			return (
				<div className="container">
					<div className="m-2">
						<div className="text-right py-1 border">
							<Action label="Admin action: readFile" onClick={async ({progress}) => {
								return await store.remote ({
									model: "admin",
									method: "readFile",
									filename: "package.json",
									progress
								});
							}} />
							<Action label="Admin action: increaseCost" onClick={async () => {
								let result = await store.remote ({
									model: "admin",
									method: "increaseCost"
								});
								me.setState ({refresh: !me.state.refresh});
								
								return result;
							}} />
							<Action label="Sign In" onClick={() => {
								app.setState ({sid: ""});
								me.setState ({roleCode: ""});
							}} />
						</div>
						<ModelList store={store} model="item" refresh={me.state.refresh} />
					</div>
				</div>
			);
		}
	}
	
	render () {
		let me = this;
		
		return (
			<ObjectumApp
				store={store}
				name="Catalog"
				onConnect={me.onConnect}
				onCustomRender={me.onCustomRender}
				username="guest"
				password={crypto.createHash ("sha1").update ("guest").digest ("hex").toUpperCase ()}
			/>
		);
	}
};

export default App;
