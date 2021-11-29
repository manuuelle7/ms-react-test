# Process the input into a tree

## Quick Overview
To run the app, you need to open a terminal at the project an run de next commands:

```
npm install
npm start
```
Then open [http://localhost:3000/](http://localhost:3000/) to see the app.


## About this APP

The app objetive is divided in 3 Problems:

### `Problem 1`

The user gives a string like this format `["a",["b",null,[1]],["c"]]` to transform to a Binary tree like this:

```
{
	"id": "a",
	"left": {
		"id": "b",
		"left": null,
		"right": {
			"id": 1,
			"left": null,
			"right": null
		}
	},
	"right": {
		"id": "c",
		"left": null,
		"right": null
	}
}
```

### `Problem 2`

In a SPA app the user gives a `file.txt` with the same format than _Problem 1_  `["a",["b",null,[1]],["c"]]` to transform to a Binary tree, this file is process and then is shown in json format and visual format like this:

User upload file.
![image](https://user-images.githubusercontent.com/37640479/143906969-bce70796-a50a-442e-aa37-55a0fe3ad3e0.png)

App process and show the info.

![image](https://user-images.githubusercontent.com/37640479/143907139-e36d8063-8fb7-4369-bd7a-47cc6dc9c193.png)

**Validations**

- The file need to have the format `["a",["b",null,[1]],["c"]]`, if not the app show a _error_ message.

![image](https://user-images.githubusercontent.com/37640479/143910127-d7d4a76d-187f-499c-b22e-929d8c772f59.png)

- If user touch the _upload_ button without have choosen a file, the app show a _warning_ message.

![image](https://user-images.githubusercontent.com/37640479/143909854-afda67c3-9a64-471e-9797-d4fd78057144.png)

- If user touch the _clear_ button without json to clear, the app show a _info_ message.

![image](https://user-images.githubusercontent.com/37640479/143910455-e874ae6f-781d-4c98-b1e4-8a4dd52ae8c4.png)

- As soon the input is correct the app show the json format ready to edit and show the binary tree in a special format.

![image](https://user-images.githubusercontent.com/37640479/143907139-e36d8063-8fb7-4369-bd7a-47cc6dc9c193.png)

- The json could be editable, but when json have a incorrect format, hide visual output and show a message indicading the error.

![image](https://user-images.githubusercontent.com/37640479/143909064-d686c62f-43a7-4065-9541-8e66e22e9513.png)


**Nice to have**
- All points mentioned before
- Do a copy _readonly_ from the last correct json and show it.
- When there are a error in json input, mark the specific line where are the error.
- Export the correct json in a txt file.
- Put advanced animations then the error exists.
- In the output, show option to expand the binary tree output to see better when the tree is big.

### `Problem 3`

When the input is correct, mark with border 2px greem the smallest deepest sub-tree from tree

![image](https://user-images.githubusercontent.com/37640479/143913056-1acce266-84a7-4486-8dc5-b348f3e85f4a.png)

**Validations**
- The output disappear when the input have a incorrect format adn ir show a _error_ message.
 
![image](https://user-images.githubusercontent.com/37640479/143909064-d686c62f-43a7-4065-9541-8e66e22e9513.png)

**Nice to have**
- All points mentioned before
- Validate input, the input doest not have a equals id´s.
- Functionality to add nodes from output screen.
# Technical especification

- **Project structure.**

```
ms-react-test
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── components
      ├── tree-source
      |   ├── TreeSource.tsx
      ├── tree-json
      |   ├── TreeJson.tsx
      |__ tree-output
          |── TreeOutput.tsx
    ├── models
      ├── BinTreeNode.ts
      ├── Props.ts
    ├── App.css
    ├── App.tsx
    ├── App.test.tsx
    ├── index.css
    ├── index.tsx
    ├── logo.svg
    └── serviceWorker.tss
    └── setupTests.tss
```

### `Problem 2` 

When user activate the upload method, the app takes the text from the text file and then is processed by the method of the _Problem 1_. 

The nex method transform that input in a binary tree `../src/components/tree-source/TreeSource.tsx]`:

![image](https://user-images.githubusercontent.com/37640479/143896960-39e38c79-f136-4d8a-bddc-2a8ebaa734f6.png)

### `Problem 3` 

Additionally, the app search the _smallest deepest node from binary tree_ whith the next function `../src/components/tree-source/TreeSource.tsx]`. All values are set in a respective state Hooks.

![image](https://user-images.githubusercontent.com/37640479/143903508-feeb6202-043f-47f1-8cff-8b129bc19e43.png)



# IUX Desing

- **Initial APP.** In this case, the _upload button_ and _clear button_ are disabled. just is enabled the choose _file button_

![1 - start](https://user-images.githubusercontent.com/37640479/143927525-e44de66c-90e9-4a41-888a-654a57f901b7.png)

- **Valid file input.** If the file contains a correct format, the app do:
1. Show a success notification.
2. Enable the _upload button_ and _clear button_

![2 - upload-correct-file](https://user-images.githubusercontent.com/37640479/143927976-f1a5556b-93c0-4e52-a448-e1b4a2207860.png)

- **Valid file input.** If the file contains a incorrect format, the app do:
1. Show a error notification.

![3 - upload-incorrect-file](https://user-images.githubusercontent.com/37640479/143928053-e4123af5-8da8-4f71-81b1-e8ce658e8572.png)

- **Upload file** When the user click the _upload button_ the app do:
1. Parse the input to a json an show it.
2. Show that json as a visual usign boxes. 
3. The app mark with border green the json box and the visual json box (output). 
4. The app mark the _smallest deepest subtree_ with border 2px green.
5. User can export the correct json in a txt file.
6. User can use the visual output for edit the tree with drag and drop.

![4 - data-correct](https://user-images.githubusercontent.com/37640479/143928643-cfc53a6c-69f0-454b-aa49-81e500e1c478.png)

- **User edit json with incorrect format** If the json format is incorrect, the app do:
1. Hide the output.
2. Show the json box whith border red and show a error notification with the specific error line.
3. Show other json box with the last correct json.
4. the user can export the last correct json.

![5 - data-incorrect](https://user-images.githubusercontent.com/37640479/143928922-354c6997-299f-42ef-b585-91d99dbb4c17.png)

- **User edit json with incorrect format** If the json format is correct, the app do:
1. Show the output.
2. Show the json box whith border green.
3. Check again the _smallest deepest subtree_ with border 2px green.

![4 - data-correct](https://user-images.githubusercontent.com/37640479/143928643-cfc53a6c-69f0-454b-aa49-81e500e1c478.png)

- **User can clear values and start again** 

![1 - start](https://user-images.githubusercontent.com/37640479/143927525-e44de66c-90e9-4a41-888a-654a57f901b7.png)


## By Manuel Islas
