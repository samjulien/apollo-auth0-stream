import React from "react";
import { useQuery, gql } from "@apollo/client";
import "./App.css";
import AddHabit from "./AddHabit";
import Loading from "./Loading";
import Error from "./Error";
import Habit from "./Habit";

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

  if (loading) {
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
      </div>
      <div style={{ marginBottom: "10px" }}>
        <AddHabit />
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
