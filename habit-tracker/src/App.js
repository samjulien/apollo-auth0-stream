import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./App.css";
import AddHabit from "./AddHabit";
import Loading from "./Loading";
import Error from "./Error";
import Habit from "./Habit";
import { useAuth0 } from "./utils/auth";

export const HABITS_QUERY = gql`
  query HABITS_QUERY {
    habits {
      id
      description
      points
      entries {
        id
        notes
        date
        completed
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(HABITS_QUERY);
  const {
    isAuthenticated,
    loading: authLoading,
    loginWithRedirect,
    user,
    logout,
  } = useAuth0();

  if (loading || authLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="container">
      <div>
        <h2 style={{ marginBottom: "10px" }}>
          Habit Tracker{" "}
          <span role="img" aria-label="muscle emoji">
            💪
          </span>
        </h2>
        {!isAuthenticated && (
          <button type="button" onClick={loginWithRedirect}>
            Log In
          </button>
        )}
      </div>
      <div style={{ marginBottom: "10px" }}>
        {isAuthenticated && (
          <>
            Welcome, {user.name}
            <span role="img" aria-label="muscle emoji">
              👋
            </span>
            !
            <button onClick={logout} type="button" style={{ fontSize: "12px" }}>
              Log Out
            </button>
            <br />
            <AddHabit />
          </>
        )}
      </div>
      <ul style={{ margin: "10px", paddingInlineStart: "15px" }}>
        {data.habits.map((habit) => {
          return <Habit key={habit.id} habit={habit} />;
        })}
      </ul>
    </div>
  );
}

export default App;
