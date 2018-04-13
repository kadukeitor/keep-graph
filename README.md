# Keep Graph

Keep Graph is a open source clone of [Google Keep](https://keep.google.com).
It's built on top of [React](https://reactjs.org) and [GraphQL](https://graphql.org).

![Alt text](.github/preview.png?raw=true "Keep Graph")

The current backend is hosted on [GraphCool](https://graph.cool)

## Getting Started

### 1. Clone the project
```
git clone https://github.com/kadukeitor/keep-graph.git
```

### 2. Move to the project
```
cd keep-graph
```

### 3. Install the dependencies
```
npm install
```

### 4. Create the configuration file
```
cp .env.example .env
```

### 4.1. Current configuration
```
REACT_APP_GRAPHQL_ENDPOINT_SIMPLE=https://api.graph.cool/simple/v1/keep-graph
REACT_APP_GRAPHQL_ENDPOINT_SUBSCRIPTIONS=wss://subscriptions.us-west-2.graph.cool/v1/keep-graph
```

### 5. Run the project
```
npm start
```

## Demo

Check the demo [here](https://kadukeitor.github.io/keep-graph/)