# Javascript платформа Objectum

Если вам нужен простой способ создавать веб-приложения, используя только javascript (full-stack), то предлагаю вам ознакомиться с платформой Objectum. Не уверен, что у меня всё сделано правильно, но эта новая версия платформы является результатом опыта работы над старой версией, которая используется 10 лет. Новая и старая версия используются в разработке различных информационных систем.  
Платформа состоит из следующих npm пакетов: [objectum](https://github.com/objectum/objectum), [objectum-client](https://github.com/objectum/objectum-client), [objectum-proxy](https://github.com/objectum/objectum-proxy), [objectum-react](https://github.com/objectum/objectum-react), [objectum-cli](https://github.com/objectum/objectum-cli). Далее подробности.  

### objectum

Собственно сама платформа, сервер приложений. Реализован ORM для работы с PostgreSQL. Работает достаточно быстро благодаря набору триггеров и функций, написанных на PL/pgSQL (Objectum Database Engine). Кэширование в Redis. Может работать в node cluster. Изменения данных журналируются и в случае чего виновника найти не проблема.
 
### objectum-client

Изоморфный клиент для взаимодействия с objectum-proxy или objectum. Исходный код, работающий с хранилищем, без изменений можно запускать на клиенте или сервере.  

### objectum-proxy
Прокси расположен между objectum и objectum-client. Выполняет следующе задачи:
* Выполнение серверных методов моделей
* Выполнение серверных методов с правами администратора
* Контроль доступа к базе данных. Отслеживаются все действия - это действия CRUD и выборка данных через SQL.
* Загрузка и получение файлов

### objectum-react
Набор react компонентов UI. Сделан с использованием bootstrap и fontawesome. Библиотеки redux, mobx не задействованы. 

### objectum-cli
Утилита командной строки. Выполняет сервисные действия с проектами, включая базы данных. Удобен для быстрого добавления моделей и записей.

# Разработка
Чтобы не быть многословным, в этой статье напишу о самом простом подходе, где не нужно создавать свои компоненты React. В своих проектах я стараюсь по максимуму всю систему сделать таким способом. Для сложных интерфейсов нужно писать свои компоненты, где удобно подключать компоненты из objectum-react.  
Теперь по порядку как создать проект objectum. Перед началом убедитесь, что у вас установлен NodeJS, PostgreSQL и Redis.  
Готовый демо-проект **catalog** вы можете установить [отсюда](https://github.com/objectum/catalog).

## Установка платформы 
Устанавливаем утилиту командной строки:
```bash
npm i -g objectum-cli
```
Устанавливаем платформу
```bash
mkdir /opt/objectum
objectum-cli --create-platform --path /opt/objectum
```
Параметры по умолчанию:
```
--redis-host 127.0.0.1 - хост и порт сервера Redis
--redis-port 6379
--objectum-port 8200 - порт, где будет работать objectum
```

## Создание проекта
Создаем проект "catalog":
```bash
objectum-cli --create-project catalog --path /opt/objectum
```
Параметры по умолчанию:
```
--project-port 3100 - порт, где будет работать проект
--db-host 127.0.0.1 - хост и порт сервера PostgreSQL
--db-port 5432
--db-dbPassword 1 - пароль пользователя catalog
--db-dbaPassword 12345 - пароль администратора postgres
--password admin - пароль администратора проекта
```

Папка проекта создается инструментом create-react-app. На клиенте и сервере модули подключаются как ES Modules.

## Запуск
Запуск платформы:
```bash
cd /opt/objectum/server 
node index-8200.js
```
Запуск проекта:
```bash
cd /opt/objectum/projects/catalog 
node index-3100.js
npm start
```
Должна открыться ссылка http://localhost:3000  
В окне авторизации в полях логин, пароль вводим: admin 

## Инструменты разработчика
Меню "Objectum" содержит пункты: 
* Модели - создание моделей и свойств
* Запросы - создание SQL запросов для выборки данных
* Меню - конструктор меню для ролей пользователей
* Роли - здесь задается список ролей пользователей
* Пользователи - добавление пользователей

## Пакетное добавление данных в хранилище
Структура хранилища формируется с помощью UI, но для быстрого добавления большого количества данных лучше использовать objectum-cli.  
<details>
<summary>Здесь скрипт catalog-cli.json</summary>

```json
{
	"createModel": [
		{
			"name": "Item", 
			"code": "item"
		},
		{
			"name": "Item", 
			"code": "item",
			"parent": "d"
		},
		{
			"name": "Type", 
			"code": "type",
			"parent": "d.item"
		},
		{
			"name": "Item", 
			"code": "item",
			"parent": "t"
		},
		{
			"name": "Comment", 
			"code": "comment",
			"parent": "t.item"
		}
	],
	"createProperty": [
		{
			"model": "d.item.type", 
			"name": "Name", 
			"code": "name",
			"type": "string"
		},
		{
			"model": "t.item.comment", 
			"name": "Item", 
			"code": "item",
			"type": "item"
		},
		{
			"model": "t.item.comment", 
			"name": "Date",
			"code": "date",
			"type": "date"
		},
		{
			"model": "t.item.comment",
			"name": "Text",
			"code": "text",
			"type": "string"
		},
		{
			"model": "item", 
			"name": "Date", 
			"code": "date",
			"type": "date"
		},
		{
			"model": "item", 
			"name": "Name", 
			"code": "name",
			"type": "string"
		},
		{
			"model": "item",
			"name": "Description",
			"code": "description",
			"type": "string",
			"opts": {
				"wysiwyg": true
			}
		},
		{
			"model": "item", 
			"name": "Cost", 
			"code": "cost",
			"type": "number",
			"opts": {
				"min": 0
			}
		},
		{
			"model": "item", 
			"name": "Type", 
			"code": "type",
			"type": "d.item.type"
		},
		{
			"model": "item", 
			"name": "Photo", 
			"code": "photo",
			"type": "file",
			"opts": {
				"image": {
					"width": 400,
					"height": 300,
					"aspect": 1.5
				}
			}
		}
	],
	"createQuery": [
		{
			"name": "Item",
			"code": "item"
		},
		{
			"name": "List",
			"code": "list",
			"parent": "item",
			"query": [
				"{\"data\": \"begin\"}",
				"select",
				"    {\"prop\": \"a.id\", \"as\": \"id\"},",
				"    {\"prop\": \"a.name\", \"as\": \"name\"},",
				"    {\"prop\": \"a.description\", \"as\": \"description\"},",
				"    {\"prop\": \"a.cost\", \"as\": \"cost\"},",
				"    {\"prop\": \"a.date\", \"as\": \"date\"},",
				"    {\"prop\": \"a.photo\", \"as\": \"photo\"},",
				"    {\"prop\": \"a.type\", \"as\": \"type\"}",
				"{\"data\": \"end\"}",
				"",
				"{\"count\": \"begin\"}",
				"select",
				"    count (*) as num",
				"{\"count\": \"end\"}",
				"",
				"from",
				"    {\"model\": \"item\", \"alias\": \"a\"}",
				"",
				"{\"where\": \"empty\"}",
				"",
				"{\"order\": \"empty\"}",
				"",
				"limit {\"param\": \"limit\"}",
				"offset {\"param\": \"offset\"}"
			]
		},
		{
			"name": "Item",
			"code": "item",
			"parent": "t"
		},
		{
			"name": "Comment",
			"code": "comment",
			"parent": "t.item",
			"query": [
				"{\"data\": \"begin\"}",
				"select",
				"    {\"prop\": \"a.id\", \"as\": \"id\"},",
				"    {\"prop\": \"a.item\", \"as\": \"item\"},",
				"    {\"prop\": \"a.date\", \"as\": \"date\"},",
				"    {\"prop\": \"a.text\", \"as\": \"text\"}",
				"{\"data\": \"end\"}",
				"",
				"{\"count\": \"begin\"}",
				"select",
				"    count (*) as num",
				"{\"count\": \"end\"}",
				"",
				"from",
				"    {\"model\": \"t.item.comment\", \"alias\": \"a\"}",
				"",
				"{\"where\": \"empty\"}",
				"",
				"{\"order\": \"empty\"}",
				"",
				"limit {\"param\": \"limit\"}",
				"offset {\"param\": \"offset\"}"
			]
		}
	],
	"createRecord": [
		{
			"_model": "d.item.type",
			"name": "Videocard",
			"_ref": "videocardType"
		},
		{
			"_model": "d.item.type",
			"name": "Processor"
		},
		{
			"_model": "d.item.type",
			"name": "Motherboard"
		},
		{
			"_model": "objectum.menu",
			"name": "User",
			"code": "user",
			"_ref": "userMenu"
		},
		{
			"_model": "objectum.menuItem",
			"menu": {
				"_ref": "userMenu"
			},
			"name": "Items",
			"icon": "fas fa-list",
			"order": 1,
			"path": "/model_list/item"
		},
		{
			"_model": "objectum.menuItem",
			"menu": {
				"_ref": "userMenu"
			},
			"name": "Dictionary",
			"icon": "fas fa-book",
			"order": 2,
			"_ref": "dictionaryMenuItem"
		},
		{
			"_model": "objectum.menuItem",
			"menu": {
				"_ref": "userMenu"
			},
			"name": "Item type",
			"icon": "fas fa-book",
			"parent": {
				"_ref": "dictionaryMenuItem"
			},
			"order": 1,
			"path": "/model_list/d_item_type"
		},
		{
			"_model": "objectum.role",
			"name": "User",
			"code": "user",
			"menu": {
				"_ref": "userMenu"
			},
			"_ref": "userRole"
		},
		{
			"_model": "objectum.user",
			"name": "User",
			"login": "user",
			"password": "user",
			"role": {
				"_ref": "userRole"
			}
		},
		{
			"_model": "objectum.menu",
			"name": "Guest",
			"code": "guest",
			"_ref": "guestMenu"
		},
		{
			"_model": "objectum.menuItem",
			"menu": {
				"_ref": "guestMenu"
			},
			"name": "Items",
			"icon": "fas fa-list",
			"order": 1,
			"path": "/model_list/item"
		},
		{
			"_model": "objectum.role",
			"name": "Guest",
			"code": "guest",
			"menu": {
				"_ref": "guestMenu"
			},
			"_ref": "guestRole"
		},
		{
			"_model": "objectum.user",
			"name": "Guest",
			"login": "guest",
			"password": "guest",
			"role": {
				"_ref": "guestRole"
			}
		},
		{
			"_model": "item",
			"name": "RTX 2060",
			"date": "2020-06-01T19:27:38.292Z",
			"type": {
				"_ref": "videocardType"
			},
			"cost": "300",
			"photo": "images/rtx2060.png"
		},
		{
			"_model": "item",
			"name": "RTX 2070",
			"date": "2020-06-02T19:27:38.292Z",
			"type": {
				"_ref": "videocardType"
			},
			"cost": "500",
			"photo": "images/rtx2070.png"
		},
		{
			"_model": "item",
			"name": "RTX 2080",
			"description": [
				"<ul>",
				"<li>11GB GDDR6</span></li>",
				"<li>CUDA Cores: 4352</span></li>",
				"<li>Display Connectors: DisplayPort, HDMI, USB Type-C</span></li>",
				"<li>Maximum Digital Resolution: 7680x4320</span></li>",
				"</ul>"
			],
			"date": "2020-06-03T19:27:38.292Z",
			"type": {
				"_ref": "videocardType"
			},
			"cost": "800",
			"photo": "images/rtx2080.png"
		}
	]
}
```
Что всё это значит:
* createModel - создание моделей, где name - наименование, code - текстовый идентификатор, parent - родитель. Иерархия используется для группировки моделей.
    * В примере создаются модели item, d.item.type, t.item.comment.
    * Модель "d.item.type" - это справочник. В модели "item" ссылка на справочник из свойства "type". Все справочники рекомендуется добавлять в узел "d". 
    * Модель "t.item.comment" - это табличная часть. Комментарии имеют ссылку на "item". Все табличные части рекомендуется добавлять в узел "t".
* createProperty - создание свойств моделей, где name - наименование, code - текстовый идентификатор, model - модель, type - тип данных в т.ч. ссылка на любую модель, opts - дополнительные параметры свойства, например, отображение текстового поля как wysiwyg редактор. 
* createQuery - создание SQL запросов с JSON вставками блоков, параметров, моделей, свойств.
    * [] - с помощью массива добавляется читаемый многострочный текст.
    * блоки {"...": "begin"}...{"...": "end"} помогают парсеру строить SQL запросы для различных целей: выборка (data), расчет кол-ва записей (count), фильтрация (where), сортировка (order), расчет кол-ва дочерних узлов (tree).
    * модель {"model": "item", "alias": "a"} конвертируется в название таблицы "код_id".
    * свойство {"prop": "a.name"} конвертируется в название столбца "код_id".
    * параметр {"prop": "limit"} должен быть передан запросу при выполнении.
* createRecord - добавление записей моделей.
    * _model - модель
    * name - сохраняем любые свойства
    * [] - с помощью массива добавляется читаемый многострочный текст.
    * _ref - с помощью этой команды добавляем ссылки на другие записи т.к. заранее id записи неизвестно.
    * JSON конвертируется в текст.
    * "photo": "images/rtx2080.png" - добавление файлов. В photo запишется "rtx2080.png" и загрузится файл по относительному пути "images/rtx2080.png".

</details>

## Исходный код моделей
Исходный код ItemModel подключается на клиенте и сервере. Для добавления ReactJS или NodeJS кода нужно разделить код на ItemClientModel, ItemServerModel или на ItemModel, ItemClientModel extends ItemModel, ItemServerModel extends ItemModel.  

## Клиент
Подключение в App.js:
```js
import ItemModel from "./models/ItemModel";
 
store.register ("item", ItemModel);
```

Теперь создаваемые записи модели "item" будут экземплярами класса ItemModel:
```js
let record = await store.createRecord ({
    _model: "item",
    name: "Foo"
});
```
Что это дает:
* Прямое обращение к свойствам record.name = "Bar";
* Ссылка на хранилище record.store
* Сохранение изменений await record.sync ()

<details>
<summary>ItemModel.js</summary>

```jsx
import React from "react";
import {Record, factory} from "objectum-client";
import {Action} from "objectum-react";

class ItemModel extends Record {
	static _renderGrid ({grid, store}) {
		// Additional buttons in grid
		let actions = [
			...grid.props.children,
			<Action label="Server action: getComments" onClickSelected={async ({progress, id}) => {
				let recs = await store.remote ({
					model: "item",
					method: "getComments",
					id,
					progress
				});
				return JSON.stringify (recs)
			}} />
		];
		return React.cloneElement (grid, {
			label: "Items", // grid label
			query: "item.list", // grid query
			onRenderTable: ItemModel.onRenderTable, // grid table custom render
			children: store.roleCode === "guest" ? null : actions
		});
	}
	
	static onRenderTable ({grid, cols, colMap, recs, store}) {
		return (
			<div className="p-1">
				{recs.map ((rec, i) => {
					let record = factory ({rsc: "record", data: Object.assign (rec, {_model: "item"}), store});
					
					return (
						<div key={i} className={`row border-bottom my-1 p-1 no-gutters ${grid.state.selected === i ? "bg-secondary text-white" : ""}`} onClick={() => grid.onRowClick (i)} >
							<div className="col-6">
								<div className="p-1">
									<div>
										<strong className="mr-1">Name:</strong>{rec.name}
									</div>
									<div>
										<strong className="mr-1">Date:</strong>{rec.date && rec.date.toLocaleString ()}
									</div>
									<div>
										<strong className="mr-1">Type:</strong>{rec.type && store.dict ["d.item.type"][rec.type].name}
									</div>
									<div>
										<strong className="mr-1">Cost:</strong>{rec.cost}
									</div>
									<div>
										<strong>Description:</strong>
									</div>
									<div dangerouslySetInnerHTML={{__html: `${record.description || ""}`}} />
								</div>
							</div>
							<div className="col-6 text-right">
								{record.photo && <div>
									 <img src={record.getRef ("photo")} className="img-fluid" width={400} height={300} alt={record.photo} />
								</div>}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
	
	// item form layout
	static _layout () {
		return {
			"Information": [
				"id",
				[
					"name", "date"
				],
				[
					"type", "cost"
				],
				[
					"description"
				],
				[
					"photo"
				],
				[
					"t.item.comment"
				]
			]
		};
	}
	
	// new item render
	static _renderField ({field, store}) {
		if (field.props.property === "date") {
			return React.cloneElement (field, {value: new Date (), showTime: true});
		} else {
			return field;
		}
	}

	// item render
	_renderField ({field, store}) {
		if (field.props.property === "date") {
			return React.cloneElement (field, {showTime: true});
		} else {
			return field;
		}
	}
};

export default ItemModel;
```
</details>

В моделях зарезервированы названия методов для решения различных задач: 
* _renderGrid - модель "item" имеет отображение по умолчанию в маршруте /model_list/item. Отображает компонент ModelList, который вызывает данный метод при рендере Grid.
* _layout - запись отображает компонент ModelRecord, который вызывает данный метод для получения разметки. Если метод не определен, то макет формы используется стандартный, где все поля по одной на строку, а табличные части в отдельных закладках формы. 
* _renderField - рендер поля. Статичный метод для новой записи и обычный метод для существующей записи.

## Сервер
Подключение в index.js:
```js
import ItemModel from "./src/models/ItemServerModel.js";
 
proxy.register ("item", ItemModel);
```

Методы и работа с хранилищем store такая же. Сессии между пользователями разделены.

<details>
<summary>ItemServerModel.js</summary>

```js
import objectumClient from "objectum-client";
const {Record} = objectumClient;

function timeout (ms = 500) {
	return new Promise (resolve => setTimeout (() => resolve (), ms));
};

class ItemModel extends Record {
	async getComments ({progress}) {
		for (let i = 0; i < 10; i ++) {
			await timeout (1000);
			progress ({label: "processing", value: i + 1, max: 10});
		}
		return await this.store.getRecs ({
			model: "t.item.comment",
			filters: [
				["item", "=", this.id]
			]
		});
	}
};

export default ItemModel;
```
</details>

С клиента серверные методы вызываются так:
```js
getComments () {
    return await store.remote ({
        model: "item",
        method: "getComments",
        myArg: "" 
    });
}
```

## Доступ
Подключение в index.js:
```js
import accessMethods from "./src/modules/access.js";
 
proxy.registerAccessMethods (accessMethods);
```

<details>
<summary>access.js</summary>

```js
let map = {
	"guest": {
		"data": {
			"model": {
				"item": true, "d.item.type": true, "t.item.comment": true
			},
			"query": {
				"objectum.userMenuItems": true
			}
		},
		"read": {
			"objectum.role": true, "objectum.user": true, "objectum.menu": true, "objectum.menuItem": true
		}
	}
};
async function _init ({store}) {
};

function _accessData ({store, data}) {
	if (store.roleCode == "guest") {
		if (data.model) {
			return map.guest.data.model [store.getModel (data.model).getPath ()];
		}
		if (data.query) {
			return map.guest.data.query [store.getQuery (data.query).getPath ()];
		}
	} else {
		return true;
	}
};

function _accessFilter ({store, model, alias}) {
};

function _accessCreate ({store, model, data}) {
	return store.roleCode != "guest";
};

function _accessRead ({store, model, record}) {
	let modelPath = model.getPath ();
	
	if (store.roleCode == "guest") {
		if (modelPath == "objectum.user") {
			return record.login == "guest";
		}
		return map.guest.read [modelPath];
	}
	return true;
};

function _accessUpdate ({store, model, record, data}) {
	return store.roleCode != "guest";
};

function _accessDelete ({store, model, record}) {
	return store.roleCode != "guest";
};

export default {
	_init,
	_accessData,
	_accessFilter,
	_accessCreate,
	_accessRead,
	_accessUpdate,
	_accessDelete
};
```
</details>

Любой запрос к хранилищу можно запретить или ограничить. Доступные методы:
* _init - инициализация модуля.
* _accessCreate - создание записей.
* _accessRead - чтение записей.
* _accessUpdate - изменений записей.
* _accessDelete - удаление записей.
* _accessData - выборка данных методом getData
* _accessFilter - для каждой модели в SQL запросе вызывается этот метод. Например ограничиваем конкретному пользователю выборку записей. Т.о. в любом новом запросе ограничения будут работать.

Действия можно запретить или ограничить, например разрешать изменять только набор свойств определенной роли.  
Создание, изменение, удаление моделей, свойств, запросов и столбцов доступно только суперпользователю admin.
	
## Действия администратора
Иногда нужно выполнить серверное действие с максимальными правами. Это может быть регистрация пользователя или какая-то обратная связь.  
Подключение в index.js:
```js
import adminMethods from "./src/modules/admin.js";
 
proxy.registerAdminMethods (adminMethods);
```

<details>
<summary>admin.js</summary>

```js
import fs from "fs";
import util from "util";

fs.readFileAsync = util.promisify (fs.readFile);

function timeout (ms = 500) {
	return new Promise (resolve => setTimeout (() => resolve (), ms));
};

async function readFile ({store, progress, filename}) {
	for (let i = 0; i < 10; i ++) {
		await timeout (1000);
		progress ({label: "processing", value: i + 1, max: 10});
	}
	return await fs.readFileAsync (filename, "utf8");
};

async function increaseCost ({store, progress}) {
	await store.startTransaction ("demo");
	
	let records = await store.getRecords ({model: "item"});
	
	for (let i = 0; i < records.length; i ++) {
		let record = records [i];
		
		record.cost = record.cost + 1;
		await record.sync ();
	}
	await store.commitTransaction ();
	
	return "ok";
};

export default {
	readFile,
	increaseCost
};
```
</details>

Как видно из admin.js. Здесь читаем файлы и меняем данные из под любой учетной записи пользователя (guest).  
С клиента вызов такой:
```js
await store.remote ({
    model: "admin",
    method: "readFile",
    filename: "package.json"
});
```

## Возможности компонентов
Несколько компонентов

### Grid

### Form

Кнопка "Изменения" в форме. В работе у клиентов помогает, что попало нельзя творить т.к. видно кто сделал.

### Action

## Отчеты
Будет пакет.

## Тесты производительности

Кол-во свойств 1, 10, 100. Разные типы данных: Число, Строка, Дата.
Создание записей пакетом.
Изменение записей.
Последовательное чтение записей.
Пакетное чтение записей.
Удаление записей. Есть возможность удалять данные запросом delete, но целенаправленно сделано удаление по одной.
База данных в памяти?
 
## Заключение

Бесплатно. Долго поддерживаться будет. Используется в проде.
Планирую выкатить новые пакеты по аналитике например т.к. есть наработки.
