# React Grudge Bin

A React project with the objective to create a list that keeps track of the people who've wronged us.

### Grudge properties:

- An `id`
- The name of the person who wronged you
- The offense that caused them to be dead to you
- Whether or not you've forgiven (but not forgotten) them

### The Features

- Users can add a new person who has wronged them to the list.
- They can include the reason why that person is welcomed to go fly a kite.
- By default, the person is not forgiven, however, there is a button to forgive the monster.
- There is also a button to re-condemn them in case they wrong you again.
- The person cannot be deleted from the list.
- The list shows the following data:
  - A count of the total number of people on this list.
  - A count of the number of people who remain unforgiven.
  - A count of the number of people have redeemed themselves.

To install the dependencies:

```
npm install
```

To fire up a development server:

```
npm start
```

Once the server is running, you can visit:

* `http://localhost:8080/webpack-dev-server/` to run your application.
* `http://localhost:8080/webpack-dev-server/test.html` to run your test suite in the browser.

To build the static files:

```js
npm run build
```


To run tests in Node:

```js
npm test
```
