# Teamwork Frontend

This is a group chat app written in modern React hooks and Redux Toolkit:
- User authentication, powered by Auth0, and user info management in Rails API
- Real-time group chat using WebSockets / Action Cable
- Unread message prompts and info preservation after user logs out
- Rich text editing including emoji, powered by Quill
- Team entity CRUD with Rails REST API:
  - Multi-step form for team creation
  - Team search with auto-completion
  - Team member updates with user joining and leaving

The server side is supported by [Teamwork Backend](https://github.com/lushiyun/teamwork-backend) built with Rails including WebSockets / Action Cable.

## Demonstration

[Read my blog post about Using Action Cable with Modern React Hooks and Redux Toolkit for Real-time Features](https://medium.com/@lushiyun/action-cable-react-hooks-redux-toolkit-yet-another-chat-app-with-unread-messages-feature-93f5f36d4489?sk=ce3f4d7d1f9c4497dff9250d0bce9a29)

[Demo the project in production](https://teamwork-client.netlify.app/)

[Watch this video demo on how to use the app](https://youtu.be/-zL5NooatJI)

[Check out my portfolio for my other projects](https://www.shiyunlu.com/)

## Built With

  - This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/lushiyun/c8af9e2f2d6470468cfc37aa28f6edeb) for details on my code of conduct, and the process for submitting pull requests.

## Versioning

I use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/lushiyun/trip-planner-frontend/tags).

## Author

  - **Shiyun Lu** - *Developed the app* -
    [lushiyun](https://github.com/lushiyun)

## License

This project is licensed under the MIT License

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.