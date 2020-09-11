const App = () => {
  const { isLoading, isAuthenticated } = useAuth0()

  if (isLoading) {
    return <LoadingBackdrop />
  }

  const renderedConstantComponents = () => {
    if (isAuthenticated) {
      return (
        <React.Fragment>
          <AuthenticatedNav />
          <SideBar />
        </React.Fragment>
      )
    }
    return <Nav />
  }

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      {renderedConstantComponents()}
      <main>
        <SideBar />
        <Switch>
          <Route path="/dashboard" component={PlaceHolder} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/teams" component={TeamsGrid} />
          <Route exact path="/teams/new" component={AddTeamForm} />
          <Redirect from="*" to="/" />
        </Switch>
      </main>
    </div>
  )
}

export default App
